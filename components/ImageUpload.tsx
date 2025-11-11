'use client';

import { Image as IKImage, upload, ImageKitProvider } from '@imagekit/next';
import Image from 'next/image';
import config from '@/lib/config';
import { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

interface ImageUploadProps {
  onFileChange: (filePath: string) => void;
}

const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Get authentication parameters from the API route
      const response = await fetch('/api/auth/imagekit');
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Authentication error:', errorData);
        throw new Error(errorData.error || 'Failed to authenticate');
      }
      const authData = await response.json();

      // Upload the file using ImageKit's upload function
      const result = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        publicKey: publicKey!,
        urlEndpoint: urlEndpoint!,
        ...authData,
      });

      if (result.filePath) {
        setFile({ filePath: result.filePath });
        onFileChange(result.filePath);

        toast({
          title: 'Image uploaded successfully',
          description: `${result.filePath} uploaded successfully!`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Image upload failed',
        description: errorMessage.includes('credentials')
          ? 'ImageKit is not configured. Please add your API keys to .env.local'
          : 'Your image could not be uploaded. Please try again',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <button
        className="upload-btn border border-input rounded-md p-2"
        onClick={handleUploadClick}
        disabled={isUploading}
        type="button"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={24}
          height={24}
          className="object-contain"
        />

      Upload a file
      </button>

      <p className="text-base text-light-100">
        {isUploading ? 'Uploading...' : 'Upload a file'}
      </p>

      {file && <p className="upload-filename">{file.filePath}</p>}

      {file && (
        <IKImage
          src={file.filePath}
          alt={file.filePath}
          width={500}
          height={500}
          className="object-cover"
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;

// components/BookCover.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BookCoverSvg from '@/components/BookCoverSvg';
type BookCoverVariant = 'extra-small' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
  'extra-small': 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage?: string;
  showOverlay?: boolean;
}

const BookCover = ({
  className,
  variant = 'regular',
  coverColor = '#012B48',
  coverImage = 'https://placehold.co/400x600.png',
}: Props) => {
  <BookCoverSvg coverColor={coverColor} />;
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm transition-all duration-300 ease-in-out',
        variantStyles[variant],
        className,
      )}
      style={{ backgroundColor: coverColor }}
    >
      <Image
        src={coverImage}
        alt="book cover"
        fill
        sizes="(max-width: 640px) 256px, 296px"
        className="relative z-10 object-cover object-right"
      />
    </div>
  );
};

export default BookCover;

import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';
import config from '@/lib/config';

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

export async function GET() {
  try {
    // Validate environment variables
    if (!publicKey || !privateKey || !urlEndpoint) {
      console.error('ImageKit credentials missing:', {
        publicKey: !!publicKey,
        privateKey: !!privateKey,
        urlEndpoint: !!urlEndpoint,
      });
      return NextResponse.json(
        {
          error: 'ImageKit credentials not configured',
          details: {
            publicKey: !!publicKey,
            privateKey: !!privateKey,
            urlEndpoint: !!urlEndpoint,
          },
        },
        { status: 500 }
      );
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error('ImageKit authentication error:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication parameters' },
      { status: 500 }
    );
  }
}

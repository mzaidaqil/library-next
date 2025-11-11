# ImageKit Setup Instructions

## The authentication is failing because your ImageKit environment variables are not configured.

### Steps to Fix:

1. **Sign up for ImageKit** (if you haven't already):
   - Go to https://imagekit.io
   - Create a free account

2. **Get your API credentials**:
   - Go to https://imagekit.io/dashboard/developer/api-keys
   - Copy your:
     - Public Key
     - Private Key
     - URL Endpoint

3. **Create a `.env.local` file** in the root of your project:

```bash
# Create the file
touch .env.local
```

4. **Add your ImageKit credentials** to `.env.local`:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000/api
```

5. **Restart your Next.js development server**:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Security Notes:
- Never commit `.env.local` to git (it should be in `.gitignore`)
- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- `IMAGEKIT_PRIVATE_KEY` is only used on the server side

### Verify Setup:
After adding the credentials and restarting:
1. Try uploading an image
2. Check the browser console for any error messages
3. Check the terminal console for server-side errors

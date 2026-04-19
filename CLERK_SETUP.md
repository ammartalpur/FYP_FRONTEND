# Clerk Authentication Setup

## Get Your Clerk API Keys

1. Go to https://dashboard.clerk.com
2. Sign up for a free account (or sign in if you have one)
3. Create a new application
4. Copy your API keys:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
5. Paste them in the .env.local file below

## .env.local (Create this file in the root directory)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
```

## Setup Steps

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Add your Clerk keys to `.env.local`

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Visit http://localhost:3000 and click "Sign In"

## Features

- ✅ Google Sign-In
- ✅ User Name Display
- ✅ Profile Management
- ✅ Session Persistence

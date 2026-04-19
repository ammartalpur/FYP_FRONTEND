# Google Sign-In Authentication Setup Guide

## Overview
This application now supports Google Sign-In using **Clerk**, a modern authentication platform. When users sign in with Google, their name will display in the sidebar and navbar instead of the default "Hasnain Ali 22CS068".

## Installation & Setup Steps

### 1. **Create a Clerk Account**
   - Visit [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Sign up for a free account
   - Create a new application

### 2. **Get Your API Keys**
   - In the Clerk dashboard, go to **API Keys**
   - Copy:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`

### 3. **Create `.env.local` File**
   
   Create a `.env.local` file in the root directory and add:
   
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   CLERK_SECRET_KEY=your_secret_key_here
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
   ```

### 4. **Enable Google OAuth in Clerk**
   - In Clerk dashboard, go to **Social Connections**
   - Enable **Google**
   - (No additional setup needed, it works out of the box!)

### 5. **Install Dependencies**
   
   ```bash
   pnpm install
   ```

### 6. **Run Development Server**
   
   ```bash
   pnpm dev
   ```

### 7. **Test Authentication**
   - Visit http://localhost:3000
   - Click **"Sign In"** in the navbar
   - You can sign up with Google or email
   - After signing in, your name will appear in:
     - **Sidebar** (bottom left)
     - **Navbar** (with profile dropdown)

## Features

### ✅ What's Included
- **Google Sign-In** - Sign in with Google account
- **Email/Password** - Alternative sign-in method
- **Profile Page** - Manage your profile and sign out
- **User Name Display** - Your logged-in name shows in sidebar and navbar
- **Default User** - When not logged in, shows "Hasnain Ali 22CS068"
- **Session Management** - Persistent authentication across sessions

### 🔑 User Info Display

**When Signed In:**
- Shows user's first and last name (e.g., "John Doe")
- Shows username or email prefix
- Shows user's initials in avatar (e.g., "JD")

**When Signed Out:**
- Shows default: "Hasnain Ali"
- Shows: "22CS068"
- Shows default initials: "HA"

## File Structure

```
app/
├── sign-in/[[...sign-in]]/page.tsx    # Sign-in page
├── sign-up/[[...sign-up]]/page.tsx    # Sign-up page
└── layout.tsx                          # Wrapped with ClerkProvider

component/layout/
├── Navbar.tsx                          # Updated with UserProfile
├── Sidebar.tsx                         # Updated with SidebarUserInfo
├── UserProfile.tsx                     # NEW: Navbar user component
└── SidebarUserInfo.tsx                 # NEW: Sidebar user component
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public API key from Clerk | ✅ Yes |
| `CLERK_SECRET_KEY` | Secret key from Clerk | ✅ Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page URL | ✅ Yes |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page URL | ✅ Yes |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | ✅ Yes |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up | ✅ Yes |

## Troubleshooting

### Issue: "Missing API Keys"
**Solution:** Make sure `.env.local` file exists and has the correct keys. Restart dev server after adding keys.

### Issue: "Sign-in button not working"
**Solution:** Check that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is added and the dev server is restarted.

### Issue: "User name not showing"
**Solution:** After signing in, the page should refresh. If not, try:
   1. Clear browser cache
   2. Sign out and sign in again
   3. Check browser console for errors

### Issue: "Cannot find module '@clerk/nextjs'"
**Solution:** Run `pnpm install` again to ensure all dependencies are installed.

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to version control
- Keep `CLERK_SECRET_KEY` private
- The `.env.example` file shows the structure (without real keys)

## Next Steps

After setup is complete:

1. ✅ Users can sign in with Google
2. ✅ User names appear in sidebar and navbar
3. ✅ Chat and History pages work with authentication
4. ✅ User data is securely managed by Clerk

## Support

For Clerk documentation, visit: https://clerk.com/docs/references/nextjs/overview

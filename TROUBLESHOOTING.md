# 🔧 ElevenLabs Widget Troubleshooting Guide

## Issue: Chat Bubble Not Appearing on Homepage

### ✅ **Fixed: Widget Added to Homepage**

The issue was that the homepage (`app/page.js`) was not using the `MainLayout` component, so the ElevenLabs widget wasn't included. 

**Solution Applied:**
- Added `ElevenLabsContainer` directly to the homepage
- Widget should now appear in the bottom-right corner

## Issue: Custom Element Registration Error

### ✅ **Fixed: Duplicate Script Loading**

**Error:** `Uncaught NotSupportedError: Failed to execute 'define' on 'CustomElementRegistry': the name "elevenlabs-convai" has already been used with this registry`

**Solution Applied:**
- Created global script loader to prevent duplicate loading
- Added proper cleanup and error handling
- Widget now loads safely without registration conflicts

### 🧪 **How to Test:**

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the homepage:**
   ```
   http://localhost:3000
   ```

3. **Look for the chat bubble:**
   - Should appear in the bottom-right corner
   - Blue circular button with chat icon
   - Click to expand the widget

4. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for these log messages:
     ```
     🎯 ElevenLabsContainer mounted
     Agent ID: agent_8601k3k3ehrte5htsy5jkp79c64h
     🎯 ElevenLabsWidget mounted
     ✅ ElevenLabs widget script loaded successfully
     ```

### 🔍 **If Widget Still Doesn't Appear:**

#### **Check 1: Environment Variables**
Verify your `.env.local` file has the correct values:
```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_8601k3k3ehrte5htsy5jkp79c64h
NEXT_PUBLIC_SUPABASE_URL=https://cpnpmmouaqllhyvhgkjr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### **Check 2: Browser Console Errors**
Look for any JavaScript errors in the console that might prevent the widget from loading.

#### **Check 3: CSS Conflicts**
The widget uses `z-index: 9999` to ensure it appears above other elements. If it's still hidden, there might be CSS conflicts.

#### **Check 4: Network Issues**
Check if the ElevenLabs script is loading:
- Open Network tab in Developer Tools
- Look for: `https://unpkg.com/@elevenlabs/convai-widget-embed`
- Should show as successfully loaded

### 🎯 **Expected Behavior:**

1. **Minimized State (Default):**
   - Blue circular button in bottom-right corner
   - Chat icon inside the button
   - Hover effects (scale up, color change)

2. **Expanded State (After Click):**
   - Full widget with header
   - ElevenLabs chat interface
   - Minimize and expand buttons

3. **Console Logs:**
   - Widget mounting messages
   - Script loading confirmation
   - Event handling logs

### 🚀 **Test the Integration:**

1. **Visit test page:**
   ```
   http://localhost:3000/test-elevenlabs
   ```

2. **Use test buttons:**
   - Test Session Start
   - Test Payment Success
   - Test Full Workflow

3. **Check database:**
   - Verify orders are created in Supabase
   - Check that triggers fire correctly

### 📞 **Still Having Issues?**

If the widget still doesn't appear:

1. **Clear browser cache** and refresh
2. **Try incognito/private mode**
3. **Check for ad blockers** that might block the script
4. **Verify ElevenLabs agent** is active and published
5. **Check network connectivity** to unpkg.com

### 🎉 **Success Indicators:**

- ✅ Blue chat bubble visible in bottom-right corner
- ✅ Console shows widget mounting messages
- ✅ Script loads without errors
- ✅ Widget expands when clicked
- ✅ Test page events work correctly

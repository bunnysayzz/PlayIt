# 🐛 Play It Extension Debugging Guide

## Why the Button Might Not Appear

The "Play It" button might not appear for several reasons:

1. **Page not fully loaded** - IMDb uses dynamic content loading
2. **Button selectors not matching** - IMDb's HTML structure changes frequently
3. **Extension not loaded** - Check if extension is enabled
4. **Content script timing** - Script might run before elements are ready

## 🔍 How to Debug

### Step 1: Check if Extension is Loaded

1. Go to `chrome://extensions/`
2. Make sure PlayIt is **enabled** (toggle switch is blue)
3. Look for any error messages in red

### Step 2: Check Browser Console

1. **Open Developer Tools** (F12 or right-click → Inspect)
2. Go to **Console** tab
3. **Refresh the IMDb page**
4. Look for messages starting with `🎬 PlayIt:` or `🔍 PlayIt:`

You should see messages like:
```
🚀 Play It: Extension initialized
📄 Play It: DOM loaded, waiting for content...
🔍 Play It: Looking for watchlist button...
```

### Step 3: Look for Visual Indicators

After refreshing the page, you should see:
- **Blue indicator** in top-right corner saying "🎬 PlayIt Loaded"
- **Console messages** showing the extension is working

### Step 4: Manual Button Injection

If the button still doesn't appear automatically:

1. **Click the blue indicator** in the top-right corner
2. **Use keyboard shortcut**: Press `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac)
3. Check console for manual injection messages

## 🎯 Expected Console Output

When working correctly, you should see:

```
🚀 Play It: Extension initialized
📄 Play It: DOM loaded, waiting for content...
🔍 Play It: Looking for watchlist button...
✅ Play It: Found watchlist button: [HTMLButtonElement]
🎬 Play It: Created streaming button
✅ Play It: Button injected successfully!
```

## 🚨 Common Issues & Solutions

### Issue: "Extension not detected"
**Solution**: Make sure extension is enabled in `chrome://extensions/`

### Issue: No console messages
**Solution**: Refresh the page and check console again

### Issue: "Could not find watchlist button"
**Solution**: 
1. Wait longer for page to load
2. Use manual injection (Ctrl+Shift+S)
3. Check if you're on a movie/TV show page

### Issue: Button appears but doesn't work
**Solution**: Check if streaming interface files are accessible

## 🔧 Manual Testing

### Test 1: Basic Functionality
1. Go to any IMDb movie page
2. Open console (F12)
3. Look for PlayIt messages
4. Try manual injection (Ctrl+Shift+S)

### Test 2: Button Injection
1. Look for blue "🎬 PlayIt Loaded" indicator
2. Click it to manually inject button
3. Check if "Play It" button appears

### Test 3: Streaming Interface
1. Click "Play It" button
2. Should open streaming interface in new window
3. Test different streaming sources

## 📱 Test URLs

Try these IMDb pages to test:
- **Movie**: https://www.imdb.com/title/tt1727587/
- **TV Show**: https://www.imdb.com/title/tt0944947/
- **Your Batman page**: https://www.imdb.com/title/tt0372784/

## 🆘 Still Not Working?

If you're still having issues:

1. **Check console errors** - Look for red error messages
2. **Verify file structure** - Make sure all files are present
3. **Try different IMDb pages** - Some pages might have different structures
4. **Check extension permissions** - Make sure it can access IMDb
5. **Reinstall extension** - Remove and load again

## 📞 Getting Help

When asking for help, include:
1. **Console output** - Copy all PlayIt messages
2. **Error messages** - Any red error text
3. **IMDb URL** - The page you're testing on
4. **Browser version** - Chrome version number
5. **Extension status** - Enabled/disabled in extensions page

---

**Remember**: The extension needs time to detect and inject the button. If it doesn't work immediately, wait a few seconds and try manual injection! 
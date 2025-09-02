# Play It Chrome Extension - Installation Guide

## What is Play It?

Play It is a Chrome extension that adds a "Play It" button to IMDb movie and TV show pages. When clicked, it opens a streaming interface with multiple sources to watch your favorite content.

## Features

- 🎬 Automatically detects IMDb movie/TV show pages
- 🔍 Adds a "Play It" button above the "Add to Watchlist" button
- 🌐 Opens a streaming interface with multiple sources
- 📱 Responsive design that works on all devices
- 🎭 Supports both movies and TV series with season/episode selection

## Installation Steps

### Method 1: Load Unpacked Extension (Recommended for Development)

1. **Download/Clone the Extension**
   - Download all the files from this repository
   - Extract them to a folder on your computer

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Go to `chrome://extensions/`
   - Or navigate to: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension should now appear in your extensions list

5. **Test the Extension**
   - Go to any IMDb movie or TV show page
   - Look for the "Play It" button above "Add to Watchlist"
   - Click it to open the streaming interface

### Method 2: Create Extension Package

1. **Zip the Extension Files**
   - Select all files in the extension folder
   - Right-click and create a ZIP archive
   - Make sure to zip the files directly, not the folder containing them

2. **Install the ZIP**
   - Go to `chrome://extensions/`
   - Drag and drop the ZIP file onto the extensions page
   - Chrome will automatically install it

## How to Use

1. **Navigate to IMDb**
   - Go to any IMDb movie or TV show page
   - Example: `https://www.imdb.com/title/tt1727587/`

2. **Find the Play Button**
   - Look for the "Play It" button above the "Add to Watchlist" button
   - The button has a blue gradient design with a play icon

3. **Click Play It**
   - Click the "Play It" button
   - A new window will open with the streaming interface

4. **Choose Your Source**
   - Select from multiple streaming providers
   - For TV shows, use the season/episode selectors
   - Enjoy your content!

## File Structure

```
PlayIt/
├── manifest.json          # Extension configuration
├── content.js            # Script that injects button on IMDb
├── content.css           # Styles for the injected button
├── popup.html            # Extension popup interface
├── icons/               # Extension icons
│   ├── PlayIt.png
│   └── icon.svg
├── INSTALLATION.md       # Detailed installation guide
├── DEBUGGING.md         # Troubleshooting guide
├── install.sh           # Installation script
├── LICENSE              # MIT License
└── README.md            # This file```

## Troubleshooting

### Extension Not Working?

1. **Check if it's enabled**
   - Go to `chrome://extensions/`
   - Make sure PlayIt is enabled (toggle switch is blue)

2. **Check for errors**
   - Right-click the extension icon
   - Select "Inspect popup" to see any error messages

3. **Refresh IMDb page**
   - Sometimes the page needs to be refreshed after installing the extension

4. **Check permissions**
   - Make sure the extension has permission to access IMDb

### Button Not Appearing?

1. **Verify you're on the right page**
   - Make sure you're on an IMDb movie/TV show page
   - The URL should look like: `imdb.com/title/tt...`

2. **Wait for page to load**
   - The button is injected after the page fully loads
   - Try refreshing the page

3. **Check browser console**
   - Press F12 to open developer tools
   - Look for any error messages in the Console tab

## Permissions Explained

- **activeTab**: Allows the extension to interact with the current tab
- **storage**: Saves user preferences and settings
- **host_permissions**: Allows access to IMDb and streaming provider websites

## Development

To modify the extension:

1. **Edit the files** in your extension folder
2. **Go to extensions page** (`chrome://extensions/`)
3. **Click the refresh icon** on your extension
4. **Test the changes** on IMDb pages

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify all files are present and properly named
3. Make sure the manifest.json syntax is correct
4. Try reinstalling the extension

## Legal Notice

PlayIt functions as a search engine and does not host, store, or control any video content. All content is embedded from publicly available third-party sources. For any DMCA or copyright infringement claims, please contact the original content hosting site directly.

---

**Version**: 1.0.0  
**Last Updated**: December 2024 
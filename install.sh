#!/bin/bash

# Play It Chrome Extension Installer
# This script helps you install the Play It extension in Chrome

echo "🎬 Play It Chrome Extension Installer"
echo "======================================"
echo ""

# Check if Chrome is installed
if ! command -v google-chrome &> /dev/null && ! command -v google-chrome-stable &> /dev/null; then
    echo "❌ Google Chrome is not installed or not in PATH"
    echo "Please install Google Chrome first: https://www.google.com/chrome/"
    exit 1
fi

echo "✅ Google Chrome detected"
echo ""

# Get the current directory
CURRENT_DIR=$(pwd)
echo "📁 Extension location: $CURRENT_DIR"
echo ""

# Check if all required files exist
REQUIRED_FILES=("manifest.json" "content.js" "content.css" "popup.html")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo "❌ Missing required files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Please make sure you're running this script from the extension directory"
    exit 1
fi

echo "✅ All required files found"
echo ""

echo "📋 Installation Instructions:"
echo "1. Open Google Chrome"
echo "2. Go to: chrome://extensions/"
echo "3. Enable 'Developer mode' (toggle in top-right)"
echo "4. Click 'Load unpacked'"
echo "5. Select this folder: $CURRENT_DIR"
echo "6. The extension should now appear in your extensions list"
echo ""

echo "🔧 After Installation:"
echo "- Pin the extension to your toolbar for easy access"
echo "- Go to any IMDb movie or TV show page"
echo "- Look for the 'Play It' button above 'Add to Watchlist'"
echo "- Click 'Play It' to open the streaming interface"
echo ""

echo "📚 For detailed instructions, see: INSTALLATION.md"
echo ""

# Ask if user wants to open Chrome extensions page
read -p "Would you like to open Chrome extensions page now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v google-chrome &> /dev/null; then
        google-chrome chrome://extensions/
    elif command -v google-chrome-stable &> /dev/null; then
        google-chrome-stable chrome://extensions/
    fi
fi

echo ""
echo "🎉 Installation guide completed!"
echo "Happy streaming! 🍿" 
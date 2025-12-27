# Troubleshooting: Menu Not Loading

## Quick Diagnosis

### Issue #1: Opening file directly (file://)

**Problem**: You opened `menu.html` directly from your file system

**Symptoms**:
- Blank menu area
- Browser console shows error: "Failed to fetch" or "CORS policy"

**Solution**: You MUST use a web server. The menu loads data via fetch(), which requires HTTP.

**How to fix**:
```bash
cd static-site
python3 -m http.server 8080
```

Then open: http://localhost:8080/menu.html

### Issue #2: Browser JavaScript disabled

**Problem**: JavaScript is disabled in your browser

**Symptoms**:
- Blank menu area
- No errors in console

**Solution**: Enable JavaScript in your browser settings

### Issue #3: Browser console errors

**Problem**: JavaScript error preventing menu from loading

**Symptoms**:
- Blank menu area
- Red errors in browser console (F12)

**Solution**:
1. Open browser console (F12 or Cmd+Option+I)
2. Look for red error messages
3. Share the error message for debugging

## Step-by-Step Debugging

### Step 1: Check browser console

1. Open `menu.html` in browser
2. Press F12 (Windows/Linux) or Cmd+Option+I (Mac)
3. Click "Console" tab
4. Look for errors

**What you should see**:
- Nothing (if working correctly)

**What indicates a problem**:
- Red text with "Error"
- "Failed to fetch"
- "Unexpected token"

### Step 2: Check Network tab

1. In browser dev tools (F12)
2. Click "Network" tab
3. Refresh the page
4. Look for `menu.csv`

**What you should see**:
- menu.csv with status 200 (green)

**What indicates a problem**:
- menu.csv with status 404 (red) = file not found
- menu.csv with status 0 or CORS = not using a server

### Step 3: Test with diagnostic page

Open test-menu.html in your browser:
```
http://localhost:8080/test-menu.html
```

This page shows detailed logging of the menu loading process.

## Common Issues and Solutions

### "Failed to fetch" error

**Cause**: Not using a web server

**Fix**:
```bash
# Start server
cd static-site
python3 -m http.server 8080

# Or use PHP
php -S localhost:8080

# Or use Node.js
npx http-server -p 8080
```

### Menu shows "Error loading menu"

**Cause**: CSV file not found or malformed

**Fix**:
1. Check `data/menu.csv` exists
2. Verify CSV is valid (no syntax errors)
3. Check file encoding is UTF-8

### Blank menu, no errors

**Cause**: JavaScript not running

**Fix**:
1. Check JavaScript is enabled
2. Verify main.js is loaded (check Network tab)
3. Look for any console warnings

### Menu shows in wrong language

**Not a bug**: Language is stored in localStorage

**Fix**:
1. Click language flags to switch
2. Or clear localStorage in browser dev tools

## Verify Your Setup

### Check file structure:

```bash
cd static-site
ls -la data/menu.csv
ls -la assets/js/main.js
```

Both files should exist.

### Check CSV file:

```bash
head -n 3 data/menu.csv
```

Should show:
```
id,category_es,category_en,category_de,name_es,name_en,name_de,price1,price2,price3
1,Tapas,Tapas,Tapas,Quesos canarios,Canarian Cheeses,Kanarische Käsesorten,7€,10€,
2,Tapas,Tapas,Tapas,Pata asada,Roasted Leg,Gebratenes Bein,7€,10€,
```

### Test server is running:

```bash
curl http://localhost:8080/data/menu.csv
```

Should show CSV content.

## Still Not Working?

### Collect this information:

1. **Browser and version**: Chrome 120, Firefox 115, Safari 17, etc.
2. **How you're opening the file**:
   - [ ] Double-clicking menu.html
   - [ ] Using python -m http.server
   - [ ] Using other server
   - [ ] Deployed to web server
3. **Console errors**: Copy/paste any red errors from browser console
4. **Network tab**: Screenshot of menu.csv request (or status code)

### Test with different browser:

Try opening in:
- Chrome
- Firefox
- Safari

If it works in one but not another, it's a browser-specific issue.

### Clear browser cache:

1. Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. Clear "Cached images and files"
3. Refresh the page

### Verify JavaScript is working:

Open browser console and type:
```javascript
loadAndRenderMenu()
```

Press Enter. This should load the menu.

## Quick Fix: Use Old Version

If you can't get CSV working, temporarily use the old menu.json:

1. Rename `data/menu.json.old` to `data/menu.json` (if backup exists)
2. Edit `main.js` line 252 to say `./data/menu.json` instead of `./data/menu.csv`

## Need Help?

Provide:
1. Browser console output (F12 → Console tab)
2. Network tab for menu.csv (F12 → Network tab)
3. How you're running the site (file://, server, deployed)

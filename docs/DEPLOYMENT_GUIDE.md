# How to Deploy Your New Static Site

## Option 1: Direct Replacement (Recommended)

Replace the contents of `/docs` with `/static-site`:

```bash
# Backup your current docs folder first
cp -r docs docs.backup

# Remove the old Hugo generated files
rm -rf docs/*

# Copy the new static site
cp -r static-site/* docs/

# Your site is now at /docs with pure HTML/CSS/JS
```

## Option 2: Keep Both Versions

Keep Hugo working while testing the static version:

```bash
# Deploy static site to a subdirectory
mkdir docs/static
cp -r static-site/* docs/static/

# Test at: https://tascalacarambola.com/static/
```

## Option 3: GitHub Pages / Netlify

If you host on GitHub Pages or Netlify:

1. **GitHub Pages**: Push the `/static-site` folder as your root
2. **Netlify**: Set publish directory to `/static-site`

## What Needs to Be Copied

### From your old `/docs` folder to `/static-site`:

```
docs/
├── favicon.ico           → static-site/
├── favicon-32x32.png     → static-site/favicon/
├── favicon-16x16.png     → static-site/favicon/
├── apple-touch-icon.png  → static-site/favicon/
├── pdf/
│   ├── aviso_legal.pdf   → static-site/pdf/
│   └── politica.pdf      → static-site/pdf/
├── images/               → static-site/images/ (if any)
└── fonts/                → static-site/fonts/ (if any)
```

## Testing Before Going Live

### 1. Test locally:
```bash
cd static-site
python3 -m http.server 8000
```

Visit: `http://localhost:8000`

### 2. Check all languages:
- Click on ES, EN, DE flags
- Verify menu loads correctly in each language
- Test mobile view (resize browser)

### 3. Check menu:
- Verify prices display correctly
- Check all categories open/close
- Verify language switching updates menu text

### 4. Check links:
- Click "Reservas" (should go to reservas.tascalacarambola.com)
- Check Google Maps link
- Check social media links
- Check footer links (Aviso Legal, Política de privacidad)

### 5. Check responsive design:
- Test on phone (or emulate in DevTools)
- Test hamburger menu opens/closes
- Check tablet size

## Size Comparison

**Hugo Version**:
- HTML files: multiple with repeated content
- CSS: minified but larger
- Generated files: many

**Static Site Version**:
- index.html: ~5KB
- menu.html: ~4KB
- main.css: ~12KB
- main.js: ~8KB
- menu.json: ~15KB
- **Total: ~44KB** (vs ~100KB+ for Hugo)

## After Deployment

1. **Update DNS/CNAME** if needed (already has CNAME file)
2. **Test from production URL**: https://tascalacarambola.com/
3. **Check Google Search Console** to ensure indexing
4. **Monitor analytics** to ensure traffic flows normally

## If You Need to Rollback

```bash
# You kept the backup, right?
rm -rf docs
cp -r docs.backup docs
```

## Ongoing Maintenance

### To update menu prices:
```
Edit: static-site/data/menu.json
No rebuild needed - just save and refresh browser!
```

### To update opening hours:
```
Edit: assets/js/main.js (search for 'hours' in getTranslation)
or update: static-site/index.html directly
```

### To update contact info:
```
Edit: static-site/index.html
Update: phone, email, address, maps link
```

### To add a new menu category:
```
Edit: static-site/data/menu.json
Add a new object to the categories array with id, names, and items
```

## Advantages of Static Site

✅ **Faster** - No server processing needed
✅ **Cheaper** - Can use free static hosting
✅ **Simpler** - No database or dependencies
✅ **Maintainable** - Edit JSON files directly
✅ **Secure** - No server vulnerabilities
✅ **Portable** - Works anywhere with HTTP server

## Support

If something doesn't work:

1. Check the browser console (F12) for errors
2. Verify all files are in correct locations
3. Make sure menu.json is valid JSON (use jsonlint.com)
4. Check file permissions on your server
5. Clear browser cache (Ctrl+Shift+Delete)

Good luck with your migration! 🚀

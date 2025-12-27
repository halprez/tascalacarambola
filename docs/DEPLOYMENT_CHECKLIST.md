✅ DEPLOYMENT CHECKLIST
=======================

## Pre-Deployment

- [ ] Read `START_HERE.md` in this folder
- [ ] Read `SETUP_STATIC_SITE.md`
- [ ] Tested locally with `python3 -m http.server 8000`
- [ ] All three languages work (ES/EN/DE)
- [ ] Mobile menu opens/closes
- [ ] Menu items load correctly

## Files to Copy from `/docs`

Before deploying, copy these from the old Hugo site:

```bash
# From your old /docs folder, copy:
cp /docs/favicon.ico ./
cp /docs/favicon-*.png ./favicon/
cp /docs/apple-touch-icon.png ./favicon/
cp -r /docs/pdf ./
cp -r /docs/images ./  # (optional but recommended)
cp -r /docs/flags ./   # (optional - if you use custom flags)
```

## Before Going Live

- [ ] favicon.ico exists in root
- [ ] favicon/ folder exists with favicon images
- [ ] pdf/ folder exists with legal documents
- [ ] Tested all languages on mobile
- [ ] Tested all menu categories open/close
- [ ] Tested restaurant name displays correctly
- [ ] Tested contact information is visible
- [ ] "Reservas" button links to correct URL
- [ ] Footer links work (Legal, Privacy)
- [ ] No console errors (F12 → Console)

## Deployment Options

### Option 1: Replace Hugo Site (Recommended)
```bash
# Backup first!
cp -r docs docs.backup

# Clear old files
rm -rf docs/*

# Copy new site
cp -r static-site/* docs/

# Your site is now at /docs
```

### Option 2: Keep Both Versions
```bash
cp -r static-site docs/new-version
# Visit: https://tascalacarambola.com/new-version/
```

### Option 3: Deploy to Subdomain
```bash
cp -r static-site /var/www/new.tascalacarambola.com/
# Update DNS to point new subdomain
```

## After Deployment

- [ ] Site loads at https://tascalacarambola.com
- [ ] Menu page works at https://tascalacarambola.com/menu.html
- [ ] Language switching works
- [ ] Mobile view works
- [ ] All languages display correctly
- [ ] PDFs download correctly
- [ ] "Reservas" button links correctly
- [ ] Google Search Console updated
- [ ] Analytics still tracking
- [ ] CNAME file present

## If Something Breaks

1. **Check browser console** (F12 → Console tab)
2. **Verify all files were copied**:
   ```bash
   ls -la static-site/
   ls -la static-site/data/menu.json
   ls -la static-site/assets/js/main.js
   ```
3. **Validate menu.json**:
   ```bash
   python3 -m json.tool static-site/data/menu.json > /dev/null && echo "Valid JSON"
   ```
4. **Clear browser cache** (Ctrl+Shift+Delete)
5. **Restore backup** if needed:
   ```bash
   rm -rf docs
   cp -r docs.backup docs
   ```

## File Structure on Server

Your server should have:

```
/your-site/
├── index.html                    (8KB)
├── menu.html                     (8KB)
├── favicon.ico                   (copied from /docs)
├── assets/
│   ├── css/main.css             (12KB)
│   └── js/main.js               (8KB)
├── data/
│   ├── menu.json                (32KB)
│   └── translations.json        (4KB)
├── pdf/                          (from /docs)
│   ├── aviso_legal.pdf
│   └── politica.pdf
├── favicon/                      (from /docs)
├── images/                       (optional, from /docs)
└── START_HERE.md                (this folder)
```

## Performance Check

After deployment, verify:
- [ ] Page loads in under 2 seconds
- [ ] Menu JSON loads (check Network tab)
- [ ] No 404 errors in console
- [ ] No mixed content warnings (all HTTP or HTTPS)
- [ ] Images load correctly (if added)

## Updating Menu After Deployment

**To update prices or items:**

1. Edit `data/menu.json` on your server
2. Refresh https://tascalacarambola.com/menu.html
3. Changes appear immediately (no rebuild!)

**To update hours or text:**

1. Edit `assets/js/main.js` (search for "hours")
2. Or edit directly in `index.html`
3. Refresh page

## Rollback Plan

If you need to go back to Hugo:

```bash
# You saved a backup, right?
rm -rf docs
cp -r docs.backup docs
# You're back to the old version
```

## Support & Documentation

- **START_HERE.md** - Quick overview
- **SETUP_STATIC_SITE.md** - Setup instructions
- **README.md** - Complete features & usage
- **MENU_EDITING_GUIDE.md** - How to edit menu
- **DEPLOYMENT_GUIDE.md** - Detailed deployment
- **STATIC_SITE_SUMMARY.md** - Full feature list

## You're All Set! 🎉

Once you've gone through this checklist, you're ready to deploy.

**Key Reminders:**
- ✅ No build process needed
- ✅ No npm or dependencies
- ✅ No Hugo required
- ✅ All files included
- ✅ Works everywhere (cheap hosting is fine)

Good luck! 🚀

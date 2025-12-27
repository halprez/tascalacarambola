# Quick Reference - Static Site Edition

## 🎯 What You Have

A complete replacement for your Hugo site - **no Hugo needed anymore!**

```
/static-site/
├── index.html              (Home page)
├── menu.html               (Menu page)
├── assets/css/main.css     (All styling)
├── assets/js/main.js       (All functionality)
├── data/menu.json          (Menu content)
└── data/translations.json  (Text translations)
```

## 🚀 Deploy in 3 Steps

```bash
# 1. Copy static files
cp docs/favicon.ico static-site/
cp -r docs/pdf static-site/

# 2. Test locally
cd static-site && python3 -m http.server 8000

# 3. Deploy - copy static-site/ to your server
```

## ✏️ Update Menu (Most Common Task)

**File**: `static-site/data/menu.json`

**Change a price**:
```json
"prices": ["7€", "10€"]  // Change to your new prices
```

**Add an item**:
```json
{
  "id": 98,
  "names": {
    "es": "Nuevo plato",
    "en": "New dish",
    "de": "Neues Gericht"
  },
  "prices": ["5€"]
}
```

**Save → Refresh browser → Done!** (No rebuild needed)

## 📝 Update Static Text

**Opening hours / Banner message / etc.**

File: `static-site/assets/js/main.js`

Find the `getTranslation` function and update:
```javascript
'hours': {
  es: 'Your Spanish text',
  en: 'Your English text',
  de: 'Your German text'
}
```

## 🎨 Update Colors/Styling

File: `static-site/assets/css/main.css`

```css
:root {
  --light-background: #fff;      /* Change these */
  --light-color: #222;
  --border-color: #dcdcdc;
  /* ... etc ... */
}
```

## 📱 Responsive Breakpoints

Already handled automatically at:
- 900px (Tablet)
- 684px (Mobile)

## 🌍 Languages

Already supported: **ES**, **EN**, **DE**

To add another language:
1. Add language code to menu.json items
2. Add language to language switcher in HTML
3. Add translations to getTranslation() function

## 🔗 Links to Update

In `index.html`:
- Phone: `href="tel:+34922570891"`
- Email: `href="mailto:tascalacarambola@gmail.com"`
- Maps: `href="https://goo.gl/maps/..."`
- Reservations: points to existing system

## 📊 File Sizes

- main.css: ~13KB
- main.js: ~8KB
- menu.json: ~15KB
- Total (before assets): ~44KB

## 🧪 Testing Checklist

```
□ Test in Chrome, Firefox, Safari
□ Test mobile (resize or use DevTools)
□ Test all languages (ES/EN/DE)
□ Test menu opening/closing
□ Click all links
□ Check prices display correctly
□ Test on actual server
```

## 🔄 Local Development

```bash
cd static-site
python3 -m http.server 8000
# or
npx http-server
# or
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📋 Common Edits

| What | Where | How |
|------|-------|-----|
| Menu prices | menu.json | Change `prices` array |
| Menu items | menu.json | Add/remove/edit items |
| Site title | index.html | Change `<title>` tag |
| Hours | assets/js/main.js | Update `hours` translation |
| Address | index.html | Find `<p>Calle Las Macetas` |
| Contact phone | index.html | Find `+34922570891` |
| Footer links | index.html | Find `<footer>` section |
| Colors | assets/css/main.css | Update CSS variables |

## ⚠️ Common Mistakes

❌ **Forgetting comma** in JSON:
```json
{
  "id": 1
  "names": { }  // ← Missing comma!
}
```

❌ **Invalid JSON**:
- Trailing commas on last item
- Single quotes instead of double
- Unquoted keys

✅ **Validate** at https://jsonlint.com/

## 🆘 If Something Breaks

1. **Check browser console** (F12) for errors
2. **Validate JSON** at jsonlint.com
3. **Check file paths** - are files where they should be?
4. **Clear cache** - Ctrl+Shift+Delete
5. **Check permissions** - can server read files?

## 📖 Full Documentation

- **SETUP_STATIC_SITE.md** - Detailed setup
- **DEPLOYMENT_GUIDE.md** - Deployment options
- **MENU_EDITING_GUIDE.md** - Menu editing details
- **static-site/README.md** - Complete reference

## 💡 Pro Tips

1. **Backup before big changes**: `cp menu.json menu.backup.json`
2. **Version control**: use git to track changes
3. **Test locally first**: before deploying to production
4. **Use a JSON editor**: VS Code has built-in JSON support
5. **Keep translations consistent**: use same terms across languages

## 🎉 Benefits vs Hugo

✅ Faster site (44KB vs 100KB+)
✅ No build process
✅ Edit menu instantly
✅ No dependencies
✅ Easier to understand
✅ Cheaper to host
✅ Easier to maintain

## 🚀 You're Ready!

Everything works as-is. Just:
1. Copy static files
2. Test locally
3. Deploy
4. Enjoy!

No rebuilds. No complexity. Pure HTML/CSS/JS.

---

**Need the full docs?** See the markdown files in the project root.

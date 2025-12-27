# Setup Instructions

## Quick Start

Your new static site is ready in the `/static-site` folder. Follow these steps to deploy it:

### Step 1: Copy Static Assets
Copy these files/folders from `/docs` to `/static-site`:

```bash
# Copy favicon files
cp docs/favicon.ico static-site/
cp -r docs/flags static-site/  # If you have flag icons
cp -r docs/fonts static-site/  # If you have custom fonts

# Copy PDFs
cp -r docs/pdf static-site/

# Copy any images
cp -r docs/images static-site/
```

### Step 2: Update Contact Information
Edit `static-site/index.html` and update:
- Address
- Phone number
- Email
- Google Maps link
- Social media links

### Step 3: Test Locally
```bash
cd static-site
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Step 4: Deploy
Replace your `/docs` folder contents with the `/static-site` folder contents, or update your deployment to point to `/static-site`.

## How to Update Menu Items

1. Open `static-site/data/menu.json`
2. Find the category you want to edit
3. Update item names in each language:
   ```json
   {
     "id": 1,
     "names": {
       "es": "Nombre en español",
       "en": "Name in English",
       "de": "Name auf Deutsch"
     },
     "prices": ["price1", "price2"]
   }
   ```

## How to Update Static Text

Edit `assets/js/main.js` and find the `getTranslation()` function. Update any of these keys:
- `site-title` - Restaurant name
- `site-subtitle` - "Tasca"
- `hours` - Opening hours
- `holiday-message` - Any banner message
- etc.

## Features Implemented

✅ Pure HTML/CSS/JavaScript (no Hugo)
✅ All text and prices from JSON
✅ Multilingual (ES/EN/DE)
✅ Responsive mobile design
✅ Language persistence (localStorage)
✅ Same visual design as original
✅ Fast and lightweight
✅ No external build tools needed

## File Structure

```
static-site/
├── index.html              # Home
├── menu.html               # Menu
├── README.md               # Documentation
├── assets/
│   ├── css/main.css        # All styles
│   └── js/main.js          # All functionality
├── data/
│   └── menu.json           # Menu content
├── pdf/                    # Legal documents
├── favicon/                # Icons
├── images/                 # Optional images
└── fonts/                  # Optional custom fonts
```

## No Additional Setup Required

- No npm install
- No build process
- No server-side code needed
- Just copy and serve!

## Next Steps

1. Copy the static-site folder to your hosting
2. Copy the favicon/pdf/images from docs
3. Update contact info in index.html
4. Test all languages and mobile view
5. Deploy!

Questions? Refer to README.md in the static-site folder.

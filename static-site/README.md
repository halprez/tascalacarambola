# Static Site Version - La Carambola

This is a pure HTML/CSS/JavaScript version of the La Carambola website that replaces Hugo while keeping the same design.

## Structure

```
static-site/
├── index.html              # Home page
├── menu.html               # Menu page
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet (responsive, light/dark mode support)
│   └── js/
│       └── main.js         # Main JavaScript (language switching, menu rendering)
├── data/
│   └── menu.json           # Menu data with multilingual support
├── pdf/                    # PDF files (aviso legal, política de privacidad)
├── favicon/                # Favicon files
└── README.md               # This file
```

## Features

- **Pure HTML/CSS/JavaScript** - No build tools or frameworks required
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Multilingual Support** - Spanish (es), English (en), and German (de)
- **JSON-driven Menu** - All menu items and prices are stored in `data/menu.json`
- **Language Persistence** - Language preference is saved in localStorage
- **Mobile Menu** - Hamburger menu for mobile devices
- **Dark Mode Ready** - CSS variables support theme switching

## Files Explanation

### index.html
The home page with:
- Restaurant info and hours
- Contact information
- Links to reservations
- Language switcher

### menu.html
The menu page with:
- Dynamically rendered menu from JSON
- Collapsible categories
- Responsive tables

### assets/css/main.css
- Complete styling matching the Hugo theme
- CSS variables for colors and sizing
- Media queries for responsive design
- Light and dark mode support (via `data-theme="dark"`)

### assets/js/main.js
- Language switching functionality
- Menu rendering from JSON
- i18n (internationalization) support
- Mobile menu toggle
- localStorage persistence for language preference

### data/menu.json
Menu structure with:
- Categories (Tapas, Ensaladas, etc.)
- Items with multilingual names
- Price information

## How to Use

### 1. Deploy to Your Server
Simply copy the `static-site` folder to your web server. It requires no build process or server-side rendering.

### 2. Add Missing Assets
Copy these files from your original `/docs` folder:
- `favicon.ico` and favicon files → `static-site/favicon/`
- `pdf/` folder → `static-site/pdf/`
- `images/` folder → `static-site/images/` (if needed)

### 3. Update Menu Items
Edit `data/menu.json` to modify menu items, prices, or add/remove items:

```json
{
  "id": 1,
  "names": {
    "es": "Quesos canarios",
    "en": "Canarian Cheeses",
    "de": "Kanarische Käsesorten"
  },
  "prices": ["7€", "10€"]
}
```

### 4. Update Site Content
Edit the i18n keys in `assets/js/main.js` to change static text like hours, titles, etc.

## Language Switching

The site automatically:
1. Checks for saved language preference in localStorage
2. Falls back to Spanish if no preference is saved
3. Allows users to switch languages via flag buttons

To add more languages:
1. Add the language code (e.g., `fr` for French) to the options in `assets/js/main.js`
2. Add translations to all `names` objects in `data/menu.json`
3. Update translation keys in the `getTranslation()` function

## Mobile Responsiveness

The site is fully responsive with breakpoints at:
- **900px** (tablet)
- **684px** (phone)

Menu items, header, and content automatically adjust for smaller screens.

## Customization

### Colors
Edit the CSS variables in `main.css` to change colors:

```css
:root {
  --light-background: #fff;
  --light-color: #222;
  --border-color: #dcdcdc;
  /* ... more colors ... */
}
```

### Fonts
The site uses:
- `Fira Code` for body text
- `Special Elite` for decorative text
- `Sacramento` for cursive text

Change these in the `@import` statements in `main.css`.

### Dark Mode
To enable dark mode, add `data-theme="dark"` to the `<html>` tag or toggle with JavaScript.

## Contact Info
Update the contact information in `index.html`:
- Address
- Phone number
- Email
- Google Maps link

## Social Media
Add your social media links in the "Síguenos" section of `index.html`.

## Performance

- **No external dependencies** - Everything is self-contained
- **Fast loading** - Minimal CSS and JS
- **SEO friendly** - Proper meta tags and semantic HTML
- **Small file size** - JSON menu can be cached by browsers

## Browser Support

Works on all modern browsers:
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile Safari (iOS 12+)

## Migration from Hugo

1. Copy the `static-site` folder to replace `/docs`
2. Update your CNAME file (already there)
3. Copy favicon and PDF files
4. Update any custom colors or translations
5. Test thoroughly before deploying to production

## Local Testing

To test locally, use a simple HTTP server:

```bash
cd static-site
python3 -m http.server 8000
# or
npx http-server
# or
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Notes

- The site preserves the exact visual style of your Hugo version
- All content can be managed through JSON files
- No database or CMS required
- Fully static - can be hosted anywhere
- Fast and lightweight

## Support

For questions or issues, refer to:
- Check that all files are in the correct locations
- Verify that `data/menu.json` is valid JSON
- Check browser console for any JavaScript errors
- Ensure favicon files exist in the `/favicon` folder

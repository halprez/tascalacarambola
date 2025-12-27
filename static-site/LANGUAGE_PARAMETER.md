# Language Parameter - Reservation System Integration

## Overview

The reservation page automatically passes the selected language to the booking system via URL parameter.

## How It Works

When users visit the reservations page, the iframe automatically loads with the current language:

```
Spanish:  https://reservas.tascalacarambola.com?lang=es
English:  https://reservas.tascalacarambola.com?lang=en
German:   https://reservas.tascalacarambola.com?lang=de
```

## Implementation

### 1. Initial Load
- Gets language from localStorage (default: 'es')
- Sets iframe src with `?lang=` parameter
- Updates fallback link with same parameter

### 2. Language Switching
- When user changes language on your site
- Iframe URL updates automatically
- Booking system reloads with new language

### 3. Code Location
File: `reservas.html`

```javascript
function updateIframeLanguage() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'es';
    const baseUrl = 'https://reservas.tascalacarambola.com';
    const urlWithLang = `${baseUrl}?lang=${currentLang}`;

    // Update iframe and fallback link
    iframe.src = urlWithLang;
    fallbackLink.href = urlWithLang;
}
```

## Booking System Integration

### If the booking system supports `?lang=` parameter:
✅ It will automatically switch to the selected language
✅ User experience is seamless
✅ No extra configuration needed

### If the booking system doesn't support it:
- Parameter is safely ignored
- Booking system uses its default language
- No errors or issues
- You can ask the booking provider to add support

## Common URL Parameters

Different booking systems use different parameter names. You may need to adjust:

```javascript
// Current implementation
?lang=es

// Alternative formats if needed:
?language=es
?locale=es
?lng=es
?l=es
```

To change the parameter name, edit line 210 in `reservas.html`:
```javascript
const urlWithLang = `${baseUrl}?lang=${currentLang}`;
//                                   ^^^^
//                          Change this if needed
```

## Language Codes

The system passes these ISO 639-1 language codes:
- `es` - Spanish (Español)
- `en` - English
- `de` - German (Deutsch)

## Testing

### Test if language parameter works:

1. **Open reservas.html**
2. **Check browser console (F12)**
3. **Run**:
   ```javascript
   document.getElementById('reservas-iframe').src
   ```
4. **Should show**:
   ```
   https://reservas.tascalacarambola.com?lang=es
   ```

5. **Switch language** (click flag button)
6. **Check again** - should update to new language

### Test with booking system:

1. Open: https://tascalacarambola.com/reservas.html
2. Switch language to German
3. Check if booking form appears in German
4. If yes: ✅ Working!
5. If no: Contact booking system provider

## Troubleshooting

### Language doesn't change in booking system

**Cause**: Booking system doesn't recognize `?lang=` parameter

**Solution**: Contact your booking system provider and ask:
- "What URL parameter does your system use for language?"
- Provide them with: `?lang=es`, `?lang=en`, `?lang=de`
- Ask them to add support or tell you the correct parameter name

### Iframe reloads when switching language

**Expected**: Yes, the iframe must reload to pass the new language

**Impact**: User loses any form data they entered

**Workaround**: Recommend users select language BEFORE starting booking

### Fallback link doesn't include language

**Check**: Line 216-218 in reservas.html should update fallback link

**Verify**:
```javascript
document.getElementById('fallback-link').href
```

## Alternative: Multiple Booking URLs

If the booking system has separate URLs per language:

```javascript
function updateIframeLanguage() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'es';
    const urls = {
        es: 'https://reservas.tascalacarambola.com/es',
        en: 'https://reservas.tascalacarambola.com/en',
        de: 'https://reservas.tascalacarambola.com/de'
    };

    iframe.src = urls[currentLang] || urls['es'];
}
```

## Benefits

✅ Better user experience - booking in their language
✅ Reduced confusion - consistent language across site
✅ Fewer booking errors - users understand form better
✅ International friendly - supports all 3 site languages

## Summary

The reservation iframe automatically receives the selected language via `?lang=` URL parameter. Whether it uses it depends on the booking system configuration. The parameter is safe to send and will be ignored if not supported.

---

**Implemented**: 2025-12-27
**Parameter**: `?lang={es|en|de}`
**Status**: Ready to test with booking system

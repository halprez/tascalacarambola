# Reservations Page - Iframe Implementation

## Overview

The reservations page (`reservas.html`) embeds the external reservation system (https://reservas.tascalacarambola.com) using an iframe, making it appear as part of your website.

## How It Works

### Structure
```
Your Site                    External Site
┌────────────────────┐
│ Header (sticky)    │
├────────────────────┤
│ ┌────────────────┐ │      ┌──────────────────┐
│ │                │ │◄─────┤ reservas.tasca.. │
│ │   <iframe>     │ │      └──────────────────┘
│ │                │ │
│ └────────────────┘ │
└────────────────────┘
```

### Features
1. **Seamless Integration**: Looks like part of your site
2. **Full Height**: Iframe takes full viewport height minus header
3. **Loading State**: Shows spinner while loading
4. **Fallback**: If iframe fails, shows link to external site
5. **Sticky Header**: Your navigation stays visible

## Files Created/Modified

### Created
- `reservas.html` - New reservations page with iframe

### Modified
- `index.html` - Link now points to `./reservas.html`
- `menu.html` - Link now points to `./reservas.html`
- `assets/js/main.js` - Added "loading" translation

## Potential Issues

### Issue #1: X-Frame-Options Header

**Problem**: The external site might block iframe embedding with headers like:
```
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'none'
```

**Symptoms**:
- Blank iframe
- Console error: "Refused to display in a frame"
- Fallback message appears

**Solution**:
If the external site blocks iframe embedding, you have two options:

1. **Keep external link** (revert to original):
   - Change links back to `https://reservas.tascalacarambola.com`
   - Users will leave your site to make reservations

2. **Ask site owner to allow embedding**:
   - Contact the reservations system provider
   - Ask them to add your domain to their allowed frame-ancestors:
     ```
     Content-Security-Policy: frame-ancestors 'self' https://tascalacarambola.com
     ```

### Issue #2: Mobile Responsiveness

**Status**: Handled automatically

The iframe is responsive and will adjust to mobile screens. The external site should also be mobile-friendly.

### Issue #3: HTTPS Required

**Important**: Your site MUST be served over HTTPS to embed an HTTPS iframe.

- ✅ Works: `https://tascalacarambola.com` → `https://reservas.tascalacarambola.com`
- ❌ Fails: `http://tascalacarambola.com` → `https://reservas.tascalacarambola.com`

## Testing

### Test if iframe works:

1. **Open reservas.html in browser**
2. **Check for one of these outcomes**:

   **✅ Success**:
   - Reservation system loads inside the page
   - No console errors
   - Can interact with the form

   **❌ Blocked**:
   - Blank white area
   - Console error (F12): "Refused to display"
   - Fallback link appears after 5 seconds

### Manual Test

Open browser console (F12) and check for errors:

```javascript
// If you see this error, iframe is blocked:
Refused to display 'https://reservas.tascalacarambola.com/' in a frame because it set 'X-Frame-Options' to 'deny'.
```

## Fallback Behavior

If the iframe fails to load:

1. **Loading spinner** shows for 5 seconds
2. **Timeout triggers** fallback
3. **Fallback message** appears with external link
4. **User clicks** "Ir a Reservas →" button
5. **Opens** reservation site in new tab

## Customization

### Adjust iframe height:

In `reservas.html`, change:
```css
.iframe-container {
    height: calc(100vh - 60px); /* 60px = header height */
}
```

### Change timeout duration:

In `reservas.html`, change:
```javascript
setTimeout(function() {
    // ... fallback code
}, 5000); // 5000ms = 5 seconds
```

### Disable fallback:

Remove the timeout code entirely (not recommended):
```javascript
// Delete or comment out this entire block:
setTimeout(function() { ... }, 5000);
```

## Security Considerations

### Safe Attributes Used:

```html
<iframe
    src="https://reservas.tascalacarambola.com"
    title="Sistema de Reservas"
    allow="geolocation; payment"
    loading="eager">
</iframe>
```

- ✅ `https://` - Secure connection
- ✅ `title` - Accessibility
- ✅ `allow` - Only necessary permissions
- ✅ `loading="eager"` - Load immediately

### Not Using:
- ❌ `sandbox` - Would break functionality
- ❌ `srcdoc` - Not needed
- ❌ `referrerpolicy` - Default is fine

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

Requires:
- JavaScript enabled (for fallback detection)
- Cookies enabled (for reservation system)

## Alternatives

If iframe doesn't work, consider:

### Option 1: Subdomain Proxy
Set up a reverse proxy on your server:
```
https://tascalacarambola.com/reservas/ → https://reservas.tascalacarambola.com
```
More complex, requires server configuration.

### Option 2: Direct Link (Current Fallback)
Simple, reliable, but users leave your site:
```html
<a href="https://reservas.tascalacarambola.com">Reservas</a>
```

### Option 3: Build Your Own
Integrate reservation system directly into your site.
Most complex, requires development.

## Monitoring

### Check if iframe works in production:

1. Deploy to your server
2. Visit: https://tascalacarambola.com/reservas.html
3. Open browser console (F12)
4. Look for errors

### Analytics

Track if users are seeing fallback:

```javascript
// Add to reservas.html if using Google Analytics
if (!iframeLoaded) {
    gtag('event', 'iframe_blocked', {
        'event_category': 'Reservations',
        'event_label': 'Iframe Fallback Shown'
    });
}
```

## Troubleshooting

### Iframe shows but is unresponsive

**Cause**: JavaScript in iframe might be blocked

**Solution**: Check browser console for errors

### Iframe shows wrong content

**Cause**: URL might be incorrect

**Solution**: Verify `src` attribute in iframe tag

### Iframe is too small/large

**Cause**: Height calculation issue

**Solution**: Adjust `.iframe-container` height in CSS

### Header overlaps iframe

**Cause**: z-index issue

**Solution**: Ensure header has higher z-index (already set to 1000)

## Summary

The iframe implementation:
- ✅ Makes external site appear integrated
- ✅ Maintains your site's navigation
- ✅ Has automatic fallback if blocked
- ✅ Works on mobile
- ⚠️ May not work if external site blocks embedding

**Next Step**: Test on your live site to see if the external reservation system allows iframe embedding.

---

**Created**: 2025-12-27
**Status**: Ready for testing

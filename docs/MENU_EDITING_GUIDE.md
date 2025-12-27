# Menu Editing Guide - CSV Edition

## Overview

Your menu is now stored in a **CSV file** that you can edit in **Excel, Google Sheets, or any spreadsheet program**!

**File Location**: `static-site/data/menu.csv`

**No more Hugo rebuilds!** Just edit the CSV and refresh your browser.

## Why CSV?

- ✅ Edit in Excel or Google Sheets - familiar interface
- ✅ No JSON syntax errors (commas, quotes, brackets)
- ✅ Easy bulk updates (sort, filter, find/replace)
- ✅ Copy/paste from other spreadsheets
- ✅ No risk of breaking the website with syntax mistakes

## CSV Structure

The menu.csv file has these columns:

| Column | Description | Example |
|--------|-------------|---------|
| `id` | Unique item number | `1`, `2`, `3` |
| `category_es` | Category name in Spanish | `Tapas` |
| `category_en` | Category name in English | `Tapas` |
| `category_de` | Category name in German | `Tapas` |
| `name_es` | Item name in Spanish | `Quesos canarios` |
| `name_en` | Item name in English | `Canarian Cheeses` |
| `name_de` | Item name in German | `Kanarische Käsesorten` |
| `price1` | First price | `7€` |
| `price2` | Second price (optional) | `10€` |
| `price3` | Third price (optional) | *(empty)* |

## Current Categories

1. **Tapas** - Tapas
2. **Ensaladas** - Salads / Salate
3. **Tortillas y revueltos** - Omelets and Scrambled / Omeletts und Rühreier
4. **Carne y pescado** - Meat and Fish / Fleisch und Fisch
5. **Vinos Tintos** - Red Wines / Rotweine
6. **Vinos Blancos** - White Wines / Weißweine
7. **Cervezas** - Beers / Biere
8. **Otras bebidas** - Other Beverages / Andere Getränke
9. **Postres y cafés** - Desserts and Coffees / Desserts und Kaffee

## How to Edit in Excel / Google Sheets

### Method 1: Google Sheets (Recommended)

1. **Upload the file**:
   - Go to Google Sheets
   - File → Import → Upload → `menu.csv`
   - Choose "Replace current sheet"

2. **Edit your menu**:
   - Update prices, names, add/remove rows
   - Use filters, sorting, find/replace as needed

3. **Download as CSV**:
   - File → Download → Comma Separated Values (.csv)
   - Save as `menu.csv`

4. **Upload to your server**:
   - Replace the old `menu.csv` with the new one
   - Refresh your website - changes appear immediately!

### Method 2: Microsoft Excel

1. **Open in Excel**:
   - Right-click `menu.csv` → Open With → Excel
   - Or drag it into Excel

2. **Edit your menu**:
   - Make your changes

3. **Save as CSV**:
   - File → Save As
   - Format: **CSV UTF-8 (Comma delimited) (.csv)**
   - **IMPORTANT**: Choose UTF-8 to preserve special characters (€, ñ, á, etc.)

4. **Upload to server**

### Method 3: LibreOffice Calc

1. Open `menu.csv` in LibreOffice Calc
2. When asked, select:
   - Character set: **UTF-8**
   - Separator: **Comma**
3. Edit your menu
4. Save as CSV (UTF-8)

## Common Editing Tasks

### 1. Update a Price

1. Find the row with the item you want to update
2. Change the value in `price1`, `price2`, or `price3`
3. Save the file

**Example**: Update "Quesos canarios" from 7€/10€ to 8€/11€

| id | name_es | price1 | price2 |
|----|---------|--------|--------|
| 1  | Quesos canarios | ~~7€~~ **8€** | ~~10€~~ **11€** |

### 2. Add a New Item

1. Insert a new row at the end of the category
2. Fill in all columns:
   - Choose a unique `id` number
   - Fill category names (copy from rows above)
   - Fill item names in all 3 languages
   - Add prices

**Example**: Add "Patatas bravas" to Tapas

| id | category_es | category_en | category_de | name_es | name_en | name_de | price1 | price2 |
|----|-------------|-------------|-------------|---------|---------|---------|--------|--------|
| 16 | Tapas | Tapas | Tapas | Patatas bravas | Spicy Potatoes | Scharfe Kartoffeln | 5€ | 8€ |

### 3. Remove an Item

1. Find the row
2. Delete the entire row
3. Save

### 4. Change Item Order

Items appear in the order they are in the CSV file. Simply:
1. Cut the row you want to move
2. Paste it in the new position
3. Save

### 5. Add a New Category

1. Add rows with the new category name
2. Make sure all items in that category have the same category names

**Example**: Add "Bebidas calientes" (Hot Drinks)

| id | category_es | category_en | category_de | name_es | name_en | name_de | price1 |
|----|-------------|-------------|-------------|---------|---------|---------|--------|
| 100 | Bebidas calientes | Hot Drinks | Heiße Getränke | Chocolate caliente | Hot Chocolate | Heiße Schokolade | 3€ |

### 6. Bulk Price Update

Use Excel/Sheets features:

**Increase all prices by 10%**:
1. Select the price columns (price1, price2, price3)
2. Find/Replace: `€` → *(empty)* (removes € signs)
3. Select cells → multiply by 1.1
4. Find/Replace: add `€` back to each price

**Or use formulas in a temporary column**, then copy values back.

## Price Format Examples

| Type | price1 | price2 | price3 | Description |
|------|--------|--------|--------|-------------|
| Single price | `5€` | *(empty)* | *(empty)* | One price only |
| Half/Full | `7€` | `10€` | *(empty)* | Two portions |
| Per unit | `3.00€/u` | *(empty)* | *(empty)* | Per unit pricing |
| Glass/Bottle | `copa 2.50€` | `12€` | *(empty)* | Wine by glass or bottle |
| Bulk options | `1/4 3€` | `1/2 5€` | *(empty)* | Different quantities |
| Beer taps | `caña 2€` | `1906 3.50€` | *(empty)* | Different tap options |

## Important Notes

### Special Characters

If an item name contains **commas**, Excel/Sheets will automatically add quotes:

**Example**:
```
18,Ensaladas,Salads,Salate,Ensalada de tomate boquerones y aguacate,"Tomato, Anchovy and Avocado Salad","Tomaten-, Sardellen- und Avocado-Salat",10€,,
```

This is normal and correct! The website will handle it properly.

### Empty Cells

If an item has only 1 or 2 prices, leave `price3` or `price2` empty. Just move to the next column without entering anything.

### Consistent Categories

All items in the same category must have **identical** category names across all 3 languages. Copy/paste from existing rows to ensure consistency.

## Editing Tips

### 1. Use Filters

In Excel/Sheets, enable filters to:
- View only one category at a time
- Find items easily
- Sort by price

### 2. Keep Backups

Before major changes:
```bash
cp data/menu.csv data/menu.backup.csv
```

Or use "Save As" with a different name: `menu-backup-2025-01-15.csv`

### 3. Validate Before Uploading

- Check that all rows have category names
- Check that all rows have names in ES, EN, DE
- Check that prices end with `€`
- Check that id numbers are unique

### 4. Use Find/Replace Carefully

Excel's Find/Replace is powerful but be careful:
- Always "Find All" first to preview changes
- Use "Match entire cell contents" when appropriate
- Test on a copy first

## Common Mistakes to Avoid

### ❌ WRONG: Mixed category spellings
```
1,Tapas,Tapas,Tapas,...
2,Tapa,Tapas,Tapas,...  ← Typo in Spanish category
```

### ✅ CORRECT: Consistent category names
```
1,Tapas,Tapas,Tapas,...
2,Tapas,Tapas,Tapas,...
```

### ❌ WRONG: Missing translations
```
15,Tapas,Tapas,Tapas,Papas arrugadas,,,5€,8€,
                                    ↑↑↑ Missing EN and DE
```

### ✅ CORRECT: All languages filled
```
15,Tapas,Tapas,Tapas,Papas arrugadas,Wrinkled Potatoes,Schrumpelige Kartoffeln,5€,8€,
```

## How It Works

1. You edit `menu.csv` in Excel/Sheets
2. You upload `menu.csv` to your server
3. The website loads the CSV file
4. JavaScript parses it and renders the menu
5. Language switching works automatically

**No build process. No compilation. Just upload and go!**

## Testing Locally

Want to test before uploading? Start a local server:

```bash
cd static-site
python3 -m http.server 8080
```

Then open: `http://localhost:8080/menu.html`

## Emergency: Revert Changes

If you make a mistake:

1. **Use your backup**:
   ```bash
   cp data/menu.backup.csv data/menu.csv
   ```

2. **Or restore from Git** (if version controlled):
   ```bash
   git checkout data/menu.csv
   ```

## Static Text Changes

For non-menu content (hours, contact info, etc.), those are still in `translations.json` or hardcoded in the HTML files. The menu items are the only thing in CSV.

## File Structure

```
static-site/
├── index.html
├── menu.html
├── data/
│   ├── menu.csv              ← EDIT THIS IN EXCEL/SHEETS
│   └── translations.json      ← UI text (hours, buttons, etc.)
├── assets/
│   ├── css/main.css
│   └── js/main.js            ← Loads and parses the CSV
└── ...
```

## Quick Reference

| Task | How To |
|------|--------|
| Update price | Find row → Change price cell → Save |
| Add item | Insert row → Fill all columns → Save |
| Remove item | Delete row → Save |
| Reorder items | Cut/paste rows → Save |
| New category | Add rows with new category name → Save |
| Bulk price change | Use Excel formulas or Find/Replace |
| Upload changes | Replace menu.csv on server |

## Summary

The CSV system makes menu editing **as easy as using a spreadsheet**. No more worrying about JSON syntax, no more build processes. Just open, edit, save, upload!

**Questions?** Open the `menu.csv` file in Excel/Sheets and you'll see how straightforward it is.

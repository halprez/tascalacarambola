// Language management
let currentLanguage = localStorage.getItem('selectedLanguage') || 'es';

// Theme management
let currentTheme = localStorage.getItem('selectedTheme') || 'dark';

// Translations cache
let translationsData = null;

// Initialize language on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    setLanguage(currentLanguage);
    setTheme(currentTheme);
    setupLanguageSwitcher();
    setupThemeToggle();
});

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('./data/translations.json');
        const data = await response.json();
        translationsData = data.translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        translationsData = {}; // Fallback to empty object
    }
}

function setLanguage(lang) {
    if (['es', 'en', 'de'].includes(lang)) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        updatePageLanguage();

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update language flags/buttons
        document.querySelectorAll('[data-lang-button]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langButton === lang);
        });
    }
}

function setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
        currentTheme = theme;
        localStorage.setItem('selectedTheme', theme);

        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Trigger any language-specific updates
    if (window.onLanguageChange) {
        window.onLanguageChange(currentLanguage);
    }
}

function setupLanguageSwitcher() {
    const flags = {
        es: { name: 'Español', flag: 'es' },
        en: { name: 'English', flag: 'gb' },
        de: { name: 'Deutsch', flag: 'de' }
    };

    const switcher = document.getElementById('language-switcher');
    if (!switcher) return;

    const menuHtml = Object.entries(flags)
        .map(([lang, { name, flag }]) =>
            `<a href="#" data-lang-button="${lang}" class="lang-btn ${lang === currentLanguage ? 'active' : ''}">
        <span class="flag fi fi-${flag}"></span>
      </a>`
        )
        .join('');

    switcher.innerHTML = menuHtml;

    // Add event listeners
    document.querySelectorAll('[data-lang-button]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // On mobile (when other buttons are hidden), toggle dropdown
            if (window.innerWidth <= 684) {
                if (btn.classList.contains('active')) {
                    // Toggle the dropdown
                    switcher.classList.toggle('open');
                } else {
                    // Select language and close dropdown
                    setLanguage(btn.dataset.langButton);
                    switcher.classList.remove('open');
                }
            } else {
                setLanguage(btn.dataset.langButton);
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 684 && !switcher.contains(e.target)) {
            switcher.classList.remove('open');
        }
    });
}

function getTranslation(key) {
    if (!translationsData) {
        return ''; // Not loaded yet
    }

    if (translationsData[key] && translationsData[key][currentLanguage]) {
        return translationsData[key][currentLanguage];
    }
    return '';
}

// Simple CSV parser
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        return row;
    });
}

// Handle CSV line parsing with proper quote handling
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current); // Add last value
    return values;
}

// Convert CSV data to menu structure
function csvToMenuStructure(csvData) {
    const categoriesMap = new Map();

    csvData.forEach(row => {
        const categoryKey = row.category_es.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/ñ/g, 'n')
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u');

        if (!categoriesMap.has(categoryKey)) {
            categoriesMap.set(categoryKey, {
                id: categoryKey,
                names: {
                    es: row.category_es,
                    en: row.category_en,
                    de: row.category_de
                },
                items: []
            });
        }

        const prices = [row.price1, row.price2, row.price3].filter(p => p && p.trim() !== '');

        categoriesMap.get(categoryKey).items.push({
            id: parseInt(row.id),
            names: {
                es: row.name_es,
                en: row.name_en,
                de: row.name_de
            },
            prices: prices
        });
    });

    return Array.from(categoriesMap.values());
}

function loadAndRenderMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    fetch('./data/menu.csv')
        .then(response => response.text())
        .then(csvText => {
            const csvData = parseCSV(csvText);
            const categories = csvToMenuStructure(csvData);
            menuContainer.innerHTML = renderMenuNavigation(categories) + renderMenu(categories);
        })
        .catch(error => {
            console.error('Error loading menu:', error);
            menuContainer.innerHTML = '<p>Error loading menu</p>';
        });
}

function renderMenuNavigation(categories) {
    return `
    <nav class="menu-navigation">
      <ul class="menu-nav-list">
        ${categories.map(category => `
          <li>
            <a href="#${category.id}" class="menu-nav-link">
              ${getLocalizedName(category.names)}
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

function renderMenu(categories) {
    return categories.map(category => `
    <section id="${category.id}" class="menu-category">
      <h3 class="category-title">${getLocalizedName(category.names)}</h3>
      <table class="menu-table">
        <thead>
          <tr>
            <th style="text-align: center">#</th>
            <th style="text-align: center">${getTableHeaderLabel(category.id)}</th>
            <th style="text-align: center">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${category.items.map(item => `
            <tr>
              <td>${item.id}</td>
              <td>${getLocalizedName(item.names)}</td>
              <td style="text-align: right">${item.prices.join(' / ')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `).join('');
}

function getLocalizedName(names) {
    return names[currentLanguage] || names['es'];
}

function getTableHeaderLabel(categoryId) {
    const labels = {
        'tapas': {
            es: 'Plato',
            en: 'Dish',
            de: 'Gericht'
        },
        'vinos-tintos': {
            es: 'Producto',
            en: 'Product',
            de: 'Produkt'
        },
        'vinos-blancos': {
            es: 'Producto',
            en: 'Product',
            de: 'Produkt'
        },
        'cervezas': {
            es: 'Producto',
            en: 'Product',
            de: 'Produkt'
        },
        'otras-bebidas': {
            es: 'Producto',
            en: 'Product',
            de: 'Produkt'
        },
        'postres-cafes': {
            es: 'Producto',
            en: 'Product',
            de: 'Produkt'
        }
    };

    const label = labels[categoryId] || {
        es: 'Plato',
        en: 'Dish',
        de: 'Gericht'
    };

    return label[currentLanguage] || label['es'];
}

// Set callback for menu page
window.onLanguageChange = (lang) => {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer && menuContainer.innerHTML) {
        // Re-render menu with new language
        loadAndRenderMenu();
    }
};

// Active section highlighting for menu navigation
function initMenuScrollSpy() {
    const sections = document.querySelectorAll('.menu-category');
    const navLinks = document.querySelectorAll('.menu-nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-140px 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// Adjust font size for menu items that wrap to multiple lines
function adjustMenuItemFontSizes() {
    const menuItems = document.querySelectorAll('.menu-table tbody td:nth-child(2)');

    menuItems.forEach(item => {
        // Reset font size first
        item.style.fontSize = '';

        // Check if text is wrapping (height > single line height)
        const lineHeight = parseFloat(window.getComputedStyle(item).lineHeight);
        const actualHeight = item.clientHeight;

        // If height is greater than one line, reduce font size
        if (actualHeight > lineHeight * 1.5) {
            let fontSize = parseFloat(window.getComputedStyle(item).fontSize);

            // Reduce font size until it fits in one line or reaches minimum
            while (item.clientHeight > lineHeight * 1.5 && fontSize > 10) {
                fontSize -= 0.5;
                item.style.fontSize = fontSize + 'px';
            }
        }
    });
}

// Call on window resize
window.addEventListener('resize', adjustMenuItemFontSizes);

// Initialize scroll spy and font adjustment after menu loads
const originalLoadAndRenderMenu = loadAndRenderMenu;
loadAndRenderMenu = function() {
    originalLoadAndRenderMenu();
    // Wait for DOM to update
    setTimeout(() => {
        initMenuScrollSpy();
        adjustMenuItemFontSizes();
    }, 100);
};

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.querySelector('.menu-trigger');
    const menu = document.querySelector('.menu');

    if (menuTrigger && menu) {
        menuTrigger.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuTrigger.classList.toggle('active');
        });
    }
});

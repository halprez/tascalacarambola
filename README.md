# Tasca La Carambola

Sitio web del restaurante [Tasca La Carambola](https://tascalacarambola.com) en El Sauzal, Tenerife.

## Stack

Sitio estático puro: HTML + CSS + JavaScript vanilla. Sin build, sin dependencias.

- `index.html`, `menu.html`, `reservas.html`, `404.html`
- `assets/css/main.css` — estilos
- `assets/js/main.js` — i18n, theme toggle, render del menú desde CSV
- `data/menu.csv` — datos del menú (editable)
- `data/translations.json` — textos i18n (ES/EN/DE)

## Ejecutar localmente

```bash
python3 -m http.server 8000
```

Abrir <http://localhost:8000>.

## Editar contenido

- **Menú (precios, platos):** editar `data/menu.csv`. Columnas: `id, category_es, category_en, category_de, name_es, name_en, name_de, price1, price2, price3`.
- **Textos del sitio (i18n):** editar `data/translations.json`. Cada clave tiene traducción `es/en/de`.
- **Mensaje del banner (vacaciones, avisos):** editar la clave `banner-message` en `data/translations.json`. Si está vacía no se muestra.

## i18n

Implementado en cliente con `data-i18n="<clave>"` en HTML. El idioma activo se guarda en `localStorage`. URL única para los tres idiomas.

## Despliegue

GitHub Pages, rama `tlc3.0`, source = `/ (root)`. Dominio personalizado en `CNAME`.

`/docs` contiene un snapshot del deploy anterior; se conserva como fallback. Para revertir, en GitHub repo settings → Pages, cambiar el source folder a `/docs`.

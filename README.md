# hrafsa.github.io

Portfolio website dengan gaya newsprint/vintage, dibangun menggunakan Next.js App Router + Tailwind CSS v4, dan disiapkan untuk deploy sebagai static site.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript
- ESLint

## Fitur Utama

- Layout editorial/newsprint dengan tema warna vintage
- Smooth scrolling antar section
- Running ticker (breaking news style)
- Section portfolio: About, Projects, Experience, Contact
- Export static (`output: "export"`) untuk hosting statis

## Menjalankan Proyek

Install dependency:

```bash
npm install
```

Jalankan mode development:

```bash
npm run dev
```

Buka di browser:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build production (static export)
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint

## Struktur Singkat

```text
app/
	layout.tsx
	page.tsx
	tailwind.css
public/
next.config.ts
```

## Catatan Deploy

Project ini menggunakan konfigurasi static export di [next.config.ts](next.config.ts):

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`
- `basePath` dan `assetPrefix` otomatis untuk repo project pages

Setelah build, hasil static ada di folder `out/`.

## Lisensi

Copyright @ 2026 HRAFSA, All Rights Reserved


# 🎬 Smart Search Playground (SSP)

A modern, minimalist movie search application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Search for movies from the IMDb-like API and view beautiful movie cards with posters, ratings, and release years.

---

## ✨ Features

- 🔍 **Fast Movie Search** — Search millions of movies by title in real-time
- 🎨 **Dark Minimalist UI** — Clean, modern dark theme optimized for viewing
- 🖼️ **Movie Cards** — Display movie posters, titles, years, rankings, and links
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- 🚀 **Server-Side Proxying** — Secure API calls without exposing endpoints to the client
- 🔗 **IMDb Links** — Direct links to full movie details on IMDb
- ⚡ **Fast Performance** — Optimized with Next.js and React best practices

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | Full-stack React framework with API routes |
| **TypeScript** | Type-safe JavaScript for robust code |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **React 18** | Modern UI library with hooks |
| **Node.js** | Server runtime for API routes |

---

## 📦 Installation

### Prerequisites
- **Node.js** 16+ and **npm** 7+
- Git

### Clone & Setup

```bash
# Clone the repository
git clone https://github.com/arash-jj/web-based-mini-projects.git
cd projects/smart-search-playground

# Install dependencies
npm install
```

---

## 🚀 Quick Start

### Development Mode

```bash
npm run dev
```

The app will start at **http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

---

## 📖 Usage

1. **Visit the homepage** — Open http://localhost:3000 in your browser
2. **Enter a movie title** — Type a movie name (e.g., "Spiderman", "Inception")
3. **Search** — Click the "Search" button or press Enter
4. **View Results** — Browse movie posters, years, rankings in a beautiful grid
5. **Open IMDb** — Click "View on IMDb" to see full movie details

### Example Search

```
Search: "Spiderman"
Results:
  ✓ Spider-Man (2002) — #926
  ✓ Spider-Man: No Way Home (2021) — #726
  ✓ The Amazing Spider-Man (2012) — #2179
  ✓ Spider-Man: Into the Spider-Verse (2018) — #1048
  ... and more
```

---

## 🏗️ Project Structure

```
smart-search-playground/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # Search API endpoint
│   ├── page.tsx                  # Home page & search UI
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/
│   └── MovieCard.tsx             # Movie card component
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
└── README.md
```

---

## 🔌 API Reference

### `GET /api/search`

Search for movies by title.

**Query Parameters:**
- `q` (required) — Movie title to search for

**Example Request:**
```bash
curl "http://localhost:3000/api/search?q=Spiderman"
```

**Response Format:**
```json
{
  "ok": true,
  "description": [
    {
      "#TITLE": "Spider-Man",
      "#YEAR": 2002,
      "#IMDB_ID": "tt0145487",
      "#RANK": 926,
      "#ACTORS": "Tobey Maguire, Kirsten Dunst",
      "#IMDB_URL": "https://imdb.com/title/tt0145487",
      "#IMG_POSTER": "https://m.media-amazon.com/images/...",
      "photo_width": 511,
      "photo_height": 755
    },
    ...
  ],
  "error_code": 200
}
```

---

## 🎨 UI Components

### MovieCard Component

Displays individual movie information:
- **Image** — High-quality poster (with fallback)
- **Rank Badge** — Displays IMDb rank in top-right
- **Title** — Movie name (truncated if too long)
- **Year** — Release year
- **CTA Button** — "View on IMDb" link

**Props:**
```typescript
type MovieCardProps = {
  title: string;
  year?: number;
  image?: string;
  link?: string;
  rank?: number;
};
```

---

## 🎯 Features in Detail

### Dark Minimalist Design
- Slate-900 background (#0f172a)
- White text for clarity
- Blue accent buttons (#2563eb)
- Hover effects and smooth transitions
- Responsive grid (1-4 columns)

### Search Functionality
- Server-side API proxy to avoid CORS issues
- Client-side error handling and validation
- Loading states with visual feedback
- Error messages for failed searches

### Movie Data Display
- Movie poster images (lazy-loaded)
- IMDb rank indicator
- Release year
- Direct links to IMDb for full details

---

## 🌐 External API

This project uses the **IMDb IAI** API (unofficial):
```
https://imdb.iamidiotareyoutoo.com/search?q=<movie_title>
```

**Note:** This is an unofficial API. Consider using the official [IMDb API](https://developer.imdb.com/) for production applications.

---

## 🛡️ Error Handling

The app gracefully handles:
- ❌ Network failures
- ❌ Invalid search queries
- ❌ API timeouts
- ❌ Empty results
- ❌ Malformed responses

User-friendly error messages guide users to try again.

---

## 📱 Responsive Breakpoints

| Device | Columns | Layout |
|--------|---------|--------|
| Mobile (sm) | 1-2 | Stacked |
| Tablet (md) | 2-3 | Grid |
| Desktop (lg) | 3-4 | Wide grid |
| Large (xl) | 4 | Full width |

---

## 🚀 Performance

- **Fast Load Time** — Optimized images and lazy loading
- **Server-Side Rendering** — Next.js optimizations
- **Minimal Bundle** — Tree-shaken dependencies
- **Caching** — Browser and server-side caching

---

## 🔮 Future Enhancements

- [ ] Movie details modal with ratings and reviews
- [ ] Favorites/watchlist feature with localStorage
- [ ] Search history and suggestions
- [ ] Filter by year, genre, rating
- [ ] User authentication
- [ ] Dark/Light theme toggle
- [ ] Advanced search filters
- [ ] Share results on social media

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---
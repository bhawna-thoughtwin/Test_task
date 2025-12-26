# Reusable Data Table Component (React + TypeScript)

## Overview
This project implements a reusable, type-safe Data Table component using
React 18 and TypeScript. The table supports sorting, filtering, row selection,
and responsive behavior, and is designed to be reusable across different
datasets such as users, products, or transactions.

---

## Features
- Generic, reusable DataTable component
- Type-safe column configuration using `keyof T`
- Column sorting (ascending / descending)
- Single row selection with callback
- Search and filter across all columns
- Text highlighting for search matches
- Empty state handling
- Responsive design with horizontal scroll
- Clean styling using CSS Modules

---

## Tech Stack
- React 18
- TypeScript
- Vite
- CSS Modules

---

## Project Structure

src/
├── components/
│ └── DataTable/
│ ├── DataTable.tsx
│ ├── DataTable.types.ts
│ ├── DataTable.module.css
│ └── index.ts
├── pages/
│ └── DemoTable.tsx
├── App.tsx
└── main.tsx


---

## Getting Started

### Install dependencies
```bash
npm install

npm run dev


# 🍜 Best Anime Search App (Anime Explorer)

## 🌟 Project Overview

**Anime Explorer** is a fast, modern web application built with React and TypeScript for searching, listing, and viewing detailed information on anime titles, powered by the Jikan API (a community-driven wrapper for MyAnimeList data).

The application features a dedicated search page with real-time, debounced query handling via Redux Toolkit Query (RTK Query) and a dynamic detail page with an integrated live search feature for quick navigation between titles.

---

## ✨ Core Features

- **⚡️ Fast, Debounced Search:** Real-time search functionality on the main page, optimized with debouncing to minimize API calls (250ms interval).
- **🔄 API Request Cancellation:** Implement correct use of `AbortController` to cancel in-flight requests when the user continues typing, ensuring resource efficiency.
- **🖼️ Grid View Listing:** Attractive, responsive display of anime results using card components.
- **🌐 Two-Page Navigation:** Separate pages for Search/Listing and individual Anime Details.
- **🔌 Server-side Pagination:** Controls for navigating large result sets.
- **💀 Skeleton Loaders:** Improved user experience with custom skeleton loading components during data fetching.

---

## 🏆 Bonus Implementations

The following features go **above and beyond** the core project requirements, focusing on enhanced user experience and application fluidity:

### 1\. Live Search/Suggestions on the Detail Page

The Detail Page (`DetailPage.jsx`) was enhanced with a fully functional live search bar:

- **Dedicated API Fetching:** Introduced a separate, debounced API call within the `DetailPage` component itself to fetch suggestions, independent of the main page search state.
- **Immediate Navigation:** Search results are displayed in a rich **Popover** (dropdown) that includes thumbnails and titles, allowing users to navigate directly to a new anime's detail page without returning to the main search screen.

### 2\. Enhanced Search UI/UX Handling

Sophisticated logic was implemented to manage the Popover, addressing common pitfalls in auto-complete UI:

- **Focus Loss Prevention:** Custom `onBlur` handlers with a delay (`setTimeout`) were used on the search input to prevent the popover from closing immediately, ensuring users can click on a suggestion link before the dropdown disappears.
- **Proactive Messaging:** Instead of immediately displaying "No matches found" when the search bar is empty, the UI displays a helpful message ("Type at least 3 characters to search"), improving user guidance and reducing perceived errors.

---

## 🚀 Tech Stack

This project is built using the following technologies:

| Category          | Technology                        | Purpose                                                                                 |
| :---------------- | :-------------------------------- | :-------------------------------------------------------------------------------------- |
| **Framework**     | **React** (with **TypeScript**)   | Frontend development and typing.                                                        |
| **Routing**       | **React Router DOM**              | Client-side navigation between search and detail pages.                                 |
| **State/Data**    | **Redux Toolkit** & **RTK Query** | Centralized state management and optimized data fetching/caching.                       |
| **API**           | **Jikan API** (via \`jikan.moe\`) | Source of anime data (search, details).                                                 |
| **Styling**       | **Tailwind CSS**                  | Utility-first CSS framework for rapid UI development.                                   |
| **UI Components** | \`shadcn/ui\` (or similar)        | Used for professional components like \`Card\`, \`Button\`, \`Input\`, and \`Popover\`. |
| **Utilities**     | \`useDebounce\` hook              | Custom hook for request throttling.                                                     |

---

## ⚙️ Installation and Setup

To get a local copy up and running, follow these steps.

### Prerequisites

You need **Node.js** (v18+) and **npm** or **Yarn** installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/NazriAMZ/best-anime-search-app.git
cd best-anime-search-app
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:4000` (or the port specified in your console).

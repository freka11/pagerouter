# My Next.js Posts App

A modern, server-rendered Next.js application that displays paginated blog posts fetched from the JSONPlaceholder API. Built with TypeScript, Tailwind CSS, and following best practices for scalable React applications.

## 🚀 Project Overview

This is a full-stack Next.js application that demonstrates server-side rendering (SSR) with data fetching, pagination, error handling, and responsive design. The app fetches posts from the JSONPlaceholder API and displays them in a clean, modern interface with pagination controls.

### Key Features

- **Server-Side Rendering**: All pages are rendered on the server for better SEO and performance
- **Pagination**: Displays exactly 9 posts per page with navigation controls
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Error Handling**: Graceful error states for network failures and missing data
- **TypeScript**: Full type safety throughout the application
- **Modern CSS**: Utility-first styling with Tailwind CSS
- **Clean Architecture**: Separated concerns between UI components, data fetching, and business logic

## 🛠 Tech Stack & Why We Used It

### Next.js (Pages Router)
- **Why?** Next.js provides excellent SSR capabilities out of the box, which is crucial for SEO and initial page load performance. The Pages Router was chosen over the App Router for its maturity and simpler mental model for routing.
- **Benefits**: Automatic code splitting, optimized images, built-in CSS support, and excellent developer experience.

### TypeScript
- **Why?** TypeScript adds compile-time type checking, which catches errors early and improves code maintainability. In a team environment, it reduces bugs and makes refactoring safer.
- **Benefits**: Better IDE support, self-documenting code, and improved developer productivity.

### Tailwind CSS
- **Why?** Tailwind's utility-first approach allows for rapid UI development without writing custom CSS. It's highly customizable and produces smaller bundle sizes through purging unused styles.
- **Benefits**: Consistent design system, responsive utilities, and no CSS conflicts.

### JSONPlaceholder API
- **Why?** Provides a free, reliable REST API for testing and prototyping. It offers realistic data structures (posts, comments, users) without requiring a backend.
- **Benefits**: No setup required, consistent data format, and supports pagination headers.

## 🏗 Architecture

The application follows a clean, modular architecture with clear separation of concerns:

```
my-next-app/
├── pages/                 # Next.js pages (routes)
│   ├── index.tsx         # Home page with posts list
│   ├── posts/[id].tsx    # Dynamic post detail page
│   ├── _app.tsx          # App wrapper
│   └── _document.tsx     # Document structure
├── components/           # Reusable UI components
│   ├── Card.tsx          # Post card component
│   ├── Pagination.tsx    # Page navigation
│   └── Layout.tsx        # Layout wrapper
├── services/             # Data fetching layer
│   └── api.ts            # API functions
├── utils/                # Utilities and constants
│   └── constants.ts      # App constants
└── styles/               # Global styles
    └── globals.css       # Tailwind imports
```

### Component Structure

- **Pages**: Handle routing and data fetching (SSR)
- **Components**: Pure, reusable UI elements
- **Services**: Centralized API calls and data logic
- **Utils**: Shared constants and helper functions

## 🔄 How It Works

### Data Flow

1. **Page Load**: User visits `/` or `/posts/[id]`
2. **Server-Side Rendering**: `getServerSideProps` executes on the server
3. **Data Fetching**: API calls to JSONPlaceholder with pagination
4. **Data Processing**: Posts are filtered and paginated
5. **Rendering**: Server renders HTML with data
6. **Hydration**: Client-side JavaScript takes over for interactivity

### Pagination Logic

```typescript
// In utils/constants.ts
export const POSTS_PER_PAGE = 9;

// In services/api.ts
export async function fetchPostsWithCount(page = 1) {
  const { data, headers } = await executeFetch<Post[]>(
    `${POSTS_API_BASE}/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`,
  );
  const totalCount = Number(headers.get("x-total-count") || 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  return {
    posts: data,
    totalPages,
  };
}
```

The API returns `x-total-count` header, which we use to calculate total pages. Each page shows exactly 9 posts.

### Error Handling

```typescript
// In pages/index.tsx
export const getServerSideProps = async ({ query }) => {
  try {
    const { posts, totalPages } = await fetchPostsWithCount(page);
    return { props: { posts, currentPage: page, totalPages } };
  } catch (error) {
    return {
      props: {
        posts: [],
        currentPage: page,
        totalPages: 1,
        error: error.message
      }
    };
  }
};
```

Errors are caught and passed as props, displaying user-friendly error messages.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-next-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📖 API Reference

### Services

#### `fetchPostsWithCount(page?: number)`
Fetches posts for a specific page with pagination metadata.

**Parameters:**
- `page` (number, optional): Page number (default: 1)

**Returns:**
```typescript
{
  posts: Post[],
  totalPages: number
}
```

#### `fetchPost(id: string)`
Fetches a single post by ID.

**Parameters:**
- `id` (string): Post ID

**Returns:**
```typescript
Post // { userId, id, title, body }
```

### Components

#### `Card`
Displays a single post preview.

**Props:**
```typescript
{
  id?: number;
  title: string;
  excerpt: string;
}
```

#### `Pagination`
Page navigation component.

**Props:**
```typescript
{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

#### `Layout`
App layout wrapper.

**Props:**
```typescript
{
  children: React.ReactNode;
}
```

## 🎨 Styling Approach

We use Tailwind CSS for all styling with a utility-first approach:

### Design System
- **Colors**: Slate color palette for a clean, professional look
- **Typography**: System fonts with consistent sizing
- **Spacing**: Consistent padding/margin using Tailwind's spacing scale
- **Shadows**: Subtle shadows for depth without being distracting

### Responsive Design
```css
/* Mobile-first approach */
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
</div>
```

### Component Styling
Each component uses Tailwind classes directly in the JSX:

```tsx
<article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {/* Component content */}
</article>
```

## 🔍 Key Implementation Details

### Server-Side Rendering
- `getServerSideProps` runs on every request
- Data is fresh on each page load
- Better for dynamic content and SEO

### Type Safety
- All API responses are typed with TypeScript interfaces
- Props are strictly typed
- Compile-time error checking

### Performance Optimizations
- Server-side rendering reduces client-side JavaScript
- Tailwind purges unused CSS
- Next.js automatic code splitting

### Error Boundaries
- Network errors are handled gracefully
- User sees helpful error messages
- App remains functional even with API failures

## 🧪 Testing

Currently, the app doesn't include automated tests, but here's how you could add them:

### Unit Tests (Jest + React Testing Library)
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### E2E Tests (Playwright)
```bash
npm install --save-dev @playwright/test
npx playwright install
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Automatic deployments on push

### Other Platforms
- Netlify
- Railway
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.

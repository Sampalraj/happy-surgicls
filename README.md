# Happy Surgicals - B2B Manufacturer Website

A modern, professional B2B landing page and product catalog for a medical equipment manufacturer.

## Features
-   **Manufacturer-First Design**: Hero section, "Why Choose Us", and Factory details.
-   **B2B Navigation**: Dedicated pages for Manufacturing and Services.
-   **Mega Menu**: Comprehensive 4-column product menu with deep linking.
-   **Dynamic Product Catalog**: Filtering by Category and Price.
-   **Admin Panel**: Full CMS backed by Supabase.
-   **Security**: Role-Based Access Control (RBAC).

## Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm
-   Supabase Account

### Installation
1.  Clone the repository or download the source.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` with your Supabase credentials:
    ```
    VITE_SUPABASE_URL=your_url
    VITE_SUPABASE_ANON_KEY=your_key
    ```

### Running the Project
Start the local development server:
```bash
npm run dev
```
Access the site at `http://localhost:5173`.

### Admin Access
Access the admin panel at `/admin/login`.
Use the credentials you created in Supabase Authentication.

## Tech Stack
-   React + Vite
-   React Router DOM
-   Lucide React (Icons)
-   CSS Modules / Vanilla CSS

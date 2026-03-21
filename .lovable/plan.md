
# CHG Church Application

## Overview
A comprehensive church web application for CHG Church with an online store, communication feed, hymns/memo library, and additional community features. Includes admin authentication for content management.

## Pages & Features

### 1. Home / Dashboard
- Welcome banner with church branding (using the decorative leaf/dove logos from the document)
- Quick navigation cards to all sections
- Notifications hub with alerts bar at the top
- Upcoming events preview

### 2. Online Store (UI Prototype)
- **Product Catalog** organized by yearly themes (e.g., "Be Bold", "Do Good")
- Theme cards that open to show products within that theme
- Products: Conference Tickets (Elder/Adult/Youth/Child types) and Youth First Merchandise
- **Shopping Cart** with add/remove items and quantity management
- **Checkout Flow** with form for buyer details → order confirmation with a generated reference number
- Responsive grid layout for all screen sizes

### 3. Communication Feed
- Public-facing feed of announcements and upcoming events
- Cards showing: conference time slots, announcements, links to national services (prayers, venue locations)
- **Admin-only post creation** panel (visible only to authenticated admins)
- Post editor with title, content, category tags, and optional links

### 4. Hymns & Memo Library
- Searchable hymn book with hymn numbers, titles, and full lyrics
- Memo book section with searchable entries
- Simple index/search interface for quick lookup

### 5. About Page
- Church history
- Leadership team profiles
- Mission and vision statement

### 6. Event Calendar
- Calendar view of upcoming church events
- RSVP functionality (UI only)
- Event details with venue info

### 7. Prayer Wall
- Community prayer submissions
- Prayers displayed in ascending order by count/support
- Anonymous prayer posting option

### 8. Authentication & Admin
- User registration (name, email, phone, branch)
- Login/logout
- Admin role for managing store products, communication posts, and events
- Admin dashboard overview
- Uses Supabase for auth and data storage

### 9. Navigation
- Bottom navigation bar (mobile-friendly app feel)
- Sections: Home, Store, Feed, Hymns, More (About, Calendar, Prayer Wall)
- Top notification bar for alerts

## Design Direction
- Clean, modern, accessible UI suitable for youth and elderly users
- Large touch targets and readable fonts
- Church brand colors with the decorative motifs from the document
- Fully responsive (desktop, tablet, mobile)

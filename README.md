# Product Inventory — Frontend

React frontend for the Product Inventory Management System  
**Tech:** React, React Router, Axios, Tailwind , react-toastify

---

## Demo / Submission
- **GitHub:** https://github.com/nirmal-coder/product-inventory-system-frontend
- **Live app:** https://pism-frontend.netlify.app/ 

---

## About
This React app provides:
- Product search & category filtering
- Products table with inline editing (row-level)
- Import / Export CSV
- Inventory history sidebar (slides in on row click)
- Add/Edit/Delete product flows
- Responsive layout and basic accessibility

This frontend expects the backend APIs described in the backend README.

---

## Features (implemented)
- Search bar calling 
- Category dropdown to filter displayed products 
- Add New Product (form)
- Import (CSV upload) & Export (download CSV) buttons in header
- Products table columns: `Image | Name | Unit | Category | Brand | Stock | Status | Actions`
  - Stock status color-coded: In Stock (green), Out of Stock (red)
- Inline editing (Save / Cancel) for rows — Save calls 
- Product row click opens Inventory History sidebar 
- Toaster notifications for success / error and loading states

---

## Screenshots
![Login](https://res.cloudinary.com/doov17zaw/image/upload/v1764000376/PIMS_-_Google_Chrome_24-11-2025_21_29_38_mkm86l.png)
![Products List](https://res.cloudinary.com/doov17zaw/image/upload/v1764000376/PIMS_-_Google_Chrome_24-11-2025_21_29_07_i0ulfq.png)
![Add new Product](https://res.cloudinary.com/doov17zaw/image/upload/v1764000376/PIMS_-_Google_Chrome_24-11-2025_21_29_12_emhde9.png)
![Inventory History](https://res.cloudinary.com/doov17zaw/image/upload/v1764000377/PIMS_-_Google_Chrome_24-11-2025_21_29_30_jw5eyb.png)

---

## Getting started (local)

### Prerequisites
- Node.js >= 16
- npm or yarn
- Running backend API (see backend README) or mock server

### Install & run
```bash
git clone https://github.com/nirmal-coder/product-inventory-system-frontend
cd inventory-frontend
npm install
# start dev server
npm start
# build for production
npm run build

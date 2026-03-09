# RISO NGO Platform

A modern, full-stack web application designed for the RISO NGO. This platform serves as a central hub for managing charity campaigns, accepting secure online donations, highlighting key impact areas, and engaging with CSR partners. 

It is built with a powerful Next.js frontend featuring rich UI components and a robust Express.js backend with Prisma ORM for reliable data management.

## 🚀 Key Features

### 🌟 Frontend
- **Modern User Interface**: Designed with Next.js 16 and React 19, incorporating visually stunning, dynamic designs and dark mode.
- **Premium Components**: Utilizes `shadcn/ui` alongside `framer-motion` for advanced, staggered animations, glowing orbs, and glassmorphism effects.
- **Responsive Layout**: Fully tailored for mobile and desktop screens with optimized navigation and smooth scrolling.
- **Campaign Display**: Features an interactive campaign table, featured active campaigns, and impactful stories with real-time donation tracking.
- **Admin Dashboard**: A customized, RISO-branded admin panel to manage campaigns, monitor donations, and view dynamic heatmaps.
- **Payment Gateway**: Seamless integration with Razorpay for handling secure donations online.

### ⚙️ Backend
- **RESTful API**: Built with Node.js and Express to securely serve the frontend application.
- **Database Management**: Uses Prisma ORM connected to a backend database for robust data storage.
- **Authentication**: JWT-based secure authentication and authorization with role-based access (User/Admin).
- **Media Uploads**: Integrated with `multer` and `cloudinary` for seamless image and asset management.
- **File Generation**: Dynamically creates and serves PDF receipts and reports using `pdfkit`.

## 🛠 Technology Stack

### Frontend Dependencies
- **Framework**: `next` (16.1.6), `react` (19.2.3)
- **Styling**: `tailwindcss` (v4), `framer-motion` (v12), `clsx`, `tailwind-merge`
- **UI Components**: `shadcn/ui`, `radix-ui`, `lucide-react`
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Data Visualization & Charts**: `recharts`
- **Payments**: `razorpay`

### Backend Dependencies (`ngo-backend`)
- **Server**: `express` (v5)
- **Database**: `@prisma/client`
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **Security**: `cors`, `helmet`, `express-rate-limit`
- **Cloud Storage**: `cloudinary`, `multer-storage-cloudinary`

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm `or` yarn `or` pnpm
- A valid relational database (or configured database provider for Prisma)
- External API keys for Cloudinary and Razorpay

### 1. Clone the repository

```bash
git clone https://github.com/Rupam18/ngo-platform.git
cd ngo-platform
```

### 2. Setup the Backend Environment

Navigate to the backend directory and install dependencies:

```bash
cd ngo-backend
npm install
```

Create a `.env` file in the `ngo-backend` directory with the required variables:

```env
PORT=5000
DATABASE_URL="your-database-connection-url"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
```

Initialize the Prisma Database and start the backend development server:

```bash
npm run build
npm run dev
```

### 3. Setup the Frontend Environment

Open a new terminal, navigate to the project root, and install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"
```

Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: Next.js App Router pages (Home, Admin layout, etc.)
- `/components`: Reusable React components (shadcn ui, layout elements)
- `/lib`: Helper functions, Prisma singleton, API utilities
- `/ngo-backend`: Express.js backend application and Prisma schema
- `/public`: Static assets (images, icons)
- `/store`: State management
- `/types`: TypeScript interfaces and types

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary and built specifically for the RISO NGO platform.
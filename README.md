# 🏡 Baraka Bliss Staycations - Frontend

## 🌟 Luxury Staycations in Kenya

[![Vercel](https://img.shields.io/badge/deployed-vercel-000000?style=for-the-badge\&logo=vercel)](https://baraka-bliss-staycations-frontend.vercel.app)
[![React](https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge\&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-3.3.0-06B6D4?style=for-the-badge\&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Live Demo](#live-demo)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Key Components](#key-components)
* [Screenshots](#screenshots)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## 🎯 Overview

**Baraka Bliss Staycations** is a premium apartment rental platform in Kenya. The frontend provides a **sleek, responsive, and user-friendly interface** for guests to discover and inquire about luxury staycation properties.

> "Baraka" means "blessings" in Swahili – we aim to bless our guests with unforgettable experiences.

**My Role:** Frontend development, UI architecture, responsive layouts, component design, animations.

---

## ✨ Features

### 🌐 Client-Facing

* 🏠 **Homepage:** Hero section, featured apartments, brand story
* 🔍 **Search & Filters:** By city, price, bedrooms, amenities
* 📱 **Responsive Design:** Works seamlessly across devices
* 🖼️ **Media Gallery:** Images and videos with lightbox
* 📝 **Inquiry Form:** Validated booking inquiries with Kenyan phone support
* 💬 **WhatsApp Integration:** Direct contact via WhatsApp
* ♿ **Accessibility:** WCAG AA compliant
* 🎨 **Smooth Animations:** Framer Motion for transitions and micro-interactions

### 👨‍💼 Operator Dashboard

* 📊 **Dashboard Overview:** Quick glance of all listings
* ➕ **Add/Edit Listings:** Manage apartment details and media
* 👁️ **Preview Mode:** See how listings appear to clients
* 📋 **Inquiry Management:** Track, respond, and organize inquiries
* ✅ **Bulk Actions & Exports:** Mark as read/replied, export reports

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| **React 18**        | UI library with hooks      |
| **React Router v6** | Client-side routing        |
| **Tailwind CSS**    | Utility-first styling      |
| **Framer Motion**   | Animations and transitions |

### UI Components

| Technology          | Purpose               |
| ------------------- | --------------------- |
| **React Icons**     | Icons library         |
| **Headless UI**     | Accessible components |
| **React Hot Toast** | Toast notifications   |
| **React Hook Form** | Form validation       |

### Media & Performance

| Technology           | Purpose                      |
| -------------------- | ---------------------------- |
| **Cloudinary**       | Image hosting & optimization |
| **Lazy Loading**     | Optimized media loading      |
| **Skeleton Loading** | Loading states for better UX |

### Development Tools

| Technology            | Purpose                   |
| --------------------- | ------------------------- |
| **Create React App**  | Project setup             |
| **ESLint & Prettier** | Code quality & formatting |
| **PropTypes**         | Runtime type checking     |

---

## 🌍 Live Demo

[![Visit Site](https://img.shields.io/badge/Visit-Baraka_Bliss_Staycations-4A7C59?style=for-the-badge\&logo=vercel)](https://baraka-bliss-staycations-frontend.vercel.app)

| Page       | URL                                                                     |
| ---------- | ----------------------------------------------------------------------- |
| Home       | [Link](https://baraka-bliss-staycations-frontend.vercel.app/)           |
| Apartments | [Link](https://baraka-bliss-staycations-frontend.vercel.app/apartments) |
| Contact    | [Link](https://baraka-bliss-staycations-frontend.vercel.app/contact)    |
| Operator   | [Link](https://baraka-bliss-staycations-frontend.vercel.app/operator)   |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Installation

```bash
git clone https://github.com/slate299/baraka-bliss-staycations-frontend.git
cd baraka-bliss-staycations-frontend
npm install
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Running

```bash
npm start       # Development
npm run build   # Production build
npm test        # Run tests
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── assets/images/       # Hero, logo, shared images
├── client/              # Client-facing app
│   ├── pages/
│   ├── components/
│   └── hooks/
├── operator/            # Dashboard
├── services/            # API calls
├── utils/               # Utility functions
├── styles/              # Global styles
└── App.js               # Main component
```

---

## 🎨 Key Components

### Client

| Component             | Description                          |
| --------------------- | ------------------------------------ |
| ApartmentCard         | Apartment preview with details       |
| DesktopFiltersSidebar | Advanced desktop filter panel        |
| MobileFilterDrawer    | Slide-out mobile filter panel        |
| SearchBar             | Debounced search input               |
| InquiryForm           | Form with validation & phone support |

### Operator

| Component             | Description                         |
| --------------------- | ----------------------------------- |
| ApartmentPreviewModal | Preview apartment before publishing |
| AmenitiesSelector     | Checkbox grid for amenities         |
| MediaUploader         | Drag-and-drop media upload          |
| InquiryTableRow       | Desktop inquiry view                |
| InquiryCard           | Mobile inquiry view                 |
| BulkActionBar         | Batch actions for inquiries         |

---

## 📸 Screenshots

| Homepage                              | Listings                              | Apartment Details                   |
| ------------------------------------- | ------------------------------------- | ----------------------------------- |
| ![Homepage](screenshots/homepage.png) | ![Listings](screenshots/listings.png) | ![Details](screenshots/details.png) |

| Filters                             | Contact                             | Operator Dashboard                      |
| ----------------------------------- | ----------------------------------- | --------------------------------------- |
| ![Filters](screenshots/filters.png) | ![Contact](screenshots/contact.png) | ![Dashboard](screenshots/dashboard.png) |

---

## 🚢 Deployment

Deployed on **Vercel**: [Link](https://baraka-bliss-staycations-frontend.vercel.app)

```bash
npm run build
```

`.env`:

```env
REACT_APP_API_BASE_URL=https://your-backend-url.com
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 🤝 Contributing

1. Fork repository
2. Create a branch (`git checkout -b feature/FeatureName`)
3. Commit (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/FeatureName`)
5. Open a Pull Request

**Standards:** Functional components, hooks, accessibility, ESLint & Prettier, meaningful comments.

---

## 📄 License

MIT License – see [LICENSE](LICENSE)

---

## 👥 Contributors

| Name              | Role               | Contributions                       |
| ----------------- | ------------------ | ----------------------------------- |
| **Natasha Hinga** | Frontend Developer | UI, components, styling, animations |
| **Julius Nganga** | Backend Developer  | API integration, state management   |

---

## 📞 Contact

* GitHub: [Repo](https://github.com/slate299/baraka-bliss-staycations-frontend)
* Live Demo: [Site](https://baraka-bliss-staycations-frontend.vercel.app)
* Email: [dev@barakabliss.com](mailto:dev@barakabliss.com)
* WhatsApp: [DM to book](https://wa.me/254715835385)

---

## 🙏 Acknowledgments

* Apartment owners & partners
* Open-source libraries & community
* Unsplash for stock images
* Guests for feedback

---

**Made with ❤️ in Kenya** 🇰🇪
© 2025 Baraka Bliss Staycations

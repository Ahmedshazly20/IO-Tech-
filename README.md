# 🌐 IO Tech Frontend Project

This project is a **multi-language company website** built with **Next.js, Strapi, TailwindCSS, and Redux Toolkit**, following the provided Figma design and requirements.  

---

## 📑 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [CMS Content](#cms-content)
- [Design Guidelines](#design-guidelines)

---

## ✨ Features
### 1. Header Navigation
- Responsive Navbar with **logo, links, and dropdown** (Services).  
- **Search bar** with categorized results (Team & Services).  
- **Language toggle (AR/EN)** with RTL support for Arabic.  

### 2. Hero Section
- Background with **images/videos from CMS**.  
- Slider with auto-play (videos) and smooth transitions (images).  
- Multi-language text (AR/EN).  

### 3. Our Team
- Show team members with **image, name, and role**.  

### 4. Clients
- Showcase **logos, testimonials, and case studies**.  
- Multi-language support (AR/EN).  

### 5. Footer
- Includes links & newsletter subscription form.  
- **Formik** for form handling with email validation.  
- Prevent duplicate submissions + success/error messages.  
- Multi-language support with RTL for Arabic.  

---

## 🛠️ Tech Stack
**Frontend**  
- [Next.js](https://nextjs.org/) – Routing, Pages (e.g., `/services/[service-id]`)  
- [TailwindCSS](https://tailwindcss.com/) – Styling (dark theme: brown, white, black)  
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management (search query, language, forms)  
- [Formik](https://formik.org/) – Form handling and validation  
- [i18next / next-intl](https://www.i18next.com/) – Multi-language + RTL support  

**Backend**  
- [Strapi CMS](https://strapi.io/) – Content management (Pages, Services, Team, Blog, Clients, Subscribers)  
- REST API – Data fetching & form submissions  

---

## 📂 Project Structure
```bash
project/
│── pages/
│   ├── index.js        # Home Page
│   ├── services/[id].js # Service Details
│   ├── team.js         # Team Members
│   ├── clients.js      # Clients
│
│── components/
│   ├── Header.js
│   ├── Hero.js
│   ├── Team.js
│   ├── Clients.js
│   ├── Footer.js
│
│── store/              # Redux Toolkit
│── styles/             # Tailwind Config
│── lib/                # API & Utils
│── public/             # Static assets

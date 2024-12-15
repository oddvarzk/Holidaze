# Holidaze Booking Website

![Home Image](./assets/holidazeHome.png)

Holidaze is a booking platform that connects users with venue managers, enabling users to find and book accommodations quickly and securely. Built with **Vite**, **React**, and **TypeScript**, this project aims to provide a smooth and efficient booking experience, with a focus on reliability and ease of use.

## Website Link

Visit the live site: [Holidaze](https://ozkholidaze.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/936a595a-ed12-4d55-ba7f-8657b723f9c1/deploy-status)](https://app.netlify.com/sites/ozkholidaze/deploys)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## Project Overview

Holidaze allows users to explore and book accommodations while offering venue managers a streamlined way to manage listings and bookings. The platform's features include:

- **Search and Filtering**: Users can search for venues and apply filters based on location, price, and availability.
- **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across all devices.
- **Authentication**: Secure user authentication with API-based backend.
- **Venue Management**: Venue managers can add, update, and manage their listings and track bookings.

---

## Features

- **User Authentication**: Login, register, and manage profiles.
- **Booking Management**: Users can view and manage their bookings, while venue managers can handle incoming reservations.
- **Search & Filter Options**: Find listings with relevant filters for a personalized experience.
- **Responsive & Accessible**: Designed for both mobile and desktop, focusing on accessibility and usability.

---

## Tech Stack

<span>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="30" height="30"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="30" height="30"/>
</span>

- **Vite** - Fast and modern front-end build tool
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Superset of JavaScript for static type-checking
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Date-fns** - Modern JavaScript date utility library
- **React Day Picker** - Date picker component for React
- **Netlify** - Hosting and continuous deployment
- **API** - Provided by the university, handling backend functionalities

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm** - Make sure Node.js and npm are installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/oddvarzk/holidaze.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd holidaze
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_API_BASE_URL=YOUR_API_BASE_URL
   VITE_API_KEY=YOUR_API_KEY
   ```

   Replace `YOUR_API_BASE_URL` and `YOUR_API_KEY` with your actual API base URL and API key.

---

## Running the Project

To start the development server, run:

```bash
npm run dev
```

This will start the app on [http://localhost:3000](http://localhost:3000) or the next available port.

To build the project for production, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

---

## Folder Structure

```
holidaze/
├── src/
│   ├── assets/                # Images and other static assets
│   ├── components/            # Reusable components
│   │   ├── api/               # API interaction modules
│   │   ├── context/           # Context providers
│   │   ├── layout/            # Layout components
│   │   ├── Utility/           # Utility components (e.g., loaders)
│   ├── pages/                 # Page components
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   ├── routes.tsx             # Route definitions
├── public/                    # Public assets
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**

2. **Create a new branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a pull request.**

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Noroff School of Technology and Digital Media**
- **Vite**
- **React**
- **Tailwind CSS**
- **React Day Picker**
- **Date-fns**
- **Netlify**

---

## Contact

For any inquiries or feedback, please contact:

- **Name:** Oddvar Zakarias Kristiansen
- **Email:** [oddvarzk@gmail.com](mailto:oddvarzk@gmail.com)
- **GitHub:** [oddvarzk](https://github.com/oddvarzk)
- **LinkedIn:** [Oddvar Zakarias Kristiansen](https://www.linkedin.com/in/oddvar-zakarias-kristiansen-22b583262/)

---

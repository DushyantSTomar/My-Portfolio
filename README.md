# React Portfolio Clone

A pixel-perfect clone of [dushyantsinghtomar.com](https://dushyantsinghtomar.com/), built with React + Vite.

## Project Structure

- **src/components**: React components for each section (Header, Hero, About, MyWork, TechCarousel, Contact, Footer).
- **src/styles**: Global SCSS variables and styles (, ).
- **public/assets**: Downloaded images and icons from the live site.
- **scripts**: Utility scripts (asset downloader).

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: SCSS Modules + Global Variables
- **Calculated Tokens**: Extracted from live site analysis (colors, fonts, gradients).
- **Animations**: Framer Motion (Hero/Scroll), Swiper.js (Tech Carousel).
- **Icons**: Lucide React + Original Assets.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

3.  **Build for Production**
    ```bash
    npm run build
    ```
    Output will be in the `dist` folder.

## Features Implemented

- **1:1 Visual Match**: Colors, gradients, and typography matched to the pixel.
- **Responsive Design**: Mobile, Tablet, and Desktop layouts adapted from the original Elementor design.
- **Assets**: All original images and icons were extracted and hosted locally (no external hotlinking/placeholders).
- **Tech Carousel**: Infinite scrolling loop for technology icons.
- **My Work**: Grid layout with hover effects matching the WordPress portfolio.


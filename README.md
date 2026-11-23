# 🍔 CRAVE — Premium Food Delivery Platform

> **"Good food. Great mood."**  
> A complete, modern, startup-grade food ordering website built with semantic HTML5, modern CSS3, and interactive JavaScript for the college Web Development Activity project.

---

## 🚀 Overview
**CRAVE** is a consumer-first food delivery web application built with the polish and responsiveness of modern unicorn startups (such as DoorDash, Deliveroo, Swiggy, and Uber Eats). It delivers a seamless browsing and ordering experience with real-time UI state management.

---

## 🎨 Color Palette & Design Tokens

| Token | Hex Value | Role in Interface |
| :--- | :--- | :--- |
| **Primary Orange** | `#FF6B35` | Main brand color, CTA buttons, badges, discount highlights |
| **Dark Charcoal** | `#222222` | Deep typography, footer background, primary headings |
| **Cream** | `#FFF8F2` | Subtle section backgrounds, location pills, soft contrast |
| **White** | `#FFFFFF` | Core card surfaces, clean whitespace |
| **Soft Gray** | `#F3F4F6` | Secondary buttons, category pill backgrounds, neutral borders |
| **Text Gray** | `#6B7280` | Subtitles, delivery metadata, descriptions |

---

## ✨ Features & Architecture

### 1. Navigation Bar
- **Brand Identity:** Bold CRAVE wordmark with custom SVG cutlery icon.
- **Location Selector UI:** Dynamic city/street changer (*Indiranagar, Bengaluru; Koramangala; Bandra West, etc.*).
- **Desktop Links:** *Home*, *Explore*, *Restaurants*, *Offers*, *Contact*.
- **Quick Search & Cart Trigger:** Cart icon with live counter pill badge.
- **Sign In CTA:** Opens modern OTP-based authentication modal.
- **Mobile Responsive Drawer:** Collapsible hamburger navigation for smartphones and tablets.

### 2. High-Impact Hero Section
- **Headline:** *"Your cravings. Delivered with love."* with gradient text accent.
- **Express Delivery Badge:** Animated pulsing green radar indicator (*25-30 Mins Express Delivery*).
- **Dual CTA Buttons:** *"Explore Restaurants"* & *"View Offers"*.
- **Social Proof:** Avatar stack showing 15,000+ daily orders.
- **Floating Interactive Badges:** 50% OFF promo card and live rider delivery tracking card.

### 3. Integrated Search & Location Bar
- Unified input card with location selector, dish search (*"Search pizza, biryani, burgers..."*), and filter chips.
- Interactive filtering that filters matching restaurants in real time.

### 4. 8 Food Categories Carousel
- Image-based cards with hover lift animations and item counts:
  1. **Pizza** (28 Options)
  2. **Burgers** (34 Options)
  3. **Biryani** (19 Options)
  4. **Chinese** (26 Options)
  5. **Desserts** (42 Options)
  6. **Healthy Food** (18 Options)
  7. **South Indian** (22 Options)
  8. **Beverages** (31 Options)
- Clicking any category filters the restaurant grid and scrolls directly to results.

### 5. Popular Restaurants Grid ("Popular near you")
- 6 detailed restaurant partner cards:
  1. **Urban Spice** — *Indian Cuisine* (⭐ 4.6 &bull; 25-30m &bull; Free Delivery &bull; 20% OFF)
  2. **Burger District** — *Burgers & Fries* (⭐ 4.8 &bull; 20-25m &bull; ₹29 Delivery &bull; Flat ₹120 OFF)
  3. **Napoli House** — *Italian & Pizza* (⭐ 4.7 &bull; 30-35m &bull; Free Delivery &bull; Free Garlic Bread)
  4. **Wok Street** — *Asian Cuisine* (⭐ 4.5 &bull; 25-30m &bull; ₹35 Delivery &bull; 15% OFF)
  5. **Sweet Crumbs** — *Desserts & Bakery* (⭐ 4.9 &bull; 15-20m &bull; Free Delivery &bull; Buy 1 Get 1)
  6. **Green Bowl** — *Healthy Food* (⭐ 4.6 &bull; 20-25m &bull; Free Delivery &bull; 10% OFF)
- Filter tabs: *All*, *Fast Delivery (<25m)*, *Top Rated (4.7+)*, *Free Delivery*.
- Quick Add Special buttons directly pushing items into the shopping cart.
- Interactive favorite heart toggles.

### 6. Offers & Promotions Section
- **CRAVE+ Pass Banner:** 30 days unlimited free delivery and zero surge pricing.
- **Interactive Coupon Badges:** One-click copy for `CRAVE50`, `FREEDEL`, and `PARTY150`.

### 7. How CRAVE Works
- 3-step walkthrough: Set Location &rarr; Choose Dishes &rarr; Express Live Delivery.

### 8. Interactive Slide-Out Cart Drawer
- Slide-out bag with dynamic item list, quantity counters (+ / -), promo code validator, automated item subtotal, tax calculation, and instant checkout simulation.

### 9. Sign-In Modal & Toast Feedback
- Clean modal with phone/email and 1-click Google Sign-in simulation.
- Non-intrusive floating toast notifications for user actions.

---

## 🛠️ Tech Stack
- **HTML5:** Semantic tags (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- **CSS3:** Custom Properties (Variables), Flexbox, CSS Grid, clamp() responsive typography, keyframe animations, glassmorphism.
- **JavaScript (ES6):** State-driven cart calculations, modal open/close, category filtering, search handler, scroll listeners.

---

## 💻 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/venkateshchamarthi6-stack/crave-food-delivery.git
   ```
2. Open the directory:
   ```bash
   cd crave-food-delivery
   ```
3. Open `index.html` in your web browser.

---

## 📜 License
Created for college Web Development Activity Project.  
Crafted with passion for **CRAVE Technologies**.

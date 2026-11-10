# 🚖 Urbania Cabs Bangalore

A modern, responsive cab booking website for a Bangalore-based travel agency. It covers outstation trips, airport transfers, city sightseeing and pilgrimage packages, with bookings routed straight to WhatsApp.

**Live site:** add your deployment URL here after hosting
**Author:** [Jeevan](https://github.com/Jeevan-u)

---

## ✨ Features

- 🚗 **Outstation taxis** – long-distance trips across South India
- ✈️ **Airport transfers** – 24/7 pickups and drops at Kempegowda International Airport
- 🏙️ **City sightseeing** – curated half-day and full-day tours
- 🛕 **Pilgrimage packages** – Tirupati, Srisailam, Shirdi and more
- 📱 **WhatsApp booking** – form details are pre-filled into a WhatsApp message
- 🎨 **Modern UI** – responsive layout, animations and a premium fleet section
- ⚡ **Fast** – Vite build, code-split assets and optimized images
- 🔒 **Legal pages** – privacy policy and terms of service included

No backend or database is required. Booking and contact forms open WhatsApp with the customer's details filled in.

---

## 🖥️ Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 18, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router |
| Testing | Vitest |

---

## 📂 Project Structure

```
urbania-cabs-bangalore/
├── public/                 # Static assets and favicon
├── src/
│   ├── assets/             # Destination and fleet images
│   ├── components/         # Page sections and UI components
│   ├── hooks/              # Shared React hooks
│   ├── pages/              # Home and 404 pages
│   ├── test/               # Test setup
│   ├── App.tsx             # Routes
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.ts
├── vercel.json             # SPA rewrites for Vercel
└── package.json
```

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:8080)
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

---

## ☁️ Deploying

### Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

`vercel.json` already rewrites all routes to `index.html`, so `/privacy-policy` and `/terms-of-service` work on refresh.

### Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Add a redirect rule: `/* /index.html 200`

---

## ⚙️ Customization

Business details are defined in the components:

| What | File |
| --- | --- |
| Phone, email, address | `src/components/TopBar.tsx`, `src/components/ContactSection.tsx`, `src/components/Footer.tsx` |
| WhatsApp number | Search for `919632345415` |
| Fleet and pricing | `src/components/FleetSection.tsx` |
| Tour packages | `src/components/TourPackages.tsx` |
| Booking destinations | `src/components/BookingForm.tsx` |

The WhatsApp number is stored in international format without a `+` (for example, `919632345415`).

---

## 🔒 Legal Pages

- `/privacy-policy`
- `/terms-of-service`

---

## 📞 Contact

**Urbania Cabs Bangalore**

- 📞 Phone / WhatsApp: +91 96323 45415
- 📧 Email: skycabsbangalore@gmail.com
- 📍 56, Begur, Bengaluru, Karnataka – 562149, India

---

## ⭐ Support

If you find this project useful, give it a star on GitHub.

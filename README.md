# Prime Academy — Official Landing Page

A high-performance, single-page landing page for **Prime Academy** (*"Digital Art With Excellence"*, Since 2013), located in Thaltej, Ahmedabad, Gujarat.

Built with semantic HTML5, modern Vanilla CSS (custom design system), Vanilla JavaScript, and Three.js (r128) for interactive 3D WebGL scenes.

---

## 🚀 Quick Start / Local Preview

You can open `index.html` directly in any modern web browser or serve it using any local HTTP server:

```bash
# Using Node.js npx serve
npx serve .

# Or using Python 3
python -m http.server 8000
```

---

## 🎨 Brand Identity & Tokens

All brand tokens are declared at the top of [`style.css`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/style.css):

| Token | Hex / Value | Description |
| :--- | :--- | :--- |
| `--brand-yellow` | `#FEA707` | Main Hero & Contact section background |
| `--dark-orange` | `#C27000` | Outline shade & subtle accents |
| `--brand-red` | `#E23A0F` | Primary CTAs, glow shadows, buttons & badges |
| `--black` | `#0A0A0A` | Header, dark theme section, footers & text contrast |
| `--white` | `#FFFFFF` | Backgrounds, crisp text & cards |
| `--font-display` | `'Chakra Petch', 'Russo One'` | Slanted sporty athletic display typography |
| `--font-body` | `'Poppins', sans-serif` | Clean, accessible body text |

---

## 📞 How to Update Contact & Business Details

### 1. Phone Number & Call Links
- Open [`index.html`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/index.html) and search for `+91 90332 22499` and `tel:+919033222499`
- Update the number in the header button, hero phone box, footer address, floating mobile dock, and JSON-LD schema.

### 2. WhatsApp Direct Number
- Search for `https://wa.me/919033222499` in [`index.html`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/index.html) and [`script.js`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/script.js).

### 3. Google Business Profile & Directions
- Search for `https://share.google/fHS6pCuZ06IyrK0cm` to update the map / directions link across header, quick buttons, and footer.

### 4. Institute Address
- Search for `Gala Empire, 601, Drive In Rd, opp. Doordarshan Metro Station, Nilmani Society, Thaltej, Ahmedabad, Gujarat 380054` to edit address text or JSON-LD schema.

---

## 📬 Form Handling & Backend Endpoint Integration

The contact form in [`script.js`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/script.js#L140-L240) includes:
- Indian 10-digit mobile number validation (`/^[6-9]\d{9}$/`).
- Anti-spam honeypot field.
- Instant WhatsApp lead generator fallback.
- Loading state spinner and smooth success confirmation.

### Connecting to Google Sheets (Apps Script), Formspree, or EmailJS
In [`script.js`](file:///c:/Users/ADMIN/Downloads/PRIME%20ACADEMY%20LANDING%20PAGE/script.js), find the submit event listener and replace the comment with your endpoint:

```javascript
// Replace with your endpoint:
const ENDPOINT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

await fetch(ENDPOINT_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});
```

---

## 🧊 3D WebGL Features & Performance

- **Hero 3D Scene**: Three floating course artifacts (Design Pen Nib Cube, Cinema Clapperboard Prism, Kinetic Gyro Ring) with mouse parallax.
- **Section 3D Canvases**:
  - `Graphic Design`: Interactive 3D Vector Pen-Nib & Floating Color Swatches.
  - `Video Editing`: Interactive 3D Director Clapperboard & Timeline Play Prism.
  - `Motion Graphics`: Interactive 3-Axis Gyroscopic Kinetic Rings & Core.
- **Performance**:
  - Pixel ratio is capped at `2`.
  - Canvases automatically pause `requestAnimationFrame` render loops when scrolled out of view via `IntersectionObserver`.
  - Fully respects `prefers-reduced-motion`.

---

## 📁 File Structure

```
PRIME ACADEMY LANDING PAGE/
├── index.html       # Single-page semantic HTML structure & SEO schema
├── style.css        # Full design system, sporty animations & responsive layout
├── script.js        # Three.js 3D scenes, form validation, animations & counters
├── README.md        # Documentation & customization guide
└── assets/
    ├── logo.png                     # Original Prime Academy logo
    ├── prime_logo_social_media_.png # Brand logo used in header & footer
    └── favicon.svg                  # Brand SVG favicon
```

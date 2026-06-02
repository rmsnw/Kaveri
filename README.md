# Kaveri Prashanth Patali — HR Consultancy & Coaching Website

A clean, professional, mobile-friendly website built from the brief in
`Website_Vision_Kaveri.docx`. No build tools, no frameworks — just open it.

## How to view it
Double-click **`index.html`** to open the site in your browser.
(For the contact form and animations to behave exactly as in production, you can
also serve the folder locally — e.g. with VS Code's *Live Server* extension.)

## Pages
| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About |
| `services.html` | Services & Pricing |
| `insights.html` | Insights & Media |
| `contact.html` | Contact (enquiry form) |
| `privacy.html` | Disclaimer / Privacy |

## Design
- **Palette:** White, Navy (`#16243f`) and Grey, with an understated gold accent — exactly the trustworthy, professional feel described in the brief.
- **Fonts (Google Fonts, professional pairing):**
  - **Playfair Display** — headings (elegant, credible, premium)
  - **Inter** — body text (clean, modern, highly readable)
- Minimalist layout, sticky navigation, mobile hamburger menu, subtle scroll-reveal animations.

## Folder structure
```
/
├── index.html, about.html, services.html, insights.html, contact.html, privacy.html
├── css/styles.css      ← all styling
├── js/main.js          ← mobile nav, form validation, animations
└── README.md
```

## Things to update before going live
These are placeholders — search & replace across the `.html` files:

1. **Email** — `hello@kaveripatali.com` → Kaveri's real address.
2. **LinkedIn** — every `href="#"` on a LinkedIn link/button → her LinkedIn URL.
3. **Insights & Media links** — the `href="#"` on article/podcast/video cards → real links.
4. **Photos** — images currently load from Unsplash (royalty-free placeholders).
   Replace with Kaveri's own photography:
   - Save images into an `images/` folder.
   - Swap the `src="https://images.unsplash.com/..."` URLs for `src="images/your-photo.jpg"`.
   - The hero/portrait image is in `index.html` and `about.html`.
5. **Pricing & timelines** in `services.html` are indicative examples from the brief —
   update with Kaveri's confirmed figures.

## Making the contact form actually send
The form currently validates input and shows a confirmation message, but does **not**
yet email anything (no backend). Two easy, free options for a static site:

- **Formspree** (formspree.io): create a form, then in `contact.html` set
  `<form id="enquiry-form" action="https://formspree.io/f/XXXX" method="POST">`
  and remove `e.preventDefault()` handling (or keep JS validation and let it submit).
- **Netlify Forms**: if hosting on Netlify, add `netlify` to the `<form>` tag.

## Hosting (all free / low-cost)
Because it's a plain static site, it can be hosted almost anywhere:
- **Netlify** or **Vercel** — drag-and-drop the folder.
- **GitHub Pages** — push the folder to a repo.
- Any standard web host — upload via FTP.

## Future development (from the brief)
Structure is ready to grow into: testimonials, a blog/resource library,
online booking, downloadable resources and expanded services.

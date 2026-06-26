# ai-prowler-public

Public GitHub Pages repo for the **AI-Prowler marketing website** at **https://ai-prowler.com**

---

## Live site

🌐 **https://ai-prowler.com**

GitHub Pages URL (same content): https://dvavro.github.io/ai-prowler-public

---

## Files in this repo

| File | Purpose |
|---|---|
| `index.html` | The entire website — all CSS and JS are inline in one file |
| `CNAME` | Custom domain config (`ai-prowler.com`) — do not edit |
| `_config.yml` | Disables Jekyll processing — do not edit |
| `welcome_ad.json` | Home-tab promo banner read by every AI-Prowler install |
| `notifications.json` | Release notifications pushed by the Subscription Manager |

---

## How to edit the website

The site is a single self-contained HTML file. Open it in any text editor, make changes, then push to GitHub — the live site updates in ~30 seconds.

### Quick workflow

```
cd C:\Users\david\AI-Prowler-ADMIN-V8\ai-prowler-public
git add index.html
git commit -m "Update website: <describe what changed>"
git push
```

### Key sections inside index.html

The page is divided into clearly marked HTML sections — search for these comments to jump to the right place:

| Section | Search for | What's there |
|---|---|---|
| Hero | `<!-- HERO -->` | Main headline, subheadline, two CTA buttons |
| How It Works | `<!-- HOW -->` | 3-step numbered walkthrough |
| Features | `<!-- FEATURES -->` | 6 feature cards |
| Pricing | `<!-- PRICING -->` | Desktop (free), Personal ($10/mo), Business ($20/mo) cards |
| FAQ | `<!-- FAQ -->` | Expandable Q&A items |
| Footer | `<!-- FOOTER -->` | Nav links, copyright, contact email |

### Updating prices

Find the pricing section (`<!-- PRICING -->`) and edit the dollar amounts directly in the HTML. Also update the `<meta name="description">` tag at the top of the file if the pitch changes.

---

## Active links — keep these in sync

| What | Line | Current value |
|---|---|---|
| Download button (free Desktop) | 811 | [`https://github.com/dvavro/ai-prowler/releases/latest`](https://github.com/dvavro/ai-prowler/releases/latest) |
| Personal Mobile subscribe | 838 | [`https://buy.stripe.com/5kQ4gs3sN53j8ZM81u4c801`](https://buy.stripe.com/5kQ4gs3sN53j8ZM81u4c801) |
| Business subscribe | 865 | [`https://buy.stripe.com/9B63co0gB1R7cbYftW4c800`](https://buy.stripe.com/9B63co0gB1R7cbYftW4c800) |
| Contact email (FAQ) | 941 | `mailto:david.vavro1@gmail.com?subject=AI-Prowler Subscription` |
| Contact email (footer) | 954, 958 | `mailto:david.vavro1@gmail.com` |

**When to update these:**
- **Download button** — never needs changing; always points to the latest GitHub release automatically
- **Stripe links** — update if you create new Payment Links (price change, new plan, promo). New links are created in the [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links)
- **Contact email** — only changes if the business email changes

---

## Subscription system (v8.0.0)

The two subscribe buttons go directly to Stripe Payment Links. When a customer completes checkout:

1. Stripe fires a `checkout.session.completed` webhook to the Cloudflare Worker
2. The Worker generates a license key, provisions a Cloudflare Tunnel, and emails the customer an activation code
3. The customer enters the code in AI-Prowler Settings → Mobile Access — everything configures automatically

**Stripe Payment Links:**
- Personal: https://buy.stripe.com/5kQ4gs3sN53j8ZM81u4c801
- Business: https://buy.stripe.com/9B63co0gB1R7cbYftW4c800

Promotion codes are enabled on both links. Active coupon: `BETATESTER26`.

**Subscription Worker:** https://ai-prowler-subscription.david-vavro1.workers.dev
**Worker source:** `C:\Users\david\AI-Prowler-ADMIN-V8\ai-prowler-subscription\`

---

## GitHub Pages setup (already configured)

The site is live. For reference:

- **Repo:** `dvavro/ai-prowler-public` (GitHub)
- **Branch:** `main`
- **Root:** `/` (root of repo)
- **Custom domain:** `ai-prowler.com` (set in repo Settings → Pages)
- **HTTPS:** enforced

DNS records in Cloudflare:
- `CNAME www → dvavro.github.io`
- `A @ → 185.199.108.153` (and .109, .110, .111)

---

## welcome_ad.json

This file is read by the Home tab of every AI-Prowler install. Edit it here or use the **Welcome Ad tab** in the Subscription Manager GUI (`C:\Users\david\AI-Prowler-ADMIN-V8\ai-prowler-subs\RUN_SUBS_GUI`), which pushes changes directly to this repo.

Current content targets v8.0.0. Update the version string in the `headline` field whenever a new version ships.

# ai-prowler-public

Public website for AI-Prowler — hosted on GitHub Pages.

## Live site

https://dvavro.github.io/ai-prowler-public
(or your custom domain once DNS is configured)

## How to enable GitHub Pages

1. Push this repo to GitHub
2. Go to repo Settings -> Pages
3. Source: Deploy from a branch
4. Branch: main / root
5. Click Save

The site will be live at https://dvavro.github.io/ai-prowler-public within a minute.

## Custom domain (dvavro-ai-prowler.com)

1. In GitHub Pages settings, enter your custom domain
2. In Cloudflare DNS, add a CNAME record:
   - Name: www
   - Target: dvavro.github.io
3. Add an A record for the apex domain pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
4. Enable "Enforce HTTPS" in GitHub Pages settings

## Files

- index.html  - Main landing page
- _config.yml - GitHub Pages config (disables Jekyll processing)

## To update Stripe payment links

Once Stripe products and payment links are created, update these
placeholders in index.html:

  https://buy.stripe.com/PERSONAL_PLAN_LINK_HERE
  https://buy.stripe.com/BUSINESS_PLAN_LINK_HERE

And update the email links to point to a Stripe checkout URL
rather than the mailto: links used as placeholders.

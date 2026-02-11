# Deployment Guide for 3AM SCROLL

Since this is a Next.js application, the absolute best way to go live is using **Vercel**.

## Why Vercel?
- **Creators of Next.js**: They built the framework, so the hosting is perfectly optimized.
- **Zero Configuration**: It automatically detects your Next.js setup.
- **Automatic CI/CD**: Every time you push to GitHub (which we just did), Vercel automatically deploys the new version.
- **Global Edge Network**: Your site will be fast everywhere (Vercel Edge Network).
- **Free Tier**: Uses a generous free tier for hobby/startup projects.

---

## Step 1: Deploy to Vercel

1. **Create an Account**: Go to [vercel.com](https://vercel.com) and sign up using **GitHub**.
2. **Import Project**:
   - On your dashboard, click **"Add New..."** > **"Project"**.
   - You will see your repository `anubhavbaghel/3amscroll_new` in the list (since you signed in with GitHub).
   - Click **"Import"**.
3. **Configure**:
   - Vercel automatically detects it's a Next.js project.
   - You don't need to change any build settings.
   - Click **"Deploy"**.

*Wait about 1-2 minutes. Vercel will build your site and give you a live `something.vercel.app` URL.*

---

## Step 2: Connect Your Domain (3amscroll.com)

Once deployed, you need to point your new domain to Vercel.

1. Go to your **Project Dashboard** on Vercel.
2. Click on **Settings** (top tab).
3. Click on **Domains** (left sidebar).
4. Enter `3amscroll.com` in the input field and click **Add**.
5. Choose the recommended option (usually "Add 3amscroll.com and www.3amscroll.com").

### Step 3: Update DNS at Your Registrar

Vercel will give you two generic nameservers or an A Record/CNAME to add. The **Nameserver method** is usually easiest if you want Vercel to handle everything (SSL, emails, etc.).

**If Vercel asks you to change Nameservers:**
1. Log in to where you bought the domain (GoDaddy, Namecheap, Hostinger, etc.).
2. Find **DNS Management** or **Nameservers** settings.
3. Change the nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

**OR (If you prefer keeping DNS where it is):**
Vercel might ask you to add an **A Record**.
- **Type**: A
- **Name**: @ (root)
- **Value**: `76.76.21.21` (Vercel's IP)

- **Type**: CNAME
- **Name**: www
- **Value**: `cname.vercel-dns.com`

*Note: DNS changes can take anywhere from a few minutes to 24 hours to propagate globally.*

---

## Alternative: Netlify
If you prefer not to use Vercel, **Netlify** is the next best option.
1. Log in to Netlify with GitHub.
2. "Import from Git" -> Choose your repo.
3. Build command: `npm run build`.
4. Publish directory: `.next`.
5. Go to Domain Settings -> Add custom domain.

## Recommendation
Stick with **Vercel** for this project. It provides the best performance for Next.js features like Image Optimization and Server Actions which we are using.

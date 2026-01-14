# Deployment Guide

## ⚠️ Critical Note on Database (SQLite vs Postgres)
This application currently uses **SQLite**, which stores data in a local file (`database.sqlite`).
- **Problem**: Most free cloud hosting platforms (Render, Heroku, Vercel) have **ephemeral file systems**. This means every time your app restarts (or "sleeps" and wakes up), **YOUR DATA WILL BE DELETED**.
- **Solution**: To deploy for free *and* keep your data, you should switch to a hosted **PostgreSQL** database.

---

## 1. The "Forever Free" Stack (Recommended)
This approach uses **Render** for the backend code and **Neon** for the database.

### Step A: Get a Free Database
1. Go to [Neon.tech](https://neon.tech) and sign up (Free).
2. Create a Project.
3. Copy the **Connection String** (e.g., `postgres://user:pass@ep-xyz.aws.neon.tech/neondb...`).

### Step B: Prepare Backend Code
1. You need to verify your app switches to Postgres if a `DATABASE_URL` env var is present.
   *(I can help you make this code change in `src/database.js` automatically).*

### Step C: Deploy Backend to Render
1. Go to [Render.com](https://render.com).
2. Create **New Web Service** -> Connect your Repo.
3. **Settings**:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
   - **Environment Variables**:
     - Key: `DATABASE_URL`
     - Value: (Paste your Neon Connection String)
4. Deploy. Copy your Render Backend URL (e.g., `https://gathertrack.onrender.com`).

### Step D: Update Frontend
1. Go to your frontend code (`src/api.js`).
2. Update the `baseURL` to your new Render Backend URL or use an environment variable `VITE_API_URL`.
3. Redeploy frontend (`npm run deploy`).

---

## 2. The "I want to keep SQLite" Option (Glitch)
If you absolutely want to stick with SQLite:
1. Go to [Glitch.com](https://glitch.com).
2. Click **New Project** -> **Import from GitHub**.
3. Paste your repo URL.
4. Glitch keeps files persistent, so SQLite works.
5. *Note*: Glitch projects sleep after 5 minutes of inactivity.

---

## 3. The "Advanced SQLite" Option (Fly.io)
1. Install `flyctl`.
2. Run `fly launch` in your backend folder.
3. Attach a volume: `fly vol create data_vol`.
4. Configure paths.
*(This complicates setup significantly compared to Option 1).*

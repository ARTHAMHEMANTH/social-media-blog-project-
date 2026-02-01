# Unified Vercel Deployment Guide

We are deploying both the **Frontend** and **Backend** as a single Vercel project (Monorepo strategy).

## 1. Vercel Project Settings

-   **General**:
    -   **Root Directory**: Leave it **empty** (`./`) or verify it points to the root `social-post-app`.
        -   *Do NOT* select `backend` or `frontend`.
    -   **Framework Preset**: Select **"Other"**.
    -   **Build Command**: Leave default (Vercel will use our `vercel.json` config).

## 2. Environment Variables

Go to **Settings** -> **Environment Variables** and add the following:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://hemanthshiva77:Hemanth10@cluster0.zzbqsb0.mongodb.net/social-post-app?appName=Cluster0` | Connection to Atlas |
| `JWT_SECRET` | `your_secret_key` | Any long random string |
| `REACT_APP_API_URL` | `/api` | Points frontend to the backend in same domain |
| `REACT_APP_SERVER_URL` | `` | Empty string (for relative paths) |
| `NODE_ENV` | `production` | |

## 3. How It Works

-   Our root `vercel.json` handles everything.
-   Requests to `/api/*` go to the backend (Node/Express).
-   Requests to `/*` go to the frontend (React).

**Common Fixes:**
-   If you get a **404**, check the **Root Directory** setting. It MUST be the root.
-   If API fails, check `MONGODB_URI`.

🚀 **Your app should be live after the next deployment!**

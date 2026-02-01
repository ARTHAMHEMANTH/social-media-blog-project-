# 🚀 Deployment Guide - Vercel

Complete guide to deploy your Social Connect application to Vercel.

## Prerequisites

- GitHub account (already done ✅)
- Vercel account (free) - [Sign up here](https://vercel.com/signup)
- MongoDB Atlas account (free) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create Database
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Create a New Cluster"** (Free tier)
3. Choose a cloud provider (AWS recommended)
4. Select a region closest to you
5. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.2 Create Database User
1. Go to **Database Access** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `socialconnect`
5. Auto-generate a secure password (save it!)
6. Set role: **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Allow Network Access
1. Go to **Network Access** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - *For production, restrict to specific IPs*
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://socialconnect:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `social-post-app`
   ```
   mongodb+srv://socialconnect:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/social-post-app?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend to Vercel

### 2.1 Import Backend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `social-media-blog-project-`
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - Click **"Edit"** next to Root Directory and select `backend`

### 2.2 Add Environment Variables
Before deploying, add these environment variables:

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `MONGODB_URI` | (Your MongoDB Atlas connection string from Step 1.4) |
| `JWT_SECRET` | (Generate a random secret: use minimum 32 characters) |
| `NODE_ENV` | `production` |

**Generate JWT Secret:**
```bash
# Run this in your terminal to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.3 Deploy Backend
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, copy your backend URL:
   ```
   https://your-backend-name.vercel.app
   ```
4. **Important:** Save this URL - you'll need it for frontend!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Frontend Environment File
In your local project:

```bash
cd frontend
```

Create a file named `.env.production`:
```env
REACT_APP_API_URL=https://your-backend-name.vercel.app/api
```

Replace `your-backend-name.vercel.app` with your actual backend URL from Step 2.3.

### 3.2 Import Frontend to Vercel
1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import the **same GitHub repository**
4. Configure project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - Click **"Edit"** and select `frontend`

### 3.3 Add Environment Variable
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `REACT_APP_API_URL` | `https://your-backend-name.vercel.app/api` |

### 3.4 Deploy Frontend
1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll get your frontend URL:
   ```
   https://your-app-name.vercel.app
   ```

---

## Step 4: Configure Backend CORS

After frontend deployment, you need to update backend to allow requests from your frontend domain.

### 4.1 Update Backend CORS Settings

In Vercel backend environment variables, add:

| Name | Value |
|------|-------|
| `FRONTEND_URL` | `https://your-app-name.vercel.app` |

### 4.2 Update server.js (Already Done)
The current CORS configuration allows all origins. For production security, you can restrict it in `server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

## Step 5: Test Your Deployed Application

### 5.1 Open Your App
Visit your frontend URL: `https://your-app-name.vercel.app`

### 5.2 Test All Features
- [ ] Sign up with a new account
- [ ] Login with credentials
- [ ] Create a text post
- [ ] Create a post with image
- [ ] Like a post
- [ ] Comment on a post
- [ ] Edit your post
- [ ] Delete your post

### 5.3 Check MongoDB Atlas
1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. You should see:
   - `social-post-app` database
   - `users` collection (with your test user)
   - `posts` collection (with your test posts)

---

## Step 6: Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

---

## 🎯 Final Deployment URLs

After completing all steps, you'll have:

- **Frontend:** `https://your-app-name.vercel.app`
- **Backend API:** `https://your-backend-name.vercel.app`
- **Database:** MongoDB Atlas (managed)

---

## 📝 Submission Checklist for 3W Solutions

Before submitting:

- [ ] Both frontend and backend are deployed and working
- [ ] GitHub repository is public and updated
- [ ] README.md has deployment URLs
- [ ] All features are tested in production
- [ ] MongoDB Atlas is configured correctly
- [ ] Environment variables are set properly

### Submission Form Data:
- **GitHub Repository:** https://github.com/ARTHAMHEMANTH/social-media-blog-project-.git
- **Live Frontend URL:** https://your-app-name.vercel.app
- **Live Backend URL:** https://your-backend-name.vercel.app
- **Database:** MongoDB Atlas

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check if MongoDB URI is correct in Vercel environment variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check if database user has correct permissions

**Error: 500 Internal Server Error**
- Check Vercel function logs: Project → Settings → Functions
- Verify all environment variables are set

### Frontend Issues

**Error: Network Error / API not responding**
- Verify `REACT_APP_API_URL` points to correct backend URL
- Check backend CORS settings
- Ensure backend is deployed and running

**Images not loading**
- Note: Uploaded images on Vercel are temporary (serverless)
- For production, use cloud storage (AWS S3, Cloudinary)

### CORS Issues
- Ensure backend allows frontend domain
- Check CORS middleware in server.js
- Verify no typos in URLs

---

## 🔒 Security Notes

1. **Never commit .env files to GitHub** (already in .gitignore ✅)
2. **Use strong JWT secrets** (minimum 32 characters)
3. **Restrict MongoDB IP access** in production
4. **Use HTTPS only** (Vercel provides this automatically)
5. **Validate all inputs** on backend (already implemented ✅)

---

## 🎉 Congratulations!

Your application is now live and accessible worldwide! Share your deployment URLs in the submission form.

**Need help?** Contact: hr@triplewsols.com

# 🚀 Vercel Deployment Checklist

Use this checklist to deploy your Social Connect application to Vercel.

## ✅ Pre-Deployment Checklist

- [ ] GitHub repository is up to date
- [ ] All code is committed and pushed
- [ ] .env files are in .gitignore (security)
- [ ] vercel.json is configured

## 📋 Deployment Steps

### 1. MongoDB Atlas Setup (15 minutes)
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster
- [ ] Create database user (username + password)
- [ ] Allow network access from anywhere (0.0.0.0/0)
- [ ] Get connection string
- [ ] Replace password in connection string
- [ ] Add database name: `/social-post-app`

**Your MongoDB URI will look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/social-post-app?retryWrites=true&w=majority
```

---

### 2. Deploy Backend to Vercel (10 minutes)

#### Step 2.1: Create Backend Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository: `social-media-blog-project-`
- [ ] Set root directory to: `backend`

#### Step 2.2: Configure Environment Variables
Add these in Vercel:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | (Your Atlas URI from step 1) | Don't forget to replace password! |
| `JWT_SECRET` | (Generate random 32+ chars) | Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | `production` | Exactly as written |

#### Step 2.3: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment
- [ ] Copy backend URL: `https://your-backend-name.vercel.app`
- [ ] Test API: Open `https://your-backend-name.vercel.app` in browser
- [ ] Should see: `{"message":"Social Post API is running!"}`

---

### 3. Deploy Frontend to Vercel (10 minutes)

#### Step 3.1: Create Frontend Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import the SAME GitHub repository
- [ ] Set root directory to: `frontend`
- [ ] Framework should auto-detect: "Create React App"

#### Step 3.2: Configure Environment Variable
Add this in Vercel:

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | `https://your-backend-name.vercel.app/api` |

**Important:** Replace `your-backend-name` with your actual backend URL from Step 2.3!

#### Step 3.3: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (3-5 minutes)
- [ ] Copy frontend URL: `https://your-app-name.vercel.app`

---

### 4. Test Deployed Application

#### Open Your App
- [ ] Visit your frontend URL
- [ ] Check if login page loads

#### Test Features
- [ ] Sign up with new account
- [ ] Login successfully
- [ ] Create a text-only post
- [ ] Create a post with image
- [ ] Like your post
- [ ] Comment on your post
- [ ] Edit your post
- [ ] Delete your post
- [ ] Logout and login again

#### Verify in MongoDB Atlas
- [ ] Go to MongoDB Atlas dashboard
- [ ] Click "Browse Collections"
- [ ] Verify `users` collection has your test user
- [ ] Verify `posts` collection has your test posts

---

## 📝 Submission Information

### For 3W Solutions Submission Form:

**GitHub Repository:**
```
https://github.com/ARTHAMHEMANTH/social-media-blog-project-.git
```

**Deployed Frontend URL:**
```
https://your-app-name.vercel.app
```

**Deployed Backend API URL:**
```
https://your-backend-name.vercel.app
```

**Database:**
```
MongoDB Atlas (Cloud)
```

---

## 🐛 Common Issues & Solutions

### Backend Won't Deploy
**Problem:** Build fails  
**Solution:** Check that root directory is set to `backend` in Vercel

**Problem:** Cannot connect to MongoDB  
**Solution:** Verify MONGODB_URI is correct and IP whitelist includes 0.0.0.0/0

### Frontend Won't Deploy
**Problem:** Build fails  
**Solution:** Check that root directory is set to `frontend`

**Problem:** API not working  
**Solution:** Verify REACT_APP_API_URL is correct and includes `/api` at the end

### CORS Errors
**Problem:** Network errors when accessing API  
**Solution:** Backend CORS is already configured to allow all origins

### Images Not Loading
**Problem:** Uploaded images disappear  
**Solution:** Vercel serverless functions have temporary storage. For production, use AWS S3 or Cloudinary (optional enhancement)

---

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ You can signup and login
- ✅ You can create posts
- ✅ Likes and comments work
- ✅ Data persists in MongoDB Atlas
- ✅ No console errors in browser

---

## 📞 Need Help?

- **Deployment Guide:** Read DEPLOYMENT.md for detailed instructions
- **3W Solutions:** hr@triplewsols.com
- **Vercel Documentation:** https://vercel.com/docs

---

**🎉 Good luck with your deployment!**

Deadline: February 3, 2026

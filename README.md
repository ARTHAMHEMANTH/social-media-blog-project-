# 🌐 Social Connect - Mini Social Post Application

A full-stack social media application built with React.js, Node.js, Express, and MongoDB. Users can create accounts, post text and images, like posts, and comment on content from other users.

![TaskPlanet Inspired](https://img.shields.io/badge/Inspired%20by-TaskPlanet-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Material-UI](https://img.shields.io/badge/UI-Material--UI-007FFF?logo=mui)

## ✨ Features

- 🔐 **User Authentication** - Secure signup and login with JWT tokens
- 📝 **Create Posts** - Share text, images, or both
- 📰 **Public Feed** - View all posts from all users in reverse chronological order
- ❤️ **Like Posts** - Toggle likes on any post
- 💬 **Comments** - Add comments to posts and view all comments
- 👥 **User Profiles** - Display usernames and avatars
- 📱 **Responsive Design** - Mobile-friendly UI inspired by TaskPlanet
- ⚡ **Real-time Updates** - Instant UI updates for likes and comments

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Material-UI (MUI)** - Component library and styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
social-post-app/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── CreatePost.jsx
│   │   │   └── PostCard.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Feed.jsx
│   │   ├── context/          # Global state
│   │   │   └── AuthContext.js
│   │   ├── services/         # API calls
│   │   │   └── api.js
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   └── package.json
│
├── backend/                   # Node.js API
│   ├── models/               # Database models
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   └── posts.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── uploads/              # Uploaded images
│   ├── server.js            # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd social-post-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**For local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/social-post-app
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/social-post-app?retryWrites=true&w=majority
```

Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```
The app will open at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Post Endpoints

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "content": "Hello, world!",
  "image": <file>
}
```

#### Get All Posts
```http
GET /api/posts
```

#### Like/Unlike Post
```http
PUT /api/posts/:id/like
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/posts/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Great post!"
}
```

## 🎨 UI Design

The application's design is inspired by the TaskPlanet social page, featuring:
- Clean, modern interface with blue accent colors (#1976d2)
- Card-based post layout
- Round profile avatars
- Smooth animations and transitions
- Mobile-responsive design
- Intuitive like and comment interactions

## 🌐 Deployment

### Quick Deploy to Vercel

This application is configured for easy deployment to Vercel for both frontend and backend.

**📖 Complete Deployment Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

### Quick Links

**Live Demo URLs** (Add your deployed URLs here after deployment):
- **Frontend:** `https://your-app-name.vercel.app`
- **Backend API:** `https://your-backend-name.vercel.app`

### Deployment Steps Summary

1. **MongoDB Atlas Setup**
   - Create free cluster
   - Get connection string
   - Add to backend environment variables

2. **Deploy Backend**
   ```bash
   # Backend will auto-deploy from GitHub via Vercel
   # Set environment variables in Vercel dashboard:
   # - MONGODB_URI
   # - JWT_SECRET
   # - NODE_ENV=production
   ```

3. **Deploy Frontend**
   ```bash
   # Frontend will auto-deploy from GitHub via Vercel
   # Set environment variable in Vercel dashboard:
   # - REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

For detailed instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**

---

### MongoDB Atlas Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `.env`

### Backend Deployment (Render)
1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables (MONGODB_URI, JWT_SECRET, PORT)
8. Deploy!

### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Build command: `npm run build`
6. Output directory: `build`
7. Deploy!

**Important:** Update the API_URL in `frontend/src/services/api.js` to your deployed backend URL.

### Frontend Deployment (Netlify)
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. New site from Git
4. Select your repository
5. Base directory: `frontend`
6. Build command: `npm run build`
7. Publish directory: `frontend/build`
8. Deploy!

## 🧪 Testing

### Manual Testing Checklist
- [ ] User can sign up with valid credentials
- [ ] User can log in with correct email/password
- [ ] User is redirected to feed after login
- [ ] User can create a text-only post
- [ ] User can create an image-only post
- [ ] User can create a post with both text and image
- [ ] Posts appear in the feed immediately after creation
- [ ] User can like a post (count increases)
- [ ] User can unlike a post (count decreases)
- [ ] User can add comments to posts
- [ ] Comments display with correct username
- [ ] User can logout successfully
- [ ] Protected routes redirect to login when not authenticated

## 📝 Features Implemented

✅ User authentication (signup/login)  
✅ JWT-based authorization  
✅ Create posts with text and/or images  
✅ Public feed with all posts  
✅ Like/unlike functionality  
✅ Comment on posts  
✅ User avatars and usernames  
✅ Responsive Material-UI design  
✅ Image upload with preview  
✅ Real-time UI updates  
✅ Form validation  
✅ Error handling  

## 🎯 Bonus Features Implemented

✅ Clean and modern UI inspired by TaskPlanet  
✅ Fully responsive layout  
✅ Well-structured and reusable code  
✅ Comprehensive code comments  
✅ Detailed API documentation  
✅ Deployment-ready configuration  

## 👨‍💻 Development

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Start development servers (run in separate terminals)
cd backend && npm run dev
cd frontend && npm start
```

## 📄 License

This project is created as part of the 3W Solutions Full Stack Internship Assignment.

## 🙏 Credits

- UI Design inspired by [TaskPlanet App](https://play.google.com/store/apps/details?id=com.taskplanet)
- Built with love for the 3W Solutions internship program

---

**Developer:**   HEMANTH ARTHAM 
**Email:** arthamhemanth001@gmail.com  
**Submission Date:** February 2026

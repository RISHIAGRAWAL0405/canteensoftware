# Deploy Genus Canteen Ordering System on Render

## Step-by-Step Deployment Guide

### Prerequisites
1. GitHub account
2. Render account (free at https://render.com)
3. Your project code ready

---

## Step 1: Prepare Your Code for Deployment

### 1.1 Create a GitHub Repository
1. Go to https://github.com and login
2. Click "New Repository" (green button)
3. Name it: `canteen-ordering-system`
4. Keep it Public (or Private if you have paid plan)
5. Click "Create Repository"

### 1.2 Push Your Code to GitHub
Open terminal/command prompt in your project folder and run:

```bash
cd c:\Users\Administrator\Desktop\Demo\canteen-ordering-system

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/canteen-ordering-system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Setup MongoDB Atlas (Database)

### 2.1 Get MongoDB Connection String
Your MongoDB is already configured in the code:
```
mongodb+srv://rishiagrawal0405_db_user:RmgqaWrItQ0FJLyi@cluster0.ri11bvw.mongodb.net/canteen-ordering?retryWrites=true&w=majority&appName=Cluster0
```

**Note:** This connection string is already in your code, so MongoDB is ready!

---

## Step 3: Deploy on Render

### 3.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)

### 3.2 Create New Web Service
1. After login, click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect" next to your GitHub repository `canteen-ordering-system`
   - If you don't see it, click "Configure account" and give Render access to your repositories

### 3.3 Configure Web Service
Fill in the following details:

**Name:** `genus-canteen-ordering` (or any name you prefer)

**Region:** Choose closest to you (e.g., Singapore, Oregon)

**Branch:** `main`

**Root Directory:** Leave empty

**Runtime:** `Node`

**Build Command:** 
```
npm install
```

**Start Command:** 
```
npm start
```

**Instance Type:** `Free`

### 3.4 Add Environment Variables
Scroll down to "Environment Variables" section and click "Add Environment Variable":

**Key:** `MONGODB_URI`
**Value:** 
```
mongodb+srv://rishiagrawal0405_db_user:RmgqaWrItQ0FJLyi@cluster0.ri11bvw.mongodb.net/canteen-ordering?retryWrites=true&w=majority&appName=Cluster0
```

**Key:** `PORT`
**Value:** `3001`

### 3.5 Deploy
1. Click "Create Web Service" button at the bottom
2. Wait 2-5 minutes for deployment to complete
3. You'll see logs showing the build and deployment process

---

## Step 4: Access Your Deployed Application

Once deployment is complete:

1. Your app URL will be: `https://genus-canteen-ordering.onrender.com`
2. Click on the URL to open your application

**Important URLs:**
- Employee Login: `https://genus-canteen-ordering.onrender.com/employee-login.html`
- Admin Login: `https://genus-canteen-ordering.onrender.com/admin-login.html`

---

## Step 5: Test Your Application

### Test Employee Login:
- Use any Employee ID and Name to login
- Place a test order

### Test Admin Login:
- Username: `admin`
- Password: `canteen123`
- Check orders in dashboard

---

## Troubleshooting

### If deployment fails:
1. Check the logs in Render dashboard
2. Make sure all files are pushed to GitHub
3. Verify MongoDB connection string is correct

### If app doesn't load:
1. Wait 1-2 minutes (free tier may take time to start)
2. Check Render logs for errors
3. Ensure PORT environment variable is set

### Free Tier Limitations:
- App sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (enough for testing)

---

## Update Your Deployed App

When you make changes to your code:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically redeploy your app!

---

## Custom Domain (Optional)

To use your own domain:
1. Go to Render dashboard
2. Click on your service
3. Go to "Settings" tab
4. Scroll to "Custom Domain"
5. Add your domain and follow DNS instructions

---

## Success! 🎉

Your Genus Canteen Ordering System is now live and accessible worldwide!

Share the URL with your team:
- Employee Portal: `https://your-app-name.onrender.com/employee-login.html`
- Admin Dashboard: `https://your-app-name.onrender.com/admin-login.html`

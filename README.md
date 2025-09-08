
# 🎵 BeatWave

**Full-Stack Music Streaming Application**
 A modern, feature-rich music streaming platform built with TypeScript, React, Express, and real-time WebSocket communication. Connect, stream, and vibe with friends!

---

## 📌 Overview

BeatWave is a comprehensive music streaming application that provides seamless music playback, real-time chat functionality, and social features for music enthusiasts. This project showcases modern web development practices with a scalable architecture designed for production deployment.

---

## 🚀 Key Features

### 🎧 Core Music Features
- **Seamless Audio Playback** – High-quality music streaming with custom audio controls  
- **Smart Queue Management** – Add, remove, and reorder songs in your playback queue  
- **Album & Artist Pages** – Browse music organized by albums and artists  
- **Advanced Audio Player** – Volume control, seek functionality, and playback modes  

### 👥 Social Features
- **Real-time Chat** – Connect with other users through WebSocket-powered messaging  
- **Friends Activity** – See what your friends are currently listening to  
- **User Profiles** – Personalized user experiences with profile management  

### 🔐 Authentication & Security
- **Clerk Authentication** – Secure user authentication with social login options  
- **Protected Routes** – Role-based access control for admin and user features  
- **Session Management** – Persistent user sessions across devices  

### 💡 User Experience
- **Responsive Design** – Optimized for desktop, tablet, and mobile devices  
- **Modern UI/UX** – Clean, intuitive interface built with Radix UI and Tailwind CSS  
- **Real-time Updates** – Live activity feeds and instant notifications  
- **Search & Discovery** – Find music quickly with advanced search capabilities  

### 🛠️ Admin Panel
- **Content Management** – Upload and manage songs, albums, and artists  
- **User Analytics** – Track user engagement and platform statistics  
- **Dashboard Overview** – Comprehensive admin dashboard with key metrics  

---

## 🧱 Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development  
- **Vite** for fast development and optimized builds  
- **Tailwind CSS** for responsive, utility-first styling  
- **Radix UI** for accessible, high-quality components  
- **Zustand** for lightweight state management  
- **React Router** for client-side routing  
- **Socket.io Client** for real-time features

### Backend Stack
- **Node.js** with Express.js framework  
- **MongoDB** with Mongoose ODM for data persistence  
- **Socket.io** for real-time WebSocket communication  
- **Cloudinary** for media storage and optimization  
- **Clerk** for user authentication and management  
- **CORS** enabled for cross-origin requests
- **Redis** for in memory storage

### Development Tools
- **ESLint** for code linting and consistency  
- **TypeScript** for enhanced developer experience  
- **Nodemon** for automatic server restarts during development  
- **Docker** for containerization and deployment



## ⚙️ Getting Started

### Prerequisites
- Node.js 18+ installed  
- MongoDB database (local or cloud)  
- Redis server (local or cloud)
- Cloudinary account for media storage  
- Clerk account for authentication  

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunal-2004/beatwave.git
   cd beatwave ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `backend/` and `frontend/` directories:

   **Backend `.env`:**

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   REDIS_HOST=localhost
   REDIS_PORT=6379
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_EMAIL=your_admin_email
   NODE_ENV=development
   ```

   **Frontend `.env`:**

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5000
   ```

4. **Start Redis server**

   ```bash
   # Start Redis server locally
   redis-server
   
   # Or using Docker
   docker run -d -p 6379:6379 redis:7.2-alpine
   ```

5. **Start the development servers**

   ```bash
   # Start backend server
   cd backend && npm run dev

   # Start frontend server (in a new terminal)
   cd frontend && npm run dev
   ```

6. **Access the application**

   * Frontend: `http://localhost:5173`
   * Backend API: `http://localhost:5000`

---

## 🚢 Production Deployment

### Docker Deployment

Build and run with Docker:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Kubernetes Deployment

Deploy using Kubernetes manifests:

```bash
# Apply all Kubernetes configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n beatwave
kubectl get services -n beatwave
```

### Helm Chart Deployment

Deploy using Helm charts for easier management:

```bash
# Install the Helm chart
helm install beatwave ./helm/beatwave

# Upgrade existing deployment
helm upgrade beatwave ./helm/beatwave

# Check deployment status
helm status beatwave
```

**Helm Configuration:**

* Configurable replicas and resources
* Environment-specific values
* Ingress configuration for external access
* ConfigMaps and Secrets management
* Health checks and monitoring

---

## 🗂️ Project Structure

```
beatwave/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
├── docker-compose.yml
├── README.md
└── ...
```

```

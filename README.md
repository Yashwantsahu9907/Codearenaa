# 🏆 Codearenaa

**The ultimate national-level hackathon management platform.** 
Build, compete, and win with top-tier tools tailored for participants, organizers, and judges.

---

## 🚀 Features

### For Participants
- **Discover & Compete**: Browse hundreds of hackathons, including premium sponsored events from Google Cloud, Microsoft, AWS, and NVIDIA.
- **Team Management**: Effortlessly create, discover, and join teams using invite links.
- **Project Submission**: Easily submit GitHub repo links and demo videos for the judges to review.
- **Certificates**: Automatically earn and download PDF completion certificates recognizable globally.

### For Hackathon Organizers
- **Robust Management**: Full intuitive dashboard for organizers to create and track hackathons.
- **Flexible Setup**: Handle registrations, configure team sizes, and set submission rules and phases with ease.
- **Announcement System**: Instantly broadcast messages to all participating members.

### For Judges
- **Live Judging Panel**: Easily review incoming submissions and assign robust scoring criteria (e.g., Innovation, UI/UX, Complexity, Presentation).
- **Real-time Leaderboards**: Average scores are calculated and displayed on a global, live-updating leaderboard powered by WebSockets.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework**: React 19 & Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Animations**: Framer Motion
- **State & Data**: React Context, Axios
- **Communication**: Socket.io-client

### Backend Architecture
- **Environment**: Node.js & Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Real-Time Integration**: Socket.io
- **Utilities**: `pdfkit` (Certificate generation), `cors`, `helmet`, `morgan`

---

## 📦 Setting Up Locally

Ensure you have Node.js and MongoDB installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/Yashwantsahu9907/Codearenaa.git
cd Codearenaa
```

### 2. Install Dependencies
Run the installation command in both the `Frontend` and `Backend` directories.
```bash
# Frontend
cd Frontend
npm install

# Backend
cd ../Backend
npm install
```

### 3. Environment Variables
In the `Backend/` folder, create a `.env` file and set up your local variables:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/codearenaa
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key_here
```

### 4. Run the Platform
You can run both servers concurrently using the script provided in the root `package.json`.
From the **root directory** (`Codearenaa/`), simply run:
```bash
npm run dev
```
This single command will spin up the Vite dev server for the frontend and nodemon for the backend.

---
*Built with ❤️ for the Hackathon Community.*

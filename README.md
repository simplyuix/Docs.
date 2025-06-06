

# 📄 Docs Project

A dynamic web application for creating, viewing, and managing interactive "document" cards. This project features a React frontend with a Node.js/Express backend connected to a MongoDB database for persistent storage.

---

## ✨ Features

* **View Document Cards**: Displays a collection of cards with descriptions, file sizes, and custom tags.
* **Draggable Cards**: Cards can be dragged within the viewport (Framer Motion).
* **Dynamic Tag Colors**: Tags on cards can have dynamic colors.
* **Create New Cards**: Add new document cards through a form on a separate page.
* **Delete Cards**: Remove cards from the collection.
* **Persistent Storage**: MongoDB-backed storage via Node.js/Express.
* **Client-Side Routing**: React Router DOM for navigation.
* **Styled with Tailwind CSS**: Clean and responsive UI.
* **Floating Action Button (FAB)**: Easy access to add new cards.

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router DOM
* Framer Motion
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB
* CORS

---

## 📁 Project Structure

```
/my-docs-app
├── backend/
│   ├── server.js          # Express server logic
│   ├── package.json       # Backend dependencies
│   ├── node_modules/      # Ignored by Git
│   └── .env               # Environment variables (ignored by Git)
│
├── src/
│   ├── components/
│   │   ├── Background.jsx
│   │   ├── Card.jsx
│   │   ├── CreateCard.jsx
│   │   └── Foreground.jsx
│   ├── App.jsx            # Main React component with routing
│   ├── main.jsx           # React entry point
│   ├── index.css          # Tailwind/global styles
│   └── App.css            # App-specific CSS (if any)
│
├── public/                # Static assets
├── .gitignore             # Ignored files
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind configuration
└── README.md              # You're reading it!
```

---

## 🚀 Setup and Installation

### 🔧 Prerequisites

* Node.js (v16+)
* npm (or yarn)
* Git
* MongoDB instance (local or MongoDB Atlas)

### 🔌 Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

### 🔙 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
# backend/.env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
PORT=3001
```

Start the backend server:

```bash
npm start
# or
node server.js
```

Backend runs on: [http://localhost:3001](http://localhost:3001)

---

### 💻 Frontend Setup

From the root project directory:

```bash
npm install
npm run dev
# or
npm start  
```

Frontend runs on:

* [http://localhost:5173](http://localhost:5173) (if using Vite)
* [http://localhost:3000](http://localhost:3000) (if CRA)

---

## 📡 API Endpoints

### `GET /api/cards`

Returns all document cards.

---

### `POST /api/cards`

Create a new card.
**Request Body:**

```json
{
  "desc": "Card description",
  "filesize": ".5mb",
  "close": false,
  "tag": {
    "isOpen": true,
    "tagTitle": "Important",
    "tagColor": "red"
  }
}
```

---

### `DELETE /api/cards/:id`

Deletes a specific card by its ID.



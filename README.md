# 🍇 Task Match – Freelance Task Marketplace

[Live Site 🌐](https://grapes-market.web.app)

Task Match is a dynamic and modern freelance marketplace where clients can post small tasks, and freelancers can bid to secure a job. Whether you need help with design, development, writing, or marketing, Task Match makes it fast and easy to connect with the right talent.

---

## 📸 Preview

> <img src="https://i.ibb.co/LzX2741k/grapes-market-web-app.jpg" alt="https://grapes-market.web.app/"  style="max-width: 100%;">

---

## 🌟 Key Features

- ✅ **Post a Task**  
  Clients can quickly create tasks with details like title, category, deadline, budget, and description.

- 🔍 **Browse & Bid**  
  Freelancers can explore tasks, view detailed information, and submit competitive bids.

- 👤 **User Authentication**  
  Login with Google or email/password using Firebase Authentication.

- 💼 **My Tasks Dashboard**  
  Logged-in users can view, update, or delete their posted tasks.

- 📈 **Bid Count & Status**  
  Each task displays live bid count and real-time status.

- 📬 **Email Confirmation & Alerts**  
  Seamless feedback with toasts and modals on task creation or errors.

- 🔒 **Protected Routes**  
  Access to certain pages is limited to logged-in users only.

---

## 🛠 Tech Stack

### 🔧 Frontend
- **React.js** – Component-based UI
- **Tailwind CSS + DaisyUI** – Utility-first styling with ready-to-use components
- **React Router DOM** – Routing and navigation
- **React Hook Form** – Simplified form handling and validation
- **Framer Motion** – Animation and transitions

### ⚙️ Backend
- **Node.js + Express.js** – RESTful API
- **MongoDB** – Database for storing tasks and bids
- **Firebase Auth** – Secure authentication and authorization
- **Vercel** – Backend deployment

### 🚀 Deployment
- **Firebase Hosting** – Frontend deployment

---

## 📦 Libraries & Tools Used

| Tool | Purpose |
|------|---------|
| [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) | Client-side routing |
| [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) | Form validation |
| [`sweetalert2`](https://www.npmjs.com/package/sweetalert2) | Modern pop-up alerts |
| [`react-toastify`](https://www.npmjs.com/package/react-toastify) | Toast notifications |
| [`react-icons`](https://www.npmjs.com/package/react-icons) | Icon components |
| [`framer-motion`](https://www.npmjs.com/package/framer-motion) | UI animations |
| [`daisyui`](https://www.npmjs.com/package/daisyui) | Tailwind UI components |
| [`firebase`](https://www.npmjs.com/package/firebase) | Auth & hosting |
| [`axios`](https://www.npmjs.com/package/axios) *(optional)* | Simplified HTTP requests |
| [`classnames`](https://www.npmjs.com/package/classnames) *(optional)* | Conditional CSS class handling |
| [`moment`](https://www.npmjs.com/package/moment) or [`date-fns`](https://www.npmjs.com/package/date-fns) | Date manipulation |

---

## 🔐 Environment Variables

To run locally, create a `.env` file and add your Firebase config:

```env
VITE_API_URL=https://your-backend-url.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...



💻 Getting Started Locally

Clone the repository:

```bash
git clone https://github.com/your-username/task-match.git
cd task-match
```


Install dependencies:

```bash
npm install
```

Add your .env file (see above)


Run the app:

```bash
npm run dev
```

🔐 Firebase Setup
Go to Firebase Console

Create a new project

Enable Email/Password and Google Auth

Add your credentials to .env

<br/>

📁 Folder Structure

Task Match<br/>
├── public<br/>
├── src<br/>
│   ├── assets<br/>
│   ├── components<br/>
│   │   ├── Dashboard<br/>
│   │   ├── Login<br/>
│   │   ├── Pages<br/>
│   │   ├── Register<br/>
│   │   ├── ResetPassword<br/>
│   ├── Firebase<br/>
│   ├── Layouts<br/>
│   ├── Provider<br/>
│   └── Route<br/>
│       └── PrivateRoute.jsx<br/>
│   ├── App.css<br/>
│   ├── App.jsx<br/>
│   ├── index.css<br/>
│   └── main.jsx<br/>
├── firebase.json<br/>
├── index.html<br/>
├── package-lock.json<br/>
├── package.json<br/>
├── README.md<br/>
├── tailwind.config.js<br/>
└── vite.config.js<br/>
           # App root <br/>


<br/>


🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.

Create a new branch: git checkout -b feature/your-feature.

Make your changes and commit: git commit -m "Add feature".

Push to the branch: git push origin feature/your-feature.

Open a Pull Request.

<br/>
<br/>
## 🧑‍💻 Author

**Md. Yousuf Ali**

- 🔗 [LinkedIn](https://www.linkedin.com/in/yousufali156/)
- 🐦 [Twitter](https://twitter.com/mdyousufali001)
- 📂 [GitHub](https://github.com/yousufali156)

<br/>
📬 Contact <br/>
👨‍💻 Developer: Yousuf Ali <br/>
📧 Email: mdyousufali.dev@gmail.com <br/>

<br/>

📄 License
This project is open source and available under the MIT License.

<br/>

---

## 👨‍💻 Built with ❤️ by [Md. Yousuf Ali](https://www.linkedin.com/in/yousuf-ali-656744141/) – Grapes Market LTD ❤️  
Using **React**, **Tailwind CSS**, **Firebase**, and **MongoDB**

---
```
Let me know if you'd like a separate version for the **server-side (backend)** `README.md` as well.
```
<br/>
<br/>
<br/>

☕ Support Me
<p align="center"> <a href="https://www.buymeacoffee.com/yousufali156" target="_blank"> <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" style="border-radius:12px" /> </a> </p>

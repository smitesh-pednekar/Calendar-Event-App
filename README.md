# 📅 Calendar Event Application

## 🌟 Overview
The **Calendar Event Application** is a web application designed as part of an assignment for the Software Developer Intern role. It integrates with Google Calendar to display a user's events in a table format, offering additional features like filtering, searching, and exporting events. This project showcases backend, frontend, and API integration skills, with a focus on delivering an excellent user experience.

---

## ✨ Features

### 1. **🔐 Google Single Sign-On (SSO)**
- Securely log in using Google credentials.
- Uses `@react-oauth/google` to authenticate users and fetch their Google Calendar data.

### 2. **📋 Display Google Calendar Events**
- Retrieves and displays all calendar events for the past year.
- Events are listed in a table format, sorted by the most recent events first.

### 3. **📅 Filter Events by Date**
- Users can filter events based on a specific date using a date picker.
- Clearable filter for resetting the date filter.

### 4. **🔍 Search Events by Keyword**
- A search bar allows users to search for events by title.

### 5. **⏩ Pagination**
- Handles large datasets efficiently by dividing events into pages.
- Users can navigate between pages using "Previous" and "Next" buttons.

### 6. **ℹ️ Event Details Modal**
- Clicking on an event displays detailed information in a modal.
- Event descriptions are sanitized to remove unwanted HTML tags.

### 7. **📂 Export to CSV**
- Allows users to download a CSV file containing their event details.

### 8. **🌗 Dark Mode**
- Users can toggle between light and dark themes.

---

## 🛠️ Tech Stack

### 🖼️ Frontend
- **React.js**: Component-based architecture for building the UI.
- **Tailwind CSS**: For responsive and visually appealing designs.
- **React DatePicker**: Used for the date filter functionality.

### ⚙️ Backend
- **Google Calendar API**: For fetching user events.

### 📚 Libraries and Tools
- **@react-oauth/google**: For Google SSO authentication.
- **React Router**: For navigation within the application.

---


## ⚡ Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- Google Cloud Console project with OAuth credentials

### Steps to Set Up Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/calendar-event-app.git
   cd calendar-event-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add the following environment variables:
   ```plaintext
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🎯 Usage

1. **🔑 Log In**: Use the Google SSO button to log in.
2. **📋 View Events**: Events are displayed in a table with pagination.
3. **📅 Filter**: Use the date picker to filter events.
4. **🔍 Search**: Type a keyword in the search bar to find events.
5. **📂 Export**: Click the "Export to CSV" button to download event data.
6. **🌗 Dark Mode**: Toggle dark mode for better visibility in low-light environments.

---

## 🗂️ Folder Structure
```
src/
├── components/
│   ├── Dashboard.jsx
│   └── Login.jsx
├── context/
│   └── AuthContext.jsx
├── App.jsx
├── main.jsx
```

---

## 📁 Key Files

### `Dashboard.jsx`
- Handles the core functionality of displaying, filtering, and exporting events.
- Features include Google Calendar API integration and advanced filtering.

### `Login.jsx`
- Manages Google SSO using `@react-oauth/google`.
- Redirects users to the dashboard after a successful login.

### `AuthContext.jsx`
- Provides authentication context across the application.

---

## 🎨 Additional Features
- **⚠️ Error Handling**: Gracefully handles API errors.
- **📱 Responsive Design**: Fully optimized for desktop and mobile devices.
- **⚡ Performance Optimization**: Implements pagination and lazy loading for better performance.

---

## 🚧 Future Enhancements
- Add custom event categories.
- Integrate with other calendar platforms like Outlook.
- Provide analytics for event trends.

---

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📬 Contact
For any queries or suggestions, feel free to reach out:
- **Name**: Smitesh Anil Pednekar
- **Email**: [smiteshpednekar156@gmail.com]


---

# 📇 Contact Management System

A simple web-based Contact Management System (CMS) built using HTML, CSS, JavaScript, and Bootstrap. This app allows users to create, read, update, and delete contact records, with image upload support and persistent storage using `localStorage`.

---

## 🚀 Features

- Add new user records
- Edit existing records
- View user details in a modal
- Delete user entries
- Upload user profile images
- Responsive UI using Bootstrap 5
- Data saved in browser `localStorage`

---

## 🛠️ Tech Stack

- **HTML5** & **CSS3**
- **JavaScript (ES6)**
- **Bootstrap 5** for responsive layout and modals
- **Bootstrap Icons** for actions
- **LocalStorage** for client-side persistence

---

## 📖 How to Use

1. **Create New Contact**
   - Click the **"New User"** button
   - Fill out the form
   - Upload an image (max size: 1MB)
   - Click **Submit**

2. **View Contact**
   - Click the 👁️ icon under the **Action** column
   - View full details in read-only mode

3. **Edit Contact**
   - Click the ✏️ icon
   - Update the fields and image as needed
   - Click **Update**

4. **Delete Contact**
   - Click the 🗑️ icon
   - Confirm to remove the record

---

## 🧩 Challenges Faced

- **Modal Freezing Issue**: Improper modal close logic caused UI freeze. Fixed using Bootstrap modal instance:
  ```js
  let modalEl = bootstrap.Modal.getInstance(document.getElementById('userForm'));
  modalEl.hide();

# Wanderlust

Wanderlust is an Airbnb clone built with Node.js, Express, and MongoDB. It allows users to browse, create, and review property listings, sign up and log in, and interact with a modern web interface. This project demonstrates full-stack web development with authentication, CRUD operations, and RESTful routing.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete property listings
- Add and manage reviews for listings
- Responsive UI with EJS templates
- Error handling and flash messages
- Interactive map integration
- Cloud image upload support

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript templates)
- CSS & JavaScript (client-side)
- Multer & Cloudinary (image uploads)

## Project Structure

```
app.js                # Main application file
cloudConfig.js        # Cloudinary configuration
middleware.js         # Custom middleware
package.json          # Project dependencies
schema.js             # Joi validation schemas
controllers/          # Route controllers
init/                 # Database initialization scripts
models/               # Mongoose models
public/               # Static assets (CSS, JS, images)
routes/               # Express route definitions
utils/                # Utility functions and error classes
views/                # EJS templates
```

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-562/Airbnb-Clone.git
   cd Airbnb-Clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file for MongoDB URI, Cloudinary keys, and session secret.
   ```env
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SESSION_SECRET=your_session_secret
   ```
4. (Optional) Seed the database:
   ```bash
   node init/index.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Usage
- Visit `http://localhost:3000` in your browser.
- Sign up, log in, and explore listings.
- Add new listings and reviews.

## Folder Overview

- **controllers/**: Logic for listings, reviews, and users
- **models/**: Mongoose schemas for data models
- **routes/**: Express route handlers
- **views/**: EJS templates for UI
- **public/**: Static files (CSS, JS, images)
- **utils/**: Error handling and async wrappers


## Author
- [Ayush](https://github.com/ayush-562)

---

**Note:** This project is a personal clone of Airbnb built solely for learning and demonstration purposes. It is not intended for commercial use.

## What I Learned

- Building RESTful APIs with Express and MongoDB
- Implementing user authentication and authorization
- Handling file uploads and cloud storage
- Designing responsive UIs with EJS and CSS
- Error handling and middleware usage in Express
- Structuring a full-stack web application


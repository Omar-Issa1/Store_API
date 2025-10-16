# Store API

A **RESTful Node.js API** for managing and retrieving product data.  
Built using **Express.js** and **MongoDB (Mongoose)**, this project provides advanced filtering, sorting, field selection, and pagination capabilities.

---

## Features

- Fetch all products with flexible query options.
- Support for filters:
  - `featured`
  - `company`
  - `name` (case-insensitive search)
- Numeric filters for:
  - `price`
  - `rating`
- Sorting with `sort` query parameter.
- Field selection with `fields` query parameter.
- Pagination using `page` and `limit`.
- Clean project structure with organized folders.
- Error and not-found handling middleware.

---

## Project Structure

```
Store_API/
│
├── controllers/
│   └── products.js          # Handles main product logic
│
├── db/
│   └── connect.js           # MongoDB connection setup
│
├── middleware/
│   ├── error-handler.js     # Handles errors globally
│   └── not-found.js         # Handles 404 routes
│
├── models/
│   └── product.js           # Product Mongoose schema
│
├── routes/
│   └── products.js          # Defines product routes
│
├── .env.example             # Example environment variables
├── app.js                   # Main server entry point
└── package.json
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Omar-Issa1/Store_API.git
   cd Store_API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** and add your MongoDB URI.

4. **Run the server**
   ```bash
   npm start
   ```

Server will run on:

```
http://localhost:3000
```

---

## Example Queries

### Fetch All Products

```
GET /api/v1/products
```

### Filtering

```
GET /api/v1/products?company=ikea&featured=true
```

### Name Search (case-insensitive)

```
GET /api/v1/products?name=chair
```

### Numeric Filters

```
GET /api/v1/products?numericFilters=price>40,rating>=4
```

### Sorting

```
GET /api/v1/products?sort=price,-rating
```

### Field Selection

```
GET /api/v1/products?fields=name,price,rating
```

### Pagination

```
GET /api/v1/products?page=2&limit=5
```

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

---

## Scripts

| Command     | Description      |
| ----------- | ---------------- |
| `npm start` | Start the server |

---

## Author

**Omar Issa**  
Backend Developer & Node.js Enthusiast  
📧 [omar.issa.contact@gmail.com](mailto:omar.issa.contact@gmail.com)  
🌐 [GitHub Profile](https://github.com/Omar-Issa1)

---

## 🪪 License

This project is licensed under the **MIT License**.

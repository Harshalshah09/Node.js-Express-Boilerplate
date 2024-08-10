# Node.js Express Boilerplate

![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg)
![Express Logo](https://expressjs.com/images/express-facebook-share.png)

A robust and scalable boilerplate for building RESTful APIs using Node.js and Express. This template includes essential features like user authentication with JWT, data validation with Joi, and MongoDB integration with Mongoose. It's designed for rapid development and easy customization.

## Features

- JWT Authentication
- User Registration & Login
- OTP Verification
- Data Validation with Joi
- MongoDB Integration
- Well-structured API Endpoints

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (for local development) or MongoDB Atlas (for cloud-based databases)
- A Google account (for SMTP email sending)

### Cloning the Repository

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repository
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create an `.env` file:**
   - Copy the contents of `example.env` to a new file named `.env`.
   - Replace the placeholders with your actual configuration values.

5. **Start the application:**

   ```bash
   npm start
   ```

   The application will start and listen on `http://localhost:3000`.

## API Routes

### Public Routes

- **POST /api/auth/register**
  - Register a new user.
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: Confirmation message with instructions to verify the email.

- **POST /api/auth/verifyotp**
  - Verify OTP for user registration.
  - Request body: `{ "email": "user@example.com", "otp": "123456" }`
  - Response: Confirmation message for successful verification.

### Protected Routes (Authentication Required)

- **POST /api/books/createbook**
  - Create a new book.
  - Request body: `{ "title": "Sample Book", "author": "Author Name", "publishedDate": "2023-01-01", "summary": "A brief summary of the book." }`
  - Response: The created book object.

- **PUT /api/books/updatebook/:id**
  - Update an existing book by ID.
  - Request body: `{ "title": "Updated Title", "author": "Updated Author", "publishedDate": "2024-01-01", "summary": "Updated summary." }`
  - Response: The updated book object.

- **GET /api/books/getbooks**
  - Retrieve all books.
  - Response: Array of book objects.

- **GET /api/books/getbook/:id**
  - Retrieve a specific book by ID.
  - Response: The book object.

- **DELETE /api/books/deletebook/:id**
  - Delete a book by ID.
  - Response: The deleted book object.

## Validation with Joi

Joi is used for validating the request payloads to ensure data integrity and consistency. The validation schemas are defined in the `src/validations` directory and are applied using middleware functions.

### Example

For book creation, the `createBookSchema` in `book.validation.js` validates the following fields:

- `title`: A string that is required.
- `author`: A string that is required.
- `publishedDate`: A date that is required.
- `summary`: A string that is required.

Invalid requests will receive a `400 Bad Request` response with validation error details.

## Example Bookstore Application

This boilerplate includes an example bookstore API with CRUD operations. You can use the provided routes to manage books and demonstrate how the application handles data validation and user authentication.

Feel free to extend and customize this boilerplate to fit your specific needs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Replace `your-username` and `your-repository` with your actual GitHub username and repository name. Feel free to adjust the content as needed!

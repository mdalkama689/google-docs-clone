# Google Docs Clone
A Google Docs clone built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides real-time document editing and collaboration features similar to Google Docs.

## Features

- **Real-Time Collaboration:** Multiple users can edit the same document simultaneously with real-time updates using Socket.IO.
- **Rich Text Editing:** Comprehensive text formatting options provided by Quill.js.
- **User Authentication:** Secure user login and registration using JWT.
- **Document Management:** Create, edit, and manage documents with an intuitive UI.
- **Responsive Design:** Designed to work seamlessly across different devices using Tailwind CSS.

## Technologies Used

- **Frontend:**
  - React
  - Taiwlind css
  - Quilljs
  
- **Backend:**
  - Node.js
  - Express.js 
- **Authentication:**
  - jsonwebtoken


## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)

### Installation

1. **Clone the Repository:**
   \`\`\`bash
   git clone https://github.com/mdalkama689/google-docs-clone.git
   \`\`\`

2. **Navigate to the Project Directory:**
   \`\`\`bash
   cd google_docs_clone
   \`\`\`

   For the frontend:
   \`\`\`bash
   cd client
   npm install
   \`\`\`

   For the backend:
   \`\`\`bash
   cd ../backend
   npm install
   \`\`\`## Environment Variables

Ensure that you have a `.env` file in your `backend` directory with the following variables:

- `MONGO_URI`: The URI for connecting to your MongoDB instance. Example: `mongodb://localhost:27017/mydatabase`.
- `PORT`: The port number on which the backend server will run. Default is `5000`.
- `CLIENT_URL`: The URL of your client application. Default is `http://localhost:3000`.
- `JWT_SECRET_KEY`: The secret key used for signing JWTs. Example: `your-jwt-secret-key`.



4. **Start the Development Server:**

   Separate commands for client and server:
   \`\`\`bash
   cd ../client
   npm run dev
   \`\`\`
   \`\`\`bash
   cd ../backend
   npm start
   \`\`\`



5. **Visit the Application:**

   Open your browser and navigate to \`http://localhost:3000\` to start using the app.

## Usage

- **edit docs:** Multiple users can edit the same document simultaneously with real-time updates using Socket.IO..


## Contributing

Feel free to fork the repository and submit pull requests with improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


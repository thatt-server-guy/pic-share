# PicShare

PicShare is a cloud-native photo-sharing platform built with React, Node.js, and MongoDB Atlas. This application allows users to upload images, like and comment on them, and manage their accounts through a simple and intuitive interface.

## Features

- **Authentication**: Users can log in, sign up, and log out securely.
- **Image Upload**: Authenticated users can upload images with captions, which are stored in Azure Blob Storage.
- **Like & Comment System**: Users can like/unlike images and leave comments.
- **View & Search**: Users can view all uploaded images in a grid format and search by caption or username.

## Tech Stack

- **Frontend**: React with functional components and hooks, styled with Tailwind CSS.
- **Backend**: Node.js with Express, using MongoDB Atlas for data storage and Azure Blob Storage for image storage.

## Directory Structure

```
picshare
├── client          # Frontend application
│   ├── src
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server          # Backend application
│   ├── src
│   ├── package.json
│   └── tsconfig.json
├── .env.example    # Example environment variables
├── .gitignore      # Git ignore file
├── docker-compose.yml # Docker configuration
└── README.md       # Project documentation
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd picshare
   ```

2. Set up the backend:
   - Navigate to the `server` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your environment variables.
   - Start the server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `client` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the client:
     ```
     npm start
     ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
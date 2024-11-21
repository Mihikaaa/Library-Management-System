# Project Overview
This Library Management System is a web application designed to help users manage book records effectively. The application includes functionality for creating, reading, updating, and deleting (CRUD) book records, as well as optional user authentication for enhanced security. It consists of a C# .NET backend integrated with an SQLite database and a React with TypeScript frontend, ensuring a seamless user experience.

# Technologies Used
Backend:
- C# .NET
- Entity Framework Core
- SQLite Database

Frontend:
- React
- TypeScript
- Axios (for API communication)

# Setup Instructions
System Requirements: 

- Node.js (v14 or above)
- .NET 9 SDK
- A compatible code editor (e.g., Visual Studio Code or Visual Studio)
- Browser for testing
- Git (for version control)

# Backend Setup

1. Clone the Repository
git clone https://github.com/Library-Management-System/library-management-system.git
cd LibraryManagementSystemBackend

2. Restore Dependencies Run the following command to restore all NuGet dependencies:
`dotnet restore`

3. Database Migration Create the SQLite database and apply migrations:
`dotnet ef migrations add InitialCreate`
`dotnet ef database update`

4. Run the Backend Start the backend server by running:
`dotnet run`

# The API will be accessible at http://localhost:5105.

# Frontend Setup

1. Navigate to the Frontend Directory
`cd library-management-system-frontend`

2. Install Dependencies Install the required npm packages by running:
`npm install`

3. Start the Frontend Start the React development server:
`npm start`

# The application will be available at http://localhost:3000.

# Testing Instructions
Access the application at http://localhost:3000 in your browser.

Use the following features:
- Login/Register: Create an account and log in.
- Dashboard: View statistics and quick navigation.
- Add Book: Add new books to the library.
- View Books: Search, update, or delete existing book records.
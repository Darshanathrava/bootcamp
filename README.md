# Campus Voice

A campus news and announcements platform designed to keep students informed about the latest updates, activities, and important information from their college.

## Overview

**Campus Voice** is a web-based platform that provides a centralized place to access campus news and announcements. It uses MongoDB to store news data and a Node.js backend to handle application requests.

The project can be run locally for development or deployed to Vercel for online access.

## Features

- **Campus News Management:** Store and retrieve campus news from MongoDB.
- **Centralized Updates:** Keep campus-related information accessible through a single website.
- **Database Integration:** Use MongoDB to persist news data.
- **API Support:** Handle news requests through backend API endpoints.
- **Local Development:** Run the application on your local machine.
- **Cloud Deployment:** Deploy the application using Vercel and MongoDB Atlas.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Web page structure |
| CSS | Styling and layout |
| JavaScript | Client-side functionality |
| Node.js | Server-side runtime |
| MongoDB | News data storage |
| Vercel | Application deployment |

## Project Structure

```text
bootcamp/
├── api/                 # API routes
├── data/                # Project data
├── clg.html             # Campus website interface
├── news-store.js        # News storage logic
├── server.js            # Application server
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
├── vercel.json          # Vercel configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- [MongoDB](https://www.mongodb.com/) locally or a MongoDB Atlas account
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Darshanathrava/bootcamp.git
cd bootcamp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

The application uses MongoDB to store campus news. Configure the database connection before starting the server.

For a local MongoDB instance, run the following in **Windows PowerShell**:

```powershell
$env:MONGODB_URI = "mongodb://127.0.0.1:27017"
```

The default database is `campus_voice`. To use a different database, optionally set:

```powershell
$env:MONGODB_DB = "your_database_name"
```

For MongoDB Atlas, use your Atlas connection string instead:

```powershell
$env:MONGODB_URI = "your_mongodb_atlas_connection_string"
```

Replace the example value with your actual connection string. Never commit database credentials or secrets to GitHub.

### 4. Start the Application

```bash
npm start
```

Once the server starts successfully, open:

```text
http://localhost:3000
```

Keep the terminal running while using the application.

## Deployment

Campus Voice can be deployed to [Vercel](https://vercel.com/) with MongoDB Atlas as its database.

1. Push the project to your GitHub repository.
2. Sign in to Vercel and import the repository.
3. Create a MongoDB Atlas database and configure a database user.
4. Add the following environment variables in your Vercel project settings:
   - `MONGODB_URI` — your MongoDB Atlas connection string.
   - `MONGODB_DB` — optional database name; defaults to `campus_voice`.
5. Deploy the application and check the deployment logs for errors.
6. Open the generated Vercel URL to access the website.

The project handles campus-news API requests through `/api/news`. Ensure that the database connection and deployment configuration are correct before testing the deployed application.

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGODB_DB` | Database name | No |

Keep sensitive configuration in environment variables. Do not publish database passwords, API keys, or other secrets in source code.

## Future Enhancements

Potential improvements for the project include:

- Student and administrator authentication.
- News categories and search functionality.
- Announcement notifications.
- An administrative dashboard for managing news.
- Responsive improvements for mobile devices.

These are potential enhancements and are not necessarily implemented in the current version.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and test your changes.
4. Commit your updates with a descriptive message.
5. Open a pull request describing your contribution.

## Author

**Darshan Atharva**

- GitHub: [@Darshanathrava](https://github.com/Darshanathrava)
- Project Repository: [Campus Voice — Bootcamp](https://github.com/Darshanathrava/bootcamp)

## License

No license information is currently specified in this README. Add a license if you intend to define how others may use, modify, or distribute this project.

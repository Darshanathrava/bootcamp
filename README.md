# Campus Voice

Campus news is stored in MongoDB. Install dependencies and configure the connection string before starting the server:

```powershell
npm install
$env:MONGODB_URI = "mongodb://127.0.0.1:27017"
npm start
```

The app uses the `campus_voice` database and its `news` collection by default. Set `MONGODB_DB` to use a different database. For MongoDB Atlas, set `MONGODB_URI` to your Atlas connection string; keep credentials in environment variables and do not commit them.

Open `http://localhost:3000` after the server starts.

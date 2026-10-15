# Campus Voice

Campus news is stored in MongoDB. The site can run locally with Node.js or deploy to Vercel.

## Deploy to Vercel

1. Push this project to a GitHub repository and import that repository in Vercel.
2. Create a MongoDB Atlas database. In Atlas, create a database user and allow network access from Vercel (for a quick setup, allow access from anywhere, `0.0.0.0/0`; use a least-privilege database user).
3. In the Vercel project settings, add `MONGODB_URI` with the Atlas connection string, including the database user's credentials. Optionally set `MONGODB_DB`; the default database is `campus_voice`.
4. Set the environment variables for the Production environment (and Preview if needed), then redeploy.
5. Open the deployed Vercel URL. Campus-news GET and POST requests are handled by the serverless route at `/api/news`.

Keep the connection string in Vercel environment variables. Do not commit it to the repository.

## Run locally

Install dependencies and set the same MongoDB variables in PowerShell:

```powershell
npm install
$env:MONGODB_URI = "mongodb://127.0.0.1:27017"
npm start
```

Open `http://localhost:3000`. The optional `MONGODB_DB` variable selects a database other than `campus_voice`.

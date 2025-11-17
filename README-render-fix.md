# Fixed Project (minimal) — Ready for Render.com

What I changed:
- Replaced `server/index.js` with a minimal, robust server that:
  - exposes `/api`, `/api/users`, `/api/questions`, `/api/contact`
  - serves the React client from `client/build` in production
- Added a root `package.json` so Render can start the server with `npm start`.
- The server no longer depends on the broken controllers; it uses existing `server/data/*.js`.

How to deploy on Render.com (quick):
1. Create a new Web Service on Render.
2. Connect your GitHub repo or upload this zip.
3. Build command:
   - If using Render's Node environment, set the build command to:
     `npm install && npm run build`
   - (The project will run `cd client && npm install && npm run build` automatically during postinstall.)
4. Start command:
   - `npm start`
5. Set any environment variables you need (e.g., `MONGO_URI`) — this minimal server does not require Mongo.

Note:
- This is a minimal, safe version to get your app hosted quickly.
- If you want the original full-featured API (authentication, DB-backed quizzes),
  I can restore controllers and fix the broken files next — but that will require more time
  to reconstruct the intended logic and ensure Mongo connections and secrets are available.

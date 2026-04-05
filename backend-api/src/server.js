//import https from "https";
import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const pfxPath = path.resolve(__dirname, "..", process.env.HTTPS_PFX_PATH || "./cert/server.pfx");
const passphrase = process.env.HTTPS_PFX_PASSPHRASE;

async function startServer() {
  await connectDatabase();

  const httpsOptions = {
    pfx: fs.readFileSync(pfxPath),
    passphrase
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Secure backend API running on https://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
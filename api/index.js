// Vercel serverless function — imports the pre-built Express app.
// The build command runs esbuild first, so this file imports compiled JS,
// not TypeScript. Vercel never touches the monorepo source directly.
import app from "../artifacts/api-server/dist/app.mjs";

export default app;

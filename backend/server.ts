import app from "./src/app";
import ENV from "./src/config/environments";

const PORT = ENV.Port || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

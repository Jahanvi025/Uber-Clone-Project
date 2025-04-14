import http from "http";
import {app} from "./app.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import dotenv from "dotenv";

import * as DatabaseService from "./services/databaseService";

import { createApp } from "./createApp";

dotenv.config();
DatabaseService.connect();

const port = process.env.PORT || 3000;

const app = createApp();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

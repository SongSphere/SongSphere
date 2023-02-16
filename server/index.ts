import createApp from "./app";

// import db
import { connect } from "./db/connect";
import { IUser } from "./db/user";

connect(process.env.DB_NAME);

const port = process.env.PORT || "8080";

const app = createApp(process.env.DB_NAME);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

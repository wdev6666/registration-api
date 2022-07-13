const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", require("./routers/user.router"));
app.use("/posts", require("./routers/post.router"));

// Global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

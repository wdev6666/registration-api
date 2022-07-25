const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error-handler");

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< HEAD
app.use("/api/users", require("./routers/user.router"));
app.use("/api/posts", require("./routers/post.router"));
=======
app.use("/users", require("./routers/user.router"));
app.use("/posts", require("./routers/post.router"));
app.use("/test", require("./routers/test.router"));
>>>>>>> d6317e7ae50c5c027716c8aaf467f74ae9212a8b

// Global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

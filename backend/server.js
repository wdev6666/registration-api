const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error-handler");
const multer = require("multer");

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded");
  } catch (e) {
    console.log(e);
  }
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", require("./routers/user.router"));
app.use("/api/posts", require("./routers/post.router"));
app.use("/api/test", require("./routers/test.router"));

// Global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

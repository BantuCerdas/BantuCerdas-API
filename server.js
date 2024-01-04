require("dotenv").config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    status: "success",
    error: false,
    message: "Welcome to BantuCerdas API v1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});

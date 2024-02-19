

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// importing routes
const user = require("./routes/user2");
app.use("/api", user);

//connecting to db
const connectWithDb = require("./config/database");
connectWithDb();

//start the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
})

app.get("/", (req,res) => {
    res.send(`<h1>This is my homePage baby</h1>`)
})
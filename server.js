const express = require("express");

const mongoose = require("mongoose");

const ShortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  const urlExist = await ShortUrl.findOne({
    full: req.body.fullUrl,
    short: req.body.shortUrl,
  });

  if (urlExist) {
    res.redirect("/");
    return;
  }

  await ShortUrl.create({ full: req.body.fullUrl, short: req.body.shortUrl });

  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(PORT, () => {
  console.log(`listening on Port :${PORT}`);
});

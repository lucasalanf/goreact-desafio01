const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

const logMiddleware = (req, res) => {
  if (req.body.idade) {
    let idade = parseInt(req.body.idade);

    if (idade > 18) {
      return res.render("major", { idade });
    }
    return res.render("minor", { idade });
  }
  return res.redirect("/");
};

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("formulario");
});

app.get("/minor", logMiddleware, (req, res) => {
  return res.render("minor");
});

app.get("/major", logMiddleware, (req, res) => {
  return res.render("major");
});

app.post("/check", logMiddleware, (req, res) => {});

app.listen(3002);

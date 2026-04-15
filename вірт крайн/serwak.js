const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let users = [];

// МОВИ
const lang = {
  ua: {
    title: "ІМПЕРІЯ ВОРОНІЯ",
    join: "Приєднатись",
    emperor: "Імператор Двох Крил"
  },
  vr: {
    title: "VORONIA IMPERIUM",
    join: "Zhar Vorn!",
    emperor: "Dominus Corvus"
  }
};

app.get("/", (req, res) => {
  const l = req.query.lang || "ua";

  res.send(`
    <html>
    <body style="background:black;color:white;text-align:center;">
      <h1>${lang[l].title}</h1>
      <p>${lang[l].emperor}</p>

      <form method="POST" action="/join">
        <input name="name" placeholder="Ім'я">
        <button>${lang[l].join}</button>
      </form>

      <br>
      <a href="/?lang=ua">UA</a> | 
      <a href="/?lang=vr">VR</a>

      <h3>Громадяни:</h3>
      ${users.map(u => `<p>${u}</p>`).join("")}
    </body>
    </html>
  `);
});

app.post("/join", (req, res) => {
  users.push(req.body.name);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server started"));
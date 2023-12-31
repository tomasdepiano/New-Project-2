import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import User from "./models/User.model.js";
import Score from "./models/Score.model.js";
import { db } from "./config/db.js";

const app = express();
const port = "5444";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

app.post("/createAccount", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where: { email } });

  if (user) {
    res.json({ success: false, message: "Email already in use" });
  } else {
    User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    });
    res.json({
      success: true,
      message: "Your account has been created, go back and login.",
    });
  }
});

app.get("/data", async (req, res) => {
  const data = await User.findAll();
  console.log(data);
  res.json(data);
});

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user && user.password === password) {
    req.session.userId = user.userId;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/logout", (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    req.session.destroy();
    res.json({ success: true });
  }
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);

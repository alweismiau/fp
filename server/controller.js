import express from "express";
import bodyParser from "body-parser";
import { db, auth } from "./config.js";
// const app = express.app();
const app = express();
app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.json());
// import {
//   increment
// } from "firebase/firestore";
import{
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// show all
app.get("/all", (req, res) => {
  try {
    db.collection("links")
      .get()
      .then((querySnapshot) => {
        let links = [];
        querySnapshot.forEach((doc) => {
          links.push({ id: doc.id, ...doc.data() });
        });
        res.send(links);
      });
  } catch (error) {
    res.send(error);
  }
});

// show by shortedLink
app.get("/show/:shortLink", (req, res) => {
  try {
    db.collection("links")
      .get()
      .then((querySnapshot) => {
        let links = [];
        querySnapshot.forEach((doc) => {
          links.push({ id: doc.id, ...doc.data() });
        });
        links = links.find((item) => item.shortLink === req.params.shortLink);
        db.collection("links")
          .doc(links.id)
          .update({
            clickCount: increment(1),
          });
        res.send(links);
      });
  } catch (error) {
    res.send(error);
  }
});

//regis
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//login

// add link
app.post("/add", (req, res) => {
  const { destination, shortLink, title } = req.body;

  try {
    db.collection("links").add({
      destination: destination,
      shortLink: shortLink,
      title: title,
      clickCount: 0,
    });
    res.send({
      status: true,
      message: "Data berhasil disimpan",
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal disimpan",
    });
  }
});

// update link
app.post("/update/:id", (req, res) => {
  try {
    const { destination, shortLink } = req.body;
    db.collection("links").doc(req.params.id).update({
      destination: destination,
      shortLink: shortLink,
    });
    res.send({
      status: true,
      message: "Data berhasil disimpan",
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal disimpan",
    });
  }
});

// delete link
app.delete("/delete/:id", (req, res) => {
  try {
    db.collection("links")
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.send({
          status: true,
          message: "Data berhasil dihapus",
        });
      });
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal dihapus",
    });
  }
});

export default app;

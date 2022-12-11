import express from "express";
import bodyParser from "body-parser";
import { db, auth } from "./config.js";
const router = express.Router();
router.use(bodyParser.json());
import { increment } from "firebase/firestore";
// show all
router.get("/all", (req, res) => {
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
router.get("/show/:shortLink", (req, res) => {
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

// add link
router.post("/add", (req, res) => {
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
router.post("/update/:id", (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
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

// //Count Click
// router.post("/click/:id", (req, res) => {
//   try {
//     db.collection("links")
//       .doc(req.params.id)
//       .update({
//         clickCount: increment(1),
//       });
//     res.send({
//       status: true,
//       message: "Data berhasil disimpan",
//     });
//   } catch (error) {
//     res.send({
//       status: false,
//       message: "Data gagal disimpan",
//     });
//   }
// });
export default router;

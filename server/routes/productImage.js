const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product-image",
  upload.single("image"),
  async (req, res) => {

    const product_id = req.body.product_id;

    const image_url = req.file.filename;

    // DB 저장

    res.json({
      success: true,
      product_id,
      image_url,
    });
  }
);

module.exports = router;
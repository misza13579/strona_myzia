const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream(
            { folder: "uploaded_files" },
            (error, result) => {
                if (error) {
                    console.error("Błąd przesyłania:", error);
                    return res.status(500).send("Wystąpił błąd podczas przesyłania.");
                }
                res.status(200).json({ url: result.secure_url });
            }
        );
        req.file.stream.pipe(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Błąd serwera.");
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});


require("dotenv").config(); // Obsługa pliku .env
const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");

const app = express();
app.use(cors()); // Pozwala na połączenia z frontendem
app.use(express.json());

// Konfiguracja Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfiguracja Multer + Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // Nazwa folderu na Cloudinary
        allowed_formats: ["jpg", "png", "jpeg", "pdf"], // Dozwolone formaty
    },
});

const upload = multer({ storage });

// Endpoint do przesyłania plików
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ url: req.file.path }); // Zwraca URL przesłanego pliku
});

// Endpoint do pobierania listy plików
app.get("/files", async (req, res) => {
    try {
        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: "uploads", // Folder z plikami
        });
        res.json({ files: result.resources.map((file) => file.secure_url) });
    } catch (error) {
        res.status(500).json({ error: "Błąd pobierania plików" });
    }
});

// Uruchomienie serwera
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

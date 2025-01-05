import React, { useState } from "react";

const Pliki = () => {
    const [file, setFile] = useState(null); // Przechowuje wybrany plik
    const [imageUrl, setImageUrl] = useState(""); // Przechowuje URL przesłanego pliku
    const [uploadedFiles, setUploadedFiles] = useState([]); // Przechowuje listę przesłanych plików

    // Obsługuje wybór pliku przez użytkownika
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Obsługuje przesyłanie pliku na serwer
    const handleUpload = async () => {
        if (!file) {
            alert("Najpierw wybierz plik!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.url); // URL przesłanego pliku
                setUploadedFiles((prev) => [...prev, data.url]); // Dodajemy do listy przesłanych plików
                alert("Plik przesłany!");
            } else {
                alert("Błąd przesyłania.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    };

    // Obsługuje pobieranie listy plików z serwera
    const handleFetchFiles = async () => {
        try {
            const response = await fetch("http://localhost:5000/files"); // Endpoint do pobierania plików
            const data = await response.json();
            setUploadedFiles(data.files); // Ustawiamy listę plików
        } catch (error) {
            console.error("Błąd pobierania plików:", error);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3 grid-rows-[1fr_3fr_1fr] h-[90%] justify-center rounded m-10 p-3 bg-red-300">
            {/* Wybieranie pliku */}
            <div className="flex items-center justify-center col-span-2">
                <input type="file" onChange={handleFileChange} />
            </div>

            {/* Wyświetlanie przesłanego pliku */}
            <div className="bg-green-500 h-full w-full rounded flex flex-col items-center justify-center col-span-2">
                {imageUrl && (
                    <div>
                        <p>Przesłany plik:</p>
                        <img src={imageUrl} alt="Uploaded" className="h-32 w-auto" />
                    </div>
                )}
                {!imageUrl && <p>Brak przesłanego pliku</p>}
            </div>

            {/* Przycisk przesyłania */}
            <div className="flex items-center justify-center">
                <button
                    onClick={handleUpload}
                    className="bg-red-400 text-white rounded h-12 w-24"
                >
                    Wyślij
                </button>
            </div>

            {/* Przycisk pobierania listy plików */}
            <div className="flex items-center justify-center">
                <button
                    onClick={handleFetchFiles}
                    className="bg-blue-400 text-white rounded h-12 w-24"
                >
                    Pobierz pliki
                </button>
            </div>

            {/* Lista przesłanych plików */}
            <div className="col-span-2 flex flex-col items-center">
                <h2 className="text-lg font-bold">Lista przesłanych plików:</h2>
                <ul className="list-disc">
                    {uploadedFiles.map((fileUrl, index) => (
                        <li key={index}>
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {fileUrl}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pliki;

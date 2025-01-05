import React, { useState } from "react";

const Pliki = () => {
    const [file, setFile] = useState(null); // Przechowuje wybrany plik
    const [imageUrl, setImageUrl] = useState(""); // Przechowuje URL przesłanego pliku
    const [uploadedFiles, setUploadedFiles] = useState([]); // Lista przesłanych plików
    const [loading, setLoading] = useState(false); // Stan ładowania

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
            setLoading(true); // Ustawiamy stan ładowania
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.url); // Zapisujemy URL przesłanego pliku
                setUploadedFiles((prev) => [...prev, data.url]); // Aktualizujemy listę plików
                alert("Plik przesłany!");
            } else {
                alert("Błąd przesyłania.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        } finally {
            setLoading(false); // Wyłączamy ładowanie
        }
    };

    // Pobieranie listy plików z serwera
    const handleFetchFiles = async () => {
        try {
            setLoading(true); // Ustawiamy stan ładowania
            const response = await fetch("http://localhost:5000/files");
            const data = await response.json();
            setUploadedFiles(data.files); // Zapisujemy listę plików
        } catch (error) {
            console.error("Błąd pobierania plików:", error);
        } finally {
            setLoading(false); // Wyłączamy ładowanie
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Nagłówek */}
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Przesyłanie plików</h1>

            {/* Sekcja wyboru pliku */}
            <div className="mb-4 w-full max-w-md">
                <label
                    htmlFor="fileInput"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Wybierz plik do przesłania:
                </label>
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
            </div>

            {/* Sekcja przesyłania */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
                    disabled={loading}
                >
                    {loading ? "Przesyłanie..." : "Wyślij"}
                </button>
                <button
                    onClick={handleFetchFiles}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                    Pobierz pliki
                </button>
            </div>

            {/* Wyświetlanie przesłanego pliku */}
            {imageUrl && (
                <div className="mb-6 w-full max-w-md">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Przesłany plik:
                    </p>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-full rounded border"
                    />
                </div>
            )}

            {/* Lista przesłanych plików */}
            <div className="w-full max-w-md">
                <h2 className="text-lg font-bold text-gray-700 mb-4">
                    Lista przesłanych plików:
                </h2>
                {uploadedFiles.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
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
                ) : (
                    <p className="text-sm text-gray-500">
                        Nie przesłano jeszcze żadnych plików.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Pliki;

import React, { useEffect, useState } from "react";

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Pobieranie listy plików
        const fetchFiles = async () => {
            try {
                const response = await fetch("http://localhost:5000/files");
                const data = await response.json();
                setFiles(data.files); // Zapisanie listy plików w stanie
            } catch (error) {
                console.error("Błąd podczas pobierania plików:", error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Lista przesłanych plików:</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.public_id}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            {file.url}
                        </a>
                        {/* Przycisk wyboru */}
                        <button onClick={() => alert(`Wybrałeś plik: ${file.url}`)}>
                            Wybierz
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;

import React from "react";
const [file, setFile] = useState(null);
const [imageUrl, setImageUrl] = useState("");

const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};
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
            setImageUrl(data.url);
            alert("Plik przesłany!");
        } else {
            alert("Błąd przesyłania.");
        }
    } catch (error) {
        console.error("Błąd:", error);
    }
};


const Pliki = () => {
    return (
        <div className="grid grid-cols-2 gap-3 grid-rows-[1fr_3fr_1fr] h-[90%] justify-center rounded m-10 p-3 bg-red-300">
            <div className="flex items-center justify-center col-span-2">
            <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center col-span-2">
                <p className="opacity-50">Upuść plik</p>
            </div>
            </div>

            <div className="bg-red-300 h-full w-full rounded flex items-center justify-center col-span-2">
                hej
            </div>
            <div className="flex items-center justify-center">
            <button className="bg-red-400 text-white rounded  h-12 w-24 ">
                hej
            </button>
            </div>

            <div className="flex items-center justify-center">
            <button className="bg-red-400 text-white rounded  h-12 w-24 ">
                hej
            </button>
            </div>
            
        </div>
    );
}

export default Pliki;

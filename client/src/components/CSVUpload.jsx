import { useState } from "react";
import API from "../services/api";

function CSVUpload({
  fetchExpenses,
  darkMode,
}) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a CSV file");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post(
        "/expenses/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("CSV uploaded successfully!");

      setFile(null);

      fetchExpenses();

    } catch (error) {
      console.log(error);
      alert("CSV Upload Failed");
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-6"
          : "bg-white border border-gray-200 rounded-2xl shadow-lg p-6"
      }
    >
      <h2
        className={
          darkMode
            ? "text-white text-3xl font-bold mb-6"
            : "text-black text-3xl font-bold mb-6"
        }
      >
        Import Transactions
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className={
            darkMode
              ? "w-full bg-slate-900 border border-slate-600 text-white file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg rounded-lg p-2"
              : "w-full bg-white border border-gray-300 text-black file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg rounded-lg p-2"
          }
        />

        <button
          onClick={handleUpload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition duration-300"
        >
          Upload CSV
        </button>

      </div>

      {file && (
        <p
          className={
            darkMode
              ? "text-gray-300 mt-4"
              : "text-gray-600 mt-4"
          }
        >
          Selected File: <strong>{file.name}</strong>
        </p>
      )}
    </div>
  );
}

export default CSVUpload;
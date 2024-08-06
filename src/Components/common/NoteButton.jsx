import React from 'react';

// Icon untuk note
const NoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 5.75v12.5a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75v-7.75m-13-3.75L19.5 2.25v0A.75.75 0 0120.25 3v15a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75z"
    />
  </svg>
);

// Komponen tombol note
const NoteButton = ({ isUploader, noteMessage }) => {
  const handleClick = () => {
    if (isUploader) {
      alert(noteMessage);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      {isUploader ? (
        <button
          onClick={handleClick}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out"
        >
          <NoteIcon />
          <span className="ml-2">Note</span>
        </button>
      ) : (
        <div className="text-gray-500 italic">Hanya pengunggah yang dapat melihat catatan ini.</div>
      )}
    </div>
  );
};

export default NoteButton;

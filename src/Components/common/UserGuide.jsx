import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GuideStep({ title, description, images, isNote }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:space-x-6 ${isNote ? 'mb-8' : ''}`}>
      {isNote ? (
        <div className="border border-yellow-500 bg-yellow-50 text-yellow-800 p-4 rounded-lg w-full">
          <p className="font-semibold">
            <span className="text-m font-black">Catatan</span>
            <br />
            {description}
          </p>
        </div>
      ) : (
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          {images.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt={title}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GuideContent({ steps }) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <GuideStep key={index} {...step} />
      ))}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function UserGuide() {
  const [selectedGuide, setSelectedGuide] = useState('upload');
  const navigate = useNavigate();

  const uploadSteps = [
    {
      title: 'Langkah 1: Buka Halaman Upload',
      description: 'Pertama, klik halaman upload di website lookasee.',
      images: ['/images/uploadStep1.png'],
    },
    {
      title: 'Langkah 2: Pilih Gambar',
      description: "Klik tombol 'click to upload' untuk memilih gambar dari perangkat Anda.",
      images: [
        '/images/uploadStep2.png',
        '/images/uploadStep2_2.png',
      ],
    },
    {
      title: 'Langkah 3: Isi Data',
      description: 'Setelah memilih gambar, isi semua data terkait barang yang ingin diunggah.',
      images: ['/images/uploadStep3.png'],
    },
    {
      title: 'Langkah 4: Unggah',
      description: 'Klik "unggah".',
      images: ['/images/uploadStep4.png'],
    },
    {
      title: 'Langkah 5: Unggahan Berhasil',
      description: 'Apabila unggahan berhasil, akan muncul pop up seperti berikut ini.',
      images: ['/images/uploadStep5.png'],
    },
    {
      title: 'Langkah 6: Cek Unggahan',
      description: 'Cek unggahan pada halaman pencarian.',
      images: ['/images/uploadStep6.png'],
    },
  ];

  const confirmSteps = [
    {
      description: 'Hanya pengunggah yang dapat mengakses fitur ini.',
      isNote: true,
    },
    {
      title: 'Langkah 1: Buka Halaman Pencarian',
      description: 'Pertama, buka halaman pencarian di website lookasee.',
      images: ['/images/confirmStep1.png'],
    },
    {
      title: 'Langkah 2: Pilih Barang',
      description: 'Pilih barang yang anda unggah.',
      images: ['/images/confirmStep2.png'],
    },
    {
      title: 'Langkah 3: Klik Konfirmasi',
      description: 'Klik tombol "Konfirmasi barang sudah kembali ke pemiliknya".',
      images: ['/images/confirmStep3.png'],
    },
    {
      title: 'Langkah 4: Konfirmasi',
      description: 'Klik tombol "konfirmasi".',
      images: ['/images/confirmStep4.png'],
    },
    {
      title: 'Langkah 5: Konfirmasi Selesai',
      description:
        'Tombol konfirmasi berubah tulisan menjadi "Barang sudah kembali" dengan latar belakang berwarna hijau.',
      images: ['/images/confirmStep5.png'],
    },
  ];

  const chatSteps = [
    {
      description: 'Hanya bukan pengunggah (barang terkait) yang dapat mengakses fitur ini.',
      isNote: true,
    },
    {
      title: 'Langkah 1: Buka Halaman Pencarian',
      description: 'Pertama, buka halaman pencarian di website lookasee.',
      images: ['/images/chatStep1.png'],
    },
    {
      title: 'Langkah 2: Pilih Barang',
      description: 'Pilih barang yang anda maksud.',
      images: ['/images/chatStep2.png'],
    },
    {
      title: 'Langkah 3: Klik Hubungi',
      description: 'Klik tombol "Hubungi".',
      images: ['/images/chatStep3.png'],
    },
    {
      title: 'Langkah 4: Klik Kirim Pesan',
      description: 'Klik tombol "Kirim pesan".',
      images: ['/images/chatStep4.png'],
    },
    {
      title: 'Langkah 5: Kirimkan Pesan',
      description:
        'Ketik pesan yang ingin anda kirimkan kepada pengunggah barang, kemudian klik tombol "Send".',
      images: ['/images/chatStep5.png'],
    },
    {
      title: 'Langkah 6: Pesan Berhasil Terkirim',
      description:
        'Pesan yang anda kirimkan berlatar belakang biru, sedangkan yang dihubungi berlatar belakang putih.',
      images: ['/images/chatStep6.png'],
    },
  ];

  return (
    <div className="bg-bg_utama py-8 px-2 sm:px-4 md:px-8 lg:px-16">
  <div className="max-w-full md:max-w-5xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-lg relative">
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-transparent text-gray-600 hover:text-gray-800 transition duration-300"
    >
      <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    </button>
    <h1 className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6">
      Panduan Penggunaan
    </h1>

    <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8 justify-center md:justify-start">
      <button
        onClick={() => setSelectedGuide('upload')}
        className={`w-full sm:w-auto py-2 px-4 rounded-lg text-white font-semibold ${
          selectedGuide === 'upload' ? 'bg-blue-600' : 'bg-gray-400'
        }`}
      >
        Cara Mengunggah Barang
      </button>
      <button
        onClick={() => setSelectedGuide('confirm')}
        className={`w-full sm:w-auto py-2 px-4 rounded-lg text-white font-semibold ${
          selectedGuide === 'confirm' ? 'bg-blue-600' : 'bg-gray-400'
        }`}
      >
        Cara Konfirmasi Barang Sudah Kembali
      </button>
      <button
        onClick={() => setSelectedGuide('chat')}
        className={`w-full sm:w-auto py-2 px-4 rounded-lg text-white font-semibold ${
          selectedGuide === 'chat' ? 'bg-blue-600' : 'bg-gray-400'
        }`}
      >
        Cara Menghubungi Pengunggah Barang
      </button>
    </div>

    <div className="px-2">
      {selectedGuide === 'upload' && <GuideContent steps={uploadSteps} />}
      {selectedGuide === 'confirm' && <GuideContent steps={confirmSteps} />}
      {selectedGuide === 'chat' && <GuideContent steps={chatSteps} />}
    </div>
  </div>
</div>

  );
}

export default UserGuide;

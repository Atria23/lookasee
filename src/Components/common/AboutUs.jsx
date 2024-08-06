import React from 'react';
import { useNavigate } from "react-router-dom";

const CloseIcon = () => (
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

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg_utama py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 bg-transparent text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <CloseIcon />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Tentang Kami
        </h1>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Asal Usul Lookasee
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Web pencarian barang ini didirikan dengan tujuan untuk memudahkan
            masyarakat dalam mencari dan menemukan barang-barang yang mereka
            butuhkan. Ini berawal dari sebuah ide sederhana untuk menggabungkan
            berbagai informasi tentang kehilangan barang atau penemuan barang
            dalam satu tempat yang terintegrasi, sehingga masyarakat tidak perlu
            lagi mencari di berbagai sumber yang berbeda.
          </p>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Misi</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Misi kami adalah untuk memberikan pengalaman terbaik dalam mencari
            barang secara online. Kami berkomitmen untuk menyediakan platform
            yang aman, cepat, dan mudah digunakan. Kami percaya bahwa teknologi
            dapat membuat proses pencarian barang menjadi lebih efisien dan
            mudah.
          </p>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tim</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Kami adalah tim yang terdiri dari para mahasiswa di bidang
            informatika. Dengan berbagai latar belakang dan keahlian, kami
            bekerja sama untuk mencapai visi dan misi kami dalam menyediakan
            layanan pencarian barang hilang terbaik untuk Anda.
          </p>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">KAMI</h2>
          <div className="grid grid-cols-3">
            <img
              src="/images/user.png"
              alt="Asal Usul"
              className="items-center mx-auto justify-center w-3/5 h-auto rounded-lg shadow-lg"
            />
            <img
              src="/images/user.png"
              alt="Misi Kami"
              className="items-center mx-auto justify-center w-3/5 h-auto rounded-lg shadow-lg"
            />
            <img
              src="/images/user.png"
              alt="Tim Kami"
              className="items-center mx-auto justify-center w-3/5 h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kontak</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Jika Anda memiliki pertanyaan, saran, atau masukan, jangan ragu
            untuk menghubungi kami melalui email di{" "}
            <a
              href="mailto:lookaseepkm2024@gmail.com"
              className="text-blue-600 hover:underline"
            >
              lookaseepkm2024@gmail.com
            </a>{" "}
            atau melalui sosial media di situs web kami.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

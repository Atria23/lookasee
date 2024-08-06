// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Kategori() {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate('/search', {
//       state: { category },
//     });
//   };

//   return (
//     <>
//       <section className="mx-auto w-3/4 py-16">
//         <div className="text-center pb-8">
//           <h5 className="mb-3 text-3xl font-bold text-black dark:text-white">Kategori Pencarian</h5>
//           <p className="text-base text-black sm:text-lg dark:text-gray-400">
//             Di bawah ini beberapa kategori barang yang mungkin<br />
//             sedang kamu cari
//           </p>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-14 justify-center">
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Pakaian')}
//             >
//               <img src="/images/clothesCat.svg" alt="pakaian" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Pakaian</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Aksesoris')}
//             >
//               <img src="/images/accessoryCat.svg" alt="aksesoris" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Aksesoris</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Elektronik')}
//             >
//               <img src="/images/electronicCat.svg" alt="elektronik" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Elektronik</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Dokumen')}
//             >
//               <img src="/images/documentCat.svg" alt="dokumen" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Dokumen</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Kunci')}
//             >
//               <img src="/images/keyCat.svg" alt="kunci" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Kunci</div>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-center">
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Barang Pribadi')}
//             >
//               <img src="/images/privacyCat.svg" alt="Handphone" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Barang Pribadi</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Perlengkapan')}
//             >
//               <img src="/images/equipmentCat.svg" alt="Headphone" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Perlengkapan</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Mainan')}
//             >
//               <img src="/images/toysCat.svg" alt="Pakaian" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Mainan</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Kendaraan')}
//             >
//               <img src="/images/motorcycleCat.svg" alt="Sepatu" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Kendaraan</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Perkakas')}
//             >
//               <img src="/images/toolsCat.svg" alt="Kacamata" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Perkakas</div>
//             </div>
//             <div 
//               className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 mx-auto shadow-lg hover:scale-105 transform transition-transform duration-300"
//               onClick={() => handleCategoryClick('Barang Antik')}
//             >
//               <img src="/images/antiquesCat.svg" alt="Jam Tangan" className="w-12 h-12 mb-3" />
//               <div className="text-center text-base font-medium">Barang Antik</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }









import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Kategori() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/search', {
      state: { category },
    });
  };

  return (
    <section className="mx-auto w-full max-w-screen-lg py-16">
      <div className="text-center pb-8">
        <h5 className="mb-3 text-3xl font-bold text-black">
          Kategori Pencarian
        </h5>
        <p className="text-base text-black sm:text-lg">
          Di bawah ini beberapa kategori barang yang mungkin
          <br />
          sedang kamu cari
        </p>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Pakaian')}
          >
            <img
              src="/images/clothesCat.svg"
              alt="pakaian"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Pakaian</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Aksesoris')}
          >
            <img
              src="/images/accessoryCat.svg"
              alt="aksesoris"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Aksesoris</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Elektronik')}
          >
            <img
              src="/images/electronicCat.svg"
              alt="elektronik"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Elektronik</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Dokumen')}
          >
            <img
              src="/images/documentCat.svg"
              alt="dokumen"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Dokumen</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Kunci')}
          >
            <img
              src="/images/keyCat.svg"
              alt="kunci"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Kunci</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Barang Pribadi')}
          >
            <img
              src="/images/privacyCat.svg"
              alt="Handphone"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">
              Barang Pribadi
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Perlengkapan')}
          >
            <img
              src="/images/equipmentCat.svg"
              alt="Headphone"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">
              Perlengkapan
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Mainan')}
          >
            <img
              src="/images/toysCat.svg"
              alt="Mainan"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Mainan</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Kendaraan')}
          >
            <img
              src="/images/motorcycleCat.svg"
              alt="Kendaraan"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Kendaraan</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Perkakas')}
          >
            <img
              src="/images/toolsCat.svg"
              alt="Perkakas"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Perkakas</div>
          </div>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full w-32 h-40 shadow-lg hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            onClick={() => handleCategoryClick('Barang Antik')}
          >
            <img
              src="/images/antiquesCat.svg"
              alt="Barang Antik"
              className="w-12 h-12 mb-3"
            />
            <div className="text-center text-base font-medium">Barang Antik</div>
          </div>
        </div>
      </div>
    </section>
  );
}

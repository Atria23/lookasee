// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { supabase } from '../../client'; // Adjust to the location of your Supabase client file

// const DetailBarang = () => {
//   const { id } = useParams(); // Get ID from URL
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [loggedInUserId, setLoggedInUserId] = useState(null); // Initialize state for logged-in user ID

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const { data: { user }, error } = await supabase.auth.getUser();

//       if (error) {
//         console.error('Error fetching user:', error);
//       } else {
//         setLoggedInUserId(user?.id || null);
//       }
//     };

//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const { data, error } = await supabase
//         .from('items')
//         .select(`
//           *,
//           users:users_id (
//             name
//           )
//         `)
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.error('Error fetching product:', error);
//       } else {
//         console.log('Fetched product data:', data);
//         setProduct({
//           ...data,
//           status_now: data.status_now || '?' // Set default value if status_now is null or undefined
//         });
//         setIsConfirmed(data.status_now === 'Sudah Kembali ke Pemilik');
//       }
//     };

//     if (loggedInUserId) {
//       fetchProduct();
//     }
//   }, [id, loggedInUserId]);

//   if (!product) {
//     return <div className="container mx-auto p-6">Produk tidak ditemuk, </div>;
//   }

//   const handleCopyLink = () => {
//     const link = window.location.href;
//     navigator.clipboard.writeText(link).then(() => {
//       setCopySuccess(true);
//       setTimeout(() => {
//         setCopySuccess(false);
//       }, 2000);
//     }).catch(err => {
//       setCopySuccess(false);
//     });
//   };

//   const handleHubungiClick = () => {
//     if (loggedInUserId === product.users_id) {
//       setIsModalOpen(true);
//     } else {
//       navigate(`/otherprofile/${product.users_id}`); // Pass userId to OtherProfile
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const confirmItemFound = async () => {
//     const { data, error } = await supabase
//       .from('items')
//       .update({ status_now: 'Sudah Kembali ke Pemilik' })
//       .eq('id', id);

//     if (error) {
//       console.error('Error updating item status:', error);
//     } else {
//       console.log('Item status updated:', data);
//       setIsConfirmed(true);
//       setProduct(prev => ({ ...prev, status_now: 'Sudah Kembali ke Pemilik' }));
//       setIsModalOpen(false);
//     }
//   };

//   // const [date, time] = (product.created_at || '').split('T'); // Split the time into date and time parts
//   const [date, time] = (product.time || '').split('T'); // Split the time into date and time parts

//   const roundToNearestMinute = (timeStr) => {
//     const [hours, minutes, seconds] = timeStr.split(':').map(Number);

//     const totalMinutes = hours * 60 + minutes;
//     const roundedMinutes = Math.round(totalMinutes);

//     const roundedHours = Math.floor(roundedMinutes / 60);
//     const remainingMinutes = roundedMinutes % 60;

//     return `${String(roundedHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
//   };

//   const roundedTime = roundToNearestMinute(time); // Round the time

//   return (
//     <>
//       <div className="w-full h-full bg-bg_utama p-6">
//         <div className="item-center mx-24">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Detail Barang</h1>
//             <button
//               onClick={handleCopyLink}
//               className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//               Bagikan
//             </button>
//           </div>

//           {copySuccess &&
//             <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
//               Link berhasil disalin!
//             </div>
//           }

//           <div className="flex justify-center gap-6">
//             <div className="drop-shadow-xl border w-128 h-128 rounded-lg justify-center mb-24 bg-white p-4">
//               <img src={product.image_url} alt={product.item_name} className="w-full h-full object-contain mb-4 mx-auto" />
//             </div>
//             <div className="flex flex-col w-3/4 md:w-1/2">
//               <div className="bg-white rounded-lg p-4 shadow">
//                 <h2 className="text-4xl mb-2 font-bold font-poppins text-utama text-center drop-shadow-lg">{product.item_name}</h2>
//                 <p className="mb-2 text-center text-base py-2 font-medium text-red-500">{product.status}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Daerah:</span> {product.region}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Kategori:</span> {product.category}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Tanggal Unggah:</span> {date}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Waktu Unggah:</span> {roundedTime}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Alamat:</span> {product.address}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Pengunggah:</span> {product.users?.name || 'Unknown'}</p>
//                 <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3"><span className="ml-2 font-semibold">Status Saat Ini:</span> {product.status_now}</p>
//                 <div className="flex text-center items-center">
//                   <svg className="w-8 h-8 text-gray-800 dark:text-white mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="user">
//                     <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
//                   </svg>
//                   <p className="text-xl font-bold">{product.users?.name || 'Unknown'}</p>
//                 </div>
//                 <h1 className="font-semibold">Deskripsi:</h1>
//                 <p className="mb-2 text-sm max-w-full break-words">{product.description}</p>
//               </div>
//               <button
//                 onClick={handleHubungiClick}
//                 className={`w-full mt-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loggedInUserId === product.users_id ? (isConfirmed ? 'bg-green-500' : 'bg-blue-700 hover:bg-blue-800') : 'bg-blue-700 hover:bg-blue-800'}`}
//                 disabled={loggedInUserId === product.users_id && isConfirmed}>
//                 {loggedInUserId === product.users_id ? (isConfirmed ? 'Barang sudah Kembali' : 'Konfirmasi Barang Sudah Kembali ke Pemiliknya ') : 'Hubungi'}
//               </button>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg"></div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h2 className="text-xl font-bold mb-4 text-center">Konfirmasi Barang</h2>
//             <p className="mb-4 text-center">Apakah anda yakin barang ini sudah kembali ke pemiliknya?</p>
//             <div className="mt-4 flex justify-center">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
//                 Batal
//               </button>
//               <button
//                 onClick={confirmItemFound}
//                 className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">
//                 Konfirmasi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DetailBarang;


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../client'; // Adjust to the location of your Supabase client file

const DetailBarang = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Initialize state for logged-in user ID
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setLoggedInUserId(user?.id || null);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          users:users_id (
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        console.log('Fetched product data:', data);
        setProduct({
          ...data,
          status_now: data.status_now || '?' // Set default value if status_now is null or undefined
        });
        setIsConfirmed(data.status_now === 'Sudah Kembali ke Pemilik');
      }
    };

    if (loggedInUserId) {
      fetchProduct();
    }
  }, [id, loggedInUserId]);

  if (!product) {
    return <div className="container text-center mt-64 mx-auto p-6">Silahkan Login untuk melihat detail </div>;
  }

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }).catch(err => {
      setCopySuccess(false);
    });
  };

  const handleHubungiClick = () => {
    if (loggedInUserId === product.users_id) {
      setIsModalOpen(true);
    } else {
      navigate(`/otherprofile/${product.users_id}`); // Pass userId to OtherProfile
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmItemFound = async () => {
    const { data, error } = await supabase
      .from('items')
      .update({ status_now: 'Sudah Kembali ke Pemilik' })
      .eq('id', id);

    if (error) {
      console.error('Error updating item status:', error);
    } else {
      console.log('Item status updated:', data);
      setIsConfirmed(true);
      setProduct(prev => ({ ...prev, status_now: 'Sudah Kembali ke Pemilik' }));
      setIsModalOpen(false);
    }
  };
  // Fungsi untuk memisahkan tanggal dan waktu
  const extractDateTime = (datetimeStr) => {
    if (!datetimeStr) return { date: '', time: '' };

    const [date, time] = datetimeStr.split('T');
    return { date, time };
  };

  // Fungsi untuk membulatkan waktu ke menit terdekat
  const roundToNearestMinute = (timeStr) => {
    if (!timeStr) return '';

    const [hours, minutes, seconds] = timeStr.split(':').map(Number);

    const totalMinutes = hours * 60 + minutes;
    const roundedMinutes = Math.round(totalMinutes);

    const roundedHours = Math.floor(roundedMinutes / 60);
    const remainingMinutes = roundedMinutes % 60;

    return `${String(roundedHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
  };

  // Ekstraksi tanggal dan waktu dari time
  const { date: eventDate, time: eventTime } = extractDateTime(product.time);
  const roundedEventTime = roundToNearestMinute(eventTime);

  const MAX_DESCRIPTION_LENGTH = 200; // Adjust the length as needed
  const isDescriptionLong = product.description && product.description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = showFullDescription
    ? product.description
    : product.description?.substring(0, MAX_DESCRIPTION_LENGTH) + (isDescriptionLong ? '...' : '');

  return (
    <>

      <div className="w-full h-full fixed p-6 bg-bg_utama overflow-hidden">
        <div className="overflow-y-hidden ">
          <div className="item-center mx-24 ">
            <div className='flex items-center justify-between mb-4'>
              <h1 className="text-3xl font-bold">Detail Barang</h1>
              <button
                onClick={handleCopyLink}
                className="text-white bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Bagikan
              </button>
            </div>

            {copySuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Link berhasil disalin!
          </div>
        </div>
      )}
            <div className="flex justify-center gap-6">
              <div className="drop-shadow-xl border w-1/3 h-1/3 rounded-lg bg-white">
                <img
                  src={product.image_url}
                  alt={product.item_name}
                  className="w-full h-full object-contain "
                />
              </div>
              <div className="flex-1 ml-6 h-screen pb-44 overflow-y-auto scrollbar-hidden">
                <div className="bg-white rounded-lg p-4 shadow">
                  <h2 className="text-4xl mb-2 font-bold font-poppins text-utama text-center drop-shadow-lg overflow-hidden break-words">
                    {product.item_name}
                  </h2>
                  <p className="mb-2 text-center text-base py-2 font-medium text-red-500">
                    {product.status}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Daerah:</span> {product.region}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Kategori:</span> {product.category}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Tanggal Kejadian:</span> {eventDate}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Waktu Kejadian:</span> {roundedEventTime}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Alamat:</span> {product.address}
                  </p>
                  <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3">
                    <span className="ml-2 font-semibold">Status Saat Ini:</span> {product.status_now}
                  </p>
                  <div className="flex text-center items-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 101 101"
                      id="user"
                    >
                      <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                    </svg>
                    <p className="text-xl font-bold">{product.users?.name || 'Unknown'}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-2 overflow-hidden break-words">
                    <span className="font-semibold">Deskripsi:</span>
                    <p className="">{displayedDescription}</p>
                    {isDescriptionLong && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className=" text-utama hover:text-blue-500"
                      >
                        {showFullDescription ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleHubungiClick}
                    className={`w-full mt-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loggedInUserId === product.users_id
                      ? isConfirmed
                        ? 'bg-green-500'
                        : 'bg-utama hover:bg-blue-400'
                      : 'bg-utama hover:bg-blue-400'
                      }`}
                    disabled={loggedInUserId === product.users_id && isConfirmed}
                  >
                    {loggedInUserId === product.users_id
                      ? isConfirmed
                        ? 'Barang sudah Kembali'
                        : 'Konfirmasi Barang Sudah Kembali ke Pemiliknya '
                      : 'Hubungi'}
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg"></div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Konfirmasi Barang</h2>
            <p className="mb-4 text-center">Apakah anda yakin barang ini sudah kembali ke pemiliknya?</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              >
                Batal
              </button>
              <button
                onClick={confirmItemFound}
                className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        /* Tailwind CSS kustom untuk menyembunyikan scrollbar */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;  /* menyembunyikan scrollbar di Internet Explorer dan Edge */
  scrollbar-width: none; /* menyembunyikan scrollbar di Firefox */
}

      `}</style>
    </>

  );

};

export default DetailBarang;

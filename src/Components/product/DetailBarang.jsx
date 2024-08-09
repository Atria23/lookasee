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

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

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

  const MAX_DESCRIPTION_LENGTH = 250; // Adjust the length as needed
  const isDescriptionLong = product.description && product.description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = showFullDescription
    ? product.description
    : product.description?.substring(0, MAX_DESCRIPTION_LENGTH) + (isDescriptionLong ? '...' : '');

  return (
    <>
      <div className='flex items-center justify-between pt-6 px-8'>
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center text-white bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-3 py-2.5 sm:px-5 sm:py-2.5"
        >
          <svg class="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
          </svg>

        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center text-white bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-3 py-2.5 sm:px-5 sm:py-2.5"
        >
          <svg class="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>

        </button>
      </div>

      {copySuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Link berhasil disalin!
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row h-full overflow-hidden">

        <div className="flex flex-col md:flex-row rounded-lg shadow-lg h-full w-full md:w-1/3 px-4">
          <div className="rounded-lg h-full bg-white flex flex-col w-full">
            <div className="flex flex-col items-center flex-shrink-0 p-4">
              <img
                src={product.image_url}
                alt={product.item_name}
                className="w-full max-h-96 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="w-full overflow-auto sm:h-[480px] scrollable-content">
              <div className="list-none text-gray-600 flex flex-col">
                <h2 className="text-4xl mb-2 font-bold font-poppins text-utama text-center drop-shadow-lg overflow-hidden break-word">
                  {product.item_name}
                </h2>
                <p className="mb-2 text-center text-base py-2 font-medium text-red-500 break-word">
                  {product.status}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Daerah:</span> {product.region}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Kategori:</span> {product.category}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Tanggal Kejadian:</span> {eventDate}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Waktu Kejadian:</span> {roundedEventTime}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Alamat:</span> {product.address}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Status Saat Ini:</span> {product.status_now}
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
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-2 overflow-hidden break-word">
                  <span className="font-semibold">Deskripsi:</span>
                  <p className="">{displayedDescription}</p>
                  {isDescriptionLong && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className=" text-utama hover:text-blue-500"
                    >
                      {showFullDescription ? 'Baca Lebih Sedikit' : 'Baca Selengkapnya'}
                    </button>
                  )}
                </div>
              </div>
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
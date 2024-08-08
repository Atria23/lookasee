import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client'; // Sesuaikan dengan lokasi file Supabase client Anda

export default function Riwayat() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [menemukanCount, setMenemukanCount] = useState(0);
  const [kehilanganCount, setKehilanganCount] = useState(0);
  const [kembaliCount, setKembaliCount] = useState(0);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (user) {
        setUserId(user.id);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('users_id', userId);

        if (error) {
          console.error('Error fetching items:', error);
        } else {
          setItems(data);

          // Menghitung jumlah "Menemukan", "Kehilangan" dan "Sudah Kembali ke Pemilik"
          const menemukanCount = data.filter(
            (item) =>
              item.status === 'Menemukan' &&
              item.status_now !== 'Sudah Kembali ke Pemilik'
          ).length;
          const kehilanganCount = data.filter(
            (item) =>
              item.status === 'Kehilangan' &&
              item.status_now !== 'Sudah Kembali ke Pemilik'
          ).length;
          const kembaliCount = data.filter(
            (item) => item.status_now === 'Sudah Kembali ke Pemilik'
          ).length;

          setMenemukanCount(menemukanCount);
          setKehilanganCount(kehilanganCount);
          setKembaliCount(kembaliCount);
        }
      }
    };

    fetchItems();
  }, [userId]);

  // Calculate current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-bg_utama min-h-screen">
      {/* Ganti h-screen dengan min-h-screen untuk fleksibilitas */}
      <div className="bg-bg_utama pt-8 pb-8">
        <div className="bg-white p-4 md:p-6 mx-4 md:mx-24 shadow-lg rounded-lg">
          {/* Gunakan padding dan margin yang lebih kecil di mobile */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 p-2 md:p-4 border-b-2">
            Riwayat Unggahan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Grid lebih fleksibel di mobile */}
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                {menemukanCount}
              </h2>{' '}
              {/* Ukuran teks lebih kecil di mobile */}
              <p className="text-gray-600">Menemukan</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                {kehilanganCount}
              </h2>
              <p className="text-gray-600">Kehilangan</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                {kembaliCount}
              </h2>
              <p className="text-gray-600">Sudah Kembali ke Pemilik</p>
            </div>
          </div>
          <div className="py-4 md:py-6 px-4 md:px-12 riwayat max-w-screen-lg mx-auto">
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center p-4 bg-gray-50 rounded-lg shadow-md"
                >
                  <img
                    className="w-10 h-10 md:w-16 md:h-16 mr-4 rounded-full object-cover"
                    src={item.image_url} // Sesuaikan dengan nama kolom di database Anda
                    alt={item.item_name}
                  />
                  <div className="flex-grow text-left text-xs md:text-base">
                    <p
                      className={`md:hidden ${item.status_now === 'Sudah Kembali ke Pemilik'
                          ? 'text-green-500'
                          : 'text-red-500'
                        }`}
                    >
                      {item.status_now || item.status}
                    </p>
                    <h2 className="font-medium break-word mb-2 md:mr-20 md:mb-0">
                      {item.item_name}
                    </h2>
                    <a
                      href={`/detailbarang/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Selengkapnya
                    </a>
                  </div>
                  <div className="hidden md:block text-md mt-0 flex flex-col items-end">
                    {/* Atur alignment */}
                    <span
                      className={`${item.status_now === 'Sudah Kembali ke Pemilik'
                          ? 'text-green-500'
                          : 'text-red-500'
                        }`}
                    >
                      {item.status_now || item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex flex-col items-center my-16 space-y-2">
              {/* Nomor Halaman */}
              <div className="flex flex-wrap items-center justify-center space-x-2 overflow-x-auto scrollbar-hide">
                {/* Halaman Awal */}
                {currentPage > 7 && (
                  <>
                    {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                    <span className="text-gray-400">...</span>
                  </>
                )}

                {/* Halaman Terdekat */}
                {generatePageNumbers().map((page) => {
                  if (
                    (page >= currentPage - 3 && page <= currentPage + 3) ||
                    (currentPage <= 4 && page < 7) ||
                    (currentPage > totalPages - 4 && page >= totalPages - 7)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}

                {/* Halaman Akhir */}
                {currentPage < totalPages - 6 && (
                  <>
                    <span className="text-gray-400">...</span>
                    {Array.from(
                      { length: 3 },
                      (_, i) => totalPages - 2 + i
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="text-center">
              {items.length === 0 && (
                <p className="text-gray-600">Tidak ada item yang ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

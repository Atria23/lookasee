import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../../client'; // Import Supabase
import SearchBar from './SearchBar';

export default function HasilPencarian() {
  const location = useLocation();
  const {
    searchTerm = '',
    category = '',
    time = '',
    location: searchLocation = '',
    status = '',
  } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  // Reset currentPage to 1 when search parameters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, time, searchLocation, status]);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      // Fetch total count first
      let countQuery = supabase.from('items').select('*', { count: 'exact' });

      // Apply filters to the count query
      if (searchTerm) {
        countQuery = countQuery.ilike('item_name', `%${searchTerm}%`);
      }
      if (category) {
        countQuery = countQuery.eq('category', category);
      }
      if (searchLocation) {
        countQuery = countQuery.ilike('region', `%${searchLocation}%`);
      }
      if (status) {
        countQuery = countQuery.eq('status', status);
      }

      const { count: totalCount, error: countError } = await countQuery;

      if (countError) {
        console.error('Error fetching total count:', countError);
        setError(countError.message);
        setLoading(false);
        return;
      }

      const totalPageCount = Math.ceil(totalCount / productsPerPage);
      setTotalPages(totalPageCount);

      // Fetch paginated products
      let query = supabase.from('items').select(`
        *,
        users:users_id (
          name
        )
      `);

      // Apply filters to the query
      if (searchTerm) {
        query = query.ilike('item_name', `%${searchTerm}%`);
      }
      if (category) {
        query = query.eq('category', category);
      }
      if (searchLocation) {
        query = query.ilike('region', `%${searchLocation}%`);
      }
      if (status) {
        query = query.eq('status', status);
      }

      // Order products by creation date in descending order
      query = query.order('created_at', { ascending: false });

      // Pagination
      const from = (currentPage - 1) * productsPerPage;
      const to = from + productsPerPage - 1;
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm, category, time, searchLocation, status, currentPage]);

  // Filter products based on search criteria
  const filteredProducts = products.filter((product) => {
    const productName = product.item_name || '';
    const productRegion = product.region || '';

    return (
      (searchTerm === '' ||
        productName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === '' || product.category.toLowerCase().includes(category.toLowerCase())) &&
      (time === '' || product.created_at.toLowerCase().includes(time.toLowerCase())) &&
      (searchLocation === '' ||
        productRegion.toLowerCase().includes(searchLocation.toLowerCase())) &&
      (status === '' || product.status.toLowerCase().includes(status.toLowerCase()))
    );
  });

  // Calculate the number of products found
  const productsCount = filteredProducts.length;

  // Function to generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (

    <div className="bg-bg_utama py-6 px-4 md:px-24 min-h-screen">
      {/* Menggunakan padding yang lebih kecil pada mobile */}
      <SearchBar
        initialSearchTerm={searchTerm}
        initialCategory={category}
        initialTime={time}
        initialLocation={searchLocation}
        initialStatus={status}
      />
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-bold">
          Hasil Pencarian untuk "{searchTerm}"
        </h1>
        <p className="text-base md:text-lg font-semibold">{productsCount} Barang</p>
      </div>
      <div
        id="product-list"
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Memuat produk...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : productsCount > 0 ? (
          filteredProducts.map((product) => {
            // Fungsi untuk memisahkan tanggal dan waktu
            const extractDateTime = (datetimeStr) => {
              if (!datetimeStr) return { date: "", time: "" };

              const [date, time] = datetimeStr.split("T");
              return { date, time };
            };

            // Fungsi untuk membulatkan waktu ke menit terdekat
            const roundToNearestMinute = (timeStr) => {
              if (!timeStr) return "";

              const [hours, minutes, seconds] = timeStr.split(":").map(Number);

              const totalMinutes = hours * 60 + minutes;
              const roundedMinutes = Math.round(totalMinutes);

              const roundedHours = Math.floor(roundedMinutes / 60);
              const remainingMinutes = roundedMinutes % 60;

              return `${String(roundedHours).padStart(2, "0")}:${String(
                remainingMinutes
              ).padStart(2, "0")}`;
            };

            // Ekstraksi tanggal dan waktu dari time
            const { date: eventDate, time: eventTime } = extractDateTime(
              product.time
            );
            const roundedEventTime = roundToNearestMinute(eventTime);

            const formatItemName = (item_name) => {
              if (!item_name) return ""; // Jika nama tidak ada, kembalikan string kosong

              // Cek apakah panjang nama lebih dari 22 karakter
              if (item_name.length > 22) {
                // Ambil 22 karakter pertama dan tambahkan ...
                return `${item_name.substring(0, 22)}...`;
              }

              // Kembalikan nama jika panjangnya kurang dari atau sama dengan 22
              return item_name;
            };

            return (
              <div
                key={product.id}
                className="product bg-white shadow-lg rounded-lg overflow-hidden p-2"
              >
                <Link to={`/detailbarang/${product.id}`}>
                  <img
                    className="w-full h-36 sm:h-48 md:h-64 border-b border-black pb-2 mb-2 object-cover object-center"
                    src={product.image_url}
                    alt={product.item_name}
                  />
                  <div className="p-2 md:p-4">
                    <h3 className="text-sm md:text-lg font-bold mb-1">
                      {formatItemName(product.item_name)}
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm md:text-base">
                      {product.users?.name?.split(" ")[0].slice(0, 15) ||
                        "Unknown"}{" "}
                      {product.status} Di {product.region}
                    </p>
                    <div className="flex items-center space-x-3 mb-2 text-gray-500">
                      <svg
                        className="w-4 h-4" // Menggunakan biru lembut
                        viewBox="0 0 24 24"
                        fill="currentcolor"
                      >
                        <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="flex items-center text-xs md:text-base">
                        <span className="hidden md:block mr-1">Kategori :</span>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2 text-gray-500">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentcolor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="flex items-center text-xs md:text-base">
                        <span className="hidden md:block mr-1">Tanggal Kejadian :</span>
                        {eventDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2 text-gray-500">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentcolor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="flex items-center text-xs md:text-base">
                        <span className="hidden md:block mr-1">Waktu Kejadian :</span>
                        {roundedEventTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada produk yang ditemukan
          </div>
        )}
      </div>

      {/* Pagination Controls */}
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
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
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
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
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
              {Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {page}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

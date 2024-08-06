import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../../client'; // Import Supabase
import Footer from './Footer';
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
    <div className="bg-bg_utama py-6 px-24 min-h-screen">
      <SearchBar
        initialSearchTerm={searchTerm}
        initialCategory={category}
        initialTime={time}
        initialLocation={searchLocation}
        initialStatus={status}
      />
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          Hasil Pencarian untuk "{searchTerm}"
        </h1>
        <p className="text-lg font-semibold">{productsCount} Barang</p>
      </div>
      <div id="product-list" className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-2 md:col-span-3 text-center text-gray-500">
            Memuat produk...
          </div>
        ) : error ? (
          <div className="col-span-2 md:col-span-3 text-center text-red-500">
            {error}
          </div>
        ) : productsCount > 0 ? (
          filteredProducts.map((product) => {
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

            const formatItemName = (item_name) => {
              if (!item_name) return ''; // Jika nama tidak ada, kembalikan string kosong

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
                    className="w-full h-64 border-b border-black pb-2 mb-2 object-contain object-center"
                    src={product.image_url}
                    alt={product.item_name}
                  />
                  <div className="p-4 ">
                    <h3 className="text-lg  font-bold mb-2 ">
                      {formatItemName(product.item_name)}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      {product.users?.name?.split(' ')[0].slice(0, 15) || 'Unknown'} {product.status} Di {product.region}
                    </p>

                    <p className="text-gray-500 mb-1">
                      Kategori: {product.category}
                    </p>
                    <p className="text-gray-500 mb-1">
                      Tanggal Kejadian: {eventDate}
                    </p>
                    <p className="text-gray-500">Waktu Kejadian: {roundedEventTime}</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 text-center text-gray-500">
            Tidak ada produk yang ditemukan
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-l-md bg-gray-100 text-gray-700"
        >
          Sebelumnya
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-r-md bg-gray-100 text-gray-700"
        >
          Selanjutnya
        </button>
      </div>
      <Footer />
    </div>
  );
}

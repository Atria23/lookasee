import { useEffect, useState } from 'react';
import { supabase } from '../../client';

export default function TopUpload() {
  const [topUploads, setTopUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUploads = async () => {
      setLoading(true);
      setError(null);

      // Fetch data from the top_upload table
      const { data, error } = await supabase.from('top_upload').select('*');

      if (error) {
        console.error('Error fetching top uploads:', error);
        setError(error.message);
      } else {
        // Sort the data by count in descending order and take the top 3
        const sortedData = (data || [])
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);
        setTopUploads(sortedData);
      }
      setLoading(false);
    };

    fetchTopUploads();
  }, []);

  // Define a mapping for background colors
  const backgroundColorClasses = {
    0: 'bg-red-400',
    1: 'bg-green-400',
    2: 'bg-blue-400',
    default: 'bg-gray-400',
  };

  // Get the background color class based on the index
  const getBackgroundColorClass = (index) => {
    return backgroundColorClasses[index] || backgroundColorClasses.default;
  };

  // Function to get additional styles for the second top card
  const getCardStyles = (index) => {
    return 'w-full max-w-sm'; // Default size for other cards
  };

  return (
    <>
      <section className="mx-auto w-full py-16 mb-8 px-4">
        <div className="text-center pb-16">
          <h5 className="mb-3 text-3xl font-bold text-black">
            TOP UPLOAD BARANG
          </h5>
          <p className="text-base text-black sm:text-lg">
            Kategori barang yang paling banyak diunggah. Lihatlah <br /> barang-barang apa yang sering diunggah!
          </p>
        </div>
        <div className="flex justify-center space-x-4 flex-wrap">
          {error && <div className="text-center text-red-500">{error}</div>}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            topUploads.map((upload, index) => (
              <div
                key={upload.id}
                className={`flex flex-col items-center bg-white shadow-lg rounded-lg py-6 ${getCardStyles(index)} m-2`}
              >
                <h6 className="text-xl font-bold mb-2">{upload.category}</h6>
                <div
                  className={`${getBackgroundColorClass(index)} text-white text-2xl font-bold p-4 w-full text-center mb-4`}
                >
                  {upload.count} Orang
                </div>
                <div className="w-full overflow-auto max-h-40 scrollable-content">
                  <ul className="list-none text-gray-600 p-0 mb-5 flex flex-col items-center space-y-2">
                    {upload.locations.map((location, idx) => (
                      <li key={idx}>{location}</li>
                    ))}
                  </ul>
                </div>
                {upload.locations.length > 5 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-3 h-8 w-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path className="mx-2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <style>{`
        /* Add this CSS to your global styles or a CSS module */
        .scrollable-content {
          scrollbar-width: none; /* For Firefox */
        }

        .scrollable-content::-webkit-scrollbar {
          display: none; /* For WebKit browsers */
        }
      `}</style>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { supabase } from "../../client";

// export default function LatestUpload() {
//   const location = useLocation();
//   const { searchTerm = "" } = location.state || {};

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from Supabase
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Query to fetch the 10 most recent products, ordered by 'created_at' descending
//         let { data, error } = await supabase
//           .from("items")
//           .select(`
//             *,
//             users:users_id (
//               name
//             )
//           `)
//           .order("created_at", { ascending: false }) // Order by 'created_at' descending
//           .limit(10); // Limit to 10 items

//         if (error) throw error;

//         setProducts(data || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [searchTerm]);

//   // Filter products based on search criteria
//   const filteredProducts = products.filter((product) => {
//     // Ensure these properties are defined and provide default values
//     const productName = product.item_name || "";
//     return (
//       searchTerm === "" ||
//       productName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // Calculate the number of products found
//   const productsCount = filteredProducts.length;

//   return (
//     <>
//       <section className="mx-auto w-full py-16 px-9 bg-utama">
//         <div className="text-center pb-16">
//           <h5 className="mb-3 text-3xl font-bold text-white">AKHIR-AKHIR INI</h5>
//           <p className="text-base text-white sm:text-lg dark:text-gray-400">
//             Di bawah ini beberapa barang yang
//             <br />
//             baru diunggah
//           </p>
//         </div>
//         <div className="overflow-x-auto scrollbar-hide">
//           {/* Keep overflow-x-auto but hide scrollbar */}
//           <div className="flex space-x-4">
//             {error ? (
//               <div className="text-center text-red-500">{error}</div>
//             ) : productsCount > 0 ? (
//               filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex-shrink-0 w-40 h-40 bg-gray-200 rounded-lg shadow-lg"
//                 >
//                   <Link to={`/detailbarang/${product.id}`}>
//                     <img
//                       src={product.image_url || "public/images/hero.png"}
//                       alt={product.item_name}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500">
//                 Tidak ada produk yang ditemukan
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//       <style>{`
//                 .scrollbar-hide::-webkit-scrollbar {
//                 display: none;
//                 }

//                 .scrollbar-hide {
//                 -ms-overflow-style: none;
//                 scrollbar-width: none;
//                 }`}</style>
//     </>
//   );
// }





import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "../../client";

export default function LatestUpload() {
  const location = useLocation();
  const { searchTerm = "" } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let { data, error } = await supabase
          .from("items")
          .select(`
            *,
            users:users_id (
              name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  // Filter products based on search criteria
  const filteredProducts = products.filter((product) => {
    const productName = product.item_name || "";
    return (
      searchTerm === "" ||
      productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const productsCount = filteredProducts.length;

  // Handle keydown and keyup events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle scroll
  const handleScroll = (event) => {
    if (!isShiftPressed || isShiftPressed) {
      event.preventDefault();
      const container = event.currentTarget;
      container.scrollLeft += event.deltaY; // Horizontal scroll
    }
  };

  // Prevent vertical scrolling of the whole page
  useEffect(() => {
    const handleScrollEvent = (event) => {
      if (event.target.closest('.overflow-x-auto')) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleScrollEvent, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScrollEvent);
    };
  }, []);

  return (
    <>
      <section className="mx-auto w-full py-16 px-9 bg-utama">
        <div className="text-center pb-16">
          <h5 className="mb-3 text-3xl font-bold text-white">AKHIR-AKHIR INI</h5>
          <p className="text-base text-white sm:text-lg dark:text-gray-400">
            Di bawah ini beberapa barang yang
            <br />
            baru diunggah
          </p>
        </div>
        <div className="overflow-x-auto" onWheel={handleScroll}>
          <div className="flex space-x-4 min-w-max">
            {error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : productsCount > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-40 h-40 bg-gray-200 rounded-lg shadow-lg"
                >
                  <Link to={`/detailbarang/${product.id}`}>
                    <img
                      src={product.image_url || "public/images/hero.png"}
                      alt={product.item_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                Tidak ada produk yang ditemukan
              </div>
            )}
          </div>
        </div>
      </section>
      <style>{`
        .overflow-x-auto {
          overflow-x: hidden;
          overflow-y: hidden;
        }
      `}</style>
    </>
  );
}

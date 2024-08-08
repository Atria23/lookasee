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
          .select(
            `
            *,
            users:users_id (
              name
            )
          `
          )
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

  // Handle scroll with shift key
  const handleScroll = (event) => {
    if (isShiftPressed) {
      event.preventDefault();
      const container = event.currentTarget;
      container.scrollLeft += event.deltaY; // Horizontal scroll
    }
  };

  

  // Scroll handlers for arrow buttons
  const scrollLeft = () => {
    const container = document.querySelector(".scroll-container");
    container.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.querySelector(".scroll-container");
    container.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <>
      <section className="mx-auto w-full py-16 px-4 sm:px-9 bg-utama relative">
        <div className="text-center pb-16">
          <h5 className="mb-3 text-3xl font-bold text-white">AKHIR-AKHIR INI</h5>
          <p className="text-base text-white sm:text-lg">
            Di bawah ini beberapa barang yang
            <br />
            baru diunggah
          </p>
        </div>
        <div className="relative">
          <div
            className="overflow-x-auto scrollbar-hide scroll-container"
            onWheel={handleScroll}
          >
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
                        src={product.image_url || "/images/hero.png"}
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
          {/* Arrow buttons for desktop */}
          <button
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg z-10 w-10 h-10"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg z-10 w-10 h-10"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}




import { useState, useEffect } from 'react';
import { supabase } from '../../client';
import { useNavigate } from "react-router-dom";

function ResetPasswordRequest() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://lookasee.vercel.com/resetpassword', // Ganti dengan URL aplikasi Anda
      });

      if (error) {
        setErrorMessage("Terjadi kesalahan saat mengirim email reset password.");
        console.error(error);
      } else {
        setMessage('Email reset password telah dikirim. Silakan periksa email Anda.');
      }
    } catch (error) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setMessage('');
        setErrorMessage('');
      }, 5000);

      // Cleanup the timer on component unmount or if message/errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [message, errorMessage]);

  const slides = [
    "/images/tutor-1.png",
    "/images/tutor-2.png",
    "/images/tutor-3.png",
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const handleSlideSelect = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 2000); // Slide automatically every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-bg_utama min-h-screen overflow-hidden flex items-center justify-center p-4 ">
      <div className="max-w-3xl w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        <div id="default-carousel" className="relative overflow-hidden w-full md:w-1/2" data-carousel="slide">
          <div className="relative rounded-lg h-64 md:h-96 mb-8 md:mb-24">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute block w-full transition-transform duration-700 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: `translateX(${(index - activeSlide) * 100}%)` }}
                data-carousel-item
              >
                <img src={slide} className="w-full h-64 md:h-full object-contain" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2 rtl:space-x-reverse">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-gray-400'}`}
                aria-current={index === activeSlide}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
                onClick={() => handleSlideSelect(index)}
              ></button>
            ))}
          </div>
          <button type="button" className="absolute top-1/2 left-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none group" data-carousel-prev onClick={handlePrevSlide}>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70">
              <svg className="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button type="button" className="absolute top-1/2 right-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none group" data-carousel-next onClick={handleNextSlide}>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70">
              <svg className="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        
        <div className="w-full md:w-1/2 max-w-md p-8 space-y-6 bg-white rounded-tr-large rounded-bl-large shadow-md">
          <h1 className="text-2xl font-bold mb-6">Reset Sandi</h1>
          <p className="mb-4">
            Masukkan alamat email Anda untuk menerima link reset password.
          </p>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan alamat email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handlePasswordReset}
            className="w-full text-utama border border-utama bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Kirim
          </button>
          {message && <p className="mt-4 text-green-600">{message}</p>}
          {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
          <p className="text-sm text-center font-light text-gray-500">
            Kembali ke Halaman{" "}
            <a
              onClick={() => navigate("/login")}
              className="font-medium text-utama cursor-pointer hover:underline mt-4"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div >
  );
}

export default ResetPasswordRequest;




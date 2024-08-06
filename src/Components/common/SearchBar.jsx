import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({
  initialSearchTerm = '',
  initialCategory = '',
  initialTime = '',
  initialLocation = '',
  initialStatus = ''
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [category, setCategory] = useState(initialCategory);
  const [time, setTime] = useState(initialTime);
  const [location, setLocation] = useState(initialLocation);
  const [status, setStatus] = useState(initialStatus);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationPopUpOpen, setIsLocationPopUpOpen] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
};

const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/search', {
      state: {
        searchTerm,
        category,
        time,
        location,
        status,
      },
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
};

const toggleLocationPopUp = () => {
    setIsLocationPopUpOpen(!isLocationPopUpOpen);
};

const handleLocationSearch = (event) => {
    setLocationSearchTerm(event.target.value.toLowerCase());
};

const locations = [
    'Kota Semarang',
    'Kota Salatiga',
    'Kota Jepara',
    'Kota Kudus',
    'Kota Pekalongan',
    'Kabupaten Demak',
    'Kabupaten Grobogan',
    'Kabupaten Pemalang',
    'Kabupaten Boyolali',
    'Kabupaten Rembang',
    'Kabupaten Semarang',
    // Add more locations as needed
];

const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(locationSearchTerm)
);

  return (
    <div className="py-6 px-4">
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="flex">
                    {/* <label htmlFor="simple-search search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
                    <button onClick={toggleFilter} type="button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">Filter
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 22 20" id="filter" className="ml-2"><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><g stroke="#fff" strokeWidth="2" transform="translate(-1614 -1629)"><g transform="translate(1615 1630)"><path d="M20 0H0l8 9.46V16l4 2V9.46z"></path></g></g></g></svg>
                    </button>
                    <div className="relative w-full">
                        <input value={searchTerm} onChange={handleSearch} type="search" id="default-search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari barang kamu di sini . . ." required />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>

            {isFilterOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Filter Options</h3>
                            <div className="mt-4">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 appearance-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                      <option value="">Pilih Kategori</option>
                                      <option value="Elektronik">Elektronik</option>
                                      <option value="Pakaian">Pakaian</option>
                                      <option value="Aksesoris">Aksesoris</option>
                                      <option value="Dokumen">Dokumen</option>
                                      <option value="Kunci">Kunci</option>
                                      <option value="Barang Pribadi">Barang Pribadi</option>
                                      <option value="Perlengkapan">Perlengkapan</option>
                                      <option value="Mainan">Mainan</option>
                                      <option value="Kendaraan">Kendaraan</option>
                                      <option value="Perkakas">Perkakas</option>
                                      <option value="Barang Antik">Barang Antik</option>

                                    </select>
                                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="upload-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Date</label>
                                <input
                                    type="date"
                                    id="upload-date"
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="block w-full p-2 text-left text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between items-center"
                                        onClick={toggleLocationPopUp}
                                    >
                                        <span>{location || "Select Location"}</span>
                                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <div className="relative">
                                    <select
                                        id="status"
                                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 appearance-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Menemukan">Menemukan</option>
                                        <option value="Kehilangan">Kehilangan</option>
                                    </select>
                                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mr-2"
                                    onClick={toggleFilter}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                        toggleFilter();
                                        handleSubmit(new Event('submit'));
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isLocationPopUpOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Select Location</h3>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Search Location"
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={locationSearchTerm}
                                    onChange={handleLocationSearch}
                                />
                            </div>
                            <div className="mt-4 max-h-48 overflow-y-auto">
                                {filteredLocations.map((location) => (
                                    <div key={location} className="p-2">
                                        <button
                                            type="button"
                                            className="text-left w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                                            onClick={() => {
                                                setLocation(location);
                                                toggleLocationPopUp();
                                            }}
                                        >
                                            {location}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                    onClick={toggleLocationPopUp}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
}
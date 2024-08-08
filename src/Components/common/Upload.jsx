import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'; // Import Supabase client from your specified path
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique filenames

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [region, setRegion] = useState('');
  const [isRegionPopUpOpen, setIsRegionPopUpOpen] = useState(false);
  const [regionSearchTerm, setRegionSearchTerm] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [description, setDescription] = useState('');
  const [successPopup, setSuccessPopup] = useState(false); // Tambahkan state untuk popup

  const isFormValid = () => {
    return (
      selectedFile &&
      itemName &&
      category &&
      status &&
      region &&
      address &&
      time &&
      phone
    );
  };

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB dalam byte

  // Function to handle file drop
const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      alert('Ukuran maks file yang dapat diunggah yaitu 1MB.');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
};

// Function to handle file select
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      alert('Ukuran maks file yang dapat diunggah yaitu 1MB.');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
};


  useEffect(() => {
    const phoneNumberValid = (phone) => {
      // Basic regex for phone number validation
      const regex = /^(\+?\d{1,4}[\s-]?)?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
      return regex.test(phone);
    };
    setPhoneNumberValid(phoneNumberValid(phone));
  }, [phone]);

  const toggleRegionPopUp = () => {
    setIsRegionPopUpOpen(!isRegionPopUpOpen);
  };

  const handleRegionSearch = (event) => {
    setRegionSearchTerm(event.target.value.toLowerCase());
  };

  const regions = [
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
    // Add more regions as needed
  ];

  const filteredRegions = regions.filter((region) =>
    region.toLowerCase().includes(regionSearchTerm)
  );

  // Function to upload file to Supabase and store URL in database
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // Upload the file to Supabase Storage
      let { error: uploadError } = await supabase.storage
        .from('itemImages')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL of the uploaded file
      const { data } = supabase.storage.from('itemImages').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const { data: { user } } = await supabase.auth.getUser();
      const userId = user.id;

      // Insert the public URL into the 'items' table
      const { error: dbError } = await supabase
        .from('items')
        .insert([
          {
            item_name: itemName,
            category,
            status,
            region,
            address,
            time,
            phone,
            description,
            image_path: filePath,
            image_url: publicUrl,
            users_id: userId // Menyimpan user_id
          },
        ]);

      if (dbError) {
        throw dbError;
      }

      setSuccessPopup(true); // Tampilkan popup saat berhasil upload
    } catch (error) {
      console.error('Error uploading file or saving URL:', error.message);
      alert('Failed to upload file or save URL. Please try again.');
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  return (
    <div className="mx-auto w-full bg-bg_utama upload p-4">
      <form className="max-w-4xl mx-auto p-4" onSubmit={handleDrop}>
        <div className="font-utama font-medium text-center">
          <p className="mb-4">
            Jangan ragu untuk mengunggah barang yang kamu temukan atau yang kamu cari!
          </p>
        </div>

        <div className="max-w-full mx-auto mt-4 px-4 sm:max-w-md">
          {/* Dropzone and File Input Combined */}
          <div
           className="border-2 bg-white border-dashed border-gray-300 mx-auto rounded-lg p-4 mb-4 cursor-pointer text-center flex items-center justify-center w-full h-64 sm:h-80 md:h-96"
           onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('fileInput').click()} // Trigger file input click
           >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-base text-gray-500 mx-6">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-sm text-gray-500">
                  Any image file (PNG, JPG)
                </p>
              </div>
            )}
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            id="fileInput"
            style={{ display: 'none' }} // Hide the actual file input
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="item-name"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Nama Barang
          </label>
          <input
            id="item-name"
            maxLength={50}
            rows="5"
            className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan Nama Barang"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Kategori
            </label>
            <div className="relative">
              <select
                type="text"
                id="category"
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Pilih Kategori"
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

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Pilih Status</option>
                <option value="Kehilangan">Kehilangan</option>
                <option value="Menemukan">Menemukan</option>
              </select>
              {/* Ikon Dropdown */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label
              htmlFor="region"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Daerah
            </label>
            <div className="relative">
              <button
                id="region"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3      text-left"
                onClick={toggleRegionPopUp}
              >
                {region ||"Pilih Daerah"}
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {isRegionPopUpOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-48 overflow-auto">
                  <input
                    type="text"
                    placeholder="Cari Daerah"
                    value={regionSearchTerm}
                    onChange={handleRegionSearch}
                    className="w-full p-2 border-b border-gray-300"
                  />
                  {filteredRegions.length > 0 ? (
                    filteredRegions.map((region) => (
                      <div
                        key={region}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setRegion(region);
                          setIsRegionPopUpOpen(false);
                        }}
                      >
                        {region}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No regions found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Alamat
            </label>
            <input
              type="text"
              maxLength={400}
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Masukkan Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Waktu Kejadian
            </label>
            <input
              type="datetime-local"
              id="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              No. Telepon
            </label>
            <input
              type="text"
              id="phone"
              className={`bg-gray-50 border ${phoneNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3      `}
              placeholder="Masukkan No. Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {!phoneNumberValid && (
              <p className="text-red-500 text-sm">Nomor Telepon Invalid</p>
            )}
          </div>
        </div>
        <div className="mt-6 mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            maxLength={3000}
            rows="5"
            className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='text-center'>
          {(!phoneNumberValid || !isFormValid()) && (
            <p className="mb-2 text-red-500 text-sm">
              Isi semua data dengan benar
            </p>
          )}
          <button
            onClick={handleUpload}
            disabled={uploading || !phoneNumberValid || !isFormValid()}
            className={`bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 ${uploading || !phoneNumberValid || !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >

            {uploading ? 'Uploading...' : 'Unggah'}
          </button>
        </div>
      </form>
      {successPopup && ( // Tambahkan popup untuk menampilkan pesan sukses
        <div className="fixed inset-0 flex items-center justify-center text-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Berhasil!</h2>
            <p className="text-gray-700 mb-4">File Anda berhasil diunggah.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSuccessPopup(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

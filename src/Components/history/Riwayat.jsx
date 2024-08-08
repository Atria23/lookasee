import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../client'; // Sesuaikan dengan lokasi file Supabase client Anda

export default function Riwayat() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [menemukanCount, setMenemukanCount] = useState(0);
  const [kehilanganCount, setKehilanganCount] = useState(0);
  const [kembaliCount, setKembaliCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
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
          const menemukanCount = data.filter(item => item.status === 'Menemukan' && item.status_now !== 'Sudah Kembali ke Pemilik').length;
          const kehilanganCount = data.filter(item => item.status === 'Kehilangan' && item.status_now !== 'Sudah Kembali ke Pemilik').length;
          const kembaliCount = data.filter(item => item.status_now === 'Sudah Kembali ke Pemilik').length;

          setMenemukanCount(menemukanCount);
          setKehilanganCount(kehilanganCount);
          setKembaliCount(kembaliCount);
        }
      }
    };

    fetchItems();
  }, [userId]);

  return (
    <div className="bg-bg_utama h-screen">
    <div className="bg-bg_utama pt-8 pb-8">
      <div className="flex-grow bg-white p-6 mx-24 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 p-4 border-b-2">Riwayat Unggahan</h1>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-100 p-4  rounded-lg text-center">
            <h2 className="text-2xl font-semibold">{menemukanCount}</h2>
            <p className="text-gray-600">Menemukan</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-semibold">{kehilanganCount}</h2>
            <p className="text-gray-600">Kehilangan</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-semibold">{kembaliCount}</h2>
            <p className="text-gray-600">Sudah Kembali ke Pemilik</p>
          </div>
        </div>
        <div className="py-6 px-12 riwayat max-w-screen-lg mx-auto">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md">
                <img
                  className="w-16 h-16 mr-4 overflow-hidden rounded-full object-cover"
                  src={item.image_url} // Sesuaikan dengan nama kolom di database Anda
                  alt={item.item_name}
                />
                <div className="flex-grow">
                  <h2 className="text-md font-medium">{item.item_name}</h2>
                  <a
                    href={`/detailbarang/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Selengkapnya
                  </a>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`${item.status_now === 'Sudah Kembali ke Pemilik' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.status_now || item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

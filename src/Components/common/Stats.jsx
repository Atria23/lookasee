
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

export default function HomePage() {
  const [jumlahBarangHilang, setJumlahBarangHilang] = useState(0);
  const [jumlahBarangDitemukan, setJumlahBarangDitemukan] = useState(0);
  const [jumlahBarangDikembalikan, setJumlahBarangDikembalikan] = useState(0);
  const [jumlahPengguna, setJumlahPengguna] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Jumlah Barang Hilang
        const { data: lostItemsData, error: lostItemsError } = await supabase
          .from('items')
          .select('*', { count: 'exact' })
          .ilike('status', '%kehilangan%');
        if (lostItemsError) throw lostItemsError;
        setJumlahBarangHilang(lostItemsData.length);

        // Jumlah Barang Ditemukan
        const { data: foundItemsData, error: foundItemsError } = await supabase
          .from('items')
          .select('*', { count: 'exact' })
          .ilike('status', '%menemukan%');
        if (foundItemsError) throw foundItemsError;
        setJumlahBarangDitemukan(foundItemsData.length);

        // Jumlah Barang Dikembalikan
        const { data: returnedItemsData, error: returnedItemsError } = await supabase
          .from('items')
          .select('*', { count: 'exact' })
          .eq('status_now', 'Sudah Kembali ke Pemilik');
        if (returnedItemsError) throw returnedItemsError;
        setJumlahBarangDikembalikan(returnedItemsData.length);

        // Jumlah Pengguna
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*', { count: 'exact' });
        if (usersError) throw usersError;
        setJumlahPengguna(usersData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-auto w-full py-8 sm:py-16 px-4 bg-utama">
      <div className="flex flex-wrap justify-center text-center">
        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4 px-4 py-8 sm:py-0">
          <img src="/images/lost-item.svg" alt="Barang Hilang" className="w-16 h-16 my-2" />
          <span className="text-black text-xl sm:text-2xl font-bold">{jumlahBarangHilang}</span>
          <span className="text-black text-sm sm:text-base">Barang Hilang</span>
        </div>
        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4 px-4 py-8 sm:py-0">
          <img src="/images/item-found.svg" alt="Barang Ditemukan" className="w-16 h-16 my-2" />
          <span className="text-black text-xl sm:text-2xl font-bold">{jumlahBarangDitemukan}</span>
          <span className="text-black text-sm sm:text-base">Barang Ditemukan</span>
        </div>
        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4 px-4 py-8 sm:py-0">
          <img src="/images/user.svg" alt="Pengguna" className="w-16 h-16 my-2" />
          <span className="text-black text-xl sm:text-2xl font-bold">{jumlahPengguna}</span>
          <span className="text-black text-sm sm:text-base">Pengguna</span>
        </div>
        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4 px-4 py-8 sm:py-0">
          <img src="/images/return.svg" alt="Barang Dikembalikan" className="w-16 h-16 my-2" />
          <span className="text-black text-xl sm:text-2xl font-bold">{jumlahBarangDikembalikan}</span>
          <span className="text-black text-sm sm:text-base">Barang Kembali Ke Pemilik</span>
        </div>
      </div>
    </section>

  );
}

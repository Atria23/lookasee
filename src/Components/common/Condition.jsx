import ProfileNav from '../profile/ProfileNav'; 

export default function Conditions() {
    return (
        <>
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
      <ProfileNav />
      <div className="flex-1 p-2">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-center md:text-left">
          Privasi & Keamanan
          </h1>
          <div className="border border-black mb-6"></div>
          <div className="bg-blue-100 p-4 sm:p-6 rounded-lg">
              <div className="w-full overflow-auto max-h-96 scrollable-content">
                <div className="list-none text-gray-600 flex flex-col">
                  <h1 className="block text-gray-700 font-bold"> Privasi Terjamin</h1>
                  <p className="mb-4 ">Kami menjaga privasi Anda dengan serius. Data pribadi Anda aman bersama kami, dan kami tidak akan membagikannya dengan pihak ketiga tanpa izin Anda.</p>

                  <h1 className="block text-gray-700 font-bold"> Keamanan Data</h1>
                  <p className="mb-4 ">Aplikasi kami dilengkapi dengan enkripsi tingkat tinggi untuk melindungi data Anda dari akses yang tidak sah. Setiap informasi yang Anda masukkan terlindungi dengan baik.</p>

                  <h1 className="block text-gray-700 font-bold"> Perlindungan Privasi</h1>
                  <p className="mb-4 ">Nikmati pencarian barang tanpa khawatir. Privasi Anda adalah prioritas kami, dan kami selalu berusaha memastikan bahwa informasi Anda tetap aman dan rahasia.</p>

                  <h1 className="block text-gray-700 font-bold"> Keamanan Terbaik</h1>
                  <p className="mb-4 ">Dengan teknologi keamanan terkini, kami memastikan data Anda selalu terlindungi. Protokol keamanan berlapis kami dirancang untuk menjaga integritas dan kerahasiaan data Anda.</p>

                  <h1 className="block text-gray-700 font-bold"> Privasi</h1>
                  <p className="mb-4 ">Informasi pribadi Anda hanya digunakan untuk keperluan pencarian dan tidak dibagikan kepada pihak ketiga. Kami berkomitmen untuk menjaga kerahasiaan data Anda.</p>

                  <h1 className="block text-gray-700 font-bold"> Pengamanan Data</h1>
                  <p className="mb-4 ">Kami menggunakan sistem pengamanan data berlapis untuk memastikan tidak ada celah keamanan. Setiap lapisan keamanan dirancang untuk melindungi informasi Anda dari ancaman potensial.</p>

                  <h1 className="block text-gray-700 font-bold"> Privasi dan Keamanan Maksimal</h1>
                  <p className="mb-4 ">Setiap pencarian yang Anda lakukan dilindungi dengan protokol keamanan terbaik. Kami memastikan bahwa aktivitas Anda dalam aplikasi kami selalu aman.</p>

                  <h1 className="block text-gray-700 font-bold"> Aman dan Terpercaya</h1>
                  <p className="mb-4 ">Keamanan informasi pribadi Anda adalah tanggung jawab utama kami. Kami berusaha keras untuk memastikan bahwa data Anda tidak akan jatuh ke tangan yang salah.</p>

                  <h1 className="block text-gray-700 font-bold"> Privasi Anda, Prioritas Kami</h1>
                  <p className="mb-4 ">Kami berkomitmen untuk melindungi privasi dan keamanan data Anda dalam setiap langkah pencarian. Dengan kebijakan privasi yang ketat, kami memastikan bahwa data Anda hanya digunakan untuk keperluan yang telah Anda setujui.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

import SearchBar from "./SearchBar";
export default function HomePage() {
  return (
    <div className="font-sans">
      <section className="w-full bg-cover bg-center bg-[url('/images/bg-hero.png')] bg-no-repeat">
        <div className="max-w-screen-xl px-4 py-16 mx-auto lg:py-40 text-center">
          <h1 className="mb-6 text-3xl font-semibold text-white md:text-4xl lg:text-5xl">Hilang?</h1>
          <h1 className="mb-8 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">Klik, Cari, Ketemu!</h1>
          <p className="mb-8 text-base font-normal text-white md:text-lg lg:text-xl sm:px-4 lg:px-16">Hai, sobat! Pernah kehilangan barang dan bingung mencarinya? Tenang, aplikasi ini siap membantu! Yuk, mulai pencarianmu sekarang dan temukan kembali barang-barang kesayanganmu!</p>
          <SearchBar />
        </div>
      </section>
    </div>
  )
}

// import SearchBar from "./SearchBar";
// import CategoryButtons from "./CategoryButtons";
// import LatestUpload from "./LatestUpload";
// import TopUpload from "./TopUpload";
// import Stats from "./Stats";

// export default function HomePage() {
//   return (
//     <div className="">
//       <section className="w-full bg-cover bg-center bg-[url('https://i.postimg.cc/0jvhV9Mj/bg-hero.png')]">
//         <div className="grid max-w-screen-xl px-4 py-16 mx-auto xl:gap-0 lg:py-40 ">
//           <h1 className="mb-6 text-4xl font-semibold tracking-tight leading-none text-center text-white md:text-5xl lg:text-6xl">Hilang?</h1>
//           <h1 className="mb-14 text-4xl font-extrabold tracking-tight leading-none text-white text-center md:text-5xl lg:text-6xl">Klik, Cari, Ketemu!</h1>
//           <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48 text-center">Hai, sobat! Pernah kehilangan barang dan bingung mencarinya? Tenang, aplikasi ini siap membantu! Yuk, mulai pencarianmu sekarang dan temukan kembali barang-barang kesayanganmu!</p>
//           <SearchBar />
//         </div>
//       </section>

//       <CategoryButtons />

//       <LatestUpload />

//       <TopUpload />

//       <Stats />
//     </div>
//   )
// }




import SearchBar from "./SearchBar";
import CategoryButtons from "./CategoryButtons";
import LatestUpload from "./LatestUpload";
import TopUpload from "./TopUpload";
import Stats from "./Stats";

export default function HomePage() {
  return (
    <div className="font-sans">
      <section className="w-full bg-cover bg-center bg-[url('https://i.postimg.cc/0jvhV9Mj/bg-hero.png')] bg-no-repeat">
        <div className="max-w-screen-xl px-4 py-16 mx-auto lg:py-40 text-center">
          <h1 className="mb-6 text-3xl font-semibold text-white md:text-4xl lg:text-5xl">Hilang?</h1>
          <h1 className="mb-8 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">Klik, Cari, Ketemu!</h1>
          <p className="mb-8 text-base font-normal text-white md:text-lg lg:text-xl sm:px-4 lg:px-16">Hai, sobat! Pernah kehilangan barang dan bingung mencarinya? Tenang, aplikasi ini siap membantu! Yuk, mulai pencarianmu sekarang dan temukan kembali barang-barang kesayanganmu!</p>
          <SearchBar />
        </div>
      </section>
      

      
        <CategoryButtons />
      

      
        <LatestUpload />
      

      
        <TopUpload />
      

      
        <Stats />
      
    </div>
  )
}

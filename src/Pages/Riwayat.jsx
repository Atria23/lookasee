import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import Riwayat from "../Components/order/Riwayat";
import { useAuth } from "../Components/common/AuthProvider";

export default function RiwayatPages() {
  const {user} = useAuth();
  return (
    
    <>
      {user ? <NavUser /> : <Nav />}

      <Riwayat />


    </>
  )
}

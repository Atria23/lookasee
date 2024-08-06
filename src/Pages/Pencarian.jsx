import HasilPencarian from "../Components/common/HasilPencarian";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";

export default function HasilPencarianPages() {
  const { user } = useAuth();

  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <HasilPencarian />
    </>
  )
}

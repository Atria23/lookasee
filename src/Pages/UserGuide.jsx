import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";

import UserGuide from "../Components/common/UserGuide";
import { useAuth } from "../Components/common/AuthProvider";

export default function UserGuidePage() {
  const {user} = useAuth();
  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <UserGuide />
      

    </>
  )
}

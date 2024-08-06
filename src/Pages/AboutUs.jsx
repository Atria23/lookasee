import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";

import AboutUs from "../Components/common/AboutUs";
import { useAuth } from "../Components/common/AuthProvider";

export default function AboutUsPage() {
  const {user} = useAuth();
  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <AboutUs />
      

    </>
  )
}

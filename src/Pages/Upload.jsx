import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";

import Upload from "../Components/common/Upload";
import { useAuth } from "../Components/common/AuthProvider";

export default function UploadPages() {
  const {user} = useAuth();
  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <Upload />
    </>
  )
}

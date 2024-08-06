import Profile from "../Components/profile/Profile";
import { useAuth } from "../Components/common/AuthProvider";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";

export default function ProfilePages() {
    const {user} = useAuth();

    return (
        <>
              {user ? <NavUser /> : <Nav />}

            <Profile />
        </>
    );
}

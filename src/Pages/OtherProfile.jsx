import OtherProfile from "../Components/profile/OtherProfile";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";

export default function OtherProfilePages() {
    const { user } = useAuth();

    return (
        <div className="overflow-hidden h-screen">
            {user ? <NavUser /> : <Nav />}
            <OtherProfile />
        </div>
    );
}

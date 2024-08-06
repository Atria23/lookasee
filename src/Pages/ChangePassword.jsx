import ChangePassword from "../Components/auth/ChangePassword";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";

export default function ChangePasswordPage() {
    const {user} = useAuth();
    return (
        <>
            
            {user ? <NavUser /> : <Nav />}
            <ChangePassword />
        </>
    );
}

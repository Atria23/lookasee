import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";
import DeleteItem from "../Components/common/DeleteItem";

export default function DetailBarangPages() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <DeleteItem />
        </>
    );
}

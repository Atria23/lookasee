import DetailBarang from "../Components/product/DetailBarang";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";

export default function DetailBarangPages() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <DetailBarang />
        </>
    );
}

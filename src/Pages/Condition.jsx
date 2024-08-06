import Condition from "../Components/common/Condition";
import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import { useAuth } from "../Components/common/AuthProvider";

export default function ConditionPages() {
    const {user} = useAuth();

    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <Condition />
        </>
    );
}

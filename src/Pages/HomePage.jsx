import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import Home from "../Components/common/HomePage";
import { useAuth } from "../Components/common/AuthProvider";
import React from 'react';
import Footer from "../Components/common/Footer";
import CategoryButtons from "../Components/common/CategoryButtons";
import LatestUpload from "../Components/common/LatestUpload";
import TopUpload from "../Components/common/TopUpload";
import Stats from "../Components/common/Stats";


export default function HomePage() {
    const { user } = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <Home />
            <CategoryButtons />
            <LatestUpload />
            <TopUpload />
            <Stats />
            <Footer />
        </>
    );
}

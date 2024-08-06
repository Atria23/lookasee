import Nav from "../Components/common/Nav";
import NavUser from "../Components/common/NavUser";
import Home from "../Components/common/HomePage";
import { useAuth } from "../Components/common/AuthProvider";
import React from 'react';
import Footer from "../Components/common/Footer";

export default function HomePage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <Home/>
            <Footer/>
        </>
    );  
}

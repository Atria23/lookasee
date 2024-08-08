import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div>
            <footer className="bg-gray-900">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-12">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0 flex justify-center">
                            <a href="#" onClick={() => navigate("/#")} className="">
                                <span className="text-2xl font-semibold text-white">lookasee </span>
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 text-center sm:text-left">
                            <div>
                                <h2 className="mb-6 text-xs sm:text-base font-semibold uppercase text-white">Jelajahi</h2>
                                <ul className="text-gray-400 font-medium">
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a href="#" onClick={() => navigate("/aboutus")} className="hover:underline">
                                            Tentang Kami
                                        </a>
                                    </li>
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a href="#" onClick={() => navigate("/condition")} className="hover:underline">
                                            Privasi dan Kondisi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-xs sm:text-base font-semibold uppercase text-white">Ikuti kami</h2>
                                <ul className="text-gray-400 font-medium">
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a
                                            href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg=="
                                            className="hover:underline"
                                        >
                                            Dwi Ammar Rosyid
                                        </a>
                                    </li>
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a
                                            href="https://www.instagram.com/danu_3anggoro?igsh=MTlseWExbThiZW4wcQ== "
                                            className="hover:underline"
                                        >
                                            Danu Trianggoro
                                        </a>
                                    </li>
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a href="https://www.instagram.com/meyaaiii?igsh=d3duZmVndzBoazJ5" className="hover:underline">
                                            Melia Sannur Farkha
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-xs sm:text-base font-semibold uppercase text-white">Layanan</h2>
                                <ul className="text-gray-400 font-medium">
                                    <li className="mb-4 text-xs sm:text-base">
                                        <a href="#" onClick={() => navigate("/userguide")} className="hover:underline">
                                            Cara Penggunaan
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-700" />
                    <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-400 text-center sm:text-left">
                            © 2024 <a href="https://flowbite.com/" className="hover:underline">lookasee™</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 space-x-5 justify-center sm:justify-start sm:mt-0">
                            <a href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg==" className="text-gray-500 hover:text-white">
                                <svg className="w-[24px] h-[24px] text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a
                                href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg=="
                                className="text-gray-500 hover:text-white"
                            >
                                <svg className="w-[24px] h-[24px] text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord community</span>
                            </a>
                            <a
                                href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg=="
                                className="text-gray-500 hover:text-white"
                            >
                                <svg className="w-[24px] h-[24px] text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a
                                href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg=="
                                className="text-gray-500 hover:text-white"
                            >
                                <svg className="w-[24px] h-[24px] text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </a>
                            <a
                                href="https://www.instagram.com/dwiisyd?igsh=MXUwcGVhaGtjNTZmcg=="
                                className="text-gray-500 hover:text-white"
                            >
                                <svg className="w-[24px] h-[24px] text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Instagram account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

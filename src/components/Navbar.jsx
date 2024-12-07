import { Link } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiHeart } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import avaterImg from "../assets/avatar.png"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Chaeck Out", href: "/checkout" },
]

const Navbar = () => {

    const [isDropdownOpen, setISDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
  
    const {currentUser, logout} = useAuth()

    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');

  
    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3BottomLeft className="size-6" />
                    </Link>

                    {/*search bar*/}
                    <div className="relative sm:w-72 w-40 space-x-2">

                        <FiSearch className="absolute inline-block left-3 inset-y-2" />

                        <input type="text" placeholder="Search here "
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md
                    focus:outline-none"/>
                    </div>
                </div>


                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div >
                        {
                            currentUser ? <>
                                <button onClick={() => setISDropdownOpen(!isDropdownOpen)}>
                                    <img src={avaterImg} alt="" className={`size-7 rounded-full $ {currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* show dorpdowns*/}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white
                                    shadow-lg rounded-md z-40">
                                            <ul className="py-2">
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() =>
                                                            setISDropdownOpen(false)}>
                                                            <Link to={item.href} className="block
                                                    px-4 py-2 text-sm hover:bg-gray-100">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button 
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left
                                                    px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                                </li>
                                            </ul>

                                        </div>
                                    )
                                }
                            </> : <Link to="/login"><HiOutlineUserCircle className="size-6" /></Link>
                        }
                    </div>

                    <button className="hidden sm:block">
                        <PiHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center
                rounded-sm">
                        <HiOutlineShoppingBag className='' />
                        {
                            cartItems.length > 0 ? <span className="text-sm font-semibold 
                            sm:ml-1">{cartItems.length}</span> : 
                            <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                        
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { TbLoaderQuarter } from "react-icons/tb";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaBars, FaAngleDown } from 'react-icons/fa6'
import { LuLogOut } from "react-icons/lu";
import { PiUserListDuotone } from "react-icons/pi";
import { UserDataAPI } from '../service/Api'
import { checkAdmin, isAuthenticated, logout } from '../service/Auth'
import { AdminMenuData, UserMenuData } from '../service/MenuItems';
import pro from '../assets/images/profilepic.jpg'
import SearchBar from './SearchBar';




function TopNav() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const navigate = useNavigate();

    const [showDown, setShowDown] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", uid: "" });

    const showUser = () => setShowDown(!showDown);

    useEffect(() => {
        if (isAuthenticated()) {

            UserDataAPI().then((res) => {

                setUserData({ name: res.data.users[0].displayName, email: res.data.users[0].email, uid: res.data.users[0].localId });

            }).catch((err) => {

            }).finally(() => {

            })
        }
    }, [])


    // console.log(checkAdmin())
    const MenuData = checkAdmin() ? AdminMenuData : UserMenuData;
    const profile = checkAdmin() ? '/qsadmin/userprofile' : '/qsuser/userprofile';

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    }

    return (
        <div className='w-full bg-bluebg border-b-2 border-b-graylg flex justify-between items-center h-16 fixed z-10'>

            <div className={`flex justify-center items-center gap-20 md:gap-40 ms-8`}>

                <Link to='/' className='hidden md:block text-secondary text-2xl font-semibold '>QuizSnap</Link>

            <nav>

                <ul className='flex justify-center items-center gap-16'>
                    {
                        UserMenuData.map((navData, index) => {
                            return (
                                <Link to={navData.path} className='tline'>
                                    <li key={index} className=' flex flex-row justify-center items-center gap-2 text-[1rem]'>
                                        {navData.icon}
                                        {navData.title}
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>

            </nav>

            </div>


                    <SearchBar />
            <div className="relative inline-block text-left right-4 md:right-8">
                {userData.name && userData.email && userData.uid ? (
                    // <div>
                    <button
                        type="button"
                        className="inline-flex justify-center items-center gap-2 w-full rounded-md border-2 border-graylg shadow-sm px-0 py-0 md:px-4 md:py-2 bg-bgwhite text-sm font-medium text-bluetext"
                        onClick={showUser} // Toggle dropdown on click
                    >
                        <img src={pro} className='w-12 md:w-8 rounded-3xl' /> 
                        {/* <p className='hidden md:w-36 md:flex justify-start overflow-hidden'>{userData.name}</p>  */}
                        <FaAngleDown className={`hidden md:block ${showDown ? 'rotate-180' : 'rotate-0'} duration-300`} />

                    </button>
                    // </div> 
                ) :
                    <div> <p className='w-96 flex justify-center items-center gap-2 text-bluetext animate-pulse'><TbLoaderQuarter className='animate-spin' /> Loading data...</p> </div>
                }


                {showDown && (
                    <div className="origin-top-right absolute right-4 md:right-4 mt-2 w-48 md:w-64 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1 text-bgwhite" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <p role='menuitem' className='px-4 py-2 flex gap-2 items-center'>Signed in as {userData.email}</p>
                            <Link role="menuitem" to={profile} className='px-4 py-2 flex gap-2 items-center duration-200 hover:translate-x-2' onClick={() => setShowDown(false)}><PiUserListDuotone /> Profile</Link>
                            <Link role="menuitem" className='flex px-4 py-2 gap-2 items-center duration-200 hover:translate-x-2' onClick={handleLogout}><LuLogOut /> Logout</Link>


                        </div>
                    </div>
                )}

            </div>


        </div>
    )
}

export default TopNav
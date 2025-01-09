import React, { useState, useEffect, useRef } from 'react'
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

function QSNav() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const navigate = useNavigate();

    const [showDown, setShowDown] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", uid: "" });

    const showUser = () => setShowDown(!showDown);
    const tabRef = useRef(null);   

    const handleClickOutside = (event) => {
      if (tabRef.current && !tabRef.current.contains(event.target)) {
        setShowDown(false);
      }
    };
  
    // Attach and detach event listener for clicks
    useEffect(() => {
      if (showDown) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
  
      // Cleanup on component unmount or state change
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [showDown]);

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

    if (!isAuthenticated()) {

        return <Navigate to='/login' />

    }
    return (
        <>
            <div className='w-full bg-bluebg border-b-2 border-b-graylg flex justify-between items-center h-16 fixed z-50'>

                <div className={`hidden lg:flex justify-center items-center gap-20 md:gap-40 ms-8 duration-500 ${sidebar ? "md:ms-72" : "md:ms-28"}`}>

                    {/* <div className="flex items-center justify-around"> */}

                    <Link to='#' className='w-full text-primary text-xl'>

                        {sidebar ? <RiCloseLargeLine onClick={showSidebar} /> : <FaBars onClick={showSidebar} />}

                    </Link>


                    <Link to='/' className='hidden md:block text-secondary text-2xl font-semibold '>QuizSnap</Link>


                </div>

                <div className={`flex lg:hidden justify-center items-center gap-20 md:gap-40 ms-8`}>

                    {/* <div className="flex items-center justify-around"> */}

                    <Link to='#' className='w-full text-primary text-xl'>

                        {sidebar ? <RiCloseLargeLine onClick={showSidebar} /> : <FaBars onClick={showSidebar} />}

                    </Link>


                    <Link to='/' className='hidden md:block text-secondary text-2xl font-semibold '>QuizSnap</Link>


                </div>

                <SearchBar />

                <div ref={tabRef} className="relative inline-block text-left right-4 md:right-8">
                    {userData.name && userData.email && userData.uid ? (
                        // <div>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center gap-2 w-full rounded-md border-2 border-graylg shadow-sm px-0 py-0 md:px-4 md:py-2 bg-bgwhite text-sm font-medium text-bluetext"
                            onClick={showUser} // Toggle dropdown on click
                        >
                            <img src={pro} className='w-12 md:w-8 rounded-3xl' alt='toggle' />
                            {/* <p className='hidden md:w-36 md:flex justify-start overflow-hidden'>{userData.name}</p>  */}
                            <FaAngleDown className={`hidden md:block ${showDown ? 'rotate-180' : 'rotate-0'} duration-300`} />

                        </button>
                        // </div> 
                    ) :
                        <div> <p className='w-96 flex justify-center items-center gap-2 text-bluetext animate-pulse'><TbLoaderQuarter className='animate-spin' /> Loading data...</p> </div>
                    }


                    {showDown && (
                        <div className="origin-top-right absolute right-4  mt-2 w-48 md:w-64 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 text-bgwhite" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <p role='menuitem' className='px-4 py-2 flex gap-2 items-center'>Signed in as {userData.email}</p>
                                {/* <Link role="menuitem" to={profile} className='px-4 py-2 flex gap-2 items-center duration-200 hover:translate-x-2' onClick={() => setShowDown(false)}><PiUserListDuotone /> Profile</Link> */}
                                <Link role="menuitem" className='flex px-4 py-2 gap-2 items-center duration-200 hover:translate-x-2' onClick={handleLogout}><LuLogOut /> Logout</Link>


                            </div>
                        </div>
                    )}

                </div>


            </div>

            <nav className={`bg-primary w-[16.1rem] h-dvh flex lg:hidden flex-col fixed top-16 ${sidebar ? 'left-0' : '-left-96'} duration-500 z-50`} >



                <ul className='w-full relative top-12'>

                    {/* <li className='flex text-bgwhite mb-8 relative right-8 md:hidden'><RiCloseLargeLine className='w-40 inline' size={35} onClick={showSidebar} /></li> */}
                    {MenuData.map((navData, index) => {
                        return (
                            <li key={index} className='item-name'>
                                <Link to={navData.path} className='flex flex-row justify-center items-center gap-4 text-xl' onClick={() => { setSidebar(false) }}>
                                    <span className='text-xl' >{navData.icon}</span>
                                    <span className={`w-40 !text-[1rem] inline`}>{navData.title}</span>
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </nav>

            <nav className={`hidden lg:flex bg-primary h-dvh flex-col fixed top-0 duration-500 z-50  ${sidebar ? ' w-[16.1rem]' : ' hidden w-20 pe-2'}`} >

                <ul className='w-full relative top-12'>

                    <li className='flex text-bgwhite mb-8 relative right-8 md:hidden'><RiCloseLargeLine className='w-40 inline' size={35} onClick={showSidebar} /></li>
                    {MenuData.map((navData, index) => {
                        return (
                            <li key={index} className='item-name'>
                                <Link to={navData.path} className='flex flex-row justify-center items-center gap-4 text-xl' onClick={() => { setSidebar(false) }}>
                                    <span className='text-xl' >{navData.icon}</span>
                                    <span className={`w-40 !text-[1rem] relative duration-500 ${sidebar ? 'block left-0' : 'hidden -left-96'}`}>{navData.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    {/* <li className='item-name cursor-pointer'
                     onClick={handleLogout}
                     >
                     <a className='flex flex-row justify-center items-center gap-4'>
                            <span className='text-xl'> <LuLogOut /> </span>   
                            <span className={sidebar ? 'inline !text-[1rem]' : 'hidden'}>Logout</span>                     
                        </a>

                    </li> */}

                </ul>

            </nav>


        </>
    )
}

export default QSNav;
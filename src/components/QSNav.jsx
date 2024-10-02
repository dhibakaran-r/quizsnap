import React ,{useState, useEffect} from 'react'
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

function QSNav() {

    const [sidebar, setSidebar] = useState(false);  
    const showSidebar = () => setSidebar(!sidebar);

    const navigate = useNavigate();    

    const [showDown, setShowDown] = useState(false);
    const [userData, setUserData] = useState({ name:"", email:"", uid:""});
    
    const showUser = () => setShowDown(!showDown);
    
    useEffect(() => {
        if (isAuthenticated()) {
            
            UserDataAPI().then((res) => {
               
                setUserData({name:res.data.users[0].displayName, email:res.data.users[0].email, uid:res.data.users[0].localId});
                
                }).catch((err) => {
                    
                }).finally(() => {
                    
                })
            }
        },[])
        
     
        // console.log(checkAdmin())
       const MenuData = checkAdmin() ? AdminMenuData : UserMenuData;
       const profile = checkAdmin() ? '/qsadmin/userprofile' : '/qsuser/userprofile';
   
    const handleLogout = (e) =>{
        e.preventDefault();
        logout();
        navigate('/');
    }

    if (!isAuthenticated()) {

		return <Navigate to='/login' />

	}
    return (
        <>
            <div className='w-full bg-bluebg border-b-2 border-b-graylg flex justify-start items-center h-16 fixed z-10'>
                
                <div className={sidebar ? "flex justify-center items-center gap-20 md:gap-40 ms-8 md:ms-72 duration-500" : "flex justify-center items-center gap-20 md:gap-40 ms-8 md:ms-28 duration-500" }>
                    
                    {/* <div className="flex items-center justify-around"> */}
                    
                        <Link to='#' className='w-full text-primary text-xl'>
                                    
                            {sidebar ? <RiCloseLargeLine onClick={showSidebar}/> : <FaBars onClick={showSidebar}/>}
                                        
                        </Link>

                        
                        <Link to='/' className='block text-secondary text-2xl font-semibold'>QuizSnap</Link>

                        
                 
                    {/* </div> */}

                    {/* <div className="top-block-2">

                        <div className='search-block'>
                            <div className='flex justify-between items-center'>
                                <span className='relative left-8 text-2xl items-center justify-center'><IoMdSearch /></span>  
                                <input type="text" name='search' className='w-96 outline-none py-2 ps-10 pe-4 border-none bg-[#dbdbdb] rounded-[50px]' placeholder='Search' />
                            </div>
                        </div>
                        
                    </div> */}

                </div>
                
                <div className='w-8 md:w-[75%] flex justify-end items-center ms-16 md:ms-28'>
                    {userData.name && userData.email && userData.uid ? 
                        (<div className={showDown ? 'flex flex-col gap-2 me-4 relative top-12' :'flex flex-col gap-0 me-4 relative top-9'}>
                            {/* <div className='flex flex-col'> */}

                                <div className=  'duration-300 bg-bluebg'>
                                    
                                    <button onClick={showUser} className='w-20 md:w-auto border-2 border-graylg p-2 flex justify-center items-center gap-2 rounded-md duration-300'>
                                        <img src={pro} className='w-8 rounded-3xl'/> <p className='hidden md:w-36 md:flex justify-start'>{userData.name}</p> {showDown ? <FaAngleDown className=' rotate-180 duration-300'/> : <FaAngleDown className='duration-300'/>}
                                    </button>

                                </div> 

                                <div className={showDown ? 'w-28 md:w-56 h-24 duration-300 bg-primary rounded-md' : 'h-0 duration-500'}>
                                    <ul className={showDown ? 'p-4 text-bluebg' : "hidden"}>
                                        <Link to={profile} onClick={()=>setShowDown(false)}><li className='mb-2 flex gap-2 items-center duration-200 hover:translate-x-2'><PiUserListDuotone /> Profile</li></Link>
                                        <Link><li className='flex gap-2 items-center duration-200 hover:translate-x-2' onClick={handleLogout}><LuLogOut /> Logout</li></Link>
                                    </ul>
                                </div>

                            {/* </div> */}

                        </div>)
                               :
                           <div> <p className='w-96 flex justify-center items-center gap-2 text-bluetext animate-pulse'><TbLoaderQuarter className='animate-spin' /> Loading data...</p> </div>
                    }
                </div>

            </div>
           
             <nav className ={sidebar ? 'nav-bar-1' : 'nav-bar-2'} >


                
                <ul className='nav-items'>
                 
                    <li className='flex text-bgwhite mb-8 relative right-8 md:hidden'><RiCloseLargeLine className='w-40 inline' size={35} onClick={showSidebar}/></li>
                    {MenuData.map((navData, index) => {
                        return (
                            <li key={index} className='item-name'>
                                <Link to={navData.path} className='flex flex-row justify-center items-center gap-4 text-xl'  onClick={() => {setSidebar(false)}}>
                                    <span className='text-xl' >{navData.icon}</span>
                                    <span className={sidebar ? 'w-40 inline !text-[1rem]' : 'w-40 hidden'}>{navData.title}</span>
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
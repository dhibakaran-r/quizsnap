import React from 'react';
import { useState } from 'react';
import '../App.css'
import { FaBars } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FaUsersRays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link } from 'react-router-dom';

function Navbar() {

    const[toggle, setToggle] = useState(false);

    const menus = [
        {
            "name" : "Home",
            "icon" : <AiOutlineHome />,
            "link" : "#home"
        },
        {
            "name" : "MCQ's",
            "icon" : <LiaBookReaderSolid />,
            "link" : "#mcq"
        },
        {
            "name" : "About us",
            "icon" : <FaUsersRays />,
            "link" : "#about"
        },
        {
            "name" : "Contact us",
            "icon" : <GrContact />,
            "link" : "#contact"
        },
    ]

  return (
    <header className='w-full flex p-5 justify-between items-center z-10'>

        <div className='w-1/6 bg-slate-700'>
            <a href='#' className='text-secondary text-2xl font-semibold'>QuizSnap</a>
        </div>

        <nav className='hidden lg:flex items-center justify-center gap-[10rem]'>

            <ul className='flex justify-center items-center gap-[3rem]'>
                {
                    menus.map((item, index) => {
                        return <li className='uline' key={index}><a href={item.link} className='flex justify-center items-center gap-2'>{item.name}</a></li>
                    })
                }
            </ul>
            
            <div className='hidden lg:flex justify-center items-center gap-3'>
                <button className='py-1 px-5 rounded-full border border-primary bg-primary text-bluebg duration-300 hover:bg-secondary hover:border-secondary'><Link to="login">Log in</Link></button>
                <button className='py-1 px-3 rounded-full border border-primlight text-primary duration-300 hover:border-primary'><Link to="register">Sign Up</Link> </button>
            </div>

        </nav>
    
        {
            toggle &&  <nav className='block lg:hidden'>

            <div className='mobile-nav'>
                
                <ul className='flex flex-col justify-center items-start gap-2'>
                    {
                        menus.map((item, index) => {
                            return <li className='uline' onClick={() => setToggle(!toggle)} key={index}><a href={item.link} className='flex justify-center items-center gap-2'>{item.icon} {item.name}</a></li>
                        })
                    }
                </ul>
                
                <div className='flex lg:hidden flex-col justify-center items-center gap-3'>
                    <button className='py-1 px-5 rounded-full border border-primary bg-primary text-bluebg duration-300 hover:bg-secondary hover:border-secondary'><Link to="login">Log in</Link></button>
                    <button className='py-1 px-3 rounded-full border border-primlight text-primary duration-300 hover:border-primary'><Link to="register">Sign Up</Link></button>
                </div>

            </div>    

        </nav>
        }

        <button onClick={() => setToggle(!toggle)} className="block lg:hidden"><FaBars className=" text-blue-600 h-5 font-bold bar"></FaBars></button>

        

    </header>
  )
}

export default Navbar
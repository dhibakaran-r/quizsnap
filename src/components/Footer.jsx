
import { AiOutlineHome } from "react-icons/ai";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FaUsersRays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link, Navigate } from 'react-router-dom';

export default function Footer() {

    const menus = [
        {
            "name": "Home",
            "icon": <AiOutlineHome />,
            "link": "#home"
        },
        {
            "name": "MCQ's",
            "icon": <LiaBookReaderSolid />,
            "link": "#mcq"
        },
        {
            "name": "About us",
            "icon": <FaUsersRays />,
            "link": "#about"
        },
        {
            "name": "Contact us",
            "icon": <GrContact />,
            "link": "#contact"
        },
    ]

    return (
        <footer className='bg-bluellg p-8 w-full' id='resume'>

            <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">

                {
                    <div className='flex justify-center items-center gap-4 md:gap-24'>

                        <ul className='flex flex-col justify-center items-start gap-2'>
                            {
                                menus.map((item, index) => {
                                    return <li className='uline' key={index}><a href={item.link} className='flex justify-center items-center gap-2'>{item.icon} {item.name}</a></li>
                                })
                            }
                        </ul>

                        <div className='flex flex-row justify-center items-center gap-3'>
                            <button className='py-1 px-5 rounded-full border border-primary bg-primary text-bluebg duration-300 hover:bg-secondary hover:border-secondary'><Link to="login">Log in</Link></button>
                            <button className='py-1 px-3 rounded-full border border-primlight text-primary duration-300 hover:border-primary'><Link to="register">Sign Up</Link></button>
                        </div>

                    </div>

                }
                <p className='py-5 text-xl text-primary text-center italic tracking-widest leading-3'>&copy; QuizSnap 2024</p>

            </div>

        </footer>
    )
}

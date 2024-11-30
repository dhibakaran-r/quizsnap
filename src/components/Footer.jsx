
import { AiOutlineHome } from "react-icons/ai";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FaHandshakeSimple, FaUsersRays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { Link, Navigate } from 'react-router-dom';
import { IoMdMail } from "react-icons/io";

export default function Footer() {

    const contact = [
        {
          icon: <IoMdMail />,
          title: "Contact",
          detail: "quizsnapoffi@gmail.com"
        },
        {
          icon: <FaHandshakeSimple />,
          title: "Partner",
          detail: "businesswithquizsnap@gmail.com"
        }
      ]

    return (
        <footer className='bg-bluellg p-4 md:p-8 w-full'>

            <div className=" md:h-40 flex flex-col justify-between items-center gap-8 md:gap-0">

                <div className='w-full flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-center gap-5 lg:gap-20'>
                    <ul className='list-none text-sm md:text-base flex flex-row justify-center items-center gap-6'>
                        <li>Terms</li>
                        <li>Privacy Policy</li>
                        <Link to="login"><li className="p-2 border border-primary text-textsec hover:text-primary hover:border-textsec duration-300 rounded-full  font-bold">Join Now +</li></Link>
                    </ul>
                    <ul className='text-sm list-none flex flex-col md:flex-row gap-6'>
                        {contact.map((items, index) => {
                            return (

                                <li key={index} className='flex flex-row justify-center items-center gap-2 p-2 border border-outlg rounded-full'>
                                    <span className='text-xl' >{items.icon}</span>
                                    <span className=''>{items.title}:</span>
                                    <span className='text-secondary'>{items.detail}</span>
                                </li>

                            )
                        })}

                    </ul>
                </div>
                <p className='py-5 text-xl text-primary text-center italic tracking-widest leading-3'>&copy; QuizSnap 2024</p>

            </div>

        </footer>
    )
}

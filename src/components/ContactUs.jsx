import React from 'react'
import { FaSquareFacebook, FaSquareXTwitter, FaSquareInstagram, FaHandshakeSimple } from "react-icons/fa6";
import { FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { CgCornerRightDown } from "react-icons/cg";

function ContactUs() {

    const links = [
        {
            "icon" : <FaSquareFacebook size={40}/>,
            "link" : "#"
        },
        {
            "icon" : <FaSquareXTwitter size={40}/>,
            "link" : "#"
        },
        {
            "icon" : <FaLinkedin size={40}/>,
            "link" : "#"
        },
        {
            "icon" :  <FaSquareInstagram size={40}/>,
            "link" : "#"
        },
    ]

    const contact = [
        {
            "title" : "Drop Us a Line",
            "detail" : "Got a question or need support? Shoot us an email at:",
            "addr" : "quizsnapoffi@gmail.com",
            "icon" : <IoMdMail />   
        },
        {
            "title" : "Partner with Us",
            "detail" : "Interested in collaboration or business opportunities? Reach out to:",
            "addr" : "businesswithquizsnap@gmail.com",
            "icon" : <FaHandshakeSimple />
        },
        {
            "title" : "Visit Us",
            "detail" : "Want to meet us in person? Here’s where you can find us:",
            "addr" : "quizsnap head office, chennai (example)",
            "icon" : <FaMapMarkerAlt />
        },
    ]

    return (
        <section className="container my-5 p-5 pt-8 w-full flex-col lg:flex relative" id='contact'>
            <div className="rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col hover:shadow-2xl transition-all duration-500 shadow-xl">

                <div className="flex flex-col justify-center items-center gap-8 group-hover:pb-10 transition-all duration-500 delay-200 mb-8">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-5 flex justify-center">Get in Touch with Us <MdContactSupport /></h1>
                
                    <p className="text-gray-500 text-sm">We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, we’re here to connect.</p>
                   
                   <div className='flex flex-col gap-12 lg:flex-row items-center justify-evenly'>
                        {contact.map((dtl, index) => {
                            return(
                                <div className="contactcard" key={index}>
                                    <p className="text-bluetext flex flex-row text-start justify-center items-center gap-4 text-2xl font-bold z-10">{dtl.icon} {dtl.title}</p>
                                    <div className='flex items-center justify-center flex-col gap-4 z-10'>
                                        <p className=" text-[16px] text-[#fff] z-[2]">{dtl.detail} </p>
                                        <a href="#" className='text-[#fff] font-semibold hover:text-primary'>{dtl.addr}</a>
                                    </div>
                                </div>
                            )
                        })}
                   </div>
                   <span className='text-[12px] font-bold flex justify-center items-center'>Contact with Us <CgCornerRightDown /></span>
                </div>


                <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                    <div className="flex flex-col items-center justify-center gap-3 text-2xl bg-gray-700 text-white p-1 hover:p-2 transition-all duration-500 delay-200 rounded-full shadow-sm">
                       
                        <div className='flex flex-row items-center justify-center pt-4 gap-4'>
                            {
                                links.map((icons, index) => {
                                    return(
                                        <a href={icons.link} className="hover:scale-110 transition-all duration-500 delay-0 cursor-pointer" key={index}> 
                                            {icons.icon}
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
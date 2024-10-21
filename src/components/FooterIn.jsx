import React from 'react'
import { FaHandshakeSimple } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'

function FooterIn() {
  return (
    <footer className='w-full h-24 flex flex-col lg:flex-row justify-around items-center'>
        <div className='flex gap-10 md:gap-20'>
        <p className='py-5 text-sm md:text-lg text-textgray text-center italic tracking-widest leading-3'>&copy; QuizSnap 2024</p>
        <ul className='list-none text-sm md:text-base flex flex-row justify-center items-center gap-6'>
            <li>Terms</li>
            <li>Privacy Policy</li>
        </ul>
        </div>
        <ul className='text-sm list-none flex flex-row gap-6'>
            <li className='flex flex-col md:flex-row justify-center items-center gap-4'><IoMdMail /> Contact us: <span className='text-secondary'>quizsnapoffi@gmail.com</span></li>
            <li className='flex flex-col md:flex-row justify-center items-center gap-4'><FaHandshakeSimple /> Partner with us: <span className='text-secondary'>businesswithquizsnap@gmail.com</span></li>
        </ul>
    </footer>
  )
}

export default FooterIn
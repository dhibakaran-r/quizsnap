import React from 'react'
import { FaHandshakeSimple } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'

function FooterIn() {

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
    <footer className='w-full h-24 flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-center gap-5 lg:gap-20'>
        <ul className='list-none text-sm md:text-base flex flex-row justify-center items-center gap-6'>
          <li>Terms</li>
          <li>Privacy Policy</li>
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
      <p className='py-5 text-sm lg:text-md text-textgray text-center italic tracking-widest leading-3'>&copy; QuizSnap 2024</p>
    </footer>
  )
}

export default FooterIn
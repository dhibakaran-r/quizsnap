import React from 'react'
import FNF from '../assets/images/404.png'
import { Link } from 'react-router-dom'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { checkAdmin } from '../service/Auth'

function PageNotFound404() {
  return (
    <section>
        <div className='w-full bg-bluebg flex flex-col md:flex-row justify-center items-center'>
            <div className='w-1/2'>
                <img src={FNF} alt="404" />
            </div>
            <div className='bg-primary px-4 py-2 rounded-tr-full rounded-bl-full border border-secondary text-xl text-bluebg'>
                <Link to={checkAdmin ? '/qsadmin/admindashboard' : '/qsuser/dashboard' } className='flex justify-center items-center'><FaAngleDoubleLeft />Go Back</Link>
            </div>
        </div>
    </section>
  )
}

export default PageNotFound404
import React from 'react'
import ad from '../assets/images/denied.jpg'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { isAuthenticated } from '../service/Auth'

function AccessDenied() {
  const navigate = useNavigate();
  return (
    <section>
      {isAuthenticated ? <>
        <div className='w-full bg-bluebg flex flex-col md:flex-row justify-center items-center'>
          <div className='w-1/2'>
            <LazyLoadComponent>
              <LazyLoadImage src={ad} alt="access denied" effect='blur' placeholderSrc={ad} />
            </LazyLoadComponent>
          </div>
          <div className='bg-primary px-4 py-2 rounded-tr-full rounded-bl-full border border-secondary text-xl text-bluebg'>
            <Link to={'/qsuser/dashboard'} className='flex justify-center items-center'><FaAngleDoubleLeft />Go Back</Link>
          </div>
        </div>
      </> : navigate('/login')}
    </section>
  )
}

export default AccessDenied
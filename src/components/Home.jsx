import React from 'react'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import mcq from '../assets/images/mcq.png'
// import { BallTriangle, MutatingDots } from 'react-loader-spinner'

function Home() {
  return (
    <section className='container mt-5 px-5 py-5 w-full lg:flex items-center justify-around' id='home'>

      <div className=' lg:w-1/2 px-5'>
        <p className='text-2xl lg:text-[2rem] xl:text-[3rem] xl:leading-[4rem] lg:leading[3rem] tracking-[2px] text-bluetext font-bold'>Welcome to your challenge zone—dive in, test your knowledge, and unlock your potential!</p>
        <p className='text-[16px] text-textlg font-semibold mt-3'>Conquer challenges with <span className='text-bluelg'>quizzes</span> designed for success.</p>
      </div>

      <div className='flex px-5 lg:px-0 items-center justify-center lg:w-1/3 '>
        {/* <img src={mcq} alt='banner' className='w-[100%]' /> */}
        <LazyLoadComponent>
          <LazyLoadImage src={mcq} alt='banner' className='w-[100%]' effect='blur' placeholderSrc={mcq} />
        </LazyLoadComponent>

      </div>
      {/* <MutatingDots visible={true} height="100" width="100" color="#0144CB" secondaryColor="#3572EF" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/>
        <BallTriangle
                              visible={true}
                              height="80"
                              width="80"
                              color="#0144CB"
                              ariaLabel="ball-triangle-loading"
                              wrapperStyle={{}}
                              wrapperClass=""/> */}
    </section>
  )
}
export default Home
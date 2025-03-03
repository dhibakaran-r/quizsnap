import React from 'react'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import us1 from '../../../assets/images/ourtarget.png'
import us2 from '../../../assets/images/ogteam.png'
import us3 from '../../../assets/images/ogsworks.png'

function AboutUs() {

    const aboutcard = [
        {
            "title": "Our Mission",
            "detail": "At QuizSnap, our mission is to enhance the learning experience by providing high-quality quizzes that are both educational and impactful. We strive to make knowledge acquisition straightforward and accessible to everyone.",
            "image": us1,
            "class": "mycard"
        },
        {
            "title": "Our Team",
            "detail": "We are a dedicated team of developers and educators who believe in the power of interactive learning. Combining our technical expertise with a commitment to education, we aim to deliver an exceptional quiz experience that challenges and informs.",
            "image": us2,
            "class": "mycard"
        },
        {
            "title": "Our Approach",
            "detail": "We combine innovative technology with a deep understanding of educational principles to deliver quizzes that not only test your knowledge but also help you grow. Every quiz is carefully crafted to provide a learning experience.",
            "image": us3,
            "class": "mycard"
        }
    ]

    return (
        <section className='container my-5 mb-16 p-5 pt-8 w-full flex-col lg:flex ' id='about'>
            <p className='text-2xl md:text-4xl text-center text-bluetext'>About Us</p>

            <div className='flex flex-col lg:flex-row justify-evenly items-center'>
                {
                    aboutcard.map((us, index) => {
                        return (
                            // <div className='flex md:flex-col' key={index}>
                            <div className='flex flex-col mt-24 justify-center items-center gap-8' key={index}>
                                <h1 className='text-xl text-[#FE7063] text-start z-10'>{us.title}</h1>
                                <div className='card '>
                                    <div className='flex justify-center items-center'>
                                        {/* <img className='w-[] rounded-[8px]' src={us.image}/> */}
                                        <LazyLoadComponent>
                                            <LazyLoadImage className='w-[] rounded-[8px]' src={us.image} effect='blur' placeholderSrc={us.image} />
                                        </LazyLoadComponent>
                                    </div>
                                    <p className='leading-6 text-textlg p-4'>{us.detail}</p>
                                </div>
                            </div>
                            // </div>

                        )

                    })
                }
            </div>

        </section>
    )
}

export default AboutUs
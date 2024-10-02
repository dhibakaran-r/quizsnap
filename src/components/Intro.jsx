import React from 'react'
import img1 from '../assets/images/idea.png'
import img2 from '../assets/images/prep.png'
import img3 from '../assets/images/target.png'
import cardimg1 from '../assets/images/achives.jpg'
import cardimg2 from '../assets/images/get.jpg'
import cardimg3 from '../assets/images/ogstudy.jpg'
import { GiArrowScope } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Intro() {


    const card = [
        {
            "title" : "Targeted Learning",
            "detail" : "Our quizzes are designed to help you focus on the most important topics, ensuring you're always on the right track.",
            "image" : cardimg1,
            "class" : "mycard"
        },
        {
            "title" : "Instant Feedback",
            "detail" : "Gain insights instantly with every answer—learn more with detailed explanations at every step.",
            "image" : cardimg2,
            "class" : "mycard"
        },
        {
            "title" : "Wide Range of Topics",
            "detail" : "Explore a diverse array of subjects—from academics to general knowledge—all in one place.",
            "image" : cardimg3,
            "class" : "mycard"
        }
    ]

    const datas = [
        {
            "details" : "At QuizSnap, we aim to transform the way you prepare for exams or enhance your knowledge. Our platform is designed to make learning a focused and efficient journey. We understand the importance of thorough preparation, which is why our MCQs are crafted to be both challenging and rewarding, helping you master subjects with precision. We believe that learning should be interactive and engaging. Our quizzes are designed to keep you motivated and invested, making the process of mastering new concepts effective.",
            "image" : img1,
            "class" : "revdetails",
            "box" : "revbox" 
        },
        {
            "details" : "At QuizSnap, our primary goal is to revolutionize the way you approach exam preparation and knowledge enhancement. We are committed to providing a focused and efficient learning experience, ensuring that every quiz you take contributes meaningfully to your mastery of the subject matter. Our vision is to be the go-to platform for anyone looking to improve their understanding and performance through carefully designed multiple-choice questions.",
            "image" : img2,
            "class" : "details",
            "box" : "box" 
        },
        {
            "details" : "We invite you to embark on a journey of knowledge and mastery with QuizSnap. Whether you're gearing up for a crucial exam, seeking to deepen your understanding, or simply challenging yourself, our platform is here to support you every step of the way. Dive into our expertly crafted quizzes, designed to sharpen your skills and boost your confidence. Start exploring today, and discover how QuizSnap can help you achieve your learning goals with clarity and purpose.",
            "image" : img3,
            "class" : "revdetails",
            "box" : "revbox" 
        },
    ]

  return (
    <section className='container mt-5 p-5 w-full flex-col lg:flex' id='mcq'>

        <h1 className='text-2xl md:text-4xl leading-10 tracking-[1px] text-bluetext text-center'>Discover the Power of Learning with QuizSnap</h1>

        <div className='flex flex-col lg:flex-row lg:justify-center xl:justify-evenly items-center gap-[3.5rem] mt-20 lg:mt-32 mb-5 lg:mb-16 fix'>
        {
                card.map((card, index) => { return(
        <div key={index} className='flex justify-center items-center p-1 w-[280px] h-[470px] lg:w-[245px] lg:h-[470px] md:w-[380px] md:h-[500]  xl:w-[320px] xl:h-[500px] 2xl:w-[350] 2xl:h-[500px] bg-primary rounded-2xl rotate-12 hover:rotate-0 duration-300'>

            <div className='flex flex-col border border-[#fff] justify-evenly items-center p-1 w-[300px] h-[450px] lg:w-[250px] md:w-[380px] xl:w-[400px] xl:h-[480px] bg-bluebg rounded-lg -rotate-12 hover:rotate-0 duration-300'>
            <div className='flex w-full lg:px-0 items-center justify-center'>
                            <img src={card.image} className='w-[260px] lg:w-[260px] rounded-t-[8px] rounded-br-[10px] rounded-bl-[220px]'/>
                        </div>
                        <p className='text-2xl text-secondary text-center'>{card.title}</p>
                        <span className='p-5 text-bluetext tracking-wide'>{card.detail}</span>
            </div>

        </div>
              )})
            }
            {/* {
                card.map((card, index) => { return(
                    <div className={card.class} key={index}>
                        <div className='flex w-full lg:px-0 items-center justify-center'>
                            <img src={card.image} className='w-[500px] lg:w-[350px] rounded-t-[8px] rounded-br-[10px] rounded-bl-[220px]'/>
                        </div>
                        <p className='text-2xl text-secondary text-center'>{card.title}</p>
                        <span className='p-5 text-bluetext tracking-wide'>{card.detail}</span>
                    </div>
                )})
            } */}
        </div>


        {   datas.map((data, index)=>{  return(
                
                <div className={data.class} key={index}>
                    <div className={data.box}>
                        <p className='text-xl lg:text-[1rem] leading-[2rem] lg:leading-[1.5rem] tracking-[1px] text-textlg font-bold p-3 lg:p-7'>{data.details}</p> 
                        {/* <p className='text-[16px] text-textlg font-semibold mt-3'>Conquer challenges with <span className='text-bluelg'>quizzes</span> designed for success.</p>    */}
                    </div>
                    
                    <div className='flex w-full md:w-3/4 lg:w-[200rem] px-5 lg:px-0 items-center justify-center xl:w-1/3'>
                        <img src={data.image} alt='banner' className='' />
                    </div>
                </div>
            )
        })
        }





        <div className='flex justify-center items-center md:my-5 mt-12 mb-5'>
            <button className='px-10 py-2 text-bluebg bg-primary flex justify-center items-center gap-2 rounded-full text-xl hover:bg-secondary'><Link to="/qsuser">Start Now</Link> <GiArrowScope className='' size={40}/></button>
        </div>
    </section>
  )
}

export default Intro
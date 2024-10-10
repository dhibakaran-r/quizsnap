import React from 'react'
import ReactTypingEffect from 'react-typing-effect';
import bg from '../assets/images/bgeff.jpg'

function Welcome() {
  return (
    <div>
      {/* <div className='w-10/12 relative'absolute top-1/3 left-1/3>
        <img src={bg} alt='bg' />
      </div> */}
      <div  className='bg-bgimg bg-cover bg-center relative overflow-hidden w-full md:w-11/12 h-96 p-4 flex  justify-center items-center border-2 border-x-primary border-y-bluelg hover:border-x-bluelg hover:border-y-primary shadow-[0_1px_8px_2px] shadow-shadbg duration-300 hover:shadow-none rounded-md'>
                    

        {/* <div className='w-10/12 text-4xl text-bgwhite px-16 py-24 popup-card !rounded-sm '> */}
          <ReactTypingEffect 
          className='text-2xl md:text-4xl xl:text-5xl text-bgwhite px-8 py-4 popup-card !border-none '
            text={[
              "Welcome To QuizSnap !!!",
              "Test your knowledge, one quiz at a time.",
              "Unlock new levels of understanding with every question.",
              "Quizzes that push your limits, learning that lasts a lifetime.",
              "Master your subjects through practice and progress.",
              "Dive into the world of knowledge, one click at a time.",
              "The journey to excellence begins with a single question."
            ]}
            speed={100}
            eraseSpeed={50}
            eraseDelay={3000}
            typingDelay={500}
            cursor={' '}
          />
        </div>

      {/* </div> */}
      
      {/* <div className='w-full h-1/3 overflow-hidden bgeff'>

      </div> */}
    </div>
  )
}

export default Welcome
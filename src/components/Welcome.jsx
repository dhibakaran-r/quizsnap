import React from 'react'
import ReactTypingEffect from 'react-typing-effect';
function Welcome() {
  return (
    <div className='bg-bgimg bg-cover bg-center relative overflow-hidden w-full md:w-11/12 h-64 lg:h-96 p-4 flex  justify-center items-center border border-secondary shadow-[0_1px_8px_2px] shadow-shadbg duration-300 hover:shadow-none rounded-md'>

      <ReactTypingEffect
        className='text-2xl md:text-4xl 2xl:text-5xl text-bgwhite px-8 py-4 popup-card !border-none '
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

  )
}

export default Welcome
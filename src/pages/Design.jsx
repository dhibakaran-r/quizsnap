import React from 'react'

function Design() {
  return (
    <section className='flex justify-center items-center h-dvh'>
        <div className='flex justify-center items-center p-1 w-[280px] h-[470px] bg-primary rounded-2xl rotate-12 hover:rotate-0 duration-300'>

            <div className='flex flex-col border border-[#fff] justify-evenly items-center p-1 w-[300px] h-[450px] bg-bluebg rounded-lg -rotate-12 hover:rotate-0 duration-300'>
                    <h1>Design Card</h1>
                    <p>This card is designed by RDKaran</p>
            </div>

        </div>
    </section>
  )
}

export default Design
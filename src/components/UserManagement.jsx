import React, { useEffect } from 'react'

const UserDetails = React.lazy(() => import('./UserDetails'));
function UserManagement() {

  useEffect(()=>{
    console.log("h");
    
  })

  return (
  
    <>
      {/* <Suspense fallback={<div className='w-full h-dvh flex justify-center items-center'> */}
                            {/* <MutatingDots visible={true} height="100" width="100" color="#0144CB" secondaryColor="#3572EF" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/> */}
                            {/* <p className='text-secondary text-3xl flex'>Fetching Data </p><p><LineWave visible={true} height="100" width="100" color="#3572EF" ariaLabel="line-wave-loading" wrapperStyle={{}} wrapperClass="" firstLineColor="" middleLineColor="" lastLineColor=""/></p> */}
                          {/* </div>}> */}
          <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>User Management</h1>
          <UserDetails />

      {/* </Suspense> */}
      </>
    
  )
}

export default UserManagement






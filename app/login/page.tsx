import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className='app-container h-[100vh] grid gap-4 place-content-center text-center'>
      <h2 className="font-bold text-xl mb-4">Smeal</h2>
      <h2 className="font-bold text-3xl">SignUp</h2>
      <p>Smeal gives you a descriptive analysis of ur website <br/> SEO&apos;s performance and also suggests improvment.  Sign-in to start using <b>Smeal</b>. </p>

      <div className='rounded-2xl bg-gray-300 md:w-3/5 mx-auto'>
          <div className="h-12 flex items-center justify-center gap-4 px-4">
            <Image src="/vercel.svg" className='invert' height={20} width={20} alt="Googe Sign-in"/>
            <span>Continue with Google</span>
          </div>
      </div>
    </div>
  )
}

export default Login
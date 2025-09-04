"use client"
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOut = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/') // or router.replace('/') to prevent going back
    } catch(err) {
      console.error('An error occurred trying to logout', err)
    }
  }

  return (
    <div className='px-10 max-w-3xl mx-auto text-center p-4 rounded-2xl h-[80vh] place-content-center'>
      <h2 className='text-2xl font-bold mb-2'>Sign out of smeal?</h2>
      <p className='text-sm'>Are you sure you want to sign out? You&apos;ll need to sign in <br />again to access your account?</p>

      <div className='flex gap-4 my-4 md:max-w-sm mx-auto justify-center'>
        <Link href="/dashboard">
          <Button className="w-50 bg-white text-gray-700 border text-sm hover:scale-105 transition hover:bg-gray-200">
          Cancel
          </Button>
        </Link>
        <Button onClick={handleLogout} className="w-50 bg-red-500 text-white border text-sm hover:scale-105 transition hover:bg-red-400">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default LogOut
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const NewAnaylsis = () => {
  return (
    <div className='px-10 max-w-3xl mx-auto text-center p-4 rounded-2xl  h-[80vh] place-content-center'>
      <h2 className='text-2xl font-bold mb-2'>Analyze your website&apos;s SEO </h2>
      <p className='text-sm'>What do site want to analyze today?</p>

      <form className='grid gap-4 my-4 md:max-w-sm mx-auto'>
        <Input placeholder='Enter a valid url web adress'/>
        <Button className="text-sm hover:scale-105 transition hover:bg-blue-400">
          Start Analysis →
        </Button>
      </form>
    </div>
  )
}

export default NewAnaylsis
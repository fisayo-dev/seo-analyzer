"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import apiClient from '@/lib/api/client'

const NewAnaylsis = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")

  const startAnalysis = async () => {
    setLoading(true)
    try {
      const res = await apiClient.post('/analyze', { url })
      const data = res.data
      console.log(data)
    } catch(error) {
      console.error('Error:',error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='px-10 max-w-3xl mx-auto text-center p-4 rounded-2xl  h-[80vh] place-content-center'>
      <h2 className='text-2xl font-bold mb-2'>Analyze your website&apos;s SEO </h2>
      <p className='text-sm'>What do site want to analyze today?</p>

      <form className='grid gap-4 my-4 md:max-w-sm mx-auto'>
        <Input placeholder='Enter a valid url web adress' value={url} onChange={(e) => setUrl(e.target.value)}/>
        <Button disabled={loading} onClick={startAnalysis} className="text-sm hover:scale-105 transition hover:bg-blue-400">
          { loading ? "Analyzing..." : "Start Analysis →"}
        </Button>
      </form>
    </div>
  )
}

export default NewAnaylsis
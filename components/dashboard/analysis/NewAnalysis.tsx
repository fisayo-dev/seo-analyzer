"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import apiClient from "@/lib/api/client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AnalysisProgress from "@/components/dashboard/analysis/AnalysisProgress"
import { Loader2Icon, XIcon } from "lucide-react"
import { toast } from "sonner"

const NewAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)

  // These will come back from API response
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const scanProofUrl = (url: string) => {
    try {
      if(url.indexOf(" ") >= 0) return false // Catch spaces in URL
      new URL(url) // Check url validity

      return true
    } catch {
      return false
    }
  }

  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!scanProofUrl(url)) {
      toast("⚠️ Please enter a valid URL")
      setLoading(false)
      return
    }
    try {
        // show dialog
        setOpen(true)
        const res = await apiClient.post("/analyze", { url })
        const data = await res.data
        
        // assume API returns sessionId + userId
        setSessionId(data.sessionId)
        setUserId(data.userId)
        
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-10 max-w-3xl mx-auto text-center rounded-2xl h-[100vh] place-content-center">
      <h2 className="text-2xl font-bold mb-2">
        Analyze your website&apos;s SEO
      </h2>
      <p className="text-sm">What do site want to analyze today? 😄</p>

      <form
        onSubmit={startAnalysis}
        className="grid gap-4 my-4 md:max-w-sm mx-auto"
      >
        <Input
          placeholder="Enter a valid url web address"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="submit"
          disabled={loading}
          className="text-sm hover:scale-105 transition hover:bg-blue-400"
        >
          {loading ? <Loader2Icon className="animate-spin"/> : null}
          {loading ? "Analyzing..." : "Start Analysis "}
        </Button>
      </form>

      {/* Alert Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>SEO Analysis Progress</span>
              <XIcon onClick={() => setOpen(false)} className="h-9 w-9 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"/>
            </AlertDialogTitle>
          </AlertDialogHeader>

          {sessionId && userId ? (
            <AnalysisProgress
              sessionId={sessionId}
              userId={userId}
              url={url}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2Icon className="animate-spin h-32 w-32 text-blue-500 mt-4" />
              <p className="text-center text-gray-500 p-6">
                Preparing analysis...
              </p>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default NewAnalysis

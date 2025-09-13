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
import AnalysisProgress from "@/components/dashboard/AnalysisProgress"
import { XIcon } from "lucide-react"

const NewAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)

  // These will come back from API response
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await apiClient.post("/analyze", { url })
      const data = await res.data
      console.log("Analysis started:", data)

      // assume API returns sessionId + userId
      setSessionId(data.sessionId)
      setUserId(data.userId)

      // show dialog
      setOpen(true)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-10 max-w-3xl mx-auto text-center p-4 rounded-2xl h-[80vh] place-content-center">
      <h2 className="text-2xl font-bold mb-2">
        Analyze your website&apos;s SEO
      </h2>
      <p className="text-sm">What do site want to analyze today?</p>

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
          {loading ? "Analyzing..." : "Start Analysis →"}
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
            <p className="text-center text-gray-500 p-6">
              Preparing analysis...
            </p>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default NewAnalysis

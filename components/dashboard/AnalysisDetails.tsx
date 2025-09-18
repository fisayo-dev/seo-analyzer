'use client';
import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  Code, 
  FileText, 
  Eye,
  Copy,
  RefreshCcw,
  Loader2Icon,
  ArrowLeft,
  Trash,
  Share2,
} from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AnalysisProgress from "@/components/dashboard/AnalysisProgress"
import { XIcon } from "lucide-react"
import apiClient from '@/lib/api/client';
import Link from 'next/link';
import { deleteAnalysis, invalidateUserAnalysisCache } from '@/lib/actions/analysis';
import { useRouter } from 'next/navigation';
import { calculateOverallScore, getScoreBreakdown, getScoreStatus } from './seo-utils';
import Image from 'next/image';
import DeleteDialog from './dialogs/DeleteDialog';
import { formatUrl } from './DashboardHome';
import ScoreCard from './cards/ScoreCard';
import IssuesList from './cards/IssuesList';
import MetricCard from './cards/MetricCard';
import KeywordDensityChart from './cards/KeywordDensityChart';
import ShareScanzie from './dialogs/ShareScanzie';

interface PageSpeedResult {
  loadTime: number;
  score: number;
  recommendations: string[];
}

interface MobileResult {
  responsive: boolean;
  score: number;
  issues: string[];
}

interface SSLResult {
  enabled: boolean;
  score: number;
}

interface StructureResult {
  validHTML: boolean;
  score: number;
  errors: string[];
}

interface RobotsResult {
  exists: boolean;
  accessible: boolean;
  issues: string[];
}

interface SitemapResult {
  exists: boolean;
  accessible: boolean;
  issues: string[];
}

interface TechnicalAnalysis {
  pageSpeed: PageSpeedResult;
  mobile: MobileResult;
  ssl: SSLResult;
  structure: StructureResult;
  robots: RobotsResult;
  sitemap: SitemapResult;
  score: number;
  issues: string[];
}

export interface KeywordDensity {
  [key: string]: number;
}

interface DuplicateContent {
  percentage: number;
  issues: string[];
}

interface ContentQuality {
  score: number;
  factors: {
    length: number;
    uniqueness: number;
    structure: number;
  };
}

interface ContentAnalysis {
  wordCount: number;
  readabilityScore: number;
  keywordDensity: KeywordDensity;
  duplicateContent: DuplicateContent;
  contentQuality: ContentQuality;
  score: number;
  issues: string[];
}

interface TitleResult {
  exists: boolean;
  length: number;
  text: string;
  score: number;
  issues: string[];
}

interface MetaDescriptionResult {
  exists: boolean;
  length: number;
  text: string;
  score: number;
  issues: string[];
}

interface HeadingsResult {
  h1Count: number;
  h2Count: number;
  structure: string[];
  score: number;
  issues: string[];
}

interface ImagesResult {
  total: number;
  withoutAlt: number;
  score: number;
  issues: string[];
}

interface LinksResult {
  internal: number;
  external: number;
  broken: number;
  score: number;
  issues: string[];
}

interface FaviconResult {
  exists: boolean;
  score: number;
  issues: string[];
  url: string;
}

interface OnPageAnalysis {
  title: TitleResult;
  metaDescription: MetaDescriptionResult;
  headings: HeadingsResult;
  images: ImagesResult;
  links: LinksResult;
  favicon: FaviconResult;
}

export interface SEOAnalysisResult {
  technical: TechnicalAnalysis;
  content: ContentAnalysis;
  on_page: OnPageAnalysis;
  url: string;
  [key: string]: unknown;
}

interface SEOAnalysisProps {
  results: SEOAnalysisResult;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-green-100 text-green-700';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};


const handleCopyUrl = (url: string) => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(url);
  }
  toast("Url has been copied")
}

const SEOAnalysisDashboard: React.FC<SEOAnalysisProps> = ({ results }: SEOAnalysisProps) => {
  const { technical, content, on_page, id } = results;
  const overallScore = calculateOverallScore(results)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [shareScanzie, setShareScanzie] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  
  // router
  const router = useRouter()
 
  // These will come back from API response
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const handleReanalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // show dialog
      setOpen(true)
      const res = await apiClient.post("/analyze", { url: results.url })
      const data = await res.data
      console.log("Analysis started:", data)

      // assume API returns sessionId + userId
      setSessionId(data.sessionId)
      setUserId(data.userId)

    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await deleteAnalysis(id as string)
      await invalidateUserAnalysisCache()
      router.push('/dashboard/analysis')
      toast('Analysis successfully deleted')
    } catch(error) {
      console.log(error)
    } finally {
      setDeleteLoading(false)
    }
  }
  useEffect(() => {
    setOpen(false)
  },[])

  return (
    <div className="w-full mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <main className="dashboard-container">
          {/* Header */}
          <div className="flex justify-between items-center bg-white border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              {results.on_page.favicon ? 
              <Image src={`${new URL(results.on_page.favicon.url)}`} alt="Favicon" width={32} height={32} className="w-12 h-12"/>                      
              : <Globe className="w-10 h-10 text-gray-700" />
              }
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 ">{on_page?.title?.text.length > 25 ? `${on_page?.title?.text.substring(0,25)}...` : on_page?.title?.text  || 'Untitled'} </h1>
                <div className=" text-gray-600 flex items-center gap-2 text-sm">
                  <Link href={results?.url} target="_blank" className='hover:underline hover:text-blue-600'>
                    {formatUrl(results?.url)}
                  </Link>
                  <span onClick={() => handleCopyUrl(results?.url)} className=' p-2 rounded-xl hover:bg-gray-200 hover:text-black'>
                    <Copy className='h-4 w-4'/>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center pr-2">
                <div onClick={() => setShareScanzie(true)} className='p-3 rounded-xl hover:bg-gray-100 cursor-pointer hover:text-blue-600 flex items-center gap-2'>
                  <Share2 />
                </div>
                <div onClick={handleReanalyze} className='p-3 rounded-xl hover:bg-gray-100 cursor-pointer hover:text-blue-600 flex items-center gap-2'>
                  {loading ? <Loader2Icon className='animate-spin'/> : <RefreshCcw className=''/>}
                </div>
                <div onClick={() => setDeleteOpen(true)} className='p-3 rounded-xl hover:bg-gray-100 cursor-pointer hover:text-red-600 flex items-center gap-2'>
                  <Trash />
                </div>
              </div>
            </div>
            <SidebarTrigger className="bg-blue-50 p-3 rounded-md md:hidden"/>
          </div>
        </main>
      </div>

      <main className="dashboard-container">
        <div className='p-6'>
          {/* Back component */}
          <div className="mb-8">
            <Link href="/dashboard/analysis" className="bg-gray-100 rounded-xl hover:bg-gray-200 border flex items-center w-32 p-2  gap-2 justify-center text-gray-600">
                <ArrowLeft className='h-6 w-6'/>
                <span>Back</span>
            </Link>
          </div>
          {/* Overall Scores */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ScoreCard
              icon={<Globe className="w-5 h-5 text-inherit" />}
              title="Overall Score"
              score={overallScore}
              total={100}
              color={`${getScoreStatus(overallScore).bgClass} ${getScoreStatus(overallScore).colorClass}`}
            />
            <ScoreCard
              icon={<Code className="w-5 h-5 text-inherit" />}
              title="Technical SEO"
              score={getScoreBreakdown(results).technical}
              total={100}
              color={`${getScoreStatus(getScoreBreakdown(results).technical).bgClass} ${getScoreStatus(getScoreBreakdown(results).technical).colorClass}`}
            />
            <ScoreCard
              icon={<FileText className="w-5 h-5 text-inherit" />}
              title="Content Quality"
              score={getScoreBreakdown(results).content}
              total={100}
              color={`${getScoreStatus(getScoreBreakdown(results).content).bgClass} ${getScoreStatus(getScoreBreakdown(results).content).colorClass}`}
            />
            <ScoreCard
              icon={<Eye className="w-5 h-5 text-inherit" />}
              title="On-Page SEO"
              score={getScoreBreakdown(results).onPage}
              total={100}
              color={`${getScoreStatus(getScoreBreakdown(results).onPage).bgClass} ${getScoreStatus(getScoreBreakdown(results).onPage).colorClass}`}
            />
          </div>

          {/* Technical Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technical Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <MetricCard title="Page Speed">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Load Time</span>
                    <span className="font-medium">{technical?.pageSpeed?.loadTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score</span>
                    <span className={`font-medium px-2 py-1 rounded text-sm ${getScoreColor(technical?.pageSpeed?.score)}`}>
                      {technical?.pageSpeed?.score}/100
                    </span>
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="Mobile Optimization">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Responsive</span>
                    <span className={`px-2 py-1 rounded text-sm ${technical?.mobile?.responsive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {technical?.mobile?.responsive ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile Score</span>
                    <span className={`font-medium px-2 py-1 rounded text-sm ${getScoreColor(technical?.mobile?.score)}`}>
                      {technical?.mobile?.score}/100
                    </span>
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="Security & Structure">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SSL Enabled</span>
                    <span className={`px-2 py-1 rounded text-sm ${technical?.ssl?.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {technical?.ssl?.enabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Valid HTML</span>
                    <span className={`px-2 py-1 rounded text-sm ${technical?.structure?.validHTML ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {technical?.structure?.validHTML ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </MetricCard>
            </div>

            {technical?.issues?.length > 0 && (
              <IssuesList 
                title="Technical Issues" 
                issues={technical.issues} 
                type="warning" 
              />
            )}
          </div>

          {/* Content Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Content Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <MetricCard title="Content Metrics">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Word Count</span>
                    <span className="font-medium">{content?.wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Readability</span>
                    <span className={`font-medium px-2 py-1 rounded text-sm ${getScoreColor(content?.readabilityScore)}`}>
                      {content?.readabilityScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Score</span>
                    <span className={`font-medium px-2 py-1 rounded text-sm ${getScoreColor(content?.contentQuality?.score)}`}>
                      {content?.contentQuality?.score}/100
                    </span>
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="Keyword Density">
                <KeywordDensityChart density={content?.keywordDensity} />
              </MetricCard>

              <MetricCard title="Content Quality Factors">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Length</span>
                    <span className="font-medium">{content?.contentQuality?.factors?.length}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uniqueness</span>
                    <span className="font-medium">{content?.contentQuality?.factors?.uniqueness}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Structure</span>
                    <span className="font-medium">{content?.contentQuality?.factors?.structure}/100</span>
                  </div>
                </div>
              </MetricCard>
            </div>

            {content?.issues?.length > 0 && (
              <IssuesList 
                title="Content Issues" 
                issues={content?.issues} 
                type="warning" 
              />
            )}
          </div>

          {/* On-Page Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">On-Page SEO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MetricCard title="Title & Meta">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Title Tag</span>
                      <span className={`px-2 py-1 rounded text-sm ${getScoreColor(on_page?.title?.score)}`}>
                        {on_page?.title?.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                      &quot;{on_page?.title?.text}&quot; ({on_page?.title?.length} chars)
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Meta Description</span>
                      <span className={`px-2 py-1 rounded text-sm ${getScoreColor(on_page?.metaDescription?.score)}`}>
                        {on_page?.metaDescription?.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                      &quot;{on_page?.metaDescription?.text}&quot; ({on_page?.metaDescription?.length} chars)
                    </p>
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="Page Elements">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">H1 Tags</span>
                    <span className="font-medium">{on_page?.headings?.h1Count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">H2 Tags</span>
                    <span className="font-medium">{on_page?.headings?.h2Count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Images</span>
                    <span className="font-medium">{on_page?.images?.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Images without Alt</span>
                    <span className={`font-medium ${on_page?.images?.withoutAlt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {on_page?.images?.withoutAlt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Internal Links</span>
                    <span className="font-medium">{on_page?.links?.internal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">External Links</span>
                    <span className="font-medium">{on_page?.links?.external}</span>
                  </div>
                </div>
              </MetricCard>
            </div>

            {/* On-page Issues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {on_page?.title?.issues?.length > 0 && (
                <IssuesList 
                  title="Title Issues" 
                  issues={on_page?.title?.issues} 
                  type="warning" 
                />
              )}
              {on_page?.metaDescription?.issues?.length > 0 && (
                <IssuesList 
                  title="Meta Description Issues" 
                  issues={on_page?.metaDescription.issues} 
                  type="warning" 
                />
              )}
              {on_page?.headings?.issues.length > 0 && (
                <IssuesList 
                  title="Heading Issues" 
                  issues={on_page?.headings?.issues} 
                  type="warning" 
                />
              )}
              {on_page?.links?.issues?.length > 0 && (
                <IssuesList 
                  title="Link Issues" 
                  issues={on_page?.links?.issues} 
                  type="info" 
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Dialogs */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>Re-analyzing</span>
              <XIcon onClick={() => setOpen(false)} className="h-9 w-9 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"/>
              </AlertDialogTitle>
          </AlertDialogHeader>

          {sessionId && userId ? (
            <AnalysisProgress
              sessionId={sessionId}
              userId={userId}
              url={results.url}
            />
          ) : (
           <div className="flex flex-col items-center justify-center p-8">
              <Loader2Icon className="animate-spin h-32 w-32 text-blue-500 mt-4" />
              <p className="text-center text-gray-500 p-6">
                Initiating re-analysis, please wait...
              </p>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
      <ShareScanzie open={shareScanzie} onOpenChange={setShareScanzie}/>
       <DeleteDialog deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} handleDelete={handleDelete}/>
    </div>
  );
};

export default SEOAnalysisDashboard;
"use client"
import React, { useState, useMemo } from 'react';
import { Search, Globe, ChevronDown, TrendingDown, AlertTriangle, CheckCircle, Clock, NotebookTextIcon, Code, Eye, FileText, X as XIcon, MoreVertical, DownloadIcon, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

// Import utility functions
import { getScoreStatus, getScoreCategory, calculateAnalysisStats, getScoreBreakdown, getScoreColor } from './seo-utils';
import apiClient from '@/lib/api/client';
import AnalysisProgress from './AnalysisProgress';
import { toast } from 'sonner';

export type Analysis = {
  id: string;
  userId: string;
  title: string;
  url: string;
  overallScore: number;
  on_page: {
    links: { score: number; broken: number; external: number; internal: number };
    title: { text: string; score: number; length: number };
    images: { score: number; total: number; withoutAlt: number };
    headings: { score: number; h1Count: number; h2Count: number };
    metaDescription: { text: string; score: number; length: number };
  };
  content: {
    score: number;
    wordCount: number;
    contentQuality: { score: number };
    readabilityScore: number;
    issues?: any[];
  };
  technical: {
    ssl: { score: number; enabled: boolean };
    score: number;
    mobile: { score: number; responsive: boolean };
    pageSpeed: { score: number; loadTime: number };
    structure: { score: number; validHTML: boolean };
    issues?: any[];
  };
  createdAt: Date;
  updatedAt: Date;
};

interface AllUserAnalysisProps {
  analysis: Analysis[];
}

const ScoreBreakdownDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; analysis: Analysis | null }> = ({ open, onOpenChange, analysis }) => {
  if (!analysis) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-3xl p-6 border border-gray-200 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>SEO Score Breakdown</span>
            <XIcon onClick={() => onOpenChange(false)} className="h-9 w-9 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"/>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical SEO */}
          <div className=" rounded-xl p-4 border ">
            <div className="flex items-center gap-3 mb-3">
              <Code className="w-6 h-6" />
              <h4 className="font-semibold text-gray-900">Technical SEO</h4>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(analysis.technical.score)} mb-4`}>
              {analysis.technical.score}/100
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Page Speed</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.technical.pageSpeed.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.technical.pageSpeed.score)}`}>
                    {analysis.technical.pageSpeed.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Mobile</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.technical.mobile.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.technical.mobile.score)}`}>
                    {analysis.technical.mobile.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">SSL</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.technical.ssl.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.technical.ssl.score)}`}>
                    {analysis.technical.ssl.score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* On-Page SEO */}
          <div className=" rounded-xl p-4 border ">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6" />
              <h4 className="font-semibold text-gray-900">On-Page SEO</h4>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(Math.round((analysis.on_page.title.score + analysis.on_page.headings.score + analysis.on_page.links.score + analysis.on_page.images.score) / 4))} mb-4`}>
              {Math.round((analysis.on_page.title.score + analysis.on_page.headings.score + analysis.on_page.links.score + analysis.on_page.images.score) / 4)}/100
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Title</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.on_page.title.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.on_page.title.score)}`}>
                    {analysis.on_page.title.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Headings</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.on_page.headings.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.on_page.headings.score)}`}>
                    {analysis.on_page.headings.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Images</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.on_page.images.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.on_page.images.score)}`}>
                    {analysis.on_page.images.score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Quality */}
          <div className=" rounded-xl p-4 border ">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6" />
              <h4 className="font-semibold text-gray-900">Content Quality</h4>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(analysis.content.score)} mb-4`}>
              {analysis.content.score}/100
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Word Count</span>
                <span className="font-medium text-gray-700">
                  {analysis.content.wordCount}
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Quality</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.content.contentQuality.score)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.content.contentQuality.score)}`}>
                    {analysis.content.contentQuality.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Readability</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(analysis.content.readabilityScore)}`} />
                  <span className={`font-medium ${getScoreColor(analysis.content.readabilityScore)}`}>
                    {analysis.content.readabilityScore}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Found */}
          <div className=" rounded-xl p-4 border ">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-semibold text-gray-900">Issues Found</h4>
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-4">
              {(analysis.technical.issues?.length || 0) + (analysis.content.issues?.length || 0)}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Technical</span>
                <span className="font-medium text-orange-600">
                  {analysis.technical?.issues?.length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Content</span>
                <span className="font-medium text-orange-600">
                  {analysis.content?.issues?.length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Broken Links</span>
                <span className="font-medium text-red-600">
                  {analysis.on_page.links.broken}
                </span>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ReanalyzeDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; sessionId: string | null; userId: string | null; url: string | null }> = ({ open, onOpenChange, sessionId, userId, url }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>SEO Analysis Progress</span>
            <XIcon onClick={() => onOpenChange(false)} className="h-9 w-9 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"/>
          </AlertDialogTitle>
        </AlertDialogHeader>

        {sessionId && userId ? (
          <AnalysisProgress
            sessionId={sessionId}
            userId={userId}
            url={url || ''}
          />
        ) : (
          <p className="text-center text-gray-500 p-6">
            Preparing analysis...
          </p>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AllUserAnalysis: React.FC<AllUserAnalysisProps> = ({ analysis }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortFilter, setSortFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [analyses] = useState<Analysis[]>(analysis);
  const [open, setOpen] = useState(false)
  const [reanalyzeOpen, setReanalyzeOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  // These will come back from API response
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const handleReAnalyze = async (e: React.FormEvent, url:string) => {
    e.preventDefault()
    setCurrentUrl(url);
    setLoading(true)
    try {
      const res = await apiClient.post("/analyze", { url })
      const data = await res.data
      console.log("Analysis started:", data)

      // assume API returns sessionId + userId
      setSessionId(data.sessionId)
      setUserId(data.userId)

      // show dialog
      setReanalyzeOpen(true)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }


  const filteredAndSortedAnalyses = useMemo(() => {
    const filtered: Analysis[] = analyses.filter(analysis => {
      const matchesSearch = analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           analysis.url.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (sortFilter === 'all') return matchesSearch;
      return matchesSearch && getScoreCategory(getScoreBreakdown(analysis).overall) === sortFilter;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'score':
          aValue = getScoreBreakdown(analysis[0]).overall;
          bValue = getScoreBreakdown(analysis[0]).overall;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'createdAt':
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [searchTerm, sortFilter, sortBy, sortOrder, analyses, analysis]);

  const stats = useMemo(() => {
    return calculateAnalysisStats(analyses);
  }, [analyses]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">All your analysis</h1>
              <p className="text-gray-600">Monitor and track your website&apos;s SEO performance</p>
            </div>
            <Link href="/dashboard/analysis/new" className="hidden md:flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200">
                <NotebookTextIcon className=''/>
                <span>New Analysis</span>
              </Button>
            </Link>
            <SidebarTrigger className="bg-blue-50 p-3 rounded-md md:hidden"/>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Analysis</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Globe className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Good Analysis</p>
                        <p className="text-3xl font-bold text-green-600">{stats.good}</p>
                        <p className="text-xs text-gray-400 mt-1">Score ≥ 70%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Moderate Analysis</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.moderate}</p>
                        <p className="text-xs text-gray-400 mt-1">Score 40-69%</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Poor Analysis</p>
                        <p className="text-3xl font-bold text-red-600">{stats.poor}</p>
                        <p className="text-xs text-gray-400 mt-1">Score &lt; 40%</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search by title or URL..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                        />
                    </div>
                    <div className="flex gap-4">
                    <div className="relative">
                        <select
                            value={sortFilter}
                            onChange={(e) => setSortFilter(e.target.value)}
                            className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"                        >
                            <option value="all">All Results</option>
                            <option value="good">Good (70+)</option>
                            <option value="moderate">Moderate (40-69)</option>
                            <option value="poor">Poor (0-39)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <div className="relative">
                        <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                            <option value="createdAt">Date</option>
                            <option value="score">Score</option>
                            <option value="title">Title</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="bg-white/80 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                    </div>
                </div>
            </div>

            {/* Analysis Cards */}
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredAndSortedAnalyses.map((analysis) => {
                    const scoreStatus = getScoreStatus(getScoreBreakdown(analysis).overall);
                    
                    return (
                        <div
                        key={analysis.id}
                        className="bg-white rounded-2xl border hover:shadow-sm overflow-hidden"
                        >
                            <div className='p-6 grid gap-3'>
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{analysis?.on_page?.title?.text?.length > 20 ? `${analysis.on_page.title.text.substring(0,20)}...`: analysis.on_page.title.text}</h3>
                                            {/* <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors duration-200" /> */}
                                        </div>
                                        <p className="text-gray-600 text-sm break-all">{analysis.url.length > 25 ? `${analysis.url.substring(0,25)}...` : analysis.url}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            {formatDate(analysis.createdAt)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`grid rounded-full h-11 w-11 p-2 place-content-center border-2 ${scoreStatus.bgClass}`}>
                                            <div className={`text-sm font-bold ${scoreStatus.colorClass}`}>
                                                {getScoreBreakdown(analysis).overall}%
                                            </div>
                                        </div>
                                        {/* Action Buttons */}
                                        <div className="border-gray-200">
                                        <div className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <div className='flex items-center gap-2'>
                                                            <NotebookTextIcon />
                                                            <Link href={`/dashboard/analysis/${encodeURIComponent(analysis.url)}`}>
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => handleReAnalyze(e, analysis.url)}>
                                                        <div className='flex items-center gap-2'>
                                                            <RefreshCcw />
                                                            <span>Re-analyze</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toast('Export feature coming soon 😄')}>
                                                        <div className='flex items-center gap-2'>
                                                            <DownloadIcon />
                                                            <span>Export report</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setSelectedAnalysis(analysis); setOpen(true); }}>
                                                        <div className='flex items-center gap-2'>
                                                            <Eye/>
                                                            <span>View score breakdwon</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Score Breakdown Button */}
                               
                                
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredAndSortedAnalyses.length === 0 && (
            <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/50 shadow-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No analyses found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
                </div>
            </div>
            )}
        </div>
      </div>
      <ScoreBreakdownDialog open={open} onOpenChange={setOpen} analysis={selectedAnalysis} />
      <ReanalyzeDialog open={reanalyzeOpen} onOpenChange={setReanalyzeOpen} sessionId={sessionId} userId={userId} url={currentUrl} />
    </div>
  );
};

export default AllUserAnalysis;
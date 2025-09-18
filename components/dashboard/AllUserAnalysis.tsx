"use client"
import React, { useState, useMemo } from 'react';
import { Search, Globe, ChevronDown, TrendingDown, AlertTriangle, CheckCircle, NotebookTextIcon, Eye, MoreVertical, DownloadIcon, RefreshCcw, BoxIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { getScoreStatus, getScoreCategory, calculateAnalysisStats, getScoreBreakdown } from './seo-utils';
import apiClient from '@/lib/api/client';
import { toast } from 'sonner';
import Image from 'next/image';
import ScoreBreakdownDialog from './dialogs/ScoreBreakdownDialog';
import ReanalyzeDialog from './dialogs/ReanalyzeDialog';

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
    favicon: { exists: boolean; url:string; score: number; issues: string[]};
  };
  content: {
    score: number;
    wordCount: number;
    contentQuality: { score: number };
    readabilityScore: number;
    issues?: string[];
  };
  technical: {
    ssl: { score: number; enabled: boolean };
    score: number;
    mobile: { score: number; responsive: boolean };
    pageSpeed: { score: number; loadTime: number };
    structure: { score: number; validHTML: boolean };
    issues?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

interface AllUserAnalysisProps {
  analysis: Analysis[];
}


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
          aValue = a.updatedAt;
          bValue = b.updatedAt;
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

  const formatDate = (date: Date | string): string => {
    const now = new Date();
    const dateObj = new Date(date);
    const diffMs = now.getTime() - dateObj.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (years < 5) return `${years} year${years > 1 ? "s" : ""} ago`;

    return "a long time ago";
  };


  return (
    <div className="w-full mx-auto bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <main className="dashboard-container ">
            {/* Header */}
            <div className=" bg-white p-6 ">
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
          </main>
        </div>

        <main className="dashboard-container">
          {/* Stats Cards */}
          <div className="px-6 py-10">
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-white/80 border border-gray-200 rounded-xl  pr-10 flex items-center gap-2 min-w-[160px] justify-between"
                          >
                            {sortFilter === "all"
                              ? "All Results"
                              : sortFilter === "good"
                              ? "Good (70+)"
                              : sortFilter === "moderate"
                              ? "Moderate (40-69)"
                              : "Poor (0-39)"}
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[160px]">
                          <DropdownMenuItem onClick={() => setSortFilter("all")}>
                            All Results
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortFilter("good")}>
                            Good (70+)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortFilter("moderate")}>
                            Moderate (40-69)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortFilter("poor")}>
                            Poor (0-39)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-white/80 border border-gray-200 rounded-xl pr-10 flex items-center gap-2 min-w-[120px] justify-between"
                          >
                            {sortBy === "createdAt"
                              ? "Date"
                              : sortBy === "score"
                              ? "Score"
                              : "Title"}
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                          <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
                            Date
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy("score")}>
                            Score
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy("title")}>
                            Title
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                            className="relative bg-white rounded-2xl border hover:border-gray-400 overflow-hidden"
                          >
                            <Link href={`/dashboard/analysis/${encodeURIComponent(analysis.url)}`} className="absolute inset-0 hover:shadow-lg transition-all duration-300 h-full"></Link>
                            <div className="p-4 grid gap-3">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {analysis.on_page.favicon ? 
                                      <Image src={`${new URL(analysis.on_page.favicon.url)}`} alt="Favicon" width={32} height={32} className="w-10 h-10"/>                      
                                      : <Globe className="w-10 h-10 text-gray-700" />
                                    }
                                    <div className="grid items-center">
                                      <h3 className="text-lg font-bold text-gray-900">
                                        {analysis?.on_page?.title?.text?.length > 20 
                                          ? `${analysis?.on_page?.title?.text.substring(0,20)}...` 
                                          : analysis?.on_page?.title?.text || 'Untitled'}
                                      </h3>
                                      <p className="text-gray-600 text-sm break-all">
                                        {analysis.url.length > 25 ? `${analysis.url.substring(0,25)}...` : analysis.url}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    {formatDate(analysis.updatedAt)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`grid rounded-full h-11 w-11 p-2 place-content-center border-2 ${scoreStatus.bgClass}`}>
                                    <div className={`text-sm font-bold ${scoreStatus.colorClass}`}>
                                      {getScoreBreakdown(analysis).overall}%
                                    </div>
                                  </div>
                                  {/* Action Buttons */}
                                  <div
                                    className="z-20 border-gray-200 pointer-events-auto"
                                  >
                                    <div className="flex justify-end">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="rounded-full h-8 w-8  p-0">
                                            <MoreHorizontal className="h-5 w-5" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from bubbling to Link
                                            handleReAnalyze(e, analysis.url);
                                          }}>
                                            <div className="flex items-center gap-2">
                                              <RefreshCcw />
                                              <span>Re-analyze</span>
                                            </div>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from bubbling to Link
                                            toast('Export feature coming soon 😄');
                                          }}>
                                            <div className="flex items-center gap-2">
                                              <DownloadIcon />
                                              <span>Export report</span>
                                            </div>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from bubbling to Link
                                            setSelectedAnalysis(analysis);
                                            setOpen(true);
                                          }}>
                                            <div className="flex items-center gap-2">
                                              <Eye />
                                              <span>Score breakdown</span>
                                            </div>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      );
                  })}
              </div>

              {analyses.length > 0 && filteredAndSortedAnalyses.length === 0 && (
              <div className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/50 shadow-lg">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No analyses found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or filters</p>
                  </div>
              </div>
              )}
              {analyses.length === 0 && filteredAndSortedAnalyses.length === 0 && (
              <div className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/50 shadow-lg">
                  <BoxIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">You don&apos;t have any analysis yet</h3>
                  <p className="text-gray-600">Create your first analysis</p>
                  </div>
              </div>
              )}
          </div>
        </main>
        <ScoreBreakdownDialog open={open} onOpenChange={setOpen} analysis={selectedAnalysis} />
        <ReanalyzeDialog open={reanalyzeOpen} onOpenChange={setReanalyzeOpen} sessionId={sessionId} userId={userId} url={currentUrl} />
    </div>
  );
};

export default AllUserAnalysis;
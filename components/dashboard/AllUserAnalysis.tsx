"use client"
import React, { useState, useMemo } from 'react';
import { Search, Globe, Code, FileText, Eye, ChevronDown, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

type Analysis = {
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

const AllUserAnalysis: React.FC<AllUserAnalysisProps> = ({ analysis }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortFilter, setSortFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [analyses, setAnalyses] = useState<Analysis[]>(analysis);

  const getScoreCategory = (score: number) => {
    if (score >= 70) return 'good';
    if (score >= 40) return 'moderate';
    return 'poor';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-100 border-green-200';
    if (score >= 40) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const filteredAndSortedAnalyses = useMemo(() => {
    let filtered = analyses.filter(analysis => {
      const matchesSearch = analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           analysis.url.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (sortFilter === 'all') return matchesSearch;
      return matchesSearch && getScoreCategory(analysis.overallScore) === sortFilter;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'score':
          aValue = a.overallScore;
          bValue = b.overallScore;
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
  }, [searchTerm, sortFilter, sortBy, sortOrder, analyses]);

  const stats = useMemo(() => {
    const total = analyses.length;
    const good = analyses.filter(a => getScoreCategory(a.overallScore) === 'good').length;
    const moderate = analyses.filter(a => getScoreCategory(a.overallScore) === 'moderate').length;
    const poor = analyses.filter(a => getScoreCategory(a.overallScore) === 'poor').length;
    
    return { total, good, moderate, poor };
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

  // Function to add new analysis (example of state manipulation)
  const addAnalysis = (newAnalysis: Analysis) => {
    setAnalyses(prevAnalyses => [...prevAnalyses, newAnalysis]);
  };

  // Function to update existing analysis (example of state manipulation)
  const updateAnalysis = (id: string, updatedAnalysis: Partial<Analysis>) => {
    setAnalyses(prevAnalyses => 
      prevAnalyses.map(analysis => 
        analysis.id === id ? { ...analysis, ...updatedAnalysis } : analysis
      )
    );
  };

  // Function to delete analysis (example of state manipulation)
  const deleteAnalysis = (id: string) => {
    setAnalyses(prevAnalyses => prevAnalyses.filter(analysis => analysis.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">SEO Analysis Dashboard</h1>
              <p className="text-gray-600">Monitor and track your website&apos;s SEO performance</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              New Analysis
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Analysis</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Good Analysis</p>
                  <p className="text-3xl font-bold text-green-600">{stats.good}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Moderate Analysis</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.moderate}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Poor Analysis</p>
                  <p className="text-3xl font-bold text-red-600">{stats.poor}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
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
                    className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
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
        </div>

        {/* Analysis Cards */}
        <div className="space-y-6">
          {filteredAndSortedAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] overflow-hidden"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{analysis.title}</h3>
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors duration-200" />
                    </div>
                    <p className="text-gray-600 break-all">{analysis.url}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {formatDate(analysis.createdAt)}
                    </div>
                  </div>
                  <div className={`rounded-2xl px-6 py-4 border-2 ${getScoreBg(analysis.overallScore)}`}>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}
                      </div>
                      <div className="text-sm font-medium text-gray-600">Overall Score</div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Code className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Technical SEO</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.technical.score)} mb-2`}>
                      {analysis.technical.score}/100
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Page Speed</span>
                        <span className={`font-medium ${getScoreColor(analysis.technical.pageSpeed.score)}`}>
                          {analysis.technical.pageSpeed.score}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mobile</span>
                        <span className={`font-medium ${getScoreColor(analysis.technical.mobile.score)}`}>
                          {analysis.technical.mobile.score}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">SSL</span>
                        <span className={`font-medium ${getScoreColor(analysis.technical.ssl.score)}`}>
                          {analysis.technical.ssl.score}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-6 h-6 text-green-600" />
                      <h4 className="font-semibold text-gray-900">On-Page SEO</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {Math.round((analysis.on_page.title.score + analysis.on_page.headings.score + analysis.on_page.links.score + analysis.on_page.images.score) / 4)}/100
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Title</span>
                        <span className={`font-medium ${getScoreColor(analysis.on_page.title.score)}`}>
                          {analysis.on_page.title.score}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Headings</span>
                        <span className={`font-medium ${getScoreColor(analysis.on_page.headings.score)}`}>
                          {analysis.on_page.headings.score}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Images</span>
                        <span className={`font-medium ${getScoreColor(analysis.on_page.images.score)}`}>
                          {analysis.on_page.images.score}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-6 h-6 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">Content Quality</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.content.score)} mb-2`}>
                      {analysis.content.score}/100
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Word Count</span>
                        <span className="font-medium text-gray-700">
                          {analysis.content.wordCount}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quality</span>
                        <span className={`font-medium ${getScoreColor(analysis.content.contentQuality.score)}`}>
                          {analysis.content.contentQuality.score}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Readability</span>
                        <span className={`font-medium ${getScoreColor(analysis.content.readabilityScore)}`}>
                          {analysis.content.readabilityScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">Issues Found</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {(analysis.technical.issues?.length || 0) + (analysis.content.issues?.length || 0)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Technical</span>
                        <span className="font-medium text-orange-600">
                          {analysis.technical?.issues?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Content</span>
                        <span className="font-medium text-orange-600">
                          {analysis.content?.issues?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Broken Links</span>
                        <span className="font-medium text-red-600">
                          {analysis.on_page.links.broken}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md">
                    View Details
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-200">
                    Re-analyze
                  </button>
                  <button className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition-all duration-200">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedAnalyses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/50 shadow-lg">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No analyses found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUserAnalysis;
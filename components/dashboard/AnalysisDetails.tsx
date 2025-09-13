'use client';

import React from 'react';
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Code, 
  FileText, 
  Eye,
} from 'lucide-react';

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

interface KeywordDensity {
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

interface OnPageAnalysis {
  title: TitleResult;
  metaDescription: MetaDescriptionResult;
  headings: HeadingsResult;
  images: ImagesResult;
  links: LinksResult;
}

export interface SEOAnalysisResult {
  technical: TechnicalAnalysis;
  content: ContentAnalysis;
  onPage: OnPageAnalysis;
}

interface SEOAnalysisProps {
  results: SEOAnalysisResult;
}


const ScoreCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  score: number;
  total?: number;
  color: string;
}> = ({ icon, title, score, total, color }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color} mb-4`}>
      {icon}
    </div>
    <div className="text-2xl font-semibold text-gray-900 mb-1">
      {score}{total && `/${total}`}
    </div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

const IssuesList: React.FC<{
  title: string;
  issues: string[];
  type: 'error' | 'warning' | 'info';
}> = ({ title, issues, type }) => {
  if (issues.length === 0) return null;

  const iconColor = type === 'error' ? 'text-red-500' : type === 'warning' ? 'text-yellow-500' : 'text-blue-500';
  const bgColor = type === 'error' ? 'bg-red-50' : type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50';
  
  return (
    <div className={`rounded-lg p-4 ${bgColor} border-l-4 ${type === 'error' ? 'border-red-400' : type === 'warning' ? 'border-yellow-400' : 'border-blue-400'}`}>
      <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
      <ul className="space-y-1">
        {issues.map((issue, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <div className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${iconColor}`}>
              {type === 'error' ? <XCircle size={16} /> : 
               type === 'warning' ? <AlertTriangle size={16} /> : 
               <CheckCircle size={16} />}
            </div>
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

const KeywordDensityChart: React.FC<{ density: KeywordDensity | null | undefined }> = ({ density }) => (
  <div className="space-y-3">
    {density && typeof density === 'object' && Object.keys(density).length > 0 ? (
      Object.entries(density).slice(0, 5).map(([keyword, percentage]) => (
        <div key={keyword}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 truncate">{keyword}</span>
            <span className="text-gray-900">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-gray-500 text-sm">No keyword density data available.</div>
    )}
  </div>
);

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-green-100 text-green-700';
  if (score >= 60) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const SEOAnalysisDashboard: React.FC<SEOAnalysisProps> = ({ results }) => {
  const { technical, content, onPage } = results;

  const overallScore = Math.round(((technical?.score ? technical.score : 0) + (content?.score ? content.score : 0) + (
    (onPage ? (onPage.title?.score + onPage.metaDescription?.score + onPage.headings?.score + onPage.images?.score + onPage.links?.score) : 0) / 5
  )) / 3);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Analysis Results</h1>
          <p className="text-gray-600">Complete technical and content SEO analysis overview</p>
        </div>

        <div className='p-6'>
          {/* Overall Scores */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ScoreCard
              icon={<Globe className="w-5 h-5 text-blue-600" />}
              title="Overall Score"
              score={overallScore}
              total={100}
              color={getScoreColor(overallScore)}
            />
            <ScoreCard
              icon={<Code className="w-5 h-5 text-green-600" />}
              title="Technical SEO"
              score={technical?.score}
              total={100}
              color={getScoreColor(technical?.score)}
            />
            <ScoreCard
              icon={<FileText className="w-5 h-5 text-purple-600" />}
              title="Content Quality"
              score={content?.score}
              total={100}
              color={getScoreColor(content?.score)}
            />
            <ScoreCard
              icon={<Eye className="w-5 h-5 text-orange-600" />}
              title="On-Page SEO"
              score={Math.round((onPage ? onPage?.title?.score + onPage?.metaDescription?.score + onPage?.headings?.score + onPage?.images?.score + onPage?.links?.score : 0) / 5)}
              total={100}
              color={getScoreColor(Math.round((onPage?.title?.score + onPage?.metaDescription?.score + onPage?.headings?.score + onPage?.images?.score + onPage?.links?.score) / 5))}
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
                    <span className={`font-medium px-2 py-1 rounded text-sm ${getScoreColor(content?.contentQuality.score)}`}>
                      {content?.contentQuality.score}/100
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
                    <span className="font-medium">{content?.contentQuality.factors.length}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uniqueness</span>
                    <span className="font-medium">{content?.contentQuality.factors.uniqueness}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Structure</span>
                    <span className="font-medium">{content?.contentQuality.factors.structure}/100</span>
                  </div>
                </div>
              </MetricCard>
            </div>

            {content?.issues.length > 0 && (
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
                      <span className={`px-2 py-1 rounded text-sm ${getScoreColor(onPage?.title.score)}`}>
                        {onPage?.title.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                      &quot;{onPage?.title.text}&quot; ({onPage?.title.length} chars)
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Meta Description</span>
                      <span className={`px-2 py-1 rounded text-sm ${getScoreColor(onPage?.metaDescription.score)}`}>
                        {onPage?.metaDescription.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                      &quot;{onPage?.metaDescription.text}&quot; ({onPage?.metaDescription.length} chars)
                    </p>
                  </div>
                </div>
              </MetricCard>

              <MetricCard title="Page Elements">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">H1 Tags</span>
                    <span className="font-medium">{onPage?.headings.h1Count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">H2 Tags</span>
                    <span className="font-medium">{onPage?.headings.h2Count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Images</span>
                    <span className="font-medium">{onPage?.images.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Images without Alt</span>
                    <span className={`font-medium ${onPage?.images.withoutAlt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {onPage?.images.withoutAlt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Internal Links</span>
                    <span className="font-medium">{onPage?.links.internal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">External Links</span>
                    <span className="font-medium">{onPage?.links.external}</span>
                  </div>
                </div>
              </MetricCard>
            </div>

            {/* On-page Issues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onPage?.title.issues.length > 0 && (
                <IssuesList 
                  title="Title Issues" 
                  issues={onPage?.title.issues} 
                  type="warning" 
                />
              )}
              {onPage?.metaDescription.issues.length > 0 && (
                <IssuesList 
                  title="Meta Description Issues" 
                  issues={onPage?.metaDescription.issues} 
                  type="warning" 
                />
              )}
              {onPage?.headings.issues.length > 0 && (
                <IssuesList 
                  title="Heading Issues" 
                  issues={onPage?.headings.issues} 
                  type="warning" 
                />
              )}
              {onPage?.links?.issues?.length > 0 && (
                <IssuesList 
                  title="Link Issues" 
                  issues={onPage?.links.issues} 
                  type="info" 
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SEOAnalysisDashboard;
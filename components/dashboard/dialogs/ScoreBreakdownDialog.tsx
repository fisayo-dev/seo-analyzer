"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Analysis } from '../AllUserAnalysis';
import { AlertTriangle, Code, Eye, FileText, XIcon } from 'lucide-react';
import { getScoreColor } from '../seo-utils';

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
            <div className="flex items-center gap-3 mb-4 text-gray-700">
              <Code className="w-6 h-6" />
              <h4 className="font-semibold">Technical SEO</h4>
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
            <div className="flex items-center gap-3 mb-4 text-gray-700">
              <Eye className="w-6 h-6" />
              <h4 className="font-semibold">On-Page SEO</h4>
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
            <div className="flex items-center gap-3 mb-4 text-gray-700">
              <FileText className="w-6 h-6" />
              <h4 className="font-semibold">Content Quality</h4>
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
            <div className="flex items-center gap-3 mb-4 text-gray-700">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-semibold">Issues Found</h4>
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

export default ScoreBreakdownDialog;
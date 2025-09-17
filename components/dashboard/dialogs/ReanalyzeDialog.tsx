"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { XIcon } from 'lucide-react';
import AnalysisProgress from '../AnalysisProgress';

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

export default ReanalyzeDialog;
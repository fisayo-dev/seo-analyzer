"use client"
import Twitter from '@/components/icons/Twitter';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Facebook, XIcon, Check, Globe } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ShareScanzie: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; }> = ({ open, onOpenChange }) => {
    const [showTextarea, setShowTextarea] = useState(false);
    const [testimonial, setTestimonial] = useState('Hey guys👋 \n\nHave u heard of scanzie? OMG Its a really cool product. \nI love using Scanzie because it helps me analyis my website SEO and gives me improvement recommendations! \n\nGo try out Scanie to today - https://scanzie.vercel.app \n\n ');

    const handleShare = () => {
        if (!testimonial.trim()) {
            return; // Prevent sharing if empty
        }
        // Replace with actual share implementation
        if (typeof window !== 'undefined' && navigator.share) {
            navigator.share({
                title: 'Check out Scanzie!',
                text: testimonial,
                url: window.location.origin,
            }).catch(console.error);
        } else {
            // Fallback: Copy to clipboard or open share dialog
            const text = `${testimonial} ${window.location.origin}`;
            navigator.clipboard.writeText(text).then(() => {
                toast('Copied to clipboard! You can now paste and share.');
        })
        }
        onOpenChange(false);
    };

    const handleFacebookShare = () => {
        navigator.clipboard.writeText(testimonial)
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleTwitterShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(testimonial || 'Check out Scanzie!')}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-3xl p-6 border border-gray-200 shadow-2xl">
            <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
                <span>Share Scanzie</span>
                <XIcon onClick={() => onOpenChange(false)} className="h-9 w-9 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"/>
            </AlertDialogTitle>
            </AlertDialogHeader>
            {showTextarea ? (
            <div className="grid gap-4 text-center justify-center">
                <div className="grid gap-2">
                <h2 className="text-xl font-bold">Enjoying Scanzie?</h2>
                <p className="text-sm">Tell people what you like about Scanzie?</p>
                </div>
                <Textarea
                placeholder="I love using Scanzie because..."
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                className="w-full h-40 max-w-xl mx-auto resize-none"
                />
                <Button 
                onClick={() => setShowTextarea(false)}
                disabled={!testimonial.trim()}
                className={testimonial.trim() ? '' : 'opacity-50 cursor-not-allowed'}
                >
                <Check className="h-6 w-6 mr-2" />
                <span>Share Now</span>
                </Button>
            </div>
            ) : (
            <div className="grid gap-2">
                <div 
                onClick={() => setShowTextarea(true)} 
                className="w-20 flex gap-2 items-center text-gray-700 text-center p-2 cursor-pointer hover:bg-gray-200 rounded-2xl text-sm"
                >
                <ArrowLeft className="h-6 w-6 mx-auto" />
                <span>Back</span>
                </div>
                <div className="grid gap-4">
                <div 
                    className="border mx-auto w-5/6 md:w-80 cursor-pointer hover:bg-gray-200 p-4 rounded-2xl flex items-center gap-2"
                    onClick={handleFacebookShare}
                >
                    <Facebook className="h-6 w-6" />
                    <span className="font-semibold">Share on Facebook</span>
                </div>
                <div 
                    className="border mx-auto w-5/6 md:w-80 cursor-pointer hover:bg-gray-200 p-4 rounded-2xl flex items-center gap-2"
                    onClick={handleTwitterShare}
                >
                    <Twitter />
                    <span className="font-semibold">Share on X (Twitter)</span>
                </div>
                <div 
                    className="border mx-auto w-5/6 md:w-80 cursor-pointer hover:bg-gray-200 p-4 rounded-2xl flex items-center gap-2"
                    onClick={handleShare}
                >
                    <Globe />
                    <span className="font-semibold">Other platforms</span>
                </div>
                </div>
            </div>
            )}
        </AlertDialogContent>
        </AlertDialog>
    );
};

export default ShareScanzie;
import NewAnalysis from '@/components/dashboard/NewAnalysis'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Start New SEO Analysis | Scanzie - Free Website SEO Audit",
    description: "Launch a comprehensive SEO analysis for your website with Scanzie. Get detailed insights on technical SEO, on-page optimization, performance metrics, and actionable recommendations.",
    keywords: ['new SEO analysis', 'website SEO audit', 'free SEO check', 'SEO analyzer', 'website optimization tool'],
    openGraph: {
        title: "Start New SEO Analysis | Scanzie",
        description: "Launch a comprehensive SEO analysis for your website with detailed insights and recommendations",
        type: 'website',
        siteName: 'Scanzie',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Start New SEO Analysis | Scanzie",
        description: "Launch a comprehensive SEO analysis for your website with detailed insights and recommendations",
    },
    alternates: {
        canonical: '/dashboard/new',
    }
};

const page = () => {
    return (
        <NewAnalysis />
    )
}

export default page
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "SEO Analysis Dashboard | Scanzie - Website SEO Audits",
    description: "Access all your SEO analysis reports in one centralized dashboard. Track website performance, monitor SEO improvements, and manage multiple site audits with Scanzie.",
    keywords: ['SEO dashboard', 'website analysis', 'SEO reports', 'site audit', 'SEO monitoring', 'website optimization'],
    openGraph: {
        title: "SEO Analysis Dashboard | Scanzie",
        description: "Centralized dashboard for all your SEO analysis reports and website audits",
        type: 'website',
        siteName: 'Scanzie',
    },
    twitter: {
        card: 'summary_large_image',
        title: "SEO Analysis Dashboard | Scanzie",
        description: "Centralized dashboard for all your SEO analysis reports and website audits",
    },
    alternates: {
        canonical: '/dashboard/analysis',
    }
};

const layout = ({children}: {children: React.ReactElement}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default layout
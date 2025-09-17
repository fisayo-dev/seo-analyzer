import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Account Settings | Scanzie - SEO Analysis Tool",
    description: "Manage your Scanzie account settings, preferences, and SEO analysis configurations. Customize your dashboard and notification preferences.",
    keywords: ['account settings', 'user preferences', 'SEO tool settings', 'dashboard configuration'],
    openGraph: {
        title: "Account Settings | Scanzie",
        description: "Manage your SEO analysis tool settings and preferences",
        type: 'website',
        siteName: 'Scanzie',
    },
    twitter: {
        card: 'summary',
        title: "Account Settings | Scanzie",
        description: "Manage your SEO analysis tool settings and preferences",
    },
    robots: {
        index: false, // Settings pages shouldn't be indexed
        follow: false,
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
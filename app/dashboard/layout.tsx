import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Smeal - SEO Analyzer",
  description: "Analyze and optimize your website's SEO performance with Smeal, the ultimate SEO analyzer tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
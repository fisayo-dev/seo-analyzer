import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/app-sidebar"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | Smeal",
  description: "Analyze and optimize your website's SEO performance with Smeal, the ultimate SEO analyzer tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#363636',
              fontFamily: "Space Grotesk"
            },
          }}
        />
      </main>
    </SidebarProvider>
  )
}
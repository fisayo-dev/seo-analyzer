"use client"
import { Home, Inbox, Settings, BarChart3, Zap, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Updated menu items to match the SEO analytics theme
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analysis",
    url: "/dashboard/analysis",
    icon: BarChart3,
  },
  {
    title: "Logout",
    url: "/dashboard/logout",
    icon: LogOut,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 shadow-xl bg-white">
      <SidebarContent className="bg-white">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Smeal</h1>
          <p className="text-sm text-gray-500">SEO Analytics Platform</p>
        </div>

        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.url
                
                return (
                  <Link href={item.url} key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        className={`relative px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-50 ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-r-4 border-blue-500' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <div className="w-full flex items-center">
                          <Icon 
                            className={`w-5 h-5 mr-3 transition-colors ${
                              isActive 
                                ? 'text-blue-500' 
                                : 'text-gray-400 group-hover:text-gray-500'
                            }`}
                          />
                          <span className="font-medium text-sm">{item.title}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Action Card */}
        <div className="mx-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center mb-3">
              <div className="bg-white/20 rounded-lg p-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-sm">Boost Your SEO</h4>
                <p className="text-blue-100 text-xs">Get optimization tips</p>
              </div>
            </div>
            <Link href="/dashboard/new">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium py-2.5 px-3 rounded-lg transition-all duration-200 hover:scale-105">
                Start Analysis →
              </button>
            </Link>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900">Your Account</p>
              <p className="text-xs text-gray-500 flex items-center">
                Free Plan 
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Upgrade
                </span>
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

// // Demo component to show the sidebar in context
// export default function SidebarDemo() {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <AppSidebar />
//       <div className="flex-1 p-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Analyze your website SEO and performance.
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Boost your site&apos;s ranking and speed with our powerful analytics tools.
//           </p>
//           <div className="flex gap-4">
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//               Get Started now →
//             </button>
//             <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
//               Check Features ↓
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
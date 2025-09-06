"use client"

import { SidebarTrigger } from "../ui/sidebar"

const Settings = () => {
  return (
    <div className="w-full mx-auto bg-gray-50">
        {/* Main Content */}
        <main className="w-full overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Customzie your account profile.</p>
                </div>  
                <SidebarTrigger className="bg-blue-50 p-3 rounded-md md:hidden"/>
            </div>
            </header>
            
            <div className="p-6">
                {/* Profile Image */}
            </div>
        </main>
    </div>

  )
}

export default Settings
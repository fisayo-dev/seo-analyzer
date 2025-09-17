"use client";
import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ChartBarIcon, 
  Settings2Icon, 
  ArrowRightSquareIcon,
  BatteryWarning,
  ArrowLeftIcon 
} from 'lucide-react';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Scanzie</h1>
          <p className="text-sm text-gray-500 mt-1">SEO Analytics Platform</p>
        </div>
        
        <div className="px-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            MAIN MENU
          </div>
          
          <nav className="space-y-2">
            <Link href="/" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link href="/analysis" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              <ChartBarIcon className="w-5 h-5 mr-3" />
              Analysis
            </Link>
            <Link href="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings2Icon className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">
              <ArrowRightSquareIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Boost Your SEO Card */}
        <div className="mx-4 mt-8">
          <div className="bg-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1">Boost Your SEO</h3>
            <p className="text-xs text-blue-100 mb-3">Get optimization tips</p>
            <button className="bg-white bg-opacity-20 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-opacity-30 transition-colors">
              Start Analysis →
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-800">FO</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Fisayo Obadina</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
              <p className="text-gray-600 mt-1">The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </div>

          {/* 404 Content */}
          <div className="max-w-2xl mx-auto text-center py-16">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <BatteryWarning className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* 404 Number */}
            <div className="mb-6">
              <h2 className="text-8xl font-bold text-gray-900 mb-2">404</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or the URL might be incorrect.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link 
                  href="/analysis"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <ChartBarIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Analysis</span>
                  <span className="text-xs text-gray-500 mt-1">View SEO reports</span>
                </Link>
                <Link 
                  href="/settings"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Settings2Icon className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Settings</span>
                  <span className="text-xs text-gray-500 mt-1">Manage account</span>
                </Link>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-700">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">New Analysis</span>
                  <span className="text-xs text-gray-500 mt-1">Start analyzing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
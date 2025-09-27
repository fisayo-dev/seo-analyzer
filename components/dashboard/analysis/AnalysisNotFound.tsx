import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search, FileText, Shield } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Main Error Display */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-8 mb-8">
            {/* Error Code Cards */}
            <div className="bg-white rounded-lg p-6 shadow-sm border min-w-[120px]">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">404</div>
              <div className="text-sm text-gray-500">Error Code</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border min-w-[120px]">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Search className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">0/100</div>
              <div className="text-sm text-gray-500">Page Found</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border min-w-[120px]">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100/100</div>
              <div className="text-sm text-gray-500">Security</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Technical Analysis Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Error Analysis</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Page Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Page Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status Code</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">404</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Availability</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">No</span>
                </div>
              </div>
            </div>

            {/* Navigation Help */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Home Available</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Yes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Search Active</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Yes</span>
                </div>
              </div>
            </div>

            {/* Site Health */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Site Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SSL Enabled</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Yes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mobile Ready</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <Link 
            href="https://www.google.com/" target='_blank' rel='noreferrer'
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Site
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
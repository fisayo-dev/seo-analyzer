"use client"
import React from 'react';
import { 
  Search, 
  Globe,
  ArrowUpRight,
  Check,
  TriangleAlert,
  InfoIcon,
  AlarmClock,
  ExternalLink,
  Eye
} from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';

interface MetricCardProps {
  title: string;
  iconColor: string,
  value: string;
  icon: React.ComponentType<any>;
}

const Dashboard = () => {

  const MetricCard = ({ title, value, iconColor, icon: Icon }: MetricCardProps) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${iconColor}-50 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${iconColor}-600`} />
        </div>
       
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  return (
    <div className="w-full mx-auto bg-gray-50">
      {/* Main Content */}
      <main className="w-full overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your SEO performance overview.</p>
            </div>  
            <Link href="/dashboard/analysis/new" className="hidden md:flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                New Analysis
              </button>
            </Link>
            <SidebarTrigger className="bg-blue-50 p-3 rounded-md md:hidden"/>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Analysis"
              value="52"
              icon={Globe}
              iconColor='blue'
            />
            <MetricCard
              title="Good Analysis"
              value="40"
              icon={Check}
              iconColor='green'
            />
            <MetricCard
              title="Moderate Analysis"
              value="9"
              icon={TriangleAlert}
              iconColor='gray'
            />
            <MetricCard
              title="Poor Analysis"
              value="3"
              icon={InfoIcon}
              iconColor='red'
            />
          </div>

          {/* Charts and Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>This month</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive chart would be rendered here</p>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="flex justify-between text-lg font-semibold text-gray-900 mb-6">Recent Analysis
                <AlarmClock className='text-gray-500'/>
              </h3>
              <div className="space-y-4">
                {[
                  { name: '/blog/seo-guide', score: '12,543'},
                  { name: '/services', score: '8,721'},
                  { name: '/about', score: '6,389'},
                  { name: '/contact', score: '4,156'},
                ].map((item, index) => (
                  <div key={index}  className="custom-hover flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 mb-2">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.score}</p>
                    </div>
                    <ExternalLink className='opacity-0 text-gray-400'/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Run SEO Analysis</span>
              </button>
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <Eye className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">View Poor Analysis </span>
              </button>
             
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
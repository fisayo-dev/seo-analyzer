"use client"
import React from 'react';
import { 
  Zap, 
  FileText, 
  Search, 
  TrendingUp,
  Users,
  Globe,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<any>;
}

const Dashboard = () => {

  const MetricCard = ({ title, value, change, changeType, icon: Icon }: MetricCardProps) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          changeType === 'positive' 
            ? 'text-green-700 bg-green-50' 
            : 'text-red-700 bg-red-50'
        }`}>
          {change}
        </span>
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
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Last 30 days
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                New Analysis
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Visitors"
              value="24,532"
              change="+12.5%"
              changeType="positive"
              icon={Users}
            />
            <MetricCard
              title="Organic Traffic"
              value="18,249"
              change="+8.2%"
              changeType="positive"
              icon={TrendingUp}
            />
            <MetricCard
              title="Page Views"
              value="142,388"
              change="+15.3%"
              changeType="positive"
              icon={Eye}
            />
            <MetricCard
              title="Keywords Ranking"
              value="1,247"
              change="-2.1%"
              changeType="negative"
              icon={Globe}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Pages</h3>
              <div className="space-y-4">
                {[
                  { page: '/blog/seo-guide', views: '12,543', change: '+5.2%' },
                  { page: '/services', views: '8,721', change: '+12.1%' },
                  { page: '/about', views: '6,389', change: '-2.3%' },
                  { page: '/contact', views: '4,156', change: '+8.7%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.page}</p>
                      <p className="text-gray-500 text-xs">{item.views} views</p>
                    </div>
                    <span className={`text-xs font-medium ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </span>
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
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Run SEO Audit</span>
              </button>
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Generate Report</span>
              </button>
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <Zap className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Optimize Keywords</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
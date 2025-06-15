
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Activity, Globe, Database, Zap, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import TaskQueue from '../components/TaskQueue';
import ScraperConfig from '../components/ScraperConfig';
import DataPreview from '../components/DataPreview';
import PerformanceChart from '../components/PerformanceChart';
import SystemStatus from '../components/SystemStatus';

const Index = () => {
  const [activeScrapers, setActiveScrapers] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [queuedTasks, setQueuedTasks] = useState(0);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalItems(prev => prev + Math.floor(Math.random() * 10));
      setQueuedTasks(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Web Crawl Nexus</h1>
                <p className="text-sm text-slate-400">Distributed Scrapy & Redis Engine</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                {activeScrapers} Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Scraped</CardTitle>
              <Database className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalItems.toLocaleString()}</div>
              <p className="text-xs text-slate-400">+12% from last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Queue Length</CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{queuedTasks}</div>
              <p className="text-xs text-slate-400">Redis managed</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Spiders</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeScrapers}</div>
              <p className="text-xs text-slate-400">Distributed workers</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98.2%</div>
              <p className="text-xs text-slate-400">Dedup efficiency</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="queue" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Task Queue
            </TabsTrigger>
            <TabsTrigger value="scrapers" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Scrapers
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Data Preview
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SystemStatus />
              <PerformanceChart />
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <TaskQueue />
          </TabsContent>

          <TabsContent value="scrapers">
            <ScraperConfig />
          </TabsContent>

          <TabsContent value="data">
            <DataPreview />
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="grid grid-cols-1 gap-6">
              <PerformanceChart />
              <SystemStatus />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

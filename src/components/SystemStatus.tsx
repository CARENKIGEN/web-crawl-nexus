
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server, Database, Zap, Shield, Cpu, HardDrive } from 'lucide-react';

const SystemStatus = () => {
  const systemMetrics = [
    {
      name: 'Redis Queue Server',
      status: 'healthy',
      uptime: '99.8%',
      connections: 145,
      memory: 78,
      icon: Database,
      color: 'text-green-400'
    },
    {
      name: 'Scrapy Cluster',
      status: 'healthy',
      uptime: '99.5%',
      connections: 24,
      memory: 65,
      icon: Zap,
      color: 'text-cyan-400'
    },
    {
      name: 'Load Balancer',
      status: 'healthy',
      uptime: '99.9%',
      connections: 8,
      memory: 32,
      icon: Server,
      color: 'text-purple-400'
    },
    {
      name: 'Rate Limiter',
      status: 'active',
      uptime: '100%',
      connections: 156,
      memory: 12,
      icon: Shield,
      color: 'text-yellow-400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'active': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'error': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Server className="w-5 h-5 mr-2" />
            System Status
          </CardTitle>
          <CardDescription className="text-slate-400">
            Infrastructure health and performance monitoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-slate-600/50 ${metric.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{metric.name}</h3>
                      <p className="text-sm text-slate-400">Uptime: {metric.uptime}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-slate-300">{metric.memory}%</span>
                    </div>
                    <Progress value={metric.memory} className="bg-slate-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Active Connections</div>
                    <div className="text-lg font-semibold text-white">{metric.connections}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cpu className="w-5 h-5 mr-2" />
            Resource Usage
          </CardTitle>
          <CardDescription className="text-slate-400">
            Current system resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  CPU Usage
                </span>
                <span className="text-cyan-400 font-medium">67%</span>
              </div>
              <Progress value={67} className="bg-slate-600" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 flex items-center">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Disk Usage
                </span>
                <span className="text-purple-400 font-medium">43%</span>
              </div>
              <Progress value={43} className="bg-slate-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">24</div>
              <div className="text-sm text-slate-400">Active Workers</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">1.2GB</div>
              <div className="text-sm text-slate-400">Memory Used</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-sm text-slate-400">Req/Min</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface QueueTask {
  id: string;
  url: string;
  spider: string;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  attempts: number;
}

const TaskQueue = () => {
  const [tasks, setTasks] = useState<QueueTask[]>([]);
  const [queueStats, setQueueStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0
  });

  useEffect(() => {
    // Simulate task queue data
    const mockTasks: QueueTask[] = [
      {
        id: 'task-001',
        url: 'https://example-store.com/products',
        spider: 'ecommerce_spider',
        priority: 1,
        status: 'processing',
        created_at: '2024-01-15T10:30:00Z',
        attempts: 1
      },
      {
        id: 'task-002',
        url: 'https://marketplace.com/category/electronics',
        spider: 'marketplace_spider',
        priority: 2,
        status: 'pending',
        created_at: '2024-01-15T10:32:00Z',
        attempts: 0
      },
      {
        id: 'task-003',
        url: 'https://retailer.com/api/products',
        spider: 'api_spider',
        priority: 1,
        status: 'completed',
        created_at: '2024-01-15T10:25:00Z',
        attempts: 1
      },
      {
        id: 'task-004',
        url: 'https://shop.com/deals',
        spider: 'deals_spider',
        priority: 3,
        status: 'failed',
        created_at: '2024-01-15T10:20:00Z',
        attempts: 3
      }
    ];

    setTasks(mockTasks);
    
    const stats = mockTasks.reduce((acc, task) => {
      acc.total++;
      acc[task.status]++;
      return acc;
    }, { total: 0, pending: 0, processing: 0, completed: 0, failed: 0 });
    
    setQueueStats(stats);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'processing': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'text-red-400';
      case 2: return 'text-yellow-400';
      case 3: return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{queueStats.total}</div>
            <div className="text-sm text-slate-400">Total</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{queueStats.pending}</div>
            <div className="text-sm text-slate-400">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{queueStats.processing}</div>
            <div className="text-sm text-slate-400">Processing</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{queueStats.completed}</div>
            <div className="text-sm text-slate-400">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{queueStats.failed}</div>
            <div className="text-sm text-slate-400">Failed</div>
          </CardContent>
        </Card>
      </div>

      {/* Redis Queue Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Redis Task Queue</CardTitle>
              <CardDescription className="text-slate-400">
                Real-time task management and deduplication
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Start Queue
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      Priority {task.priority}
                    </span>
                    <span className="text-sm text-slate-400">
                      {task.spider}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 truncate">
                    {task.url}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(task.created_at).toLocaleTimeString()}
                    </span>
                    <span>
                      Attempts: {task.attempts}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Queue Progress */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Queue Processing</span>
              <span className="text-slate-300">75% complete</span>
            </div>
            <Progress value={75} className="bg-slate-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskQueue;

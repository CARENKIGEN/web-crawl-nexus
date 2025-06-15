
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Play, Pause, Code, Globe, Database } from 'lucide-react';
import { useState } from 'react';

interface SpiderConfig {
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'paused';
  concurrent_requests: number;
  download_delay: number;
  respect_robots: boolean;
  last_run: string;
  items_scraped: number;
}

const ScraperConfig = () => {
  const [spiders] = useState<SpiderConfig[]>([
    {
      name: 'ecommerce_spider',
      domain: 'example-store.com',
      status: 'active',
      concurrent_requests: 16,
      download_delay: 1,
      respect_robots: true,
      last_run: '2024-01-15T10:30:00Z',
      items_scraped: 15420
    },
    {
      name: 'marketplace_spider',
      domain: 'marketplace.com',
      status: 'active',
      concurrent_requests: 8,
      download_delay: 2,
      respect_robots: true,
      last_run: '2024-01-15T09:45:00Z',
      items_scraped: 8932
    },
    {
      name: 'deals_spider',
      domain: 'deals-site.com',
      status: 'paused',
      concurrent_requests: 4,
      download_delay: 3,
      respect_robots: false,
      last_run: '2024-01-15T08:20:00Z',
      items_scraped: 3456
    }
  ]);

  const [selectedSpider, setSelectedSpider] = useState<string>('ecommerce_spider');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'inactive': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const currentSpider = spiders.find(s => s.name === selectedSpider) || spiders[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Spider List */}
      <div className="lg:col-span-1">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Active Spiders
            </CardTitle>
            <CardDescription className="text-slate-400">
              Scrapy spider configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {spiders.map((spider) => (
              <div
                key={spider.name}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-700/50 ${
                  selectedSpider === spider.name
                    ? 'bg-slate-700/50 border-cyan-500/50'
                    : 'bg-slate-700/20 border-slate-600/50'
                }`}
                onClick={() => setSelectedSpider(spider.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white text-sm">{spider.name}</h3>
                  <Badge className={getStatusColor(spider.status)}>
                    {spider.status}
                  </Badge>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>{spider.domain}</div>
                  <div>{spider.items_scraped.toLocaleString()} items</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Spider Configuration */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  {currentSpider.name}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure spider parameters and settings
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="domain" className="text-slate-300">Target Domain</Label>
                  <Input
                    id="domain"
                    value={currentSpider.domain}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    readOnly
                  />
                </div>
                
                <div>
                  <Label htmlFor="concurrent" className="text-slate-300">Concurrent Requests</Label>
                  <Input
                    id="concurrent"
                    type="number"
                    value={currentSpider.concurrent_requests}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="delay" className="text-slate-300">Download Delay (seconds)</Label>
                  <Input
                    id="delay"
                    type="number"
                    value={currentSpider.download_delay}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="priority" className="text-slate-300">Queue Priority</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="robots" className="text-slate-300">Respect robots.txt</Label>
                  <Switch
                    id="robots"
                    checked={currentSpider.respect_robots}
                    className="data-[state=checked]:bg-cyan-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dedup" className="text-slate-300">Redis Deduplication</Label>
                  <Switch
                    id="dedup"
                    defaultChecked
                    className="data-[state=checked]:bg-cyan-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="selectors" className="text-slate-300">CSS Selectors Configuration</Label>
              <Textarea
                id="selectors"
                placeholder="Enter CSS selectors for data extraction..."
                className="bg-slate-700/50 border-slate-600 text-white mt-2"
                rows={4}
                defaultValue={`{
  "title": "h1.product-title",
  "price": ".price-current",
  "description": ".product-description",
  "availability": ".stock-status"
}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Spider Statistics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Spider Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{currentSpider.items_scraped.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Items Scraped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">98.5%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">2.3s</div>
                <div className="text-sm text-slate-400">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{currentSpider.concurrent_requests}</div>
                <div className="text-sm text-slate-400">Concurrent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScraperConfig;

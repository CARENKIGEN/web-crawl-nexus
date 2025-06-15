
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Filter, Eye, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ScrapedItem {
  id: string;
  title: string;
  price: string;
  url: string;
  spider: string;
  scraped_at: string;
  status: 'new' | 'processed' | 'exported';
  category: string;
}

const DataPreview = () => {
  const [items, setItems] = useState<ScrapedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpider, setFilterSpider] = useState('all');

  useEffect(() => {
    // Simulate scraped data
    const mockData: ScrapedItem[] = [
      {
        id: '1',
        title: 'Wireless Bluetooth Headphones - Premium Quality',
        price: '$89.99',
        url: 'https://example-store.com/products/headphones-001',
        spider: 'ecommerce_spider',
        scraped_at: '2024-01-15T10:45:23Z',
        status: 'new',
        category: 'Electronics'
      },
      {
        id: '2',
        title: 'Smart Fitness Watch with Heart Rate Monitor',
        price: '$199.99',
        url: 'https://marketplace.com/fitness/watch-smart-001',
        spider: 'marketplace_spider',
        scraped_at: '2024-01-15T10:44:15Z',
        status: 'processed',
        category: 'Fitness'
      },
      {
        id: '3',
        title: 'Professional DSLR Camera Bundle',
        price: '$1,299.99',
        url: 'https://camera-store.com/dslr/bundle-pro',
        spider: 'ecommerce_spider',
        scraped_at: '2024-01-15T10:43:07Z',
        status: 'exported',
        category: 'Photography'
      },
      {
        id: '4',
        title: 'Gaming Mechanical Keyboard RGB Backlit',
        price: '$129.99',
        url: 'https://gaming-gear.com/keyboards/mechanical-rgb',
        spider: 'gaming_spider',
        scraped_at: '2024-01-15T10:42:33Z',
        status: 'new',
        category: 'Gaming'
      },
      {
        id: '5',
        title: 'Organic Cotton Bedding Set Queen Size',
        price: '$79.99',
        url: 'https://home-goods.com/bedding/organic-cotton-set',
        spider: 'marketplace_spider',
        scraped_at: '2024-01-15T10:41:58Z',
        status: 'processed',
        category: 'Home & Garden'
      }
    ];

    setItems(mockData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'processed': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'exported': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpider = filterSpider === 'all' || item.spider === filterSpider;
    return matchesSearch && matchesSpider;
  });

  const spiders = Array.from(new Set(items.map(item => item.spider)));

  return (
    <div className="space-y-6">
      {/* Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{items.length}</div>
            <div className="text-sm text-slate-400">Total Items</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {items.filter(i => i.status === 'new').length}
            </div>
            <div className="text-sm text-slate-400">New Items</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {items.filter(i => i.status === 'processed').length}
            </div>
            <div className="text-sm text-slate-400">Processed</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {items.filter(i => i.status === 'exported').length}
            </div>
            <div className="text-sm text-slate-400">Exported</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Scraped Data Preview</CardTitle>
              <CardDescription className="text-slate-400">
                Real-time view of scraped items with Redis deduplication
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <select
              value={filterSpider}
              onChange={(e) => setFilterSpider(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
            >
              <option value="all">All Spiders</option>
              {spiders.map(spider => (
                <option key={spider} value={spider}>{spider}</option>
              ))}
            </select>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/30">
                  <TableHead className="text-slate-300">Title</TableHead>
                  <TableHead className="text-slate-300">Price</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">Spider</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Scraped At</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell className="text-white max-w-xs truncate">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-green-400 font-medium">
                      {item.price}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <code className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                        {item.spider}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {new Date(item.scraped_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPreview;

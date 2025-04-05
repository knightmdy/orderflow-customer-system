import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/services/api';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
    enabled: !!user
  });
  
  const filteredCustomers = customers
    ? customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">客户管理</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? '管理和查看所有客户信息'
              : '管理和查看您的客户信息'}
          </p>
        </div>
        
        <Button asChild>
          <Link to="/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            新建客户
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customers Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>地址</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-36" /></TableCell>
                    <TableCell><Skeleton className="h-9 w-16 float-right" /></TableCell>
                  </TableRow>
                ))
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      {customer.address.city}, {customer.address.state}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/customers/${customer.id}`}>
                          查看
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    {searchTerm
                      ? "没有找到匹配的客户"
                      : "暂无客户数据"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CustomerList;

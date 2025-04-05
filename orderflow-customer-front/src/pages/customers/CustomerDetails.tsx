import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCustomer, getCustomerOrders, deleteCustomer } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Trash, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: customer, isLoading: isLoadingCustomer, error: customerError } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id!),
    enabled: !!id && !!user
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['customer-orders', id],
    queryFn: () => getCustomerOrders(id!),
    enabled: !!id && !!user
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      toast.success(`客户 ${customer?.name} 已成功删除`);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/customers');
    },
    onError: (error) => {
      toast.error('删除客户失败');
      console.error('Delete customer error:', error);
    }
  });
  
  useEffect(() => {
    if (customerError) {
      toast.error("无法加载客户详情");
      navigate('/customers');
    }
  }, [customerError, navigate]);

  const handleDelete = () => {
    if (window.confirm('确定要删除此客户吗？此操作无法撤销。')) {
      deleteMutation.mutate(id!);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">
              {isLoadingCustomer ? (
                <Skeleton className="h-9 w-64" />
              ) : (
                customer?.name
              )}
            </h1>
            {!isLoadingCustomer && customer && (
              <div className="text-muted-foreground">
                客户创建于 {format(new Date(customer.createdAt), 'yyyy年MM月')}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 self-start md:self-center">
          <Button variant="outline" asChild>
            <Link to={`/customers/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              编辑
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash className="mr-2 h-4 w-4" />
            {deleteMutation.isPending ? '删除中...' : '删除'}
          </Button>
        </div>
      </div>

      {isLoadingCustomer ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full lg:col-span-2" />
        </div>
      ) : customer ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>客户信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">{customer.email}</div>
                  <div className="text-sm text-muted-foreground">邮箱</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">{customer.phone}</div>
                  <div className="text-sm text-muted-foreground">电话</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">
                    {customer.address.street}<br />
                    {customer.address.city}, {customer.address.state} {customer.address.zip}<br />
                    {customer.address.country}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">地址</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>订单历史</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>订单号</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>总金额</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.orderNumber}
                          </TableCell>
                          <TableCell>
                            {format(new Date(order.orderDate), 'yyyy-MM-dd')}
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${order.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`
                            }>
                              {order.status === 'completed' ? '已完成'
                                : order.status === 'processing' ? '处理中'
                                : order.status === 'pending' ? '待处理'
                                : '已取消'}
                            </div>
                          </TableCell>
                          <TableCell>
                            ¥{order.total.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link to={`/orders/${order.id}`}>
                                查看
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  该客户暂无订单
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <Button asChild>
                  <Link to={`/orders/new?customerId=${id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    创建订单
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>未找到客户</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;

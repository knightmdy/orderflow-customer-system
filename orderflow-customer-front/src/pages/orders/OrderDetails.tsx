import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrder, deleteOrder } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id!),
    enabled: !!id && !!user
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success(`订单 ${order?.orderNumber} 已成功删除`);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/orders');
    },
    onError: (error) => {
      toast.error('删除订单失败');
      console.error('Delete order error:', error);
    }
  });
  
  useEffect(() => {
    if (error) {
      toast.error("无法加载订单详情");
      navigate('/orders');
    }
  }, [error, navigate]);

  const handleDelete = () => {
    if (window.confirm('确定要删除此订单吗？此操作无法撤销。')) {
      deleteMutation.mutate(id!);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">
              {isLoading ? (
                <Skeleton className="h-9 w-40" />
              ) : (
                `订单 #${order?.orderNumber}`
              )}
            </h1>
            <div className="text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-5 w-32 mt-1" />
              ) : (
                `创建于 ${format(new Date(order?.createdAt || ''), 'yyyy年MM月dd日')}`
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 self-start md:self-center">
          <Button variant="outline" asChild>
            <Link to={`/orders/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              编辑订单
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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : order ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>订单摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">状态</div>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1
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
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">订单日期</div>
                <div className="font-medium">
                  {format(new Date(order.orderDate), 'yyyy年MM月dd日')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">最后更新</div>
                <div className="font-medium">
                  {format(new Date(order.updatedAt), 'yyyy年MM月dd日')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">订单总额</div>
                <div className="text-xl font-bold">¥{order.total.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>客户信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">客户姓名</div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <Link to={`/customers/${order.customerId}`} className="text-brand-600 hover:underline">
                    查看客户资料
                  </Link>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                客户ID: {order.customerId}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                下载发票
              </Button>
              <Button className="w-full" variant="outline">
                打印订单详情
              </Button>
              <Button className="w-full" variant="outline">
                联系客户
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>订单商品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/30">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        商品
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        单价
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        数量
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        小计
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.productId} className="border-b">
                        <td className="px-6 py-4 font-medium">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          ¥{item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium">
                      <td colSpan={3} className="px-6 py-4 text-right">
                        总计：
                      </td>
                      <td className="px-6 py-4 text-right">
                        ¥{order.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>未找到订单</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

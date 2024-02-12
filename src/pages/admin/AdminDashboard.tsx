import { useEffect, useState } from "react";
import { AdminProduct } from "../../features/admin/types";
import { getOrderList, getProductList } from "../../features/admin/api";

const AdminDashboard : React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [_orders, setOrders] = useState();
  const [_loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getProductList().then((res) => {
      setProducts(res?.data?.results);
    });
    getOrderList(). then((res) => {
      setOrders(res?.data?.results);
    })
  }, [])

  return (
    <div>
      {products && products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

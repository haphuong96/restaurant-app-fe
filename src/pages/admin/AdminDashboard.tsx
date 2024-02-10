import { useEffect, useState } from "react";
import { AdminProduct } from "../../features/admin/types";
import { getProductList } from "../../features/admin/api";

const AdminDashboard : React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductList().then((res) => {
      setProducts(res?.data.results);
      setLoading(false);
    });
  })

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

import OrderFilters from "../components/OrderFilters";
import OrderList from "../components/OrderList";
import OrderPagination from "../components/OrderPagination";
import { orderData } from "../data/OrderData";
import { useState } from "react";

const AdminOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  return (
    <div className="admin-orders">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <OrderFilters />
      <OrderList items={orderData} />
      <OrderPagination
        perPage={perPage}
        totalResults={276}
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
};

export default AdminOrders;

import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiDownload, FiUpload, FiPlus } from "react-icons/fi";
import DataTable from "../../../shared/dashboard/components/DataTable";
import Badge from "../../../shared/dashboard/components/Badge";

const CUSTOMERS = [
  {
    id: 1,
    name: "Esther Howard",
    avatar: "https://i.pravatar.cc/80?img=47",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250,
    type: "Normal",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    avatar: "https://i.pravatar.cc/80?img=12",
    location: "Pasadena, Oklahoma",
    orders: 3,
    amountSpent: 350,
    type: "B2B",
  },
  {
    id: 3,
    name: "Guy Hawkins",
    avatar: "https://i.pravatar.cc/80?img=13",
    location: "Corona, Michigan",
    orders: 0,
    amountSpent: 0,
    type: "Normal",
  },
  {
    id: 4,
    name: "Savannah Nguyen",
    avatar: "https://i.pravatar.cc/80?img=32",
    location: "Syracuse, Connecticut",
    orders: 0,
    amountSpent: 0,
    type: "B2B",
  },
  {
    id: 5,
    name: "Bessie Cooper",
    avatar: "https://i.pravatar.cc/80?img=26",
    location: "Lansing, Illinois",
    orders: 1,
    amountSpent: 470,
    type: "Normal",
  },
  {
    id: 6,
    name: "Ronald Richards",
    avatar: "https://i.pravatar.cc/80?img=15",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250,
    type: "B2B",
  },
  {
    id: 7,
    name: "Marvin McKinney",
    avatar: "https://i.pravatar.cc/80?img=51",
    location: "Coppell, Virginia",
    orders: 2,
    amountSpent: 150,
    type: "Normal",
  },
  {
    id: 8,
    name: "Kathryn Murphy",
    avatar: "https://i.pravatar.cc/80?img=44",
    location: "Lafayette, California",
    orders: 3,
    amountSpent: 250,
    type: "Normal",
  },
  {
    id: 9,
    name: "Eleanor Pena",
    avatar: "https://i.pravatar.cc/80?img=48",
    location: "Corona, Michigan",
    orders: 1,
    amountSpent: 250,
    type: "B2B",
  },
];

const TYPE_STYLES = {
  B2B: "bg-[#EAF3DE] text-[#3B6D11]",
  Normal: "bg-gray-100 text-gray-600",
};

const PAGE_SIZE = 8;

const columns = [
  {
    key: "name",
    header: "Customers",
    render: (c) => (
      <div className="flex items-center gap-3">
        <img
          src={c.avatar}
          alt={c.name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="font-medium text-[#202020]">{c.name}</span>
      </div>
    ),
  },
  { key: "location", header: "Location" },
  {
    key: "orders",
    header: "Orders",
    render: (c) => (c.orders > 0 ? `${c.orders} orders` : "N/A"),
  },
  {
    key: "amountSpent",
    header: "Amount spent",
    render: (c) => `$${c.amountSpent.toFixed(2)}`,
  },
  {
    key: "type",
    header: "Customer type",
    render: (c) => (
      <Badge
        value={c.type === "B2B" ? "B2B customer" : "Normal customer"}
        styles={{
          "B2B customer": TYPE_STYLES.B2B,
          "Normal customer": TYPE_STYLES.Normal,
        }}
      />
    ),
  },
  {
    key: "actions",
    header: "Action",
    className: "w-10 text-right",
    render: () => (
      <button className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
        <HiOutlineDotsVertical size={18} />
      </button>
    ),
  },
];

const Customers = () => {
  const b2bCount = CUSTOMERS.filter((c) => c.type === "B2B").length;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Customers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            As a new member, get ready for an exciting shopping journey with
            perks.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:px-4">
            <FiUpload size={16} />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:px-4">
            <FiDownload size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#047B22] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] sm:flex-none sm:px-4">
            <FiPlus size={16} />
            Add customers
          </button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">
          {CUSTOMERS.length} customers
        </span>
        <span className="text-gray-400">
          · {Math.round((b2bCount / CUSTOMERS.length) * 100)}% B2B customer base
        </span>
      </div>

      <div className="mt-4">
        <DataTable
          data={CUSTOMERS}
          columns={columns}
          rowKey={(c) => c.id}
          searchKeys={["name"]}
          searchPlaceholder="Search customer"
          filters={[
            {
              field: "type",
              label: "Customer type",
              options: ["All", "B2B", "Normal"],
            },
          ]}
          pageSize={PAGE_SIZE}
          emptyMessage="No customers match this filter."
        />
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Learn more about{" "}
        <span className="cursor-pointer font-medium text-[#047B22] underline">
          customers
        </span>
      </p>
    </div>
  );
};

export default Customers;

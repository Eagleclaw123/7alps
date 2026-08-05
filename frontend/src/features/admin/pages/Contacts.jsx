import { useEffect, useState } from "react";
import { FiMail, FiClock, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";
import {
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../../../shared/services/contact.service";

const STATUS_OPTIONS = ["New", "Read", "Resolved"];

const STATUS_STYLES = {
  New: "bg-[#FCEBEB] text-[#A32D2D]",
  Read: "bg-[#FAEEDA] text-[#854F0B]",
  Resolved: "bg-[#EAF3DE] text-[#3B6D11]",
};

const PAGE_SIZE = 10;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = () => {
    setLoading(true);
    getAllContacts()
      .then(({ data }) => setContacts(data?.data?.contacts || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateContactStatus(id, status);
    setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const newCount = contacts.filter((c) => c.status === "New").length;
  const resolvedCount = contacts.filter((c) => c.status === "Resolved").length;

  const columns = [
    { key: "fullName", header: "Name" },
    {
      key: "contactInfo",
      header: "Contact",
      render: (c) => (
        <div>
          <div>{c.phone}</div>
          {c.email ? <div className="text-xs text-gray-400">{c.email}</div> : null}
        </div>
      ),
    },
    {
      key: "companyName",
      header: "Company",
      render: (c) => c.companyName || "—",
    },
    {
      key: "productInterest",
      header: "Interest",
      render: (c) =>
        [c.productInterest, c.quantityRequirement].filter(Boolean).join(" · ") || "—",
    },
    {
      key: "message",
      header: "Message",
      render: (c) =>
        c.message ? (c.message.length > 60 ? `${c.message.slice(0, 60)}…` : c.message) : "—",
    },
    {
      key: "createdAt",
      header: "Received",
      render: (c) => new Date(c.createdAt).toLocaleDateString(),
      sortable: true,
      sortValue: (c) => new Date(c.createdAt).getTime(),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <select
          value={c.status}
          onChange={(e) => handleStatusChange(c._id, e.target.value)}
          className={`rounded-full border-none px-3 py-1 text-xs font-medium outline-none ${STATUS_STYLES[c.status]}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (c) => (
        <button
          onClick={() => handleDelete(c._id)}
          title="Delete"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#FCEBEB] hover:text-[#A32D2D]"
        >
          <FiTrash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
          Contact Submissions
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Quote requests and inquiries submitted through the Contact Us page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FiMail size={20} />}
          label="Total submissions"
          value={contacts.length}
        />
        <StatCard icon={<FiClock size={20} />} label="New" value={newCount} />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Resolved"
          value={resolvedCount}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading submissions...
          </p>
        ) : (
          <DataTable
            data={contacts}
            columns={columns}
            rowKey={(c) => c._id}
            searchKeys={["fullName", "email", "phone", "companyName", "message"]}
            searchPlaceholder="Search submissions"
            filters={[
              { field: "status", label: "Status", options: ["All", ...STATUS_OPTIONS] },
            ]}
            defaultSort={{ key: "createdAt", dir: "desc" }}
            pageSize={PAGE_SIZE}
            emptyMessage="No contact submissions yet."
          />
        )}
      </div>
    </div>
  );
};

export default Contacts;

import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiChevronDown,
  FiStar,
  FiCheck,
  FiTrash2,
  FiFlag,
} from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    customer: "Esther Howard",
    avatar: "https://i.pravatar.cc/80?img=47",
    product: "Beetroot Powder",
    rating: 5,
    comment:
      "Noticed a real difference in my hair volume within three weeks. Smells great too, no artificial fragrance.",
    date: "2026-07-02",
    status: "Published",
  },
  {
    id: 2,
    customer: "Leslie Alexander",
    avatar: "https://i.pravatar.cc/80?img=12",
    product: "Sandalwood Face Pack",
    rating: 4,
    comment:
      "Good quality powder, mixes well with rose water. Packaging could be sturdier for shipping.",
    date: "2026-07-01",
    status: "Published",
  },
  {
    id: 3,
    customer: "Guy Hawkins",
    avatar: "https://i.pravatar.cc/80?img=13",
    product: "Ginger Powder",
    rating: 2,
    comment:
      "Jar arrived half empty and the seal was broken. Contacted support but no response yet.",
    date: "2026-06-29",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Savannah Nguyen",
    avatar: "https://i.pravatar.cc/80?img=32",
    product: "Brahmi Powder",
    rating: 5,
    comment: "My go-to for hair oil now. Repeat customer, always fresh stock.",
    date: "2026-06-27",
    status: "Published",
  },
  {
    id: 5,
    customer: "Bessie Cooper",
    avatar: "https://i.pravatar.cc/80?img=26",
    product: "Beetroot Powder",
    rating: 1,
    comment:
      "This is clearly a fake review posted by a competitor, contains a link to another site.",
    date: "2026-06-25",
    status: "Flagged",
  },
  {
    id: 6,
    customer: "Ronald Richards",
    avatar: "https://i.pravatar.cc/80?img=15",
    product: "Sandalwood Face Pack",
    rating: 3,
    comment:
      "Decent product, nothing exceptional. Would buy again if on discount.",
    date: "2026-06-22",
    status: "Published",
  },
  {
    id: 7,
    customer: "Marvin McKinney",
    avatar: "https://i.pravatar.cc/80?img=51",
    product: "Ginger Powder",
    rating: 5,
    comment:
      "Fast delivery, great customer service when I asked about usage suggestions.",
    date: "2026-06-20",
    status: "Pending",
  },
];

const STATUS_STYLES = {
  Published: "bg-[#EAF3DE] text-[#3B6D11]",
  Pending: "bg-[#FAEEDA] text-[#854F0B]",
  Flagged: "bg-[#FCEBEB] text-[#A32D2D]",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={14}
        className={
          i < rating ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-200"
        }
      />
    ))}
  </div>
);

const AdminReviews = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch =
        r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.product.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, statusFilter]);

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;

  const updateStatus = (id, status) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const removeReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Reviews
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            See what customers are saying and keep your storefront trustworthy.
          </p>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">
          {reviews.length} reviews
        </span>
        <span className="text-gray-400">
          · {avgRating.toFixed(1)} average rating · {pendingCount} awaiting
          moderation
        </span>
      </div>

      {/* Search + Filter row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <CiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
          >
            Status
            {statusFilter !== "All" && (
              <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#3B6D11]">
                {statusFilter}
              </span>
            )}
            <FiChevronDown size={16} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {["All", "Published", "Pending", "Flagged"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt);
                    setFilterOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    statusFilter === opt
                      ? "font-medium text-[#047B22]"
                      : "text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-5 divide-y divide-gray-50">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:gap-4"
          >
            <img
              src={r.avatar}
              alt={r.customer}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-[#202020]">{r.customer}</span>
                <span className="text-xs text-gray-400">
                  on <span className="text-gray-600">{r.product}</span>
                </span>
              </div>

              <div className="mt-1 flex items-center gap-3">
                <Stars rating={r.rating} />
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{r.comment}</p>

              <div className="mt-2">
                <StatusBadge status={r.status} />
              </div>
            </div>

            <div className="flex shrink-0 items-start gap-1 sm:pl-2">
              {r.status !== "Published" && (
                <button
                  onClick={() => updateStatus(r.id, "Published")}
                  title="Approve"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#EAF3DE] hover:text-[#3B6D11]"
                >
                  <FiCheck size={16} />
                </button>
              )}
              {r.status !== "Flagged" && (
                <button
                  onClick={() => updateStatus(r.id, "Flagged")}
                  title="Flag"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#FAEEDA] hover:text-[#854F0B]"
                >
                  <FiFlag size={16} />
                </button>
              )}
              <button
                onClick={() => removeReview(r.id)}
                title="Delete"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#FCEBEB] hover:text-[#A32D2D]"
              >
                <FiTrash2 size={16} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
                <HiOutlineDotsVertical size={16} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-14 text-center text-gray-400">
            No reviews match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;

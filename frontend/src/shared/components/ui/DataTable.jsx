import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import Pagination from "./Pagination";

/**
 * Reusable admin table: search box + optional dropdown filter(s) + table + pagination.
 * Covers the "card with a table in it" shape used across the admin/customer pages
 * (search by text, filter by one field like status/category/type, paginate the rest).
 *
 * @param {object[]} data - Full row data (unfiltered).
 * @param {object[]} columns - [{ key, header, render?: (row) => node, className? }]
 *   `render` is optional; if omitted, `row[key]` is shown as-is.
 * @param {(row: object) => string|number} rowKey - Returns a unique key for a row.
 * @param {string[]} [searchKeys] - Row fields to match against the search box (case-insensitive substring).
 * @param {string} [searchPlaceholder="Search"]
 * @param {object[]} [filters] - Optional dropdown filters:
 *   [{ field, label, options: string[] (first should be "All" or equivalent) }]
 * @param {number} [pageSize=5]
 * @param {string} [emptyMessage="No results match this filter."]
 * @param {boolean} [showResultsCount=true] - Show "Showing X-Y of Z results" in the pagination bar.
 */
const DataTable = ({
  data,
  columns,
  rowKey,
  searchKeys = [],
  searchPlaceholder = "Search",
  filters = [],
  pageSize = 5,
  emptyMessage = "No results match this filter.",
  showResultsCount = true,
}) => {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState(() =>
    Object.fromEntries(filters.map((f) => [f.field, f.options[0]])),
  );
  const [openFilterField, setOpenFilterField] = useState(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        !search ||
        searchKeys.some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        );

      const matchesFilters = filters.every(({ field, options }) => {
        const active = filterValues[field];
        return active === options[0] || row[field] === active;
      });

      return matchesSearch && matchesFilters;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, search, filterValues, searchKeys, filters]);

  // Jump back to page 1 whenever search or any filter changes the result set.
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, JSON.stringify(filterValues)]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      {/* Search + Filter row */}
      {(searchKeys.length > 0 || filters.length > 0) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchKeys.length > 0 && (
            <div className="relative w-full sm:max-w-sm">
              <CiSearch
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
              />
            </div>
          )}

          {filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.map(({ field, label, options }) => (
                <div key={field} className="relative w-full sm:w-auto">
                  <button
                    onClick={() =>
                      setOpenFilterField((v) => (v === field ? null : field))
                    }
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
                  >
                    {filterValues[field] === options[0]
                      ? label
                      : filterValues[field]}
                    <FiChevronDown size={16} />
                  </button>

                  {openFilterField === field && (
                    <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFilterValues((prev) => ({
                              ...prev,
                              [field]: opt,
                            }));
                            setOpenFilterField(null);
                          }}
                          className={`flex w-full items-center px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                            filterValues[field] === opt
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
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-400">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 pr-4 font-medium ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-gray-50 transition hover:bg-gray-50/60"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 pr-4 ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalResults={showResultsCount ? filtered.length : undefined}
          perPage={pageSize}
        />
      )}
    </div>
  );
};

export default DataTable;

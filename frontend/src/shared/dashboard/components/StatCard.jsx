/**
 * Stat/metric card used across admin dashboard pages.
 *
 * @param {React.ReactNode} icon
 * @param {string} label
 * @param {string|number} value
 * @param {string} [delta] - Optional "+8%"-style change indicator.
 */
const StatCard = ({ icon, label, value, delta }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3DE] text-[#047B22]">
        {icon}
      </div>
      {delta && (
        <span className="flex items-center gap-1 rounded-full bg-[#EAF3DE] px-2.5 py-1 text-xs font-medium text-[#3B6D11]">
          ↗ {delta}
        </span>
      )}
    </div>
    <p className="mt-4 text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-[#202020]">{value}</p>
  </div>
);

export default StatCard;

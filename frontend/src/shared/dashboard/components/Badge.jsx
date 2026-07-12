/**
 * Generic pill badge. Pass a `styles` map of value -> tailwind classes,
 * e.g. { Delivered: "bg-green-50 text-green-700", Cancelled: "bg-red-50 text-red-700" }.
 * Falls back to a neutral gray style if the value isn't in the map.
 */
const Badge = ({
  value,
  styles = {},
  fallback = "bg-gray-100 text-gray-600",
}) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
      styles[value] || fallback
    }`}
  >
    {value}
  </span>
);

export default Badge;

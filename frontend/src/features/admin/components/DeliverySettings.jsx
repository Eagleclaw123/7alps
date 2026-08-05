import { useEffect, useState } from "react";
import { FiTruck } from "react-icons/fi";
import {
  getSettings,
  updateSettings,
} from "../../../shared/services/admin.service";

const DeliverySettings = () => {
  const [days, setDays] = useState("");
  const [savedDays, setSavedDays] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSettings()
      .then(({ data }) => {
        const value = data?.data?.settings?.expectedDeliveryDays;
        setDays(value !== undefined ? String(value) : "");
        setSavedDays(value ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const isDirty = days !== "" && String(savedDays ?? "") !== days;

  const handleSave = async () => {
    const value = Number(days);
    if (!Number.isInteger(value) || value < 1) {
      setMessage("Enter a whole number of at least 1 day.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const { data } = await updateSettings({ expectedDeliveryDays: value });
      const saved = data?.data?.settings?.expectedDeliveryDays;
      setSavedDays(saved);
      setDays(String(saved));
      setMessage("Saved — new orders will reflect this delivery window.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <FiTruck size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Delivery Settings</h3>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Set the expected delivery window shown to customers when they place
        an order.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <label
            className="text-sm text-gray-600"
            htmlFor="expectedDeliveryDays"
          >
            Expected delivery (days)
          </label>
          <input
            id="expectedDeliveryDays"
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="rounded-lg bg-[#16442C] px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {message ? (
            <span className="text-sm text-gray-500">{message}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DeliverySettings;

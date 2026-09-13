import { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import {
  getSettings,
  updateSettings,
} from "../../../shared/services/admin.service";

const CodSettings = () => {
  const [enabled, setEnabled] = useState(true);
  const [savedEnabled, setSavedEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSettings()
      .then(({ data }) => {
        const value = data?.data?.settings?.codEnabled !== false;
        setEnabled(value);
        setSavedEnabled(value);
      })
      .finally(() => setLoading(false));
  }, []);

  const isDirty = enabled !== savedEnabled;

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const { data } = await updateSettings({ codEnabled: enabled });
      const value = data?.data?.settings?.codEnabled !== false;
      setEnabled(value);
      setSavedEnabled(value);
      setMessage("Saved — checkout will reflect this immediately.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <FiDollarSign size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        When off, Cash on Delivery is hidden at checkout — customers can only
        pay online, and COD orders are also rejected server-side.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex w-fit cursor-pointer items-center gap-3">
            <span className="text-sm text-gray-700">
              Accept Cash on Delivery
            </span>
            <span
              onClick={() => setEnabled((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? "bg-[#16442C]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </span>
          </label>
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

export default CodSettings;

import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import {
  getSettings,
  updateSettings,
} from "../../../shared/services/admin.service";
import { INDIAN_STATES } from "../../../shared/data/indianStates";

const ServiceableStatesSettings = () => {
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [savedEnabled, setSavedEnabled] = useState(false);
  const [savedSelected, setSavedSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSettings()
      .then(({ data }) => {
        const settings = data?.data?.settings || {};
        setEnabled(Boolean(settings.serviceableStatesEnabled));
        setSelected(settings.serviceableStates || []);
        setSavedEnabled(Boolean(settings.serviceableStatesEnabled));
        setSavedSelected(settings.serviceableStates || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const isDirty =
    enabled !== savedEnabled ||
    selected.length !== savedSelected.length ||
    selected.some((s) => !savedSelected.includes(s));

  const toggleState = (state) => {
    setSelected((prev) =>
      prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev, state],
    );
  };

  const handleSave = async () => {
    if (enabled && selected.length === 0) {
      setMessage("Select at least one state before enabling this restriction.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const { data } = await updateSettings({
        serviceableStates: selected,
        serviceableStatesEnabled: enabled,
      });
      const settings = data?.data?.settings || {};
      setSavedEnabled(Boolean(settings.serviceableStatesEnabled));
      setSavedSelected(settings.serviceableStates || []);
      setEnabled(Boolean(settings.serviceableStatesEnabled));
      setSelected(settings.serviceableStates || []);
      setMessage("Saved — checkout will enforce this immediately.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <FiMapPin size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Serviceable States</h3>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Restrict orders to customers shipping to selected Indian states/UTs.
        When off, orders are accepted from anywhere.
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <>
          <label className="mb-4 flex w-fit cursor-pointer items-center gap-3">
            <span className="text-sm text-gray-700">
              Restrict orders to selected states
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

          <div className="mb-4 grid max-h-64 grid-cols-2 gap-x-4 gap-y-2 overflow-y-auto rounded-lg border border-gray-100 p-3 sm:grid-cols-3 md:grid-cols-4">
            {INDIAN_STATES.map((state) => (
              <label
                key={state}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(state)}
                  onChange={() => toggleState(state)}
                  className="h-3.5 w-3.5 accent-[#16442C]"
                />
                {state}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="rounded-lg bg-[#16442C] px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <span className="text-sm text-gray-500">
              {selected.length} state{selected.length === 1 ? "" : "s"} selected
            </span>
            {message ? (
              <span className="text-sm text-gray-500">{message}</span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceableStatesSettings;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/slices/authSlice";

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

const CustomerProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const customer = useSelector(selectCustomer);

  // Populate the editable form once the customer loads (or changes)
  useEffect(() => {
    if (!customer) return;
    setProfile((prev) => ({
      ...prev,
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.mobile || "",
      addressLine1: customer.addressLine1 || "",
      addressLine2: customer.addressLine2 || "",
      city: customer.city || "",
      state: customer.state || "",
      pincode: customer.pincode || "",
    }));
  }, [customer]);

  const handleChange = ({ target: { name, value } }) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // TODO: replace with your actual update call, e.g.
      // await updateProfile(profile);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  if (!customer) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 my-30">
        <p className="text-sm text-[#6B6A63]">Loading your profile...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8 my-30">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E8E4DB] pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9C8F73]">
            Account
          </p>
          <h2 className="mt-1 text-4xl tracking-tight text-[#1A1A18]">
            My Profile
          </h2>
          <p className="mt-2 text-sm text-[#6B6A63]">
            Manage your personal details and delivery address.
          </p>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="border border-[#0F6B3E] px-5 py-2.5 text-sm font-medium text-[#0F6B3E] transition-colors hover:bg-[#0F6B3E] hover:text-white"
          >
            Edit Profile
          </button>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Identity card */}
        <div className="flex flex-col items-center gap-4 bg-white p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0F6B3E] font-serif text-2xl text-white">
            {initials}
          </div>
          <div>
            <p className="font-serif text-xl text-[#1A1A18]">
              {customer?.name || "Your Name"}
            </p>
            <p className="mt-1 text-sm text-[#6B6A63]">
              {customer?.email || "your@email.com"}
            </p>
          </div>
          <div className="w-full border-t border-[#F0EEE7] pt-4 text-sm text-[#6B6A63]">
            {customer?.mobile || "No phone number added"}
          </div>
        </div>

        {/* Details form */}
        <form
          onSubmit={handleSave}
          className="space-y-5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <h3 className="border-b border-[#F0EEE7] pb-4 text-lg font-medium text-[#1A1A18]">
            Personal Details
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">
                Full Name
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                placeholder="you@example.com"
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9C8F73]">
              Phone Number
            </label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="10-digit mobile number"
              className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63] sm:w-1/2"
            />
          </div>

          <h3 className="border-b border-[#F0EEE7] pb-4 pt-2 text-lg font-medium text-[#1A1A18]">
            Delivery Address
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9C8F73]">
              Address Line 1
            </label>
            <input
              name="addressLine1"
              value={profile.addressLine1}
              onChange={handleChange}
              disabled={!editing}
              placeholder="House no., street, area"
              className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9C8F73]">
              Address Line 2 (optional)
            </label>
            <input
              name="addressLine2"
              value={profile.addressLine2}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Landmark, apartment, etc."
              className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">City</label>
              <input
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!editing}
                placeholder="City"
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">
                State
              </label>
              <input
                name="state"
                value={profile.state}
                onChange={handleChange}
                disabled={!editing}
                placeholder="State"
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">
                Pincode
              </label>
              <input
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                disabled={!editing}
                placeholder="6-digit pincode"
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>
          </div>

          {editing ? (
            <div className="flex justify-end gap-3 border-t border-[#F0EEE7] pt-5">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-5 py-2.5 text-sm font-medium text-[#6B6A63] transition-colors hover:text-[#1A1A18]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#0F6B3E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d5c34] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default CustomerProfile;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { selectCustomer, setCustomer } from "../../../store/slices/authSlice";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

import {
  updateCustomerProfile,
  updateCustomerAddresses,
} from "../../../shared/services/customer.service";
import AddressMapPicker from "../../../shared/components/map/AddressMapPicker";
import HeroBanner from "../../../shared/components/ui/HeroBanner";

const initialProfile = {
  name: "",
  email: "",
};

const emptyAddressForm = {
  label: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  isDefault: false,
};

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);

  const [profile, setProfile] = useState(initialProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [addressForm, setAddressForm] = useState(emptyAddressForm);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null); // null = closed, -1 = new, N = editing index N
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    if (!customer) return;
    setProfile({ name: customer.name || "", email: customer.email || "" });
  }, [customer]);

  const handleProfileChange = ({ target: { name, value } }) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileError("");

    if (!profile.name.trim()) {
      setProfileError("Name is required.");
      return;
    }

    try {
      setSavingProfile(true);
      const { data } = await updateCustomerProfile(profile);
      dispatch(setCustomer(data.data.customer));
      setEditingProfile(false);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Unable to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const addresses = customer?.addresses || [];

  const openNewAddressForm = () => {
    setAddressForm(emptyAddressForm);
    setEditingAddressIndex(-1);
    setAddressError("");
  };

  const openEditAddressForm = (index) => {
    setAddressForm({ ...emptyAddressForm, ...addresses[index] });
    setEditingAddressIndex(index);
    setAddressError("");
  };

  const closeAddressForm = () => {
    setEditingAddressIndex(null);
    setAddressForm(emptyAddressForm);
    setAddressError("");
  };

  const handleAddressFieldChange = ({
    target: { name, value, type, checked },
  }) => {
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMapAddressChange = (parsed) => {
    setAddressForm((prev) => ({
      ...prev,
      line1: parsed.line1 || prev.line1,
      city: parsed.city || prev.city,
      state: parsed.state || prev.state,
      pincode: parsed.pincode || prev.pincode,
    }));
  };

  const persistAddresses = async (nextAddresses) => {
    const { data } = await updateCustomerAddresses(nextAddresses);
    dispatch(setCustomer(data.data.customer));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setAddressError("");

    if (
      !addressForm.line1.trim() ||
      !addressForm.city.trim() ||
      !addressForm.state.trim() ||
      !addressForm.pincode.trim()
    ) {
      setAddressError("Address line 1, city, state, and pincode are required.");
      return;
    }
    if (!/^\d{6}$/.test(addressForm.pincode.trim())) {
      setAddressError("Enter a valid 6-digit pincode.");
      return;
    }

    let nextAddresses = [...addresses];

    if (addressForm.isDefault) {
      nextAddresses = nextAddresses.map((a) => ({ ...a, isDefault: false }));
    }

    if (editingAddressIndex === -1) {
      nextAddresses.push(addressForm);
    } else {
      nextAddresses[editingAddressIndex] = addressForm;
    }

    try {
      setSavingAddress(true);
      await persistAddresses(nextAddresses);
      closeAddressForm();
    } catch (err) {
      setAddressError(err.response?.data?.message || "Unable to save address.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (index) => {
    const nextAddresses = addresses.filter((_, i) => i !== index);
    await persistAddresses(nextAddresses);
  };

  const handleSetDefault = async (index) => {
    const nextAddresses = addresses.map((a, i) => ({
      ...a,
      isDefault: i === index,
    }));
    await persistAddresses(nextAddresses);
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
    <>
      {" "}
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <HeroBanner
        eyebrow="Profile"
        title="Your Profile"
        description="Manage your details, preferences, and saved addresses."
        image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
      />
      <section className="mx-auto max-w-7xl space-y-8 py-10 px-6 xl:px-0">
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

          {/* Personal Details */}
          <form
            onSubmit={handleSaveProfile}
            className="space-y-5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between border-b border-[#F0EEE7] pb-4">
              <h3 className="text-lg font-medium text-[#1A1A18]">
                Personal Details
              </h3>
              {!editingProfile ? (
                <button
                  type="button"
                  onClick={() => setEditingProfile(true)}
                  className="border border-[#0F6B3E] px-4 py-2 text-xs font-medium text-[#0F6B3E] transition-colors hover:bg-[#0F6B3E] hover:text-white"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9C8F73]">
                  Full Name
                </label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!editingProfile}
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
                  onChange={handleProfileChange}
                  disabled={!editingProfile}
                  placeholder="you@example.com"
                  className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9C8F73]">
                Phone Number
              </label>{" "}
              <input
                value={customer?.mobile || ""}
                disabled
                className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm text-[#1A1A18] outline-none transition-colors focus:border-[#0F6B3E] disabled:bg-[#FAF9F6] disabled:text-[#6B6A63]"
              />
            </div>

            {profileError ? (
              <p className="text-sm text-red-600">{profileError}</p>
            ) : null}

            {editingProfile ? (
              <div className="flex justify-end gap-3 border-t border-[#F0EEE7] pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProfile(false);
                    setProfile({
                      name: customer.name || "",
                      email: customer.email || "",
                    });
                    setProfileError("");
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-[#6B6A63] transition-colors hover:text-[#1A1A18]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-[#0F6B3E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d5c34] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : null}
          </form>
        </div>

        {/* Address book */}
        <div className="bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-[#F0EEE7] pb-4">
            <h3 className="text-lg font-medium text-[#1A1A18]">
              Delivery Addresses
            </h3>
            {editingAddressIndex === null ? (
              <button
                type="button"
                onClick={openNewAddressForm}
                className="flex items-center gap-2 bg-[#0F6B3E] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0d5c34]"
              >
                <FiPlus size={14} />
                Add Address
              </button>
            ) : null}
          </div>

          {addresses.length === 0 && editingAddressIndex === null ? (
            <p className="py-8 text-center text-sm text-[#6B6A63]">
              No saved addresses yet. Add one to speed up checkout.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {addresses.map((addr, index) => (
                <div
                  key={`${addr.label}-${index}`}
                  className="space-y-2 border border-[#E8E4DB] p-4 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#1A1A18]">
                      {addr.label}
                    </span>
                    {addr.isDefault ? (
                      <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#3B6D11]">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDefault(index)}
                        className="text-xs font-medium text-[#0F6B3E] hover:underline"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                  <p className="text-[#6B6A63]">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}
                    <br />
                    {addr.city}, {addr.state} - {addr.pincode}
                    {addr.phone ? (
                      <>
                        <br />
                        Phone: {addr.phone}
                      </>
                    ) : null}
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => openEditAddressForm(index)}
                      className="flex items-center gap-1 text-xs font-medium text-[#0F6B3E] hover:underline"
                    >
                      <FiEdit2 size={12} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(index)}
                      className="flex items-center gap-1 text-xs font-medium text-red-500 hover:underline"
                    >
                      <FiTrash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editingAddressIndex !== null ? (
            <form
              onSubmit={handleSaveAddress}
              className="mt-5 space-y-4 border-t border-[#F0EEE7] pt-5"
            >
              <AddressMapPicker onAddressChange={handleMapAddressChange} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9C8F73]">
                    Label
                  </label>
                  <input
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressFieldChange}
                    placeholder="Home, Work, etc."
                    className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9C8F73]">
                    Phone (optional)
                  </label>
                  <input
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressFieldChange}
                    placeholder="10-digit mobile number"
                    className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9C8F73]">
                  Address Line 1
                </label>
                <input
                  name="line1"
                  value={addressForm.line1}
                  onChange={handleAddressFieldChange}
                  placeholder="House no., street, area"
                  className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9C8F73]">
                  Address Line 2 (optional)
                </label>
                <input
                  name="line2"
                  value={addressForm.line2}
                  onChange={handleAddressFieldChange}
                  placeholder="Landmark, apartment, etc."
                  className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9C8F73]">
                    City
                  </label>
                  <input
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressFieldChange}
                    className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9C8F73]">
                    State
                  </label>
                  <input
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressFieldChange}
                    className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9C8F73]">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressFieldChange}
                    maxLength={6}
                    className="w-full border border-[#E8E4DB] px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#1A1A18]">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressFieldChange}
                  className="accent-[#0F6B3E]"
                />
                Set as default address
              </label>

              {addressError ? (
                <p className="text-sm text-red-600">{addressError}</p>
              ) : null}

              <div className="flex justify-end gap-3 border-t border-[#F0EEE7] pt-4">
                <button
                  type="button"
                  onClick={closeAddressForm}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#6B6A63] transition-colors hover:text-[#1A1A18]"
                >
                  <FiX size={14} />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex items-center gap-2 bg-[#0F6B3E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d5c34] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiCheck size={14} />
                  {savingAddress ? "Saving..." : "Save Address"}
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default CustomerProfile;

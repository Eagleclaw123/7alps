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

/**
 * DESIGN TOKENS (make sure these exist wherever the rest of the app
 * pulls its type scale from — tailwind.config.js or an @font-face block):
 *
 *   font-serif  -> "Fraunces", serif      (display / names / section titles)
 *   font-sans   -> "Inter", sans-serif    (body / inputs / buttons)
 *
 * Google Fonts import, if not already present:
 *   <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
 *
 * Palette used throughout:
 *   canvas  #FBF8F2   ink     #201F1B   forest      #16442C
 *   forest-deep #0E3220   clay #B4652F   sage #EEF1E6
 *   stone   #86806F   line    #E3DFD2
 */

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

/* Dashed "perforation" strip used on address tags — the page's signature detail */
const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

/* Small tracked-out field label, apothecary-tag style */
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86806F]">
    {children}
  </label>
);

/* Underline input — replaces the boxed input with a label-style field */
const underlineInput =
  "w-full border-0 border-b border-[#E3DFD2] bg-transparent px-0 py-2 text-[15px] text-[#201F1B] outline-none transition-colors focus:border-[#16442C] disabled:text-[#86806F] placeholder:text-[#B8B2A0]";

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
        <p className="text-sm text-[#86806F]">Loading your profile...</p>
      </section>
    );
  }

  return (
    // <div className="bg-[#FBF8F2]">
    <div>
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <HeroBanner
        eyebrow="Profile"
        title="Your Profile"
        description="Manage your details, preferences, and saved addresses."
        image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
      />

      <section className="mx-auto max-w-7xl space-y-10 py-12 px-6 xl:px-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* ── Identity card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-5 border border-[#E3DFD2] bg-white p-8 text-center"
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#B4652F]/40">
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#16442C] font-seri text-2xl italic text-white">
                {initials}
              </div>
              <Leaf
                size={16}
                className="absolute -right-1 -top-1 rotate-45 text-[#B4652F]"
                fill="#B4652F"
              />
            </div>

            <div>
              <p className="font-medium text-xl text-[#201F1B]">
                {customer?.name || "Your Name"}
              </p>
              <p className="mt-1 text-sm text-[#86806F]">
                {customer?.email || "your@email.com"}
              </p>
            </div>

            <div className="w-full pt-2">
              <Perforation />
              <p className="pt-4 text-sm tracking-wide text-[#201F1B]">
                {customer?.mobile || "No phone number added"}
              </p>
            </div>
          </motion.div>

          {/* ── Personal Details ──────────────────────────────────── */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onSubmit={handleSaveProfile}
            className="space-y-6 border border-[#E3DFD2] bg-white p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf size={16} className="text-[#16442C]" />
                <h3 className="font-medium text-xl text-[#201F1B] ">
                  Personal Details
                </h3>
              </div>
              {!editingProfile ? (
                <button
                  type="button"
                  onClick={() => setEditingProfile(true)}
                  className="rounded-full border border-[#16442C] whitespace-nowrap px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#16442C] transition-colors hover:bg-[#16442C] hover:text-white"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>
            <Perforation />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel>Full Name</FieldLabel>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!editingProfile}
                  placeholder="e.g. Priya Sharma"
                  className={underlineInput}
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Email</FieldLabel>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!editingProfile}
                  placeholder="you@example.com"
                  className={underlineInput}
                />
              </div>
            </div>

            <div className="max-w-xs space-y-1.5">
              <FieldLabel>Phone Number</FieldLabel>
              <input
                value={customer?.mobile || ""}
                disabled
                className={underlineInput}
              />
            </div>

            {profileError ? (
              <p className="text-sm text-red-600">{profileError}</p>
            ) : null}

            {editingProfile ? (
              <div className="flex justify-end gap-3 pt-2">
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
                  className="px-5 py-2.5 text-sm font-medium text-[#86806F] transition-colors hover:text-[#201F1B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-[#16442C] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0E3220] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : null}
          </motion.form>
        </div>

        {/* ── Address book ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-[#E3DFD2] bg-white p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-[#16442C]" />
              <h3 className="font-medium text-xl text-[#201F1B]">
                Delivery Addresses
              </h3>
            </div>
            {editingAddressIndex === null ? (
              <button
                type="button"
                onClick={openNewAddressForm}
                className="flex items-center gap-2 rounded-full bg-[#16442C] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0E3220]"
              >
                <FiPlus size={14} />
                Add Address
              </button>
            ) : null}
          </div>
          <div className="pt-4">
            <Perforation />
          </div>

          {addresses.length === 0 && editingAddressIndex === null ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Leaf size={20} className="text-[#B8B2A0]" />
              <p className="text-sm text-[#86806F]">
                No saved addresses yet. Add one to speed up checkout.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {addresses.map((addr, index) => (
                <div
                  key={`${addr.label}-${index}`}
                  className="relative border border-[#E3DFD2] bg-[#FBF8F2]/60"
                >
                  <Perforation />
                  <div className="space-y-2.5 p-5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-serif text-base text-[#201F1B]">
                        <Leaf size={13} className="text-[#16442C]" />
                        {addr.label}
                      </span>
                      {addr.isDefault ? (
                        <span className="rounded-full bg-[#B4652F]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#B4652F]">
                          Default
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(index)}
                          className="text-[11px] font-semibold uppercase tracking-wide text-[#16442C] hover:underline"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                    <p className="leading-relaxed text-[#5B564A]">
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
                    <div className="flex gap-4 pt-1.5">
                      <button
                        type="button"
                        onClick={() => openEditAddressForm(index)}
                        className="flex items-center gap-1 text-xs font-medium text-[#16442C] hover:underline"
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
                </div>
              ))}
            </div>
          )}

          {editingAddressIndex !== null ? (
            <form
              onSubmit={handleSaveAddress}
              className="mt-6 space-y-5 border-t border-[#E3DFD2] pt-6"
            >
              <AddressMapPicker onAddressChange={handleMapAddressChange} />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>Label</FieldLabel>
                  <input
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressFieldChange}
                    placeholder="Home, Work, etc."
                    className={underlineInput}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Phone (optional)</FieldLabel>
                  <input
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressFieldChange}
                    placeholder="10-digit mobile number"
                    className={underlineInput}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Address Line 1</FieldLabel>
                <input
                  name="line1"
                  value={addressForm.line1}
                  onChange={handleAddressFieldChange}
                  placeholder="House no., street, area"
                  className={underlineInput}
                />
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Address Line 2 (optional)</FieldLabel>
                <input
                  name="line2"
                  value={addressForm.line2}
                  onChange={handleAddressFieldChange}
                  placeholder="Landmark, apartment, etc."
                  className={underlineInput}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <FieldLabel>City</FieldLabel>
                  <input
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressFieldChange}
                    className={underlineInput}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>State</FieldLabel>
                  <input
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressFieldChange}
                    className={underlineInput}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Pincode</FieldLabel>
                  <input
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressFieldChange}
                    maxLength={6}
                    className={underlineInput}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#201F1B]">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressFieldChange}
                  className="accent-[#16442C]"
                />
                Set as default address
              </label>

              {addressError ? (
                <p className="text-sm text-red-600">{addressError}</p>
              ) : null}

              <div className="flex justify-end gap-3 border-t border-[#E3DFD2] pt-5">
                <button
                  type="button"
                  onClick={closeAddressForm}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#86806F] transition-colors hover:text-[#201F1B]"
                >
                  <FiX size={14} />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex items-center gap-2 bg-[#16442C] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0E3220] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiCheck size={14} />
                  {savingAddress ? "Saving..." : "Save Address"}
                </button>
              </div>
            </form>
          ) : null}
        </motion.div>
      </section>
    </div>
  );
};

export default CustomerProfile;

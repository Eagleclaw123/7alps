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

const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86806F]">
    {children}
  </label>
);

/* Small inline error message shown under a field */
const FieldError = ({ children }) =>
  children ? <p className="pt-1 text-xs text-red-600">{children}</p> : null;

const underlineInput =
  "w-full border-0 border-b border-[#E3DFD2] bg-transparent px-0 py-2 text-[15px] text-[#201F1B] outline-none transition-colors focus:border-[#16442C] disabled:text-[#86806F] placeholder:text-[#B8B2A0]";

// Adds a red bottom-border variant when a field has an error
const errorBorder = "border-b-red-500 focus:border-red-500";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);

  const [profile, setProfile] = useState(initialProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [profileFormError, setProfileFormError] = useState(""); // for server/API-level errors

  const [addressForm, setAddressForm] = useState(emptyAddressForm);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});
  const [addressFormError, setAddressFormError] = useState(""); // for server/API-level errors

  useEffect(() => {
    if (!customer) return;
    setProfile({ name: customer.name || "", email: customer.email || "" });
  }, [customer]);

  const handleProfileChange = ({ target: { name, value } }) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
    // clear the field's error as soon as the user edits it
    setProfileErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const validateProfile = () => {
    const errors = {};

    if (!profile.name.trim()) {
      errors.name = "Name is required.";
    }

    if (profile.email.trim() && !/^\S+@\S+\.\S+$/.test(profile.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    return errors;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileFormError("");

    const errors = validateProfile();
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setSavingProfile(true);
      const { data } = await updateCustomerProfile(profile);
      dispatch(setCustomer(data.data.customer));
      setEditingProfile(false);
    } catch (err) {
      setProfileFormError(
        err.response?.data?.message || "Unable to save profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const addresses = customer?.addresses || [];

  const openNewAddressForm = () => {
    setAddressForm(emptyAddressForm);
    setEditingAddressIndex(-1);
    setAddressErrors({});
    setAddressFormError("");
  };

  const openEditAddressForm = (index) => {
    setAddressForm({ ...emptyAddressForm, ...addresses[index] });
    setEditingAddressIndex(index);
    setAddressErrors({});
    setAddressFormError("");
  };

  const closeAddressForm = () => {
    setEditingAddressIndex(null);
    setAddressForm(emptyAddressForm);
    setAddressErrors({});
    setAddressFormError("");
  };

  const handleAddressFieldChange = ({
    target: { name, value, type, checked },
  }) => {
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // clear the field's error as soon as the user edits it
    setAddressErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const handleMapAddressChange = (parsed) => {
    setAddressForm((prev) => ({
      ...prev,
      line1: parsed.line1 || prev.line1,
      city: parsed.city || prev.city,
      state: parsed.state || prev.state,
      pincode: parsed.pincode || prev.pincode,
    }));
    setAddressErrors((prev) => ({
      ...prev,
      line1: "",
      city: "",
      state: "",
      pincode: "",
    }));
  };

  const persistAddresses = async (nextAddresses) => {
    const { data } = await updateCustomerAddresses(nextAddresses);
    dispatch(setCustomer(data.data.customer));
  };

  const validateAddress = () => {
    const errors = {};

    if (!addressForm.line1.trim()) errors.line1 = "Address line 1 is required.";
    if (!addressForm.city.trim()) errors.city = "City is required.";
    if (!addressForm.state.trim()) errors.state = "State is required.";

    if (!addressForm.pincode.trim()) {
      errors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(addressForm.pincode.trim())) {
      errors.pincode = "Enter a valid 6-digit pincode.";
    }

    if (
      addressForm.phone.trim() &&
      !/^\d{10}$/.test(addressForm.phone.trim())
    ) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }

    return errors;
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setAddressFormError("");

    const errors = validateAddress();
    setAddressErrors(errors);
    if (Object.keys(errors).length > 0) return;

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
      setAddressFormError(
        err.response?.data?.message || "Unable to save address.",
      );
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
    <div>
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
            noValidate
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
                  className={`${underlineInput} ${
                    profileErrors.name ? errorBorder : ""
                  }`}
                />
                <FieldError>{profileErrors.name}</FieldError>
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
                  className={`${underlineInput} ${
                    profileErrors.email ? errorBorder : ""
                  }`}
                />
                <FieldError>{profileErrors.email}</FieldError>
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

            {profileFormError ? (
              <p className="text-sm text-red-600">{profileFormError}</p>
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
                    setProfileErrors({});
                    setProfileFormError("");
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
              noValidate
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
                    className={`${underlineInput} ${
                      addressErrors.phone ? errorBorder : ""
                    }`}
                  />
                  <FieldError>{addressErrors.phone}</FieldError>
                </div>
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Address Line 1</FieldLabel>
                <input
                  name="line1"
                  value={addressForm.line1}
                  onChange={handleAddressFieldChange}
                  placeholder="House no., street, area"
                  className={`${underlineInput} ${
                    addressErrors.line1 ? errorBorder : ""
                  }`}
                />
                <FieldError>{addressErrors.line1}</FieldError>
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
                    className={`${underlineInput} ${
                      addressErrors.city ? errorBorder : ""
                    }`}
                  />
                  <FieldError>{addressErrors.city}</FieldError>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>State</FieldLabel>
                  <input
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressFieldChange}
                    className={`${underlineInput} ${
                      addressErrors.state ? errorBorder : ""
                    }`}
                  />
                  <FieldError>{addressErrors.state}</FieldError>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Pincode</FieldLabel>
                  <input
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressFieldChange}
                    maxLength={6}
                    className={`${underlineInput} ${
                      addressErrors.pincode ? errorBorder : ""
                    }`}
                  />
                  <FieldError>{addressErrors.pincode}</FieldError>
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

              {addressFormError ? (
                <p className="text-sm text-red-600">{addressFormError}</p>
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

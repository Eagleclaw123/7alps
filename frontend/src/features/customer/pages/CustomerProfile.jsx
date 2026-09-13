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
import PageHero from "../../../shared/components/ui/PageHero";

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
      <section className="text-center max-w-7xl px-4 py-2 sm:px-6 lg:px-8 my-30">
        <p className="text-sm text-[#86806F]">Loading your profile...</p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
      {/* ─────────────────────────────────────────────
        PROFILE HERO
    ───────────────────────────────────────────── */}
      <PageHero
        eyebrow="Your account"
        title="Your"
        titleHighlight="profile."
        description="Manage your personal details, addresses, and account preferences."
        backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        imageAlt="7ALP profile"
        leftLabel="7ALP's / Profile"
        rightLabel="Personal / Delivery"
      />
      {/* ─────────────────────────────────────────────
        ACCOUNT AREA
    ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:py-28 xl:px-16">
        {/* Overview */}
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          {/* Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden bg-[#211B17] p-8 text-[#F4EDE2] md:p-10"
          >
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#91847A]">
              Account
            </span>

            {/* Initials */}
            <div className="mt-14 flex h-24 w-24 items-center justify-center border border-[#C56B4E]/50">
              <span className="font-manrope text-3xl font-medium tracking-[-0.06em] text-[#F4EDE2]">
                {initials}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="font-manrope text-2xl font-medium tracking-[-0.04em]">
                {customer?.name || "Your Name"}
              </h2>

              <p className="mt-2 font-manrope text-sm text-white/50">
                {customer?.email || "your@email.com"}
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                Registered phone
              </span>

              <p className="mt-2 font-manrope text-sm text-white/75">
                {customer?.mobile || "No phone number added"}
              </p>
            </div>

            <div className="absolute bottom-7 right-7 font-ibm-mono text-[8px] text-white/20">
              7ALP / 01
            </div>
          </motion.div>

          {/* Personal Details */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            onSubmit={handleSaveProfile}
            noValidate
            className="bg-white p-8 md:p-10"
          >
            <div className="flex items-start justify-between border-b border-[#D8CCC0] pb-7">
              <div>
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#C56B4E]">
                  Personal information
                </span>

                <h2 className="mt-3 font-manrope text-3xl font-medium tracking-[-0.055em]">
                  Your details.
                </h2>
              </div>

              {!editingProfile && (
                <button
                  type="button"
                  onClick={() => setEditingProfile(true)}
                  className="border border-[#211B17] px-5 py-2.5 font-manrope text-xs font-medium transition-colors hover:bg-[#211B17] hover:text-[#F4EDE2]"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <FieldLabel>Full Name</FieldLabel>

                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!editingProfile}
                  placeholder="Your name"
                  className={`${underlineInput} ${
                    profileErrors.name ? errorBorder : ""
                  }`}
                />

                <FieldError>{profileErrors.name}</FieldError>
              </div>

              <div>
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

              <div>
                <FieldLabel>Phone Number</FieldLabel>

                <input
                  value={customer?.mobile || ""}
                  disabled
                  className={underlineInput}
                />
              </div>
            </div>

            {profileFormError && (
              <p className="mt-7 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                {profileFormError}
              </p>
            )}

            {editingProfile && (
              <div className="mt-10 flex justify-end gap-3 border-t border-[#D8CCC0] pt-7">
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
                  className="px-5 py-2.5 font-manrope text-sm text-[#756A62] hover:text-[#211B17]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-[#211B17] px-7 py-3 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save changes"}
                </button>
              </div>
            )}
          </motion.form>
        </div>

        {/* ─────────────────────────────────────────────
          ADDRESS BOOK
      ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20"
        >
          <div className="flex flex-col gap-6  pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#C56B4E]">
                Delivery
              </span>

              <h2 className="mt-3 font-manrope text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.9] tracking-[-0.07em]">
                Your
                <br />
                <span className="font-normal text-[#91847A]">addresses.</span>
              </h2>
            </div>

            {editingAddressIndex === null && (
              <button
                type="button"
                onClick={openNewAddressForm}
                className="flex items-center justify-center gap-3 bg-[#211B17] px-6 py-3.5 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E]"
              >
                <FiPlus size={15} />
                Add address
              </button>
            )}
          </div>

          {/* Empty */}
          {addresses.length === 0 && editingAddressIndex === null ? (
            <div className="py-20">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                Address book / Empty
              </span>

              <p className="mt-4 max-w-md font-manrope text-lg leading-7 text-[#756A62]">
                No saved addresses yet. Add one to make your next checkout
                quicker.
              </p>
            </div>
          ) : (
            <div className="mt-10 border-t border-[#CFC2B5]">
              {addresses.map((addr, index) => (
                <div
                  key={`${addr.label}-${index}`}
                  className="relative border-b border-[#CFC2B5] py-8 md:py-10"
                >
                  <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                    {/* Address */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
                          {addr.label}
                        </span>

                        {addr.isDefault && (
                          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#756A62]">
                            / Default
                          </span>
                        )}
                      </div>

                      <p className="mt-5 max-w-2xl font-manrope text-base leading-7 text-[#211B17]">
                        {addr.line1}
                        {addr.line2 ? `, ${addr.line2}` : ""}
                        <br />
                        {addr.city}, {addr.state} - {addr.pincode}
                        {addr.phone && (
                          <>
                            <br />
                            <span className="text-[#756A62]">{addr.phone}</span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(index)}
                          className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-[#756A62] transition-colors hover:text-[#C56B4E]"
                        >
                          Set default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => openEditAddressForm(index)}
                        className="flex items-center gap-2 font-manrope text-xs font-medium text-[#211B17] hover:text-[#C56B4E]"
                      >
                        <FiEdit2 size={13} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(index)}
                        className="flex items-center gap-2 font-manrope text-xs font-medium text-red-500"
                      >
                        <FiTrash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <span className="absolute bottom-8 right-0 font-ibm-mono text-[8px] text-[#B8ACA1]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ─────────────────────────────────────────────
            ADDRESS EDITOR
        ───────────────────────────────────────────── */}
          {editingAddressIndex !== null && (
            <form
              onSubmit={handleSaveAddress}
              noValidate
              className="mt-10 bg-white p-7 md:p-10"
            >
              <div className="flex items-start justify-between border-b border-[#D8CCC0] pb-7">
                <div>
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#C56B4E]">
                    {editingAddressIndex === -1
                      ? "New address"
                      : "Edit address"}
                  </span>

                  <h3 className="mt-3 font-manrope text-2xl font-medium tracking-[-0.05em]">
                    Delivery details.
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeAddressForm}
                  className="flex h-9 w-9 items-center justify-center border border-[#D8CCC0] text-[#756A62] hover:border-[#211B17] hover:text-[#211B17]"
                >
                  <FiX size={15} />
                </button>
              </div>

              <div className="mt-8">
                <AddressMapPicker onAddressChange={handleMapAddressChange} />
              </div>

              <div className="mt-10 grid gap-7 sm:grid-cols-2">
                <div>
                  <FieldLabel>Label</FieldLabel>
                  <input
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressFieldChange}
                    placeholder="Home, Work, etc."
                    className={underlineInput}
                  />
                </div>

                <div>
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

                <div className="sm:col-span-2">
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

                <div className="sm:col-span-2">
                  <FieldLabel>Address Line 2 (optional)</FieldLabel>

                  <input
                    name="line2"
                    value={addressForm.line2}
                    onChange={handleAddressFieldChange}
                    placeholder="Landmark, apartment, etc."
                    className={underlineInput}
                  />
                </div>

                <div>
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

                <div>
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

                <div>
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

              <label className="mt-8 flex cursor-pointer items-center gap-3 font-manrope text-sm text-[#514740]">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressFieldChange}
                  className="accent-[#C56B4E]"
                />
                Set as default address
              </label>

              {addressFormError && (
                <p className="mt-6 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {addressFormError}
                </p>
              )}

              <div className="mt-10 flex justify-end gap-3 border-t border-[#D8CCC0] pt-7">
                <button
                  type="button"
                  onClick={closeAddressForm}
                  className="px-5 py-3 font-manrope text-sm text-[#756A62] hover:text-[#211B17]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex items-center gap-3 bg-[#211B17] px-7 py-3 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiCheck size={14} />

                  {savingAddress ? "Saving..." : "Save address"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default CustomerProfile;

import { useState } from "react";
import { FiPhone, FiMail, FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { createSupportTicket } from "../../services/b2b.service";

// Matches the dashboard's theme:
// - Gradient: from-[#0F6B3E] to-[#1A8F55]
// - White cards, gray-200 borders, rounded-2xl

const ContactSupportModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createSupportTicket(form);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ subject: "", message: "" });
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Couldn't send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const channels = [
    {
      icon: FiPhone,
      label: "Call us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: FiMail,
      label: "Email us",
      value: "support@7alps.com",
      href: "mailto:support@7alps.com",
    },
    {
      icon: FiMessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/919876543210",
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Contact support
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              We usually reply within a few hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Channel options */}
        <div className="px-6 grid grid-cols-3 gap-3">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-center"
            >
              <span className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-800">
                <Icon size={18} />
              </span>
              <span className="text-xs font-medium text-gray-900">{label}</span>
              <span className="text-[11px] text-gray-500 leading-tight">
                {value}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-6 my-5">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or send a message</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Message form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Issue with my recent order"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe what you need help with..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={sent || submitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 disabled:opacity-70 text-white text-sm font-medium py-2.5 transition-colors"
          >
            {sent ? (
              "Message sent"
            ) : submitting ? (
              "Sending..."
            ) : (
              <>
                <FiSend size={15} />
                Send message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupportModal;

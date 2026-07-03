import { useState } from "react";
import { FiX } from "react-icons/fi";

const ProductTagInput = ({ tags, onAddTag, onRemoveTag }) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = (rawValue) => {
    const value = rawValue.trim();
    if (!value) return;
    onAddTag(value);
    setTagInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
    } else if (event.key === "Backspace" && !tagInput && tags.length) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-lg border border-gray-300 px-2 py-2 focus-within:border-[#0F6B3E]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-[#0F6B3E]/10 px-2.5 py-1 text-xs font-medium text-[#0F6B3E]"
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="rounded-full p-0.5 hover:bg-[#0F6B3E]/20"
            aria-label={`Remove tag ${tag}`}
          >
            <FiX size={12} />
          </button>
        </span>
      ))}
      <input
        value={tagInput}
        onChange={(event) => setTagInput(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(tagInput)}
        placeholder={tags.length ? "" : "Type a tag and press Enter"}
        className="min-w-[120px] flex-1 border-none text-sm outline-none"
      />
    </div>
  );
};

export default ProductTagInput;

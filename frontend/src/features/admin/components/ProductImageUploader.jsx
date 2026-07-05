import { useRef, useState } from "react";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";

const ProductImageUploader = ({
  images,
  onFilesAdded,
  onRemoveImage,
  existingImages,
  editingProductId,
  getImageUrl,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileInputChange = (event) => {
    onFilesAdded(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    onFilesAdded(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowseClick();
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Add Images
      </label>

      <div
        onClick={handleBrowseClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={`flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 text-center transition-colors ${
          isDraggingOver
            ? "border-[#0F6B3E] bg-[#0F6B3E]/5"
            : "border-gray-300 bg-gray-50 hover:border-[#0F6B3E]/60"
        }`}
      >
        <FiUploadCloud className="mb-3 h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-500">
          Drop your files here, or{" "}
          <span className="font-medium text-[#0F6B3E]">Browse</span>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {editingProductId && existingImages?.length && !images.length ? (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-gray-500">
            Current images. Add new images above to replace all of them.
          </p>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((url) => (
              <img
                key={url}
                src={getImageUrl(url)}
                alt="Current product"
                className="h-14 w-14 flex-shrink-0 rounded-md border border-gray-200 object-cover"
              />
            ))}
          </div>
        </div>
      ) : null}

      {images.length ? (
        <ul className="mt-3 space-y-2">
          {images.map((img) => (
            <li
              key={img.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-2"
            >
              <img
                src={img.preview}
                alt={img.file.name}
                className="h-11 w-11 flex-shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-700">
                  {img.file.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(img.file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveImage(img.id)}
                className="flex-shrink-0 rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                aria-label={`Remove ${img.file.name}`}
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      ) : !editingProductId ? (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <FiImage />
          No images added yet
        </div>
      ) : null}
    </div>
  );
};

export default ProductImageUploader;

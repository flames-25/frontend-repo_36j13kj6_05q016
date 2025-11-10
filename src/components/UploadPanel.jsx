import { useState } from 'react';
import { ImagePlus, Filter, Loader2 } from 'lucide-react';

export default function UploadPanel({ onUpload, onFilterChange, uploading }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onUpload({ file, caption, is_public: isPublic });
    setCaption("");
    setFile(null);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div className="col-span-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Choose image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black"
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Caption</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Say something about this photo"
            className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="col-span-1 flex items-end justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            Public
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-gray-200 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" /> All
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center gap-2 h-10 px-3 rounded-md bg-gray-900 text-white text-sm hover:bg-black disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

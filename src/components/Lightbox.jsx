import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>
      <div className="max-w-4xl w-full">
        <img src={photo.image_url} alt={photo.caption || 'photo'} className="w-full rounded-lg" />
        {photo.caption && (
          <p className="mt-3 text-center text-white/90 text-sm">{photo.caption}</p>
        )}
      </div>
    </div>
  );
}

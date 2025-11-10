export default function PhotoGrid({ photos, onOpen }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
      {photos.map((p) => (
        <button
          key={p._id || p.id}
          onClick={() => onOpen?.(p)}
          className="relative group aspect-square overflow-hidden rounded-md bg-gray-100"
        >
          <img
            src={p.image_url}
            alt={p.caption || 'photo'}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          {p.caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-[11px] text-white/90 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              {p.caption}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

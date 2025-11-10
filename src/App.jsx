import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadPanel from './components/UploadPanel';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [active, setActive] = useState(null);

  const isPublicView = useMemo(() => {
    const url = new URL(window.location.href);
    return url.pathname.startsWith('/u/');
  }, []);

  const profileSlug = useMemo(() => {
    const url = new URL(window.location.href);
    if (url.pathname.startsWith('/u/')) return url.pathname.replace('/u/', '');
    return user?.link || '';
  }, [user]);

  const publicLink = profileSlug ? `${window.location.origin}/u/${profileSlug}` : '';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bootstrap${isPublicView ? `?link=${profileSlug}` : ''}`);
        const data = await res.json();
        if (!isPublicView) setUser(data.user || null);
        setPhotos(data.photos || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [isPublicView, profileSlug]);

  const handleUpload = async ({ file, caption, is_public }) => {
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append('file', file);
      form.append('caption', caption || '');
      form.append('is_public', String(!!is_public));
      const res = await fetch(`${API_BASE}/api/photos/upload`, { method: 'POST', body: form });
      const data = await res.json();
      if (data.photo) setPhotos((p) => [data.photo, ...p]);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const visible = useMemo(() => {
    if (filter === 'all') return photos;
    if (filter === 'public') return photos.filter((p) => p.is_public);
    if (filter === 'private') return photos.filter((p) => !p.is_public);
    return photos;
  }, [photos, filter]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar username={user?.username} publicLink={publicLink} />
      <Hero />

      <main className="mx-auto max-w-6xl px-4 -mt-10 relative z-10">
        {!isPublicView && (
          <UploadPanel onUpload={handleUpload} onFilterChange={setFilter} uploading={uploading} />
        )}

        <div className="flex items-center justify-between mt-4">
          <h2 className="text-lg font-semibold">{isPublicView ? `${profileSlug}'s Gallery` : 'Your Gallery'}</h2>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-md ${filter==='all' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>All</button>
            <button onClick={() => setFilter('public')} className={`px-3 py-1.5 rounded-md ${filter==='public' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Public</button>
            <button onClick={() => setFilter('private')} className={`px-3 py-1.5 rounded-md ${filter==='private' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Private</button>
          </div>
        </div>

        <PhotoGrid photos={visible} onOpen={setActive} />
      </main>

      <Lightbox photo={active} onClose={() => setActive(null)} />
    </div>
  );
}

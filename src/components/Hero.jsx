import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
            Your holographic profile, reimagined
          </h1>
          <p className="mt-4 max-w-xl text-gray-600">
            Minimal, modern galleries with a single shareable link. Upload, curate, and publish your visual identity.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />
    </section>
  );
}

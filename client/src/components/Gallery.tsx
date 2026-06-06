import { useState } from "react";

const photos = Array.from({ length: 21 }, (_, index) => ({
  id: index + 1,
  src: `/assets/gallery/graffiti-${index + 1}.jpg`,
  title: `Archive ${index + 1}`,
}));

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="bg-[#050505] px-6 py-24 text-[#eae3d5]" id="gallery">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#3ddad7]">
          Manic Archive
        </p>
<h2 className="graffiti-title">
  graffiti works
</h2>
        <p className="mb-14 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
          A visual archive of Manic’s graffiti work, train photography, and
          street art identity — the raw language behind Upakut.
        </p>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.src)}
              className="group mb-5 block w-full overflow-hidden rounded-2xl border border-[#3ddad7]/20 bg-white/[0.03] transition duration-500 hover:border-[#3ddad7] hover:shadow-[0_0_25px_rgba(61,218,215,0.35)]"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 text-sm uppercase tracking-[0.3em] text-[#3ddad7]"
          >
            Close
          </button>

          <img
            src={selectedPhoto}
            alt="Selected graffiti artwork"
            className="max-h-[85vh] max-w-[95vw] rounded-2xl object-contain shadow-[0_0_40px_rgba(61,218,215,0.25)]"
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;
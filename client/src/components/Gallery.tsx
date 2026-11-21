import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

type ArchivePhoto = { id: number; src: string; title: string };

const photos: ArchivePhoto[] = Array.from({ length: 21 }, (_, index) => ({
  id: index + 1,
  src: `/assets/gallery/graffiti-${index + 1}.jpg`,
  title: `Archive ${String(index + 1).padStart(2, "0")}`,
}));

const loopIndex = (index: number) => (index + photos.length) % photos.length;

function Gallery() {
  const [active, setActive] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivePhoto | null>(null);
  const swipeStart = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const move = (direction: number) => setActive((current) => loopIndex(current + direction));

  useEffect(() => {
    if (!selectedPhoto) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [selectedPhoto]);

  const onSwipeEnd = (clientX: number) => {
    if (swipeStart.current === null) return;
    const travel = clientX - swipeStart.current;
    if (Math.abs(travel) > 40) {
      suppressClick.current = true;
      move(travel < 0 ? 1 : -1);
      window.setTimeout(() => { suppressClick.current = false; }, 80);
    }
    swipeStart.current = null;
  };

  return (
    <section className="manic-archive" id="gallery" aria-label="Manic Archive photo gallery">
      <div className="manic-archive__intro">
        <p className="manic-archive__eyebrow">Manic Archive / Visual history</p>
        <h2 className="graffiti-title manic-archive__title">graffiti works</h2>
        <p className="manic-archive__description">
          A visual archive of Manic’s graffiti work, train photography, and street art
          identity — the raw language behind Upakut.
        </p>
      </div>

      <div className="manic-archive__gallery">
        <div
          className="manic-archive__stage"
          role="group"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Manic's graffiti photographs. Use left and right arrow keys to navigate."
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button === 0) swipeStart.current = event.clientX;
          }}
          onPointerUp={(event) => onSwipeEnd(event.clientX)}
          onPointerCancel={() => { swipeStart.current = null; }}
        >
          {photos.map((photo, index) => {
            let offset = index - active;
            if (offset > photos.length / 2) offset -= photos.length;
            if (offset < -photos.length / 2) offset += photos.length;
            const distance = Math.abs(offset);
            const visible = distance <= 3;
            return (
              <button
                type="button"
                key={photo.id}
                className={`manic-archive__card${offset === 0 ? " is-active" : ""}`}
                style={{
                  "--offset": offset,
                  "--distance": distance,
                  "--z": 20 - distance,
                } as React.CSSProperties}
                aria-label={`${photo.title}${offset === 0 ? ", open full size" : ", show photo"}`}
                aria-hidden={!visible}
                tabIndex={visible ? 0 : -1}
                onClick={() => {
                  if (suppressClick.current) return;
                  if (offset === 0) setSelectedPhoto(photo);
                  else setActive(index);
                }}
              >
                <img src={photo.src} alt={`Manic graffiti photograph ${photo.id}`} loading={distance < 2 ? "eager" : "lazy"} draggable={false} />
                <span className="manic-archive__card-caption">{photo.title}</span>
              </button>
            );
          })}
        </div>

        <div className="manic-archive__controls">
          <button className="manic-archive__arrow" type="button" onClick={() => move(-1)} aria-label="Previous artwork">←</button>
          <div className="manic-archive__counter" aria-live="polite">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span className="manic-archive__counter-separator">/</span>
            <span>{String(photos.length).padStart(2, "0")}</span>
          </div>
          <button className="manic-archive__arrow" type="button" onClick={() => move(1)} aria-label="Next artwork">→</button>
        </div>
        <div className="manic-archive__track" aria-hidden="true">
          <span style={{ width: `${((active + 1) / photos.length) * 100}%` }} />
        </div>
        <p className="manic-archive__hint">DRAG / SWIPE / USE ARROWS · SELECT CENTER IMAGE TO EXPAND</p>
      </div>

      {selectedPhoto && (
        <div className="manic-archive__lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.title} onClick={() => setSelectedPhoto(null)}>
          <button ref={dialogCloseRef} type="button" className="manic-archive__lightbox-close" onClick={() => setSelectedPhoto(null)}>Close ×</button>
          <img src={selectedPhoto.src} alt={`Full-size Manic graffiti artwork ${selectedPhoto.id}`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

export default Gallery;

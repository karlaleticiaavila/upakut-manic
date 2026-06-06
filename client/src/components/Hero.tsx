function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 drop-shadow-[0_0_6px_#3ddad7]"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" fill="none" stroke="#3ddad7" strokeWidth="2" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="#3ddad7" strokeWidth="2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 drop-shadow-[0_0_6px_#3ddad7]"
      aria-hidden="true"
    >
      <path
        d="M3 4h2l1.5 9h10.8l1.7-6.2H7.1"
        fill="none"
        stroke="#3ddad7"
        strokeWidth="2"
      />
      <circle cx="10" cy="19" r="1.5" fill="#3ddad7" />
      <circle cx="17" cy="19" r="1.5" fill="#3ddad7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 drop-shadow-[0_0_6px_#3ddad7]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6" fill="none" stroke="#3ddad7" strokeWidth="2" />
      <line x1="16" y1="16" x2="21" y2="21" stroke="#3ddad7" strokeWidth="2" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/hero.png")' }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute left-6 right-6 top-5 z-10 grid grid-cols-[120px_1fr_120px] items-center">
        <div>
          <img
            src="/assets/logo.png"
            alt="Upakut logo"
            className="w-[70px] drop-shadow-[0_0_8px_#3ddad7]"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[2rem] font-bold tracking-[0.40em] text-white">
            UPAKUT
          </div>

          <div className="text-[0.9rem] tracking-[0.7em] text-white/70">
            AUTHENTIC STREET ART
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="cursor-pointer border-none bg-transparent transition hover:drop-shadow-[0_0_10px_#3ddad7]">
            <CartIcon />
          </button>

          <button className="cursor-pointer border-none bg-transparent transition hover:drop-shadow-[0_0_10px_#3ddad7]">
            <UserIcon />
          </button>

          <button className="cursor-pointer border-none bg-transparent transition hover:drop-shadow-[0_0_10px_#3ddad7]">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="absolute left-[100px] top-[85px] h-px w-[85%] bg-[#3ddad7] shadow-[0_0_12px_#3ddad7]" />

      <div className="absolute left-1/2 top-[58%] z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="mb-6 text-[1.5rem] font-bold tracking-[0.08em] text-white">
          REAL GRAFFITI. REAL ART.
          
        </div>

        <p className="mb-6 max-w-xl text-sm leading-7 text-white/70">
          From New Zealand to the world.
        </p>
        <a
          href="#products"
          className="inline-block cursor-pointer rounded-xl border-2 border-[#3ddad7] bg-black/40 px-[55px] py-[14px] text-white shadow-[0_0_10px_#3ddad7] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_#3ddad7]"
        >
          SHOP ONLINE
        </a>
      </div>
    </section>
  );
}

export default Hero;
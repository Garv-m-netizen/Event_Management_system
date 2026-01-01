function Hero() {
  return (
    <section className="h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-black text-white px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
        Experience Offline. Connect in Person.
      </h1>

      <p className="max-w-xl text-gray-400 mb-8">
        Connecting startups and investors through curated offline events and
        meaningful in-person interactions.
      </p>

      <button className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-md font-semibold">
        Browse Events
      </button>
    </section>
  );
}

export default Hero;

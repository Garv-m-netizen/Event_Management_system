import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />

      <section className="px-10 py-16">
        <h2 className="text-white text-2xl font-bold mb-8">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <EventCard
            title="Future Health Conf."
            date="July 23, 2025"
            location="Delhi"
          />
          <EventCard
            title="Urban Design Forum"
            date="Aug 15, 2025"
            location="Mumbai"
          />
          <EventCard
            title="Edutech Symposium"
            date="Sep 10, 2025"
            location="Bangalore"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;

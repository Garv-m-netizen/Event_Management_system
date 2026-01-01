function EventCard({ title, date, location }) {
  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md hover:scale-105 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{date}</p>
      <p className="text-gray-400 text-sm mb-4">{location}</p>

      <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded-md font-medium">
        Register
      </button>
    </div>
  );
}

export default EventCard;

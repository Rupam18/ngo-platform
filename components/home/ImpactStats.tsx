export default function ImpactStats() {
  const stats = [
    { number: "10,000+", label: "Children Helped" },
    { number: "500+", label: "Campaigns Completed" },
    { number: "₹25L+", label: "Donations Raised" },
    { number: "2,000+", label: "Volunteers" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                {stat.number}
              </h2>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

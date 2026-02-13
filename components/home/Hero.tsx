import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Empower Lives.
          <br />
          Support a Cause Today.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Join us in making a difference. Help fund education, healthcare,
          and environmental initiatives that create real impact.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="px-6 py-3 text-lg">
            Donate Now
          </Button>

          <Button variant="outline" className="px-6 py-3 text-lg">
            Become a Volunteer
          </Button>
        </div>
      </div>
    </section>
  );
}

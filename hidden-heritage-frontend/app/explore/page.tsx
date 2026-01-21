import Link from "next/link";

export default function ExplorePage() {
  return (
    <main className="px-10 py-16">
      <h2 className="text-3xl font-semibold mb-10 text-center">
        Discover Regions
      </h2>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src="/chambal.jpg"
          alt="Chambal Region"
          className="h-64 w-full object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">Chambal Region</h3>
          <p className="text-gray-600 mb-4">
            Ancient ravines, forgotten temples, and timeless heritage.
          </p>

          <Link
            href="/region/chambal"
            className="inline-block bg-[#c76a3a] text-white px-5 py-2 rounded-full hover:bg-[#b45c30]"
          >
            Explore Region
          </Link>
        </div>
      </div>
    </main>
  );
}

import dynamic from "next/dynamic";

const ChambalMap = dynamic(
  () => import("../../components/ChambalMap"),
  { ssr: false }
);

export default function ChambalRegionPage() {
  return (
    <main className="px-8 py-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chambal Region</h1>
        <p className="max-w-3xl mx-auto text-gray-600">
          The Chambal region is a land of mystery and forgotten heritage. Known
          for its dramatic ravines, ancient temples, and deep historical layers,
          Chambal offers a raw and authentic journey through time.
        </p>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto mb-16 text-gray-700 leading-relaxed">
        <p>
          Stretching across Madhya Pradesh, Rajasthan, and Uttar Pradesh, the
          Chambal has long been misunderstood as an inaccessible landscape.
          However, beneath its rugged terrain lies a treasure trove of cultural,
          architectural, and archaeological heritage — from the Bateshwar
          temple complex to prehistoric rock art and forgotten river routes.
        </p>
      </section>

      {/* Map placeholder */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Interactive Map
        </h2>

        <div className="h-[450px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
          Map loading...
        </div>
      </section>
    </main>
  );
}


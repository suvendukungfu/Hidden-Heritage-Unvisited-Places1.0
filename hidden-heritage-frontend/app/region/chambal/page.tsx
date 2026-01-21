import ChambalMapWrapper from "@/app/components/ChambalMapWrapper";
import HeritageSiteCard from "@/app/components/HeritageSiteCard";
import { chambalHeritageSites } from "./heritageData";

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
          architectural, and archaeological heritage.
        </p>
      </section>

      {/* Map */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Interactive Map
        </h2>
        <ChambalMapWrapper />
      </section>

      {/* Heritage Cards */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Heritage Sites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chambalHeritageSites.map((site) => (
            <HeritageSiteCard key={site.id} site={site} />
          ))}
        </div>
      </section>
    </main>
  );
}

import ChambalInteractiveSection from "./ChambalInteractiveSection";
import { heritageSites } from "./heritageData";

export default function ChambalRegionPage() {
  return (
    <main className="px-8 py-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chambal Region</h1>
        <p className="max-w-3xl mx-auto text-gray-600">
          The Chambal region is a land of mystery and forgotten heritage.
          Known for its dramatic ravines, ancient temples, and deep
          historical layers.
        </p>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto mb-16 text-gray-700 leading-relaxed">
        <p>
          Beneath the rugged terrain of the Chambal lies a treasure
          trove of cultural, architectural, and archaeological heritage —
          from ancient temples to prehistoric rock art.
        </p>
      </section>

      {/* Interactive Client Section */}
      <ChambalInteractiveSection sites={heritageSites} />
    </main>
  );
}

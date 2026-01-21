import ChambalInteractiveSection from "./ChambalInteractiveSection";
import { heritageSites } from "./heritageData";

export default function ChambalPage() {
  return (
    <main className="px-6 py-12">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Chambal Region
        </h1>
        <p className="text-gray-600">
          Discover the hidden temples, ravines, and forgotten
          heritage sites of the Chambal region through interactive
          maps, safety insights, and curated storytelling.
        </p>
      </section>

      {/* ✅ ONLY THIS COMPONENT GETS `sites` */}
      <ChambalInteractiveSection sites={heritageSites} />
    </main>
  );
}

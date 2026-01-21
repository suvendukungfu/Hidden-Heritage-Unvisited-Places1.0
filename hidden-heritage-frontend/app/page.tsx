export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="h-[85vh] flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/40 p-10 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f6efe6] mb-4">
            Explore India&apos;s <br /> Hidden Heritage
          </h1>

          <p className="text-[#e6d8c3] max-w-xl mb-6">
            Uncover ancient temples, mysterious ravines, and timeless rock art
            beyond the guidebooks.
          </p>

          <a
            href="/explore"
            className="bg-[#c76a3a] text-white px-6 py-3 rounded-full font-medium hover:bg-[#b45c30]"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </main>
  );
}

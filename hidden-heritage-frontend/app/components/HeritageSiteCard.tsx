type HeritageSite = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

export default function HeritageSiteCard({
  site,
}: {
  site: HeritageSite;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={site.image}
        alt={site.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="inline-block mb-2 text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
          {site.category}
        </span>

        <h3 className="text-lg font-semibold mb-2">{site.name}</h3>

        <p className="text-sm text-gray-600">{site.description}</p>
      </div>
    </div>
  );
}
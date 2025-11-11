import type { AnimeData } from "@/types/jikan";

export const AnimeStats = ({ data }: { data: AnimeData }) => {
  const stats = [
    {
      label: "Score",
      value: data.score ?? "N/A",
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
      sub: "text-blue-500",
    },
    {
      label: "Episodes",
      value: data.episodes ?? "N/A",
      color: "gray",
      bg: "bg-gray-50",
      text: "text-gray-700",
      sub: "text-gray-500",
    },
    {
      label: "Rank",
      value: data.rank ? `#${data.rank}` : "N/A",
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
      sub: "text-green-500",
    },
    {
      label: "Status",
      value:
        data.status === "Finished Airing" ? "Complete" : data.status ?? "N/A",
      color: "purple",
      bg: "bg-purple-50",
      text: "text-purple-600",
      sub: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`text-center p-3 ${stat.bg} rounded-xl shadow-md transition-shadow hover:shadow-lg`}
        >
          <p className={`text-2xl font-extrabold ${stat.text}`}>{stat.value}</p>
          <p
            className={`text-xs font-semibold ${stat.sub} uppercase tracking-wider mt-1`}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

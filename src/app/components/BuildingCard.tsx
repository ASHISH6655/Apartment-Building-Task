"use client";

interface Building {
  id: string;
  requestedTemperature: number;
}

export default function BuildingCard({
  building,
  onUpdated,
}: {
  building: Building;
  onUpdated: () => void;
}) {
  const updateTemp = async (newTemp: number) => {
    await fetch(
      `http://localhost:8080/api/buildings/${building.id}/requestedTemperature`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requested: newTemp }),
      }
    );
    onUpdated();
  };

  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-gray-200">
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-2 text-blue-700">
        🏢 Building
      </h1>

      {/* Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">ID:</span> {building.id}
        </p>
        <p className="text-lg mt-2">
          Requested Temperature:{" "}
          <span className="font-bold text-blue-600">
            {building.requestedTemperature}°C
          </span>
        </p>
      </div>

      {/* Temperature Buttons */}
      <div className="flex flex-wrap gap-3">
        {[18, 20, 22, 25, 28].map((t) => (
          <button
            key={t}
            onClick={() => updateTemp(t)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md 
              ${
                building.requestedTemperature === t
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
          >
            Set {t}°C
          </button>
        ))}
      </div>
    </div>
  );
}

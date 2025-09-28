"use client";

import { Trash2 } from "lucide-react";

interface Room {
  id: string;
  aptNumber?: string;
  ownerName?: string;
  commonType?: string;
  temperature: number;
  heatingEnabled: boolean;
  coolingEnabled: boolean;
}

export default function RoomCard({
  room,
  buildingId,
  onSuccess,
}: {
  room: Room;
  buildingId: string;
  onSuccess: () => void;
}) {
  const removeRoom = async () => {
    await fetch(
      `http://localhost:8080/api/buildings/${buildingId}/rooms/${room.id}`,
      {
        method: "DELETE",
      }
    );
    onSuccess();
  };

  return (
    <div className="relative p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Delete Button */}
      <button
        onClick={removeRoom}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={20} />
      </button>

      {/* Room Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {room.aptNumber
          ? `Apartment ${room.aptNumber} (${room.ownerName})`
          : `Common Room: ${room.commonType}`}
      </h3>

      {/* Temperature */}
      <p className="text-lg text-gray-600 mb-4">
        🌡️{" "}
        <span className="font-extrabold text-gray-900">
          {room.temperature}°C
        </span>
      </p>

      {/* Status Tags */}
      <div className="flex gap-2 flex-wrap">
        {room.heatingEnabled && (
          <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 font-medium shadow-sm">
            🔥 Heating
          </span>
        )}
        {room.coolingEnabled && (
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium shadow-sm">
            ❄️ Cooling
          </span>
        )}
        {!room.heatingEnabled && !room.coolingEnabled && (
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium shadow-sm">
            ✅ Stable
          </span>
        )}
      </div>
    </div>
  );
}

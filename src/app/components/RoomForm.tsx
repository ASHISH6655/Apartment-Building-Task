"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function RoomForm({
  buildingId,
  onSuccess,
}: {
  buildingId: string;
  onSuccess: () => void;
}) {
  const [kind, setKind] = useState("apartment");
  const [aptNumber, setAptNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [commonType, setCommonType] = useState("Gym");

  const addRoom = async () => {
    const body: any = { kind };

    if (kind === "apartment") {
      body.aptNumber = aptNumber;
      body.ownerName = ownerName;
    } else {
      body.commonType = commonType;
    }

    await fetch(`http://localhost:8080/api/buildings/${buildingId}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    onSuccess();
    setAptNumber("");
    setOwnerName("");
    setCommonType("Gym");
    setKind("apartment");
  };

  return (
    <div className="p-6 border rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition w-full max-w-md">
      {/* Header */}
      <h2 className="flex items-center text-xl font-bold text-gray-800 mb-4">
        <PlusCircle className="w-5 h-5 text-green-600 mr-2" />
        Add a New Room
      </h2>

      {/* Kind Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Room Type
        </label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="w-full border rounded-lg p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="apartment">Apartment</option>
          <option value="common">Common Room</option>
        </select>
      </div>

      {/* Apartment Inputs */}
      {kind === "apartment" && (
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Apartment Number
            </label>
            <input
              type="text"
              placeholder="e.g. 101"
              value={aptNumber}
              onChange={(e) => setAptNumber(e.target.value)}
              className="w-full border rounded-lg p-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full border rounded-lg p-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
      )}

      {/* Common Room Selector */}
      {kind === "common" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Common Room Type
          </label>
          <select
            value={commonType}
            onChange={(e) => setCommonType(e.target.value)}
            className="w-full border rounded-lg p-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="Gym">Gym</option>
            <option value="Library">Library</option>
            <option value="Laundry">Laundry</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={addRoom}
        className="w-full py-2 px-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
      >
        ➕ Add Room
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import RoomCard from "./components/RoomCard";
import RoomForm from "./components/RoomForm";
import BuildingCard from "./components/BuildingCard";

interface Room {
  id: string;
  aptNumber?: string;
  ownerName?: string;
  commonType?: string;
  temperature: number;
  heatingEnabled: boolean;
  coolingEnabled: boolean;
}

interface Building {
  id: string;
  requestedTemperature: number;
  rooms: Room[];
}

export default function HomePage() {
  const [buildingId, setBuildingId] = useState<string | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(true);

  // Step 1: fetch main building id
  useEffect(() => {
    fetch("http://localhost:8080/api/buildings/main")
      .then((res) => res.json())
      .then((data) => setBuildingId(data.id))
      .catch(console.error);
  }, []);

  // Step 2: fetch building details
  const fetchBuilding = () => {
    if (!buildingId) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/buildings/${buildingId}`)
      .then((res) => res.json())
      .then((data) => setBuilding(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (buildingId) fetchBuilding();
  }, [buildingId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!building) return <p className="p-6">No building found</p>;

  return (
    <div className="p-8 space-y-6">
      <BuildingCard building={building} onUpdated={fetchBuilding} />
      <RoomForm buildingId={building.id} onSuccess={fetchBuilding} />

      <h2 className="text-xl font-semibold mt-6">🏠 Rooms</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {building.rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            buildingId={building.id}
            onSuccess={fetchBuilding}
          />
        ))}
      </div>
    </div>
  );
}

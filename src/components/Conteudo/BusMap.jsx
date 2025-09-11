import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Corrige ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ---------------- EXEMPLO DE LOCALIZAÇÕES ----------------
const LOCATIONS = {
  TERMINAL: [-22.73, -47.32],
  JARDIM_BRASIL: [-22.743, -47.333],
  NOVO_MUNDO: [-22.7305, -47.325],
};

// ---------------- LINHAS DE ÔNIBUS ----------------
const BUS_LINES = {
  SOU: {
    "102": {
      name: "Jardim Brasil ↔ Novo Mundo",
      origin: "Jardim Brasil",
      destination: "Novo Mundo",
      coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.NOVO_MUNDO],
    },
    "103": {
      name: "Jardim Brasil ↔ Terminal",
      origin: "Jardim Brasil",
      destination: "Terminal Central",
      coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.TERMINAL],
    },
  },
  EMTU: {
    "651": {
      name: "Terminal ↔ Novo Mundo",
      origin: "Terminal Central",
      destination: "Novo Mundo",
      coordinates: [LOCATIONS.TERMINAL, LOCATIONS.NOVO_MUNDO],
    },
  },
};

// ---------------- COMPONENTE DE ROTEAMENTO ----------------
function Routing({ coords, setRouteInfo }) {
  const map = useMap();
  useEffect(() => {
    if (!coords || coords.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: coords.map((c) => L.latLng(c[0], c[1])),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];
      const summary = route.summary;
      setRouteInfo({
        distance: (summary.totalDistance / 1000).toFixed(2) + " km",
        duration: Math.round(summary.totalTime / 60) + " min",
      });
    });

    return () => map.removeControl(routingControl);
  }, [coords, map, setRouteInfo]);
  return null;
}

// ---------------- DROPDOWN DE LINHAS ----------------
function LineSelect({ busLines, selectedLine, setSelectedLine }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem", width: "100%" }}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Selecione uma linha:
      </label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer"
        >
          <span className="block truncate">
            {selectedLine
              ? `${selectedLine} - ${busLines[selectedLine].name}`
              : "Selecione uma linha"}
          </span>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto">
            {Object.keys(busLines).map((line) => (
              <div
                key={line}
                onClick={() => {
                  setSelectedLine(line);
                  setOpen(false);
                }}
                className="cursor-pointer py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
              >
                {line} - {busLines[line].name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- MAPA PRINCIPAL ----------------
export default function BusMap() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);

  const filteredLines = selectedCompany ? BUS_LINES[selectedCompany] : {};

  return (
    <div
      className="mt-4 md:mt-8 lg:mt-24"
      style={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        boxSizing: "border-box",
        marginBottom: "100px",
      }}
    >
      {/* WRAPPER flexível */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          maxWidth: "1400px",
          height: "100%",
          gap: "1rem",
        }}
        className="flex-col md:flex-row" // ← mobile em coluna, desktop em linha
      >
        {/* PAINEL (fica em cima no mobile) */}
        <div
          style={{
            flex: 1,
            padding: "1.5rem",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowY: "auto",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Mapa em tempo real</h2>
          <p className="mb-4 text-gray-700">
            Este mapa mostra a posição do ônibus em tempo real, indicando sua
            distância e tempo estimado até o destino.
          </p>

          {/* Empresa */}
          <div style={{ marginBottom: "1.5rem", width: "100%" }}>
            <label className="block text-sm font-medium">
              Selecione a empresa:
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setSelectedLine("");
              }}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer"
            >
              <option value="">Selecione a empresa</option>
              <option value="SOU">SOU</option>
              <option value="EMTU">EMTU</option>
            </select>
          </div>

          {/* Linha */}
          {selectedCompany && (
            <LineSelect
              busLines={filteredLines}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
            />
          )}

          {/* Info rota */}
          {selectedLine && (
            <div className="mt-6 border p-4 rounded bg-gray-50 w-full">
              <h3 className="font-bold mb-2">
                {selectedLine} - {filteredLines[selectedLine].name}
              </h3>
              <div>
                <strong>Origem:</strong> {filteredLines[selectedLine].origin}
              </div>
              <div>
                <strong>Destino:</strong> {filteredLines[selectedLine].destination}
              </div>
              {routeInfo && (
                <>
                  <div>
                    <strong>Distância:</strong> {routeInfo.distance}
                  </div>
                  <div>
                    <strong>Tempo estimado:</strong> {routeInfo.duration}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* MAPA (fica embaixo no mobile) */}
        <div
          style={{
            flex: 2,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#fff",
            minHeight: "300px",
          }}
        >
          <MapContainer
            center={[-22.73, -47.33]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
            />
            {selectedLine &&
              filteredLines[selectedLine].coordinates.map((pos, idx) => (
                <Marker key={idx} position={pos}>
                  <Popup>
                    {idx === 0
                      ? "Origem"
                      : idx === filteredLines[selectedLine].coordinates.length - 1
                      ? "Destino"
                      : "Parada"}
                  </Popup>
                </Marker>
              ))}
            {selectedLine && (
              <Routing
                coords={filteredLines[selectedLine].coordinates}
                setRouteInfo={setRouteInfo}
              />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

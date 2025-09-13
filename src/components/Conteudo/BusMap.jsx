import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import busImg from "../../assets/Imagens/bus.png"; 


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


const busIcon = new L.Icon({
  iconUrl: busImg,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});


const LOCATIONS = {
  TERMINAL: [-22.73, -47.32],
  JARDIM_BRASIL: [-22.743, -47.333],
  NOVO_MUNDO: [-22.7305, -47.325],
  ZANAGA: [-22.739, -47.31],
  ALABAMA: [-22.728, -47.34],
  BERTONI: [-22.736, -47.35],
  MATHIENSEN: [-22.726, -47.33],
  PRAIA_AZUL: [-22.715, -47.33],
  SBO_CENTRO: [-22.753, -47.414],
  CAMPINAS: [-22.91, -47.06],
  PIRACICABA: [-22.73, -47.64],
  LIMEIRA: [-22.56, -47.4],
  NOVA_ODESSA: [-22.78, -47.29],
  SUMARE: [-22.82, -47.27],
  HORTOLANDIA: [-22.86, -47.22],
  PAULINIA: [-22.76, -47.15],
  COSMOPOLIS: [-22.65, -47.20],
  CAPIVARI: [-22.99, -47.51],
  MONTE_MOR: [-22.95, -47.31],
  ELIAS_FAUSTO: [-23.04, -47.37],
  IRACEMAPOLIS: [-22.58, -47.52],
  CORDEIROPOLIS: [-22.47, -47.45],
  RIO_CLARO: [-22.41, -47.56],
};


const BUS_LINES = {
  SOU: {
    "102": { name: "Jardim Brasil ↔ Novo Mundo", origin: "Jardim Brasil", destination: "Novo Mundo", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.NOVO_MUNDO] },
    "103": { name: "Jardim Brasil ↔ Antônio Zanaga / Alabama", origin: "Jardim Brasil", destination: "Alabama", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.ZANAGA, LOCATIONS.ALABAMA] },
    "104": { name: "Bertini / Alabama / Mathiensen", origin: "Bertoni", destination: "Mathiensen", coordinates: [LOCATIONS.BERTONI, LOCATIONS.ALABAMA, LOCATIONS.MATHIENSEN] },
    "105": { name: "Bertini / Jardim Alvorada", origin: "Bertoni", destination: "Novo Mundo", coordinates: [LOCATIONS.BERTONI, LOCATIONS.NOVO_MUNDO] },
    "106": { name: "Jardim Bertoni / Terminal", origin: "Bertoni", destination: "Terminal", coordinates: [LOCATIONS.BERTONI, LOCATIONS.TERMINAL] },
    "107": { name: "São Roque / Parque das Nações / Bertoni", origin: "Novo Mundo", destination: "Bertoni", coordinates: [LOCATIONS.NOVO_MUNDO, LOCATIONS.BERTONI] },
    "108": { name: "Bertini / Cariobinha / Terminal", origin: "Bertoni", destination: "Terminal", coordinates: [LOCATIONS.BERTONI, LOCATIONS.TERMINAL] },
    "111": { name: "Sobrado Velho / Terminal via Cadeião", origin: "Novo Mundo", destination: "Terminal", coordinates: [LOCATIONS.NOVO_MUNDO, LOCATIONS.TERMINAL] },
    "112": { name: "Portal dos Nobres / Iate / Terminal", origin: "Jardim Brasil", destination: "Terminal", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.TERMINAL] },
    "114": { name: "Mathiesen / Antônio Zanaga", origin: "Mathiensen", destination: "Zanaga", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.ZANAGA] },
    "116": { name: "Morada do Sol / Terminal", origin: "Novo Mundo", destination: "Terminal", coordinates: [LOCATIONS.NOVO_MUNDO, LOCATIONS.TERMINAL] },
    "117": { name: "Mathiesen / Novo Mundo / Jardim Alvorada", origin: "Mathiensen", destination: "Novo Mundo", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.NOVO_MUNDO] },
    "118": { name: "Antônio Zanaga / Novo Mundo", origin: "Zanaga", destination: "Novo Mundo", coordinates: [LOCATIONS.ZANAGA, LOCATIONS.NOVO_MUNDO] },
    "119": { name: "Parque Liberdade / Praia dos Namorados / Jardim Asta", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "200": { name: "Jardim Brasília / Praia Recanto via Av. Brasil", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "201": { name: "Jardim Brasília / Praia Azul via Av. Campos Sales", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "205": { name: "Jardim Brasília / Antônio Zanaga via Av. Brasil", origin: "Terminal", destination: "Zanaga", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.ZANAGA] },
    "206": { name: "Jardim da Paz / Terminal", origin: "Novo Mundo", destination: "Terminal", coordinates: [LOCATIONS.NOVO_MUNDO, LOCATIONS.TERMINAL] },
    "207": { name: "Jardim da Paz / Terminal", origin: "Jardim Brasil", destination: "Terminal", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.TERMINAL] },
    "208": { name: "Jardim da Paz / Antônio Zanaga", origin: "Terminal", destination: "Zanaga", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.ZANAGA] },
    "211": { name: "Jardim da Paz / Werner Plass via Av. Campos Sales", origin: "Novo Mundo", destination: "Terminal", coordinates: [LOCATIONS.NOVO_MUNDO, LOCATIONS.TERMINAL] },
    "212": { name: "Jardim da Paz / Praia Azul via Rio Branco", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "213": { name: "Jardim da Balsa / Hospital Municipal", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "220": { name: "Mário Covas / Praia Recanto via Av. Campos Sales", origin: "Terminal", destination: "Praia Azul", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.PRAIA_AZUL] },
    "224": { name: "Jardim Bôer / Terminal", origin: "Terminal", destination: "Novo Mundo", coordinates: [LOCATIONS.TERMINAL, LOCATIONS.NOVO_MUNDO] },
    "225": { name: "Mathiesen / Praia Recanto", origin: "Mathiensen", destination: "Praia Azul", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.PRAIA_AZUL] },
  },
  EMTU: {
    "605": { name: "Santa Bárbara d’Oeste ↔ Americana", origin: "Santa Bárbara", destination: "Americana", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.TERMINAL] },
    "606": { name: "Santa Bárbara d’Oeste ↔ Campinas", origin: "Santa Bárbara", destination: "Campinas", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.CAMPINAS] },
    "607": { name: "Santa Bárbara d’Oeste ↔ Piracicaba", origin: "Santa Bárbara", destination: "Piracicaba", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.PIRACICABA] },
    "608": { name: "Santa Bárbara d’Oeste ↔ Limeira", origin: "Santa Bárbara", destination: "Limeira", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.LIMEIRA] },
    "609": { name: "Santa Bárbara d’Oeste ↔ Nova Odessa", origin: "Santa Bárbara", destination: "Nova Odessa", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.NOVA_ODESSA] },
    "610": { name: "Santa Bárbara d’Oeste ↔ Sumaré", origin: "Santa Bárbara", destination: "Sumaré", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.SUMARE] },
    "611": { name: "Santa Bárbara d’Oeste ↔ Hortolândia", origin: "Santa Bárbara", destination: "Hortolândia", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.HORTOLANDIA] },
    "612": { name: "Santa Bárbara d’Oeste ↔ Paulínia", origin: "Santa Bárbara", destination: "Paulínia", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.PAULINIA] },
    "613": { name: "Santa Bárbara d’Oeste ↔ Cosmópolis", origin: "Santa Bárbara", destination: "Cosmópolis", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.COSMOPOLIS] },
    "614": { name: "Santa Bárbara d’Oeste ↔ Capivari", origin: "Santa Bárbara", destination: "Capivari", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.CAPIVARI] },
    "615": { name: "Santa Bárbara d’Oeste ↔ Monte Mor", origin: "Santa Bárbara", destination: "Monte Mor", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.MONTE_MOR] },
    "616": { name: "Santa Bárbara d’Oeste ↔ Elias Fausto", origin: "Santa Bárbara", destination: "Elias Fausto", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.ELIAS_FAUSTO] },
    "617": { name: "Santa Bárbara d’Oeste ↔ Iracemápolis", origin: "Santa Bárbara", destination: "Iracemápolis", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.IRACEMAPOLIS] },
    "618": { name: "Santa Bárbara d’Oeste ↔ Cordeirópolis", origin: "Santa Bárbara", destination: "Cordeirópolis", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.CORDEIROPOLIS] },
    "619": { name: "Santa Bárbara d’Oeste ↔ Rio Claro", origin: "Santa Bárbara", destination: "Rio Claro", coordinates: [LOCATIONS.SBO_CENTRO, LOCATIONS.RIO_CLARO] },
  },
};


function haversineMeters(a, b) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371000; 
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const A = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
  return R * C;
}


function Routing({ coords, setRouteInfo, setRouteCoords }) {
  const map = useMap();

  useEffect(() => {
    if (!coords || coords.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: coords.map((c) => L.latLng(c[0], c[1])),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    const onRoutesFound = (e) => {
  const route = e.routes[0];
  const summary = route.summary;
  const fullCoords = route.coordinates.map((c) => [c.lat, c.lng]);

  
  const distanceKm = summary.totalDistance / 1000;

  
  const busSpeedKmh = 15;
  const busSpeedKmMin = busSpeedKmh / 60;

  
  const durationMin = distanceKm / busSpeedKmMin;

  setRouteCoords(fullCoords);
  setRouteInfo({
    distance: distanceKm.toFixed(2) + " km",
    duration: Math.round(durationMin) + " min",
  });
};


    routingControl.on("routesfound", onRoutesFound);

    return () => {
      routingControl.off("routesfound", onRoutesFound);
      map.removeControl(routingControl);
    };
  }, [coords, map, setRouteInfo, setRouteCoords]);

  return null;
}


function AnimatedBus({ routeCoords, speedKmh = 10 }) {
  const [position, setPosition] = useState(routeCoords ? routeCoords[0] : null);
  const indexRef = useRef(0);        
  const offsetRef = useRef(0);       
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (!routeCoords || routeCoords.length < 2) return;

    
    const speed = (speedKmh * 1000) / 3600;

    indexRef.current = 0;
    offsetRef.current = 0;
    setPosition(routeCoords[0]);
    lastTimeRef.current = performance.now();

    function step(time) {
      const dt = (time - lastTimeRef.current) / 1000; 
      lastTimeRef.current = time;

      let i = indexRef.current;
      
      let a = routeCoords[i];
      let b = routeCoords[(i + 1) % routeCoords.length];

      
      let segDist = haversineMeters(a, b);

      
      let move = speed * dt;

      offsetRef.current += move;

      
      while (offsetRef.current >= segDist) {
        offsetRef.current -= segDist;
        i = (i + 1) % routeCoords.length;
        a = routeCoords[i];
        b = routeCoords[(i + 1) % routeCoords.length];
        segDist = haversineMeters(a, b);
        
        if (segDist === 0) {
          offsetRef.current = 0;
          break;
        }
      }

      
      const t = segDist === 0 ? 0 : offsetRef.current / segDist;
      const lat = a[0] + (b[0] - a[0]) * t;
      const lng = a[1] + (b[1] - a[1]) * t;

      indexRef.current = i;
      setPosition([lat, lng]);

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [routeCoords, speedKmh]);

  if (!position) return null;
  return (
    <Marker position={position} icon={busIcon}>
      <Popup>Ônibus em tempo real</Popup>
    </Marker>
  );
}


function LineSelect({ busLines, selectedLine, setSelectedLine }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem", width: "100%"}}>
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
            {selectedLine ? `${selectedLine} - ${busLines[selectedLine].name}` : "Selecione uma linha"}
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


export default function BusMap() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null); 

  const filteredLines = selectedCompany ? BUS_LINES[selectedCompany] : {};

  
  useEffect(() => {
    setRouteInfo(null);
    setRouteCoords(null);
  }, [selectedLine, selectedCompany]);

  return (
    <>
      <style>{`
        .wrapper {
          display: flex;
          flex-direction: row;
          flex: 1;
          max-width: 1400px;
          height: 100%;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .wrapper { flex-direction: column; }
          .panel { max-height: 100vh; overflow-y: auto; z-index: 20; }
          .map { min-height: 300px; flex: none; z-index: 10;}
        }
      `}</style>

      <div
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
        }}
      >
        <div className="wrapper">
          {}
          <div
            className="panel"
            style={{
              flex: 1,
              padding: "1.5rem",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowY: "visible",
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Mapa em tempo real</h2>
            <p className="mb-4 text-gray-700">
              Este mapa mostra a posição do ônibus em tempo real (simulada),
              seguindo exatamente a rota calculada (linha azul).
            </p>

            {}
            <div style={{ marginBottom: "1.5rem", width: "100%" }}>
              <label className="block text-sm font-medium">Selecione a empresa:</label>
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

            {}
            {selectedCompany && (
              <LineSelect
                busLines={filteredLines}
                selectedLine={selectedLine}
                setSelectedLine={(line) => {
                  setSelectedLine(line);
                  
                  setRouteInfo(null);
                  setRouteCoords(null);
                }}
              />
            )}

            {}
            {selectedLine && filteredLines[selectedLine] && (
              <div className="mt-6 border p-4 rounded bg-gray-50 w-full">
                <h3 className="font-bold mb-2">
                  {selectedLine} - {filteredLines[selectedLine].name}
                </h3>
                <div><strong>Origem:</strong> {filteredLines[selectedLine].origin}</div>
                <div><strong>Destino:</strong> {filteredLines[selectedLine].destination}</div>
                {routeInfo && (
                  <>
                    <div><strong>Distância:</strong> {routeInfo.distance}</div>
                    <div><strong>Tempo estimado:</strong> {routeInfo.duration}</div>
                  </>
                )}
              </div>
            )}
          </div>

          {}
          <div
            className="map"
            style={{
              flex: 2,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              background: "#fff",
              minHeight: "auto",
              height: "100%",
              zIndex: "10"
            }}
          >
            <MapContainer center={LOCATIONS.TERMINAL} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
              />

              {}
              {selectedLine && filteredLines[selectedLine] && (
                <Routing
                  coords={filteredLines[selectedLine].coordinates}
                  setRouteInfo={setRouteInfo}
                  setRouteCoords={setRouteCoords}
                />
              )}

              {}
              {selectedLine &&
                filteredLines[selectedLine] &&
                filteredLines[selectedLine].coordinates.map((pos, idx) => (
                  <Marker key={idx} position={pos}>
                    <Popup>
                      {idx === 0 ? "Origem" : idx === filteredLines[selectedLine].coordinates.length - 1 ? "Destino" : "Parada"}
                    </Popup>
                  </Marker>
                ))}

              {}
              {routeCoords && routeCoords.length > 0 && (
                <AnimatedBus routeCoords={routeCoords} speedKmh={10} />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps";

// 7ALP's is based in Hyderabad — sensible default center when no address exists yet.
const DEFAULT_CENTER = { lat: 17.385044, lng: 78.486671 };

const parseAddressComponents = (components = []) => {
  const get = (type) => components.find((c) => c.types.includes(type))?.long_name || "";

  const streetNumber = get("street_number");
  const route = get("route");
  const sublocality = get("sublocality_level_1") || get("sublocality") || get("neighborhood");
  const line1 = [streetNumber, route].filter(Boolean).join(" ") || sublocality || "";

  return {
    line1,
    city: get("locality") || get("administrative_area_level_2"),
    state: get("administrative_area_level_1"),
    pincode: get("postal_code"),
    country: get("country"),
  };
};

/**
 * Shared address picker: a Places-autocomplete search box + a draggable-marker
 * map. Whenever a location is searched, clicked, or dragged to, it reverse-
 * geocodes/parses the address and calls `onAddressChange` with
 * { line1, city, state, pincode, country, lat, lng, formattedAddress }.
 *
 * Manual form fields should stay editable alongside this — it's a convenience,
 * not the only way to fill an address.
 */
const AddressMapPicker = ({ onAddressChange, initialLat, initialLng, height = 280 }) => {
  const mapDivRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !mapDivRef.current) return;

        const center = {
          lat: initialLat ?? DEFAULT_CENTER.lat,
          lng: initialLng ?? DEFAULT_CENTER.lng,
        };

        const map = new maps.Map(mapDivRef.current, {
          center,
          zoom: 14,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });
        mapRef.current = map;

        const marker = new maps.Marker({
          position: center,
          map,
          draggable: true,
        });
        markerRef.current = marker;

        geocoderRef.current = new maps.Geocoder();

        const emitFromLatLng = (lat, lng) => {
          geocoderRef.current.geocode({ location: { lat, lng } }, (results, geoStatus) => {
            if (geoStatus !== "OK" || !results?.[0]) return;
            const parsed = parseAddressComponents(results[0].address_components);
            onAddressChange?.({
              ...parsed,
              lat,
              lng,
              formattedAddress: results[0].formatted_address,
            });
          });
        };

        marker.addListener("dragend", () => {
          const pos = marker.getPosition();
          emitFromLatLng(pos.lat(), pos.lng());
        });

        map.addListener("click", (e) => {
          marker.setPosition(e.latLng);
          emitFromLatLng(e.latLng.lat(), e.latLng.lng());
        });

        if (searchInputRef.current) {
          const autocomplete = new maps.places.Autocomplete(searchInputRef.current, {
            fields: ["geometry", "address_components", "formatted_address"],
          });
          autocomplete.bindTo("bounds", map);

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry?.location) return;

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            map.setCenter({ lat, lng });
            map.setZoom(16);
            marker.setPosition({ lat, lng });

            const parsed = parseAddressComponents(place.address_components);
            onAddressChange?.({
              ...parsed,
              lat,
              lng,
              formattedAddress: place.formatted_address,
            });
          });
        }

        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err.message || "Unable to load Google Maps");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for your address..."
          disabled={status !== "ready"}
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10 disabled:bg-gray-50"
        />
      </div>

      <div
        className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
        style={{ height }}
      >
        <div ref={mapDivRef} className="h-full w-full" />

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            Loading map...
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center text-sm text-gray-400">
            <MapPin className="h-5 w-5" />
            <span>Map unavailable: {errorMessage}</span>
            <span>You can still fill in the address fields manually below.</span>
          </div>
        )}
      </div>

      <p className="flex items-center gap-1.5 text-xs text-gray-400">
        <MapPin className="h-3.5 w-3.5" />
        Search, click, or drag the pin to auto-fill the address fields below.
      </p>
    </div>
  );
};

export default AddressMapPicker;

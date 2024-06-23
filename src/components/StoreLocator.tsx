"use client";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { FaGreaterThan } from "react-icons/fa6";
import StarRating from "./StarRating";
import { IoMdCall } from "react-icons/io";
interface Store {
  name: string;
  address: string;
  pincode: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  area: string;
  dealerOperationHours: Record<string, string>;
  storePageUrl: string;
  dealerContent: Array<{ section: string; content: string }>;
  dealerId: string;
  seoStoreServices: Record<string, unknown>;
  type: string;
  additionalPhones: string;
  gmbMapUrl: string;
  city: string;
  state: string;
  averageRating: number;
}

interface CityStateMap {
  [key: string]: {
    [key: string]: Store[];
  };
}
const StoreLocator: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
  });

  const [state, setState] = useState<string>("Delhi");
  const [city, setCity] = useState<string>("New Delhi");
  const [stores, setStores] = useState<Store[]>([]);
  const [cityStateMap, setCityStateMap] = useState<CityStateMap>({});
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 28.6139,
    lng: 77.209,
  });
  const [zoom, setZoom] = useState<number>(12);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/store");
        setCityStateMap(response.data.cityStateMap);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cityStateMap[state] && cityStateMap[state][city]) {
      const stores = cityStateMap[state][city];
      setStores(stores);

      const validLatitudes = stores
        .map((store) => parseFloat(store.latitude))
        .filter((lat) => !isNaN(lat));
      const validLongitudes = stores
        .map((store) => parseFloat(store.longitude))
        .filter((lng) => !isNaN(lng));

      if (validLatitudes.length > 0 && validLongitudes.length > 0) {
        const avgLat =
          validLatitudes.reduce((a, b) => a + b, 0) / validLatitudes.length;
        const avgLng =
          validLongitudes.reduce((a, b) => a + b, 0) / validLongitudes.length;
        setCenter({ lat: avgLat, lng: avgLng });

        if (stores.length > 1) {
          setZoom(10);
        } else {
          setZoom(12);
        }
      } else {
        setCenter({ lat: 28.6139, lng: 77.209 });
        setZoom(12);
      }
    }
  }, [state, city, cityStateMap]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Maps</p>;
  console.log({ state, city, stores, cityStateMap, center });

  return (
    <div className="w-full h-[100dvh] md:h-screen flex items-center justify-center overflow-y-auto">
      <div className="md:py-0 py-2 flex h-[90vh] md:h-[60vh] w-[90%] md:w-[70%] flex-col md:flex-row gap-[20px] md:gap-0  ">
        <div className=" w-full md:w-1/2 h-[60%] md:h-full overflow-y-auto">
          <div className=" flex w-[90%]  items-center  gap-[30px]">
            <div className="mb-4 w-1/2">
              <label
                htmlFor="state"
                className=" text-[18px] font-bold text-[#000]"
              >
                State
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(
                    Object?.keys(cityStateMap?.[e.target.value] || {})?.[0]
                  );
                }}
                className="  mt-1 py-2 px-3 rounded-md  w-full  border bg-[#000] text-[#fff] focus:outline-none"
              >
                {Object.keys(cityStateMap).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 w-1/2">
              <label
                htmlFor="city"
                className=" text-[18px] font-bold text-[#000]"
              >
                City
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="  mt-1 py-2 px-3 rounded-md  w-full  border bg-[#000] text-[#fff] focus:outline-none"
              >
                {Object.keys(cityStateMap[state] || {}).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-[100%]  md:h-[80%]  overflow-y-auto bg-[#000] py-1 containerScroll">
            <p className="text-[#fff] text-[14px] font-bold px-2">
              {stores?.length || 0} results
            </p>
            {stores.map((store, index) => (
              <div
                key={index}
                className="mb-4 bg-gray-800 px-4 py-2  sticky top-[0px] border-2 border-black"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={store?.storePageUrl}
                  className="text-lg font-semibold text-[#fff] flex items-center gap-[6px]"
                >
                  {" "}
                  {store?.name} <FaGreaterThan />
                </a>
                <p className="text-[#fff] flex items-center text-[12px] py-1 space-x-4">
                  {store?.averageRating}{" "}
                  <StarRating rating={store?.averageRating} />{" "}
                </p>
                <div className="flex items-center">
                  <span>{}</span>
                </div>
                <p className="text-[#fff]">{store?.address}</p>
                <p className="text-[#fff] flex items-center gap-1">
                  <IoMdCall />
                  {store?.phoneNumber}
                </p>
                <div className="py-3">
                  <a
                    href={store?.gmbMapUrl}
                    target="_blank"
                    className=" mt-2 bg-gradient-to-r from-gray-500 to-gray-900 py-2 px-4 text-yellow-500 text-[12px]"
                  >
                    Get Direction &gt;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" h-[40%] md:h-full w-full md:w-1/2">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={zoom}
            center={center}
          >
            {stores?.map((store, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(store.latitude),
                  lng: parseFloat(store.longitude),
                }}
                label={store.name}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;

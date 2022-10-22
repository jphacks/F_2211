import { collection, getDocs, limit, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading/loading";
import { db } from "../lib/clientApp";
import styles from "../styles/index.module.css";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW51aXl1a2kwOTA0IiwiYSI6ImNsOWlmZXozbTBiNG4zdm1yZHoydWRra2oifQ.92mwSImqwWlQK5_-aIm6rg";

const Home = (props) => {
  const { data } = props;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const createMarkerElement = (shop) => {
    let el = document.createElement("div");
    let img = document.createElement("img");

    img.src = `/stores/${shop.brand_name}.png`;
    img.className = styles["pin-img"];

    el.appendChild(img);

    let ptag = document.createElement("p");

    ptag.textContent = shop.brand_price;
    ptag.setAttribute("class", styles["brand-price"]);
    el.appendChild(ptag);
    return el;
  };

  const createHomeMarkerElement = () => {
    let el = document.createElement("div");
    let img = document.createElement("img");

    img.src = "/user_pin.svg";
    img.className = styles["home-pin-img"];
    el.appendChild(img);
    return el;
  };

  const createPopupHTML = (shop) => {
    return `
      <div class="${styles["shop-container"]}">
        <div class="${styles["shop-top"]}">
          <img src="/stores/${shop.brand_name}.png" width="40px" height="40px" />
          <p class="${styles["shop-name"]}">
              ${shop.store_name}
          </p>
        </div>
        <div class="${styles["shop-bottom"]}">
          <p class="${styles["time-shop"]}">${shop.open_time}</p>
          <p class="${styles["price-shop"]}"><span class="${styles["price-shop-title"]}">最安値：</span>¥${shop.brand_price}</p>
        </div>
        <a class="${styles["direction-shop"]}" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/dir/?api=1&query=${lng},${lat}&destination=${shop.address}&travelmode=driving">
          <p>行き方を調べる</p>
        </a>
      </div>`;
  };

  useEffect(() => {
    if (map.current) return;
    setLoading(true);
    // 現在地取得
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
    (async () => {
      if (mapContainer.current) {
        map.current = await new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/inuiyuki0904/cl9iyv4we000015pbhkvkmoa9",
          center: [lng, lat],
          zoom: 15,
        });
        await new mapboxgl.Marker(createHomeMarkerElement())
          .setLngLat([lng, lat])
          .addTo(map.current);
      }
      setLoading(false);
    })();
  }, [lng, lat]);

  const brandList = new Map([
    ["starbucks", "スターバックス"],
    ["doutor", "ドトール"],
    ["tullys", "タリーズ"],
    ["veloce", "ヴェローチェ"],
    ["pront", "プロント"],
    ["saintmarccafe", "セントマークカフェ"],
    ["hoshinocoffee", "星乃珈琲"],
    ["komeda", "小芝居珈琲"],
    ["crie", "クリエ"],
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    const brand = e.target.value;
    const removeFiltered = filteredData.filter(
      (shop) => shop.brand_name !== brand
    );
    setFilteredData(
      e.target.checked
        ? filteredData.concat(data.filter((shop) => shop.brand_name === brand))
        : removeFiltered.length
        ? removeFiltered
        : []
    );
  };

  const [currentMarker, setCurrentMarker] = useState([]);

  const firstMount = useRef(true);

  useEffect(() => {
    setLoading(true);
    if (currentMarker.length > 0) {
      currentMarker.forEach((marker) => marker.remove());
    }
    if (firstMount.current) {
      setTimeout(() => {
        firstMount.current = false;
        data.map(async (shop) => {
          const marker = new mapboxgl.Marker(createMarkerElement(shop))
            .setLngLat(shop.longlat)
            .setPopup(
              await new mapboxgl.Popup({ offset: [0, -40] }).setHTML(
                createPopupHTML(shop)
              )
            )
            .addTo(map.current);
          setCurrentMarker((currentMarker) => [...currentMarker, marker]);
        });
      }, 5000);
    } else {
      const mapData = filteredData.length ? filteredData : data;
      mapData.map(async (shop) => {
        const marker = new mapboxgl.Marker(createMarkerElement(shop))
          .setLngLat(shop.longlat)
          .setPopup(
            await new mapboxgl.Popup({ offset: [0, -40] }).setHTML(
              createPopupHTML(shop)
            )
          )
          .addTo(map.current);
        setCurrentMarker((currentMarker) => [...currentMarker, marker]);
      });
    }
    setLoading(false);
  }, [filteredData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>A Cup of Coffee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/coffee-pink.png" />
      </Head>
      {!loading && lng && lat ? (
        <>
          <div className={styles["filter"]}>
            <ul>
              {Array.from(brandList).map((brand) => (
                <li key={brand[0]} className={styles["filter--item"]}>
                  <img
                    src={`/stores/${brand[0]}.png`}
                    width="32px"
                    height="32px"
                  />
                  <input
                    type="checkbox"
                    id={brand[0]}
                    value={brand[0]}
                    onChange={handle}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                  <label htmlFor={brand[0]}>{brand[1]}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.map} ref={mapContainer}></div>]
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const ref = collection(db, "stores_tokyo");
  // const Docs = await getDocs(query(ref, limit(10)));
  const Docs = await getDocs(ref);
  const data = Docs.docs.map((doc) => doc.data());

  const completeData = data.map((shop) => {
    return {
      store_name: shop.store_name || "",
      brand_name: shop.store_brand || "",
      address: shop.address || "",
      open_time: shop.open_time || "",
      brand_item: shop.brand_item || "",
      phone_number: shop.phone || "",
      brand_price: shop.brand_price || 0,
      longlat: [shop.longlat.longitude, shop.longlat.latitude] || [],
    };
  });

  return {
    props: {
      data: completeData,
    },
  };
};

export default Home;

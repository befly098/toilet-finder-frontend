// src/components/KakaoMap.jsx
import { useEffect, useRef } from "react";
import { loadKakao } from "../lib/loadKakao";

export default function KakaoMap() {
  const mapEl = useRef(null);
  const mapRef = useRef(null); // map 인스턴스 보관용

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const kakao = await loadKakao();
      if (cancelled) return;

      // 1) 지도 컨테이너 / 옵션
      const mapContainer = mapEl.current;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 10,
      };

      // 2) 지도 생성
      const map = new kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;

      // 3) displayMarker (바닐라 함수 이식)
      function displayMarker(locPosition, message) {
        const marker = new kakao.maps.Marker({
          map,
          position: locPosition,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: message,
          removable: true,
        });

        infowindow.open(map, marker);
        map.setCenter(locPosition);
      }

      // 4) 지오로케이션 (https 필요; localhost는 예외 허용)
      const isHttps = location.protocol === "https:";
      const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

      if (navigator.geolocation && (isHttps || isLocalhost)) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lon);
            const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
            displayMarker(locPosition, message);
          },
          () => {
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            const message = '<div style="padding:5px;">위치 권한이 거부되었습니다.</div>';
            displayMarker(locPosition, message);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const message = '<div style="padding:5px;">geolocation을 사용할 수 없어요..</div>';
        displayMarker(locPosition, message);
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current = null;
    };
  }, []);

  // 원본과 동일하게 높이 명시 (Tailwind 없어도 보이게 inline style)
  return (
    <>
      <p style={{ marginTop: -12 }}>
        <b>Chrome 브라우저는 https 환경에서만 geolocation을 지원합니다.</b> (localhost는 예외)
      </p>
      <div ref={mapEl} id="map" style={{ width: "100%", height: 350 }} />
    </>
  );
}
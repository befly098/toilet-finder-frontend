export function loadKakao() {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);

    const script = document.createElement("script");
    const key = import.meta.env.VITE_KAKAO_MAP_KEY;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services,clusterer`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
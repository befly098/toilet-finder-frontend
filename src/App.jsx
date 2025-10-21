// src/App.jsx
import KakaoMap from "./components/KakaoMap";
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1 className="title">화장실 찾기</h1>
      <KakaoMap />
    </div>
  );
}
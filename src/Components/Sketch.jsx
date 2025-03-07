import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { translations } from "../translations";

export default function Sketch({ languageId }) {
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const t = translations[languageId];

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleStrokeWidthChange = (event) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event) => {
    setEraserWidth(+event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 p-2 max-w-200">
      <h1 className="font-['Vazir']">{t.tools}</h1>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          type="button"
          className={`px-4 py-2 border rounded font-['Vazir'] ${
            eraseMode
              ? "bg-white text-blue-500 border-blue-500 "
              : "bg-blue-500 text-white"
          }`}
          disabled={!eraseMode}
          onClick={handlePenClick}
        >
          {t.pen}
        </button>
        <button
          type="button"
          className={`px-4 py-2 border rounded font-['Vazir'] ${
            !eraseMode
              ? "bg-white text-blue-500 border-blue-500"
              : " bg-blue-500 text-white"
          }`}
          disabled={eraseMode}
          onClick={handleEraserClick}
        >
          {t.eraser}
        </button>
        <label htmlFor="strokeWidth" className="mr-2 font-['Vazir']">
          {t.strokeWidth}
        </label>
        <input
          disabled={eraseMode}
          type="range"
          className="mr-4"
          min="1"
          max="20"
          step="1"
          id="strokeWidth"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
        <label htmlFor="eraserWidth" className="mr-2 font-['Vazir']">
          {t.eraserWidth}
        </label>
        <input
          disabled={!eraseMode}
          type="range"
          className="mr-4"
          min="1"
          max="20"
          step="1"
          id="eraserWidth"
          value={eraserWidth}
          onChange={handleEraserWidthChange}
        />
      </div>
      <h1 className="font-['Vazir']">{t.canvas}</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        canvasColor="transparent"
      />
    </div>
  );
}

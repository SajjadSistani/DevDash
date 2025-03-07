import { ChromePicker, SketchPicker } from "react-color";
import "./App.css";
import PomodoroTimer from "./Components/PomodoroTimer";
import { useState } from "react";
import Todolist from "./Components/Todolist";
import Sketch from "./Components/Sketch";
import SwitchTheme from "./Components/switchTheme";
import SwitchLanguage from "./Components/SwitchLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { translations } from "./translations";

function App() {
  const [fontColor, setFontColor] = useState("#272727");
  const [languageId, setLanguageId] = useState(2); // Default to English
  const [theme, setTheme] = useState("light");
  const handleFontColorChange = (color) => {
    setFontColor(color.hex);
  };

  const t = translations[languageId];

  return (
    <>
      <div
        className={`flex items-center justify-center overflow-x-clip flex-col h-screen ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-gray-300"
        }`}
      >
        <div className="font-bold text-lg flex items-center justify-around w-full p-8">
          <span className="flex items-center">
            <p className="font-['Vazir']">DevDash</p>
            <FontAwesomeIcon
              icon={faWindowMaximize}
              className="mx-2"
              style={{ color: fontColor }}
            />
          </span>
          <div className="flex items-center gap-4">
            <SwitchLanguage appLanguage={setLanguageId} />
            <SwitchTheme appTheme={setTheme} />
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row lg:flex-row px-15 items-center gap-5">
          <Todolist theme={theme} languageId={languageId} />
          <div className="mx-2">
            <PomodoroTimer theme={theme} languageId={languageId} />
          </div>
          <Sketch languageId={languageId} />
          <ChromePicker
            color={fontColor}
            onChange={handleFontColorChange}
            onChangeComplete={handleFontColorChange}
          />
        </div>
      </div>
    </>
  );
}

export default App;

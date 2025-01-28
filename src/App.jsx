import { useState, useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam"

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  }

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);


  useEffect(() => {
    (async () => {   
    await navigator.mediaDevices.getUserMedia({audio: false, video: true});   
    setDevices(await navigator.mediaDevices.enumerateDevices());
    console.log(devices); 
    })();
  }, []);

  console.log("devices", devices);
  console.log("selectedDevice", selectedDevice);

  const handleClick = (device) => {
    console.log("clicked device", device);
    setSelectedDevice(device.deviceId);
  }

  return (
    <div className="container">
      <ul>
        {devices.map((device) => {
          const selected = selectedDevice?.deviceId === device.deviceId;
          return (
            <li
              key={device.deviceId}
              style={(selected && { color: "green" }) || {}}
              onClick={() => handleClick(device)}
            >
              {device.label || "smth"}
            </li>
          );
        })}
      </ul>
      {selectedDevice && (
        <Webcam audio={false} videoConstraints={{ ...videoConstraints, deviceId: selectedDevice?.deviceId }} />
      )}
    </div>
  );
}

export default App;

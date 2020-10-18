import * as React from "react";
import * as Webcam from "react-webcam";

import "./home.scss";
import { AppContext } from "../shell";

export const HomeView: React.FC = (props) => {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <Webcam className="webcam" ref={webcamRef} />
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};

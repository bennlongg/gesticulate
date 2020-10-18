import * as React from "react";
// import {WebcamProps} from "react-webcam";

import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

/// to get round weird export issue
var { Webcam } = require("react-webcam");
import "./home.scss";
import { Button } from "@rocketmakers/armstrong";
import { CanvasHelper } from "../../helpers/canvas";

export const HomeView: React.FC = (props) => {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const rafID = React.useRef(null);

  const landmarksRealTime = async (video, model, ctx) => {
    async function frameLandmarks() {
      CanvasHelper.clearCanvas(
        ctx,
        video,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const predictions = await model.estimateHands(video);

      if (predictions.length > 0) {
        // console.log(predictions);
        const result = predictions[0].landmarks;
        CanvasHelper.drawFingerTips(result, ctx, ["pinky"]);
      }
      rafID.current = requestAnimationFrame(frameLandmarks);
    }

    frameLandmarks();
  };

  const detect = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");

    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Draw mesh
    const ctx = canvasRef.current.getContext("2d");
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    landmarksRealTime(video, net, ctx);
  };

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(rafID.current);
    };
  }, [webcamRef?.current?.video]);

  const changeColor = (color: React.CSSProperties["color"]) => {
    canvasRef.current.getContext("2d").fillStyle = color;
  };

  return (
    <>
      <div className="canvas-container">
        <Webcam className="webcam" onLoadedData={detect} ref={webcamRef} />
        <canvas className="canvas" ref={canvasRef} />
      </div>
      <Button onClick={() => changeColor("red")}>RED</Button>
      <Button onClick={() => changeColor("yellow")}>YELLOW</Button>
    </>
  );
};

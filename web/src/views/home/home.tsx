import * as React from "react";
// import {WebcamProps} from "react-webcam";

import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { LazyBrush, Point } from "lazy-brush";

/// to get round weird export issue
var Webcam = require("react-webcam");
import "./home.scss";
import { Button } from "@rocketmakers/armstrong";
import { CanvasHelper } from "../../helpers/canvas";
import { useCanvas } from "../../hooks/useCanvas";

export const HomeView: React.FC = (props) => {
  const webcamRef = React.useRef(null);
  const modelRef = React.useRef(null);

  const lazy = React.useRef(
    new LazyBrush({
      radius: 10,
      enabled: true,
      initialPoint: {
        x: 0,
        y: 0,
      },
    })
  );

  const detect = async () => {
    const net = await handpose.load();
    modelRef.current = net;
    console.log("Handpose model loaded.");

    // // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  };

  const draw = async (ctx: CanvasRenderingContext2D) => {
    if (!modelRef.current || !webcamRef.current) {
      return;
    }

    const video = webcamRef.current.video;
    // CanvasHelper.clearCanvas(
    //   ctx,
    //   video,
    //   canvasRef.current.width,
    //   canvasRef.current.height
    // );
    const predictions = await modelRef.current.estimateHands(video);
    if (predictions.length > 0) {
      const result = predictions[0].landmarks;
      CanvasHelper.drawFingerTips(result, ctx, ["indexFinger"], lazy.current);
    }
  };

  const canvasRef = useCanvas(draw);

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

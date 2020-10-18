import { useRef } from "react";
import * as React from "react";

export const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D) => void,
  context = "2d"
) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext(
      context
    ) as CanvasRenderingContext2D;
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineCap = "round";
    let animationFrameId = requestAnimationFrame(renderFrame);

    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame);
      draw(ctx);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return canvasRef;
};

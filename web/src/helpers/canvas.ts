type Finger = "thumb" | "indexFinger" | "middleFinger" | "ringFinger" | "pinky";

export namespace CanvasHelper {
  export const fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  export const drawPoint = (
    y: number,
    x: number,
    r: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.beginPath();
    // ctx.lineWidth = 10;
    // ctx.strokeStyle = "green";
    // ctx.lineTo(x, y);
    // ctx.stroke();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
  };

  export const drawPath = (
    points,
    closePath,
    ctx: CanvasRenderingContext2D
  ) => {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point[0], point[1]);
    }

    if (closePath) {
      region.closePath();
    }
    ctx.stroke(region);
  };

  export const drawKeypoints = (keypoints, ctx: CanvasRenderingContext2D) => {
    const keypointsArray = keypoints;
    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i][0];
      const x = keypointsArray[i][1];
      drawPoint(x - 2, y - 2, 3, ctx);
    }

    const fingers = Object.keys(fingerLookupIndices);
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i];
      const points = fingerLookupIndices[finger].map((idx) => keypoints[idx]);
      drawPath(points, false, ctx);
    }
  };

  export const drawFingerTips = (keypoints, ctx, fingers?: Finger[]) => {
    const keypointsArray = keypoints;

    const fingersToDraw = fingers.length
      ? fingers
      : Object.keys(fingerLookupIndices);
    for (let i = 0; i < fingersToDraw.length; i++) {
      const finger = fingersToDraw[i];
      const fingerPoints = fingerLookupIndices[finger];
      const idx = fingerPoints[fingerPoints.length - 1];
      const y = keypointsArray[idx][0];
      const x = keypointsArray[idx][1];

      drawPoint(x - 2, y - 2, 10, ctx);
      // drawPoint(points, false, ctx);
    }
  };

  export const clearCanvas = (
    ctx: CanvasRenderingContext2D,
    video: CanvasImageSource,
    width: number,
    height: number
  ) => {
    ctx.drawImage(video, 0, 0, width, height, 0, 0, width, height);
  };
}

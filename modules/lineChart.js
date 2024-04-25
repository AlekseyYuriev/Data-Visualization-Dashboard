import getData from '../utils/service.js';
import { COMMENTS_URL } from '../utils/urls.js';
import { canvasHeightLc, canvasWidthLc, ctxLc } from '../utils/constants.js';

export default function generateLineChart() {
  const comments = getData(COMMENTS_URL).then((data) => console.log(data));

  ctxLc.beginPath();
  ctxLc.moveTo(70, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 50, canvasHeightLc - 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 50);
  ctxLc.lineTo(70, canvasHeightLc - 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 50);
  ctxLc.lineTo(75, 55);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 50);
  ctxLc.lineTo(65, 55);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 50);
  ctxLc.lineTo(65, 55);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(canvasWidthLc - 50, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 55, canvasHeightLc - 55);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(canvasWidthLc - 50, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 55, canvasHeightLc - 45);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.font = '16px Arial';
  ctxLc.fillStyle = '#005555';
  ctxLc.fillText('Comments', 10, 30);
  ctxLc.fillText('Month', canvasWidthLc - 55, canvasHeightLc - 10);

  ctxLc.font = '14px Arial';
  ctxLc.fillStyle = '#005555';
  ctxLc.textBaseline = 'top';
  ctxLc.fillText('0', 45, canvasHeightLc - 55);
  ctxLc.fillText('Jan', 60, canvasHeightLc - 35);
}

import getData from '../utils/service.js';
import { COMMENTS_URL } from '../utils/urls.js';
import { canvasHeightLc, canvasWidthLc, ctxLc } from '../utils/constants.js';

export default function generateLineChart() {
  const comments = getData(COMMENTS_URL).then((data) => console.log(data));

  // Y axis
  ctxLc.beginPath();
  ctxLc.moveTo(70, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 80, canvasHeightLc - 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(canvasWidthLc - 80, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 85, canvasHeightLc - 55);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(canvasWidthLc - 80, canvasHeightLc - 50);
  ctxLc.lineTo(canvasWidthLc - 85, canvasHeightLc - 45);
  ctxLc.stroke();
  ctxLc.closePath();

  // X axis
  ctxLc.beginPath();
  ctxLc.moveTo(70, 45);
  ctxLc.lineTo(70, canvasHeightLc - 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 45);
  ctxLc.lineTo(75, 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.beginPath();
  ctxLc.moveTo(70, 45);
  ctxLc.lineTo(65, 50);
  ctxLc.stroke();
  ctxLc.closePath();

  ctxLc.font = '16px Arial';
  ctxLc.fillStyle = '#0c457d';
  ctxLc.fillText('Comments', 10, 30);
  ctxLc.fillText('Month', canvasWidthLc - 65, canvasHeightLc - 30);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthsLength = (canvasWidthLc - 70 - 50) / 12;

  for (let i = 0; i < 12; i++) {
    ctxLc.font = '14px Arial';
    ctxLc.fillStyle = '#e8702a';
    ctxLc.textBaseline = 'top';
    ctxLc.fillText(`${months[i]}`, 60 + monthsLength * i, canvasHeightLc - 35);

    ctxLc.beginPath();
    ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
    ctxLc.moveTo(70 + i * monthsLength, canvasHeightLc - 50);
    ctxLc.lineTo(70 + i * monthsLength, 77);
    ctxLc.stroke();
    ctxLc.closePath();
  }

  const commentsLength = (canvasHeightLc - 45 - 50) / 10;

  for (let i = 0; i < 10; i++) {
    ctxLc.font = '14px Arial';
    ctxLc.fillStyle = '#0ea7b5';
    ctxLc.textAlign = 'center';
    ctxLc.fillText(`${i * 50}`, 45, canvasHeightLc - 55 - commentsLength * i);

    ctxLc.beginPath();
    ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
    ctxLc.moveTo(70, canvasHeightLc - 50 - i * commentsLength);
    ctxLc.lineTo(canvasWidthLc - 115, canvasHeightLc - 50 - i * commentsLength);
    ctxLc.stroke();
    ctxLc.closePath();
  }
}

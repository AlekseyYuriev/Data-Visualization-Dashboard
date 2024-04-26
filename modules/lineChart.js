import getData from '../utils/service.js';
import { COMMENTS_URL } from '../utils/urls.js';
import { canvasHeightLc, canvasWidthLc, ctxLc } from '../utils/constants.js';

export default function generateLineChart() {
  const getComments = getData(COMMENTS_URL).then((data) => {
    console.log(data[0]);
    const comments = [];
    data.forEach((element) => {
      comments.push({
        id: element.id,
        name: element.name,
        email: element.email,
        body: element.body,
        date: new Date(2023, Math.round(Math.random() * 11 + 1))
          .toISOString()
          .split('T')[0],
      });
    });
    console.log(comments);
    const commentPerMonth = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
    };

    comments.map((item) => {
      if (
        Object.keys(commentPerMonth).includes(item.date.slice(5, 7)) &&
        !item.date.slice(5, 7).startsWith('0')
      ) {
        commentPerMonth[item.date.slice(5, 7)] += 1;
      } else {
        commentPerMonth[item.date.slice(5, 7).slice(1)] += 1;
      }
    });

    const monthWithMaxNumberOfComments = Object.values(commentPerMonth).sort(
      (a, b) => a - b,
    )[11];
    console.log(commentPerMonth);
    console.log(monthWithMaxNumberOfComments);

    // X axis
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

    console.log(ctxLc.strokeStyle, ctxLc.lineWidth, ctxLc.textAlign, ctxLc.textBaseline);

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

    const commentsLength = Math.round((canvasHeightLc - 45 - 50) / (500 / 12));

    console.log(commentsLength);

    for (let i = 0; i < 8; i++) {
      ctxLc.font = '14px Arial';
      ctxLc.fillStyle = '#0ea7b5';
      ctxLc.textAlign = 'center';
      ctxLc.fillText(
        `${i * commentsLength}`,
        45,
        canvasHeightLc - 55 - commentsLength * i * 5,
      );

      ctxLc.beginPath();
      ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
      ctxLc.moveTo(70, canvasHeightLc - 50 - i * commentsLength * 5);
      ctxLc.lineTo(canvasWidthLc - 100, canvasHeightLc - 50 - i * commentsLength * 5);
      ctxLc.stroke();
      ctxLc.closePath();
    }
    console.log(Object.values(commentPerMonth));
    for (let i = 0; i < 12; i++) {
      ctxLc.beginPath();
      ctxLc.strokeStyle = '#ffbe4f';
      ctxLc.lineWidth = 3;
      ctxLc.moveTo(
        70 + i * monthsLength,
        canvasHeightLc - 50 - Object.values(commentPerMonth)[i] * 5,
      );
      ctxLc.lineTo(
        70 + monthsLength * (i + 1),
        canvasHeightLc - 50 - Object.values(commentPerMonth)[i + 1] * 5,
      );
      ctxLc.stroke();
      ctxLc.closePath();
    }

    ctxLc.strokeStyle = '#000000';
    ctxLc.lineWidth = 1;
    ctxLc.textAlign = 'start';
    ctxLc.textBaseline = 'alphabetic';

    // Y axis
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
  });
}

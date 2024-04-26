import getData from '../utils/service.js';
import { COMMENTS_URL } from '../utils/urls.js';
import { canvasHeightLc, canvasWidthLc, ctxLc } from '../utils/constants.js';

export default function generateLineChart() {
  getData(COMMENTS_URL).then((data) => {
    // console.log(data[0]);
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
      ctxLc.lineTo(70 + i * monthsLength, 65);
      ctxLc.stroke();
      ctxLc.closePath();
    }

    let maxNumberOfCommentsPerMonth = Object.values(commentPerMonth).sort(
      (a, b) => b - a,
    )[0];

    const commentsLength = maxNumberOfCommentsPerMonth / 8;

    for (let i = 0; i < 10; i++) {
      ctxLc.font = '14px Arial';
      ctxLc.fillStyle = '#0ea7b5';
      ctxLc.textAlign = 'center';
      ctxLc.textBaseline = 'middle';
      ctxLc.fillText(
        commentsLength.toString().startsWith('0')
          ? `${0 + +(i * commentsLength).toFixed(1)}`
          : `${0 + +(i * commentsLength).toFixed(0)}`,
        45,
        canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i,
      );

      ctxLc.beginPath();
      ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
      ctxLc.moveTo(70, canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i);
      ctxLc.lineTo(
        canvasWidthLc - 110,
        canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i,
      );
      ctxLc.stroke();
      ctxLc.closePath();
    }

    for (let i = 0; i < 12; i++) {
      ctxLc.beginPath();
      ctxLc.strokeStyle = '#ffbe4f';
      ctxLc.lineWidth = 3;
      ctxLc.moveTo(
        70 + i * monthsLength,
        canvasHeightLc -
          50 -
          (Object.values(commentPerMonth)[i] * (canvasHeightLc - 50 - 35)) /
            10 /
            commentsLength,
      );
      ctxLc.lineTo(
        70 + monthsLength * (i + 1),
        canvasHeightLc -
          50 -
          (Object.values(commentPerMonth)[i + 1] * (canvasHeightLc - 50 - 35)) /
            10 /
            commentsLength,
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
    ctxLc.moveTo(70, 35);
    ctxLc.lineTo(70, canvasHeightLc - 50);
    ctxLc.stroke();
    ctxLc.closePath();

    ctxLc.beginPath();
    ctxLc.moveTo(70, 35);
    ctxLc.lineTo(75, 40);
    ctxLc.stroke();
    ctxLc.closePath();

    ctxLc.beginPath();
    ctxLc.moveTo(70, 35);
    ctxLc.lineTo(65, 40);
    ctxLc.stroke();
    ctxLc.closePath();

    ctxLc.font = '16px Arial';
    ctxLc.fillStyle = '#0c457d';
    ctxLc.fillText('Comments', 10, 25);
    ctxLc.fillText('Month', canvasWidthLc - 65, canvasHeightLc - 30);
  });
}

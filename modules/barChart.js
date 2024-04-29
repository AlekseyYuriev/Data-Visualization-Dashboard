import { USERS_URL, POSTS_URL } from '../utils/urls.js';
import {
  ctx,
  canvasWidth,
  canvasHeight,
  barChartSubmitButton,
  barChartUserInput,
  barChartPostInput,
} from '../utils/constants.js';
import getData from '../utils/service.js';

// let userInput = '';
// let postInput = '';

// barChartSubmitButton.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   userInput = barChartUserInput.value;
//   postInput = barChartPostInput.value;
//   console.log(userInput, postInput);
// });

export default function generateBarChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  ctx.beginPath();
  ctx.moveTo(70, 50);
  ctx.lineTo(70, canvasHeight - 50);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(70, 50);
  ctx.lineTo(75, 55);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(70, 50);
  ctx.lineTo(65, 55);
  ctx.stroke();
  ctx.closePath();

  ctx.font = '16px Arial';
  ctx.fillStyle = '#0c457d';
  ctx.fillText('Posts', 10, 30);
  ctx.fillText('Users', canvasWidth - 55, canvasHeight - 10);

  Promise.all([posts, users]).then((data) => {
    // console.log(data);
    const users = [];
    data[1].forEach((element) => {
      users.push({
        id: element.id,
        name: element.name,
        username: element.username,
        numberOfPosts: 0,
      });
    });
    for (let i = 0; i < users.length; i++) {
      data[0].forEach((item) => {
        if (item.userId == users[i].id) {
          users[i].numberOfPosts += 1;
        }
      });
    }

    // console.log(users);

    const max = users.reduce((acc, curr) =>
      acc.numberOfPosts > curr.numberOfPosts ? acc : curr,
    );

    const postsLength = max.numberOfPosts / 8;

    for (let i = 0; i < 10; i++) {
      ctx.font = '14px Arial';
      ctx.fillStyle = '#0ea7b5';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        postsLength.toString().startsWith('0')
          ? `${0 + +(i * postsLength).toFixed(1)}`
          : `${0 + +(i * postsLength).toFixed(1)}`,
        45,
        canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i,
      );
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(153,153,153,0.5)';
      ctx.moveTo(70, canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i);
      ctx.lineTo(
        canvasWidth - 90,
        canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i,
      );
      ctx.stroke();
      ctx.closePath();
    }

    let widthIterator = 100;
    users.map((user) => {
      ctx.fillStyle = '#ffbe4f';
      ctx.fillRect(
        widthIterator,
        canvasHeight - 50,
        45,
        Math.trunc((-user.numberOfPosts * (canvasHeight - 50 - 50)) / 10 / postsLength),
      );

      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e8702a';
      ctx.fillText(
        `${user.username.slice(0, 8)}...`,
        widthIterator + 30,
        canvasHeight - 27,
      );
      widthIterator += 85;
    });

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(70, canvasHeight - 50);
    ctx.lineTo(canvasWidth - 50, canvasHeight - 50);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvasWidth - 50, canvasHeight - 50);
    ctx.lineTo(canvasWidth - 55, canvasHeight - 55);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvasWidth - 50, canvasHeight - 50);
    ctx.lineTo(canvasWidth - 55, canvasHeight - 45);
    ctx.stroke();
    ctx.closePath();
  });
}

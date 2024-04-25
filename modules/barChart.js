import { USERS_URL, POSTS_URL } from '../utils/urls.js';
import { ctx, canvasWidth, canvasHeight } from '../utils/constants.js';
import getData from '../utils/service.js';

export default function generateBarChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  ctx.beginPath();
  ctx.moveTo(70, canvasHeight - 50);
  ctx.lineTo(canvasWidth - 50, canvasHeight - 50);
  ctx.stroke();
  ctx.closePath();

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

  ctx.beginPath();
  ctx.moveTo(70, 50);
  ctx.lineTo(65, 55);
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

  ctx.font = '16px Arial';
  ctx.fillStyle = '#0c457d';
  ctx.fillText('Posts', 10, 30);
  ctx.fillText('Users', canvasWidth - 55, canvasHeight - 10);

  ctx.font = '14px Arial';
  ctx.fillStyle = '#6bd2db';
  ctx.textBaseline = 'top';
  ctx.fillText('0', 45, canvasHeight - 55);

  Promise.all([posts, users]).then((data) => {
    console.log(data);
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

    console.log(users);
    users[3].numberOfPosts = 11;
    let max = users.reduce((acc, curr) =>
      acc.numberOfPosts > curr.numberOfPosts ? acc : curr,
    );

    ctx.font = '14px Arial';
    ctx.fillStyle = '#6bd2db';
    ctx.textBaseline = 'top';
    ctx.fillText(`${max.numberOfPosts}`, 45, canvasHeight - 50 - max.numberOfPosts * 30);
    ctx.fillText(
      `${Math.round(max.numberOfPosts / 2)}`,
      45,
      canvasHeight - 50 - Math.round(max.numberOfPosts / 2) * 30,
    );

    let iterator = 100;
    users.map((user) => {
      ctx.fillStyle = '#ffbe4f';
      ctx.fillRect(iterator, canvasHeight - 50, 45, -user.numberOfPosts * 30);
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e8702a';
      ctx.fillText(`${user.username.slice(0, 8)}...`, iterator + 30, canvasHeight - 27);
      iterator += 85;
    });
  });
}

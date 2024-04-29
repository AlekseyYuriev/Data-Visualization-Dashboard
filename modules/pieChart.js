import { canvasHeightPc, canvasWidthPc, colors, ctxPc } from '../utils/constants.js';
import getData from '../utils/service.js';
import { POSTS_URL, USERS_URL } from '../utils/urls.js';

export default function generatePieChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  Promise.all([posts, users]).then((data) => {
    const posts = data[0];
    console.log(posts);

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
      posts.forEach((item) => {
        if (item.userId == users[i].id) {
          users[i].numberOfPosts += 1;
        }
      });
    }
    console.log(users);

    const centerX = (canvasWidthPc - 250) / 2;
    const centerY = canvasHeightPc / 2;
    const radius = (canvasHeightPc - 80) / 2;

    ctxPc.beginPath();
    ctxPc.arc(centerX, centerY, radius, 0, (Math.PI / 180) * 360);
    ctxPc.stroke();

    let heightIterator = 0;
    let colorIterator = 0;
    let userPath = 0;

    users.forEach((user) => {
      //Username and percentage visualization
      let percentagePerUser = (user.numberOfPosts * 100) / posts.length;
      ctxPc.font = '18px Arial';
      ctxPc.fillStyle = '#0c457d';
      ctxPc.textBaseline = 'top';
      ctxPc.fillText(
        `${user.username}  ${
          percentagePerUser.toString().includes('.')
            ? percentagePerUser.toFixed(1)
            : percentagePerUser
        } %`,
        canvasWidthPc - 250,
        37 + heightIterator,
      );
      ctxPc.fillStyle = colors[colorIterator];
      ctxPc.fillRect(canvasWidthPc - 280, 35 + heightIterator, 18, 18);
      ctxPc.lineTo(centerX, centerY);
      ctxPc.fill();

      //Pie chart visualization
      ctxPc.beginPath();
      ctxPc.fillStyle = colors[colorIterator];
      ctxPc.moveTo(centerX, centerY);
      ctxPc.arc(
        centerX,
        centerY,
        radius,
        userPath,
        userPath + (Math.PI / 180) * percentagePerUser * 3.6,
      );

      //Increment
      heightIterator += 45;
      colorIterator += 1;
      userPath += (Math.PI / 180) * percentagePerUser * 3.6;
    });
  });
}

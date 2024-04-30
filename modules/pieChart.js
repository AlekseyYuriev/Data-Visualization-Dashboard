import {
  canvasHeightPc,
  canvasPieChart,
  canvasWidthPc,
  colors,
  ctxPc,
  pieChartPostInput,
  pieChartResetButton,
  pieChartSubmitButton,
  pieChartUserInput,
} from '../utils/constants.js';
import getData from '../utils/service.js';
import { POSTS_URL, USERS_URL } from '../utils/urls.js';

export default function generatePieChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  function updatePieChartData(userInput, postInput) {
    Promise.all([posts, users]).then((data) => {
      const users = [];
      if (userInput) {
        const filteredUsers = data[1].filter((user) =>
          user.username.toLowerCase().includes(userInput.toLowerCase()),
        );
        filteredUsers.forEach((element) => {
          users.push({
            id: element.id,
            name: element.name,
            username: element.username,
            numberOfPosts: 0,
          });
        });
      } else {
        data[1].forEach((element) => {
          users.push({
            id: element.id,
            name: element.name,
            username: element.username,
            numberOfPosts: 0,
          });
        });
      }

      let filteredPosts = [];

      if (postInput) {
        filteredPosts = data[0].filter((post) => post.body.includes(postInput));
      } else {
        filteredPosts = data[0];
      }

      for (let i = 0; i < users.length; i++) {
        filteredPosts.forEach((item) => {
          if (item.userId == users[i].id) {
            users[i].numberOfPosts += 1;
          }
        });
      }

      let countPosts = 0;

      for (let i = 0; i < users.length; i++) {
        countPosts += users[i].numberOfPosts;
      }

      ctxPc.clearRect(0, 0, canvasWidthPc, canvasHeightPc);

      const centerX = (canvasWidthPc - 250) / 2;
      const centerY = canvasHeightPc / 2;
      const radius = (canvasHeightPc - 80) / 2;

      if (users.length == 0) {
        ctxPc.beginPath();
        ctxPc.moveTo(canvasWidthPc / 2, canvasHeightPc / 2);
        ctxPc.font = '32px Arial';
        ctxPc.fillStyle = '#0c457d';
        ctxPc.textAlign = 'center';
        ctxPc.fillText(
          'No relevant content. Please, try again.',
          canvasWidthPc / 2,
          canvasHeightPc / 2 - 50,
        );
        return;
      }

      ctxPc.beginPath();
      ctxPc.arc(centerX, centerY, radius, 0, (Math.PI / 180) * 360);
      ctxPc.stroke();

      let heightIterator = 0;
      let colorIterator = 0;
      let userPath = 0;

      for (let i = 0; i < users.length; i++) {
        if (users[i].numberOfPosts == 0) {
          continue;
        }
        //Username and percentage visualization
        let percentagePerUser = (users[i].numberOfPosts * 100) / countPosts;
        ctxPc.font = '18px Arial';
        ctxPc.fillStyle = '#0c457d';
        ctxPc.textAlign = 'start';
        ctxPc.textBaseline = 'top';
        ctxPc.fillText(
          `${users[i].username}  ${
            percentagePerUser.toString().includes('.')
              ? percentagePerUser.toFixed(1)
              : percentagePerUser
          } %`,
          canvasWidthPc - 250,
          37 + heightIterator,
        );
        ctxPc.fillStyle = colors[colorIterator];
        ctxPc.fillRect(canvasWidthPc - 280, 35 + heightIterator, 18, 18);

        //Pie chart visualization
        ctxPc.beginPath();
        ctxPc.moveTo(centerX, centerY);
        ctxPc.fillStyle = colors[colorIterator];
        ctxPc.arc(
          centerX,
          centerY,
          radius,
          userPath,
          userPath + ((Math.PI / 180) * 360 * percentagePerUser) / 100,
          false,
        );
        ctxPc.fill();

        //Increment
        heightIterator += 45;
        colorIterator += 1;
        userPath += ((Math.PI / 180) * 360 * percentagePerUser) / 100;
      }
    });
  }

  updatePieChartData();

  let userInput = '';
  let postInput = '';

  pieChartSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    canvasPieChart.classList.remove('canvas__visible');
    userInput = pieChartUserInput.value;
    postInput = pieChartPostInput.value;
    setTimeout(function () {
      updatePieChartData(userInput, postInput);
      canvasPieChart.classList.add('canvas__visible');
    }, 1000);
  });

  pieChartResetButton.addEventListener('click', () => {
    canvasPieChart.classList.remove('canvas__visible');
    userInput = '';
    postInput = '';
    setTimeout(function () {
      updatePieChartData(userInput, postInput);
      canvasPieChart.classList.add('canvas__visible');
    }, 1000);
  });
}

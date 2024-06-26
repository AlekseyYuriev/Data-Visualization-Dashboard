import { POSTS_URL, USERS_URL } from '../utils/urls.js';
import getData from '../utils/service.js';
import { colors } from '../utils/constants.js';

//Pie Chart elements
export const canvasPieChart = document.getElementById('pie_chart');
const ctxPc = canvasPieChart.getContext('2d');

const canvasWidthPc = canvasPieChart.clientWidth;
const canvasHeightPc = canvasPieChart.clientHeight;

const pieCartForm = document.forms.pie_chart_form;

const pieChartUserInput = pieCartForm.elements.pieUsername;
const pieChartPostInput = pieCartForm.elements.piePostbody;

const pieChartSubmitButton = document.querySelector('.pie-chart__button-submit');
const pieChartResetButton = document.querySelector('.pie-chart__button-reset');

export default function generatePieChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  function updatePieChartData(userInput, postInput) {
    Promise.all([posts, users]).then((data) => {
      let users = data[1].map((user) => {
        return (user = {
          id: user.id,
          name: user.name,
          username: user.username,
          numberOfPosts: 0,
        });
      });
      if (userInput) {
        users = users.filter((user) =>
          user.username.toLowerCase().includes(userInput.toLowerCase()),
        );
      }

      let filteredPosts = data[0];

      if (postInput) {
        filteredPosts = filteredPosts.filter((post) =>
          post.body.toLowerCase().includes(postInput.toLowerCase()),
        );
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

      if (users.length == 0 || filteredPosts.length == 0) {
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

import { USERS_URL, POSTS_URL } from './utils/urls.js';
import { canvas, ctx, canvasWidth, canvasHeight } from './utils/constants.js';
import getData from './utils/service.js';
// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(res => {
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     for (let i = 0; i < data.length; i++) {
//       const userId = data.filter((post) => post.userId == i + 1)
//       console.log(userId)
//       if(userId.length > 0) {
//         ctx.fillStyle = "rgb(200,0,0)";
//         ctx.fillRect(70*i + 20, canvasHeight, 30, -userId.length*10);
//       }
//     }
//   })

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

ctx.font = '16px Arial';
ctx.fillText('Posts', 10, 30);
ctx.fillText('Users', canvasWidth - 50, canvasHeight - 7);

Promise.all([posts, users]).then((data) => {
  console.log(data);
  const users = [];
  data[1].forEach((element) => {
    users.push({
      id: element.id,
      name: element.name,
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
});

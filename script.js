import generateBarChart, { canvasBarChart } from './modules/barChart.js';
import generateLineChart, { canvasLineChart } from './modules/lineChart.js';
import generatePieChart, { canvasPieChart } from './modules/pieChart.js';

//Body
const bodyContent = document.querySelector('.page');

setTimeout(function () {
  bodyContent.classList.add('page_visible');
}, 1000);

setTimeout(function () {
  canvasBarChart.classList.add('canvas__visible');
  canvasLineChart.classList.add('canvas__visible');
  canvasPieChart.classList.add('canvas__visible');
}, 1500);

generateBarChart();
generateLineChart();
generatePieChart();

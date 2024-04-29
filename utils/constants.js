// Bar Chart
export const canvas = document.getElementById('bar_chart');
export const ctx = canvas.getContext('2d');

export const canvasWidth = canvas.clientWidth;
export const canvasHeight = canvas.clientHeight;

export const barChartForm = document.forms.bar_chart_form;
console.log(barChartForm);

export const barChartUserInput = barChartForm.elements.barUsername;
export const barChartPostInput = barChartForm.elements.barPostbody;
console.log(barChartUserInput, barChartPostInput);

export const barChartSubmitButton = document.querySelector('.chart__button-submit');
export const barChartResetButton = document.querySelector('.chart__button-reset');
console.log(barChartSubmitButton, barChartResetButton);

// Line Chart
export const canvasLineChart = document.getElementById('line_chart');
export const ctxLc = canvasLineChart.getContext('2d');

export const canvasWidthLc = canvasLineChart.clientWidth;
export const canvasHeightLc = canvasLineChart.clientHeight;

//Pie Chart
export const canvasPieChart = document.getElementById('pie_chart');
export const ctxPc = canvasPieChart.getContext('2d');

export const canvasWidthPc = canvasPieChart.clientWidth;
export const canvasHeightPc = canvasPieChart.clientHeight;

export const colors = [
  '#008080',
  '#e8702a',
  '#6bd2db',
  '#ffc0cb',
  '#800080',
  '#fdf498',
  '#f6546a',
  '#a0db8e',
  '#ffc3a0',
  '#8a2be2',
];

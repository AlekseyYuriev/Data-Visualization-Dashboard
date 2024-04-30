// Bar Chart
export const canvas = document.getElementById('bar_chart');
export const ctx = canvas.getContext('2d');

export const canvasWidth = canvas.clientWidth;
export const canvasHeight = canvas.clientHeight;

export const barChartForm = document.forms.bar_chart_form;

export const barChartUserInput = barChartForm.elements.barUsername;
export const barChartPostInput = barChartForm.elements.barPostbody;

export const barChartSubmitButton = document.querySelector('.bar-chart__button-submit');
export const barChartResetButton = document.querySelector('.bar-chart__button-reset');

// Line Chart
export const canvasLineChart = document.getElementById('line_chart');
export const ctxLc = canvasLineChart.getContext('2d');

export const canvasWidthLc = canvasLineChart.clientWidth;
export const canvasHeightLc = canvasLineChart.clientHeight;

export const lineChartForm = document.forms.line_chart_form;

export const lineChartUseremailInput = lineChartForm.elements.lineUseremail;
export const lineChartCommentBodyInput = lineChartForm.elements.lineCommentbody;

export const lineChartSubmitButton = document.querySelector('.line-chart__button-submit');
export const lineChartResetButton = document.querySelector('.line-chart__button-reset');

//Pie Chart
export const canvasPieChart = document.getElementById('pie_chart');
export const ctxPc = canvasPieChart.getContext('2d');

export const canvasWidthPc = canvasPieChart.clientWidth;
export const canvasHeightPc = canvasPieChart.clientHeight;

export const pieCartForm = document.forms.pie_chart_form;

export const pieChartUserInput = pieCartForm.elements.pieUsername;
export const pieChartPostInput = pieCartForm.elements.piePostbody;

export const pieChartSubmitButton = document.querySelector('.pie-chart__button-submit');
export const pieChartResetButton = document.querySelector('.pie-chart__button-reset');

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

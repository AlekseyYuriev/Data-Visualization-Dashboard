# Data-Visualization-Dashboard

<h2>1. Project description</h2>
This is a web application that fetches data from a provided API and displays it in a user-friendly dashboard using only vanilla JavaScript. The dashboard includes three types of data visualization components (bar chart, line chart, and pie chart). The goal is to demonstrate proficiency in data handling, DOM manipulation, and creative presentation of information. The visualization components are created from scratch using vanilla JavaScript. No use of libraries like D3.js or Chart.js for the charts.

<h2>2. Task requirements</h2>

- Use the JSONPlaceholder for mock data. Specifically, fetch data from the /users, /posts, and /comments endpoints to display user-related analytics

- Bar Chart: display the number of posts per user

- Line Chart: show the monthly comment trend based on the timestamp of the posts (you can simulate timestamps or create a mock setup since JSONPlaceholder doesn't provide dates)

- Pie Chart: illustrate the percentage distribution of posts among users

- Implement interactive filtering options to view data for specific users

- A `README.md` file in the repository detailing instructions on how to set up and run the project, along with a brief explanation of the project structure.

- A live demo link (optional but recommended)

<h2>3. How to run the app</h2>

- `git clone https://github.com/AlekseyYuriev/Data-Visualization-Dashboard.git` - clone the repository (HTTPS)
- Install "Live Server" extension, that helps to launch a local development server with live reload feature for static & dynamic pages.
- Open a project and click to `Go Live` from the status bar to turn the server on/off.

<h2>4. Description of the file structure</h2>

1. In the <strong>root</strong> folder you can find basic files of the app: index.html, index.css, script.js.
   <br>
2. <strong>modules</strong> folder contains .js files that implement the logic of the charts:

- `barChart.js` - for Bar Chart
- `lineChart.js` - for Line Chart
- `pieChart.js` - for Pie Chart

3. <strong>utils</strong> folder contains some additional files for the app:

- `constants.js` - includes all elements for DOM manipulation with forms, inputs, buttons and canvases.
- `service.js` - provides the function to fetch data from the API and handle an error if it occurs.
- `urls.js` - contains links to the JSONPlaceholder's data

<h2>5. Link to the deployed app</h2>

https://data-visualization-dashboard-sigma.vercel.app/

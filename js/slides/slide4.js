/**
 * Slide 4 - Content with Chart.js Visualization
 */

// HTML content of the slide
export const html = `
  <h2>Dynamic Charts</h2>
  <p>Interactive data visualization with Chart.js</p>
  
  <div style="width: 80%; height: 300px; margin: 0 auto; position: relative; border: 2px solid #ddd; background-color: #f9f9f9; padding: 10px; border-radius: 8px;">
    <canvas id="myChart"></canvas>
  </div>
  
  <div style="text-align: center; margin-top: 20px;">
    <button id="updateChartBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Update Data
    </button>
  </div>

  <aside class="notes">
    This slide showcases how we can integrate powerful data visualization libraries like Chart.js into our presentation framework. The chart displays two datasets with a smooth line visualization. During the presentation, click the "Update Data" button to demonstrate how the chart can be dynamically updated with new random values. This illustrates how our framework can handle complex third-party libraries and interactive elements while maintaining proper initialization and cleanup. Note how the slide module properly manages the chart instance lifecycle.
  </aside>
`;

// Chart instance
let myChart = null;

// Initialization function
export function initialize() {
  console.log('Slide 4 initialized');
  
  // Initialize the chart
  initializeChart();
  
  // Add event listener to the update button
  document.getElementById('updateChartBtn').addEventListener('click', updateChartData);
}

// Function to initialize the chart
function initializeChart() {
  // Get the chart canvas element
  const ctx = document.getElementById('myChart').getContext('2d');
  
  // Initial data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: 'rgba(93, 138, 168, 0.2)',
      borderColor: 'rgba(93, 138, 168, 1)',
      borderWidth: 2,
      data: [12, 19, 3, 5, 2, 3],
      fill: true,
      tension: 0.4
    }, {
      label: 'Dataset 2',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      data: [7, 11, 5, 8, 3, 7],
      fill: true,
      tension: 0.4
    }]
  };
  
  // Chart configuration
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Example'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    }
  };
  
  // Create the chart
  myChart = new Chart(ctx, config);
}

// Function to update the chart data
function updateChartData() {
  // Generate new random data
  const newData1 = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 1);
  const newData2 = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 1);
  
  // Update the chart datasets
  myChart.data.datasets[0].data = newData1;
  myChart.data.datasets[1].data = newData2;
  
  // Apply a random animation duration
  myChart.options.animation = {
    duration: 800 + Math.random() * 1200
  };
  
  // Update the chart
  myChart.update();
}

// Cleanup function
export function cleanup() {
  console.log('Slide 4 cleaned up');
  
  // Remove event listener
  document.getElementById('updateChartBtn').removeEventListener('click', updateChartData);
  
  // Destroy the chart to prevent memory leaks
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }
} 
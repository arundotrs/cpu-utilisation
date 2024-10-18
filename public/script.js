function updateCPUUtilization() {
    fetch('http://localhost:3000/cpu')
      .then(response => response.json())
      .then(data => {
        const cpuUsage = data.cpuUsage;
  
        const cpuBar = document.getElementById("cpu-bar");
        const cpuPercentText = document.getElementById("cpu-percent");
  
        cpuBar.style.width = cpuUsage + "%";
        cpuPercentText.textContent = cpuUsage + "%";
  
        if (cpuUsage < 50) {
          cpuBar.style.backgroundColor = "green";
        } else if (cpuUsage < 80) {
          cpuBar.style.backgroundColor = "yellow";
        } else {
          cpuBar.style.backgroundColor = "red";
        }
      })
      .catch(error => console.error('Error fetching CPU data:', error));
  }
  
  setInterval(updateCPUUtilization, 1000);
  
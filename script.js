document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav ul li a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Example: Open demo in new tab
    const demoButton = document.querySelector('#demo .btn-primary');
    demoButton.addEventListener('click', () => {
      window.open('https://codesandbox.io/s/your-demo-project', '_blank');
    });
  });
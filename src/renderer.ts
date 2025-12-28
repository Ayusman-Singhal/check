// Interface for the exposed API
interface ElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

// Augment the window object
interface Window {
  electronAPI: ElectronAPI;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Renderer loaded');
  const minBtn = document.getElementById('min-btn');
  const maxBtn = document.getElementById('max-btn');
  const closeBtn = document.getElementById('close-btn');

  console.log('Buttons:', { minBtn, maxBtn, closeBtn });

  minBtn?.addEventListener('click', () => {
    console.log('Minimize clicked');
    window.electronAPI.minimize();
  });

  maxBtn?.addEventListener('click', () => {
    console.log('Maximize clicked');
    window.electronAPI.maximize();
  });

  closeBtn?.addEventListener('click', () => {
    console.log('Close clicked');
    window.electronAPI.close();
  });

  // Navigation Logic
  const navItems = document.querySelectorAll('.nav-item[data-target]');
  const panels = document.querySelectorAll('.panel');

  console.log('Nav items found:', navItems.length);

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      console.log('Navigating to:', targetId);

      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');

      // Hide all panels
      panels.forEach(panel => panel.classList.remove('active'));
      
      // Show target panel
      const targetPanel = document.getElementById(`panel-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      } else {
        console.error('Panel not found:', `panel-${targetId}`);
      }
    });
  });

  // Theme Toggle Logic (in Settings)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

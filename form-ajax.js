// Enhanced Contact Form with AJAX
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(this);
      
      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Show success message
          showNotification('success', result.message);
          
          // Reset form
          this.reset();
          
          // Redirect to thanks page after 2 seconds
          setTimeout(() => {
            window.location.href = 'gracias.html';
          }, 2000);
          
        } else {
          // Show error message
          showNotification('error', result.message);
        }
        
      } catch (error) {
        console.error('Error:', error);
        showNotification('error', 'Error de conexión. Por favor intenta de nuevo.');
      }
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  }
  
  // Notification system
  function showNotification(type, message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.form-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `form-notification alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
      <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
});

// Vanilla JS for Interactive Elements

// Add subtle parallax effect to orbs on mousemove
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    // Reverse direction based on index to make them move nicely
    const factor = index % 2 === 0 ? 1 : -1;
    const moveX = (x * 40 - 20) * factor;
    const moveY = (y * 40 - 20) * factor;
    
    // We keep the original animation floating effect intact by using CSS transform
    // combined with a smooth transition in JS overriding the transform slightly
    // but a cleaner approach is setting custom properties
    orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Add hover 3D effect to cards
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
});

console.log('femboys.me Loaded Successfully ✨');

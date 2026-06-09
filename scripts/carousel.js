const track = document.querySelector(".skills-track");
const items = document.querySelectorAll(".skill-item");

if (track && items.length > 0) {
  let position = 0;
  let velocity = 0;

  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let lastTime = 0;

  const speed = 0.5;
  const friction = 0.92;

  function animate() {
    if (!isDragging) {
      position -= speed;
      position += velocity;
      velocity *= friction;

      if (Math.abs(velocity) < 0.1) {
        velocity = 0;
      }
    }

    const half = track.scrollWidth / 2;
    if (position <= -half) position += half;
    if (position >= 0) position -= half;

    track.style.transform = `translate3d(${position}px, 0, 0)`;

    applyEdgeAnim();
    requestAnimationFrame(animate);
  }

  function pointerDown(clientX) {
    isDragging = true;
    startX = clientX;
    lastX = clientX;
    lastTime = Date.now();
  }

  function pointerMove(clientX) {
    if (!isDragging) return;

    const now = Date.now();
    const dx = clientX - startX;

    position += dx;

    const dt = now - lastTime || 16;
    velocity = ((clientX - lastX) / dt) * 16;

    lastX = clientX;
    lastTime = now;
    startX = clientX;
  }

  function pointerUp() {
    if (!isDragging) return;
    isDragging = false;
  }

  function applyEdgeAnim() {
    const center = window.innerWidth / 2;
    const safeZone = Math.min(500, window.innerWidth * 0.32);
    const maxDistance = Math.max(window.innerWidth / 2 - safeZone, 1);

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distanceToCenter = Math.abs(center - itemCenter);

      let t = 0;

      if (distanceToCenter > safeZone) {
        const distancePastSafeZone = distanceToCenter - safeZone;
        t = Math.min(distancePastSafeZone / maxDistance, 1);
      }

      const scale = 1.2 - t * 0.8;
      const opacity = 1 - t * 0.5;

      item.style.transform = `scale(${scale}) translateZ(0)`;
      item.style.opacity = opacity;
    });
  }

  track.addEventListener("mousedown", (event) => pointerDown(event.clientX));
  window.addEventListener("mousemove", (event) => pointerMove(event.clientX));
  window.addEventListener("mouseup", pointerUp);
  window.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  track.addEventListener(
    "touchstart",
    (event) => pointerDown(event.touches[0].clientX),
    { passive: true }
  );
  window.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 0) {
        pointerMove(event.touches[0].clientX);
      }
    },
    { passive: true }
  );
  window.addEventListener("touchend", pointerUp);

  animate();
}

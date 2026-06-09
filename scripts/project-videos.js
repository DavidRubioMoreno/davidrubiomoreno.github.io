const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  const video = card.querySelector(".project-video");

  if (!video) return;

  const playVideo = () => {
    video.play().catch(() => {});
  };

  const pauseVideo = () => {
    video.pause();
  };

  card.addEventListener("mouseenter", playVideo);
  card.addEventListener("focusin", playVideo);
  card.addEventListener("mouseleave", pauseVideo);
  card.addEventListener("focusout", pauseVideo);
});

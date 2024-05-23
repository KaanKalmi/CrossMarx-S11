const button = document.getElementById("overslaan-button");
const button2 = document.getElementById("submit-button");
const audio = document.getElementById("clickSound");

button.addEventListener("click", () => {
  audio.currentTime = 0; // Reset playback position to avoid glitches
  audio.play();
});

button2.addEventListener("click", () => {
    audio.currentTime = 0; // Reset playback position to avoid glitches
    audio.play();
  });

const loginBtn = document.querySelector('.btn-green')
const requiredInputs = document.querySelectorAll('[required]')
const emailInput = document.querySelector('[type="email"]')
const formLogin = document.querySelector('form')
const ranges = document.querySelectorAll('[type="range"]')
console.log(formLogin)

const jsConfetti = new JSConfetti()
formLogin.addEventListener('submit', handleSubmit)
function handleSubmit(event) {
    if(validateForm()) {
        event.preventDefault(); 
        jsConfetti.addConfetti({
            confettiNumber: 100,
        })
        setTimeout(() => {       formLogin.submit();      }, 1000);
    }
    function validateForm() {    return true; } 
    
}

ranges.forEach((range, index) => {
    range.addEventListener('input', function(event) {
        console.log(range.value)
        console.log(`Slider ${index+1} is gewijzigd`); 
        const output = document.querySelector(`.selected .selected-${index+1}`);

        if (range.value == 5){
            console.log('jup')
            output.style.setProperty('--range-clr', "rgb(88, 187, 88)")

            jsConfetti.addConfetti({
                emojis: ['👍', '🌱', '💚', '✅'],
                emojiSize: 100,
                confettiNumber: 30,
            })
        }

        if (range.value == 4){
            output.style.setProperty('--range-clr', "#8EC58E")
        }
        if (range.value == 3){
            output.style.setProperty('--range-clr', "#98C098")
        }
        if (range.value == 2){
            output.style.setProperty('--range-clr', "#A1BDA1")
        }
        if (range.value == 1){
            output.style.setProperty('--range-clr', "#ACB8AC")
        }
        if (range.value == 0){
            output.style.setProperty('--range-clr', "#DDDDDD")
        }
        if (range.value == -1){
            output.style.setProperty('--range-clr', "#B9ABAB")
        }
        if (range.value == -2){
            output.style.setProperty('--range-clr', "#BDA1A1")
        }
        if (range.value == -3){
            output.style.setProperty('--range-clr', "#C19897")
        }
        if (range.value == -4){
            output.style.setProperty('--range-clr', "#C58E8E")
        }
        if (range.value == -5){
            console.log('nope')
            output.style.setProperty('--range-clr', "rgb(187 88 88)")
            jsConfetti.addConfetti({
                emojis: ['☹️', '💔', '❌', '👎'],
                emojiSize: 100,
                confettiNumber: 30,
            })
        }
    })
})
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
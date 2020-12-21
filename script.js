const firstButton = document.querySelector(".circle-one");
const secondButton = document.querySelector(".circle-two");
const body = document.body;

firstButton.addEventListener("click", (e) => {
  console.log("--> Clicked in first button");
  animatedScroll(secondButton);
});

secondButton.addEventListener("click", () => {
  console.log("--> Clicked in second button");

  animatedScroll(firstButton);
});

function easeInOutExpo(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  t--;
  return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
}

function animatedScroll(element, duration = 1000) {
    const startValue = window.scrollY;
    console.log(startValue)
    const yCoordToGo = getElementYCoord(element) > window.innerHeight
                        ? window.innerHeight
                        : getElementYCoord(element);
                        
     const distance = yCoordToGo - startValue;
    let startTime     

  animation()

  function animation() {
    requestAnimationFrame((currentTime) => {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        window.scroll(
            0,
            easeInOutExpo(timeElapsed, startValue, distance, duration)
        );

        
        if (timeElapsed < duration ) animation();
    });
  }
}

function getElementYCoord(element) {
  const elementYBoundaryCoord = element.getBoundingClientRect().top;
  const bodyYBoundaryCoord = document.body.getBoundingClientRect().top;

  return elementYBoundaryCoord - bodyYBoundaryCoord;
}

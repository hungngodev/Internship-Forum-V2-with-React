import simpleParallax from "simple-parallax-js";
var images = document.querySelectorAll("img");
new simpleParallax(images, {
  delay: 0.9,
  transition: "cubic-bezier(0,0,0,1)",
  scale: 1.6,
});
console.log("Hello world!");
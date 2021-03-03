import "../scss/main.scss";
import { drawTransceiver } from "./transceiver.js";
window.addEventListener("DOMContentLoaded", setup);

function setup() {
  const $space = document.getElementById("space");
  const $earth = document.getElementById("earth");
  const $mars = document.getElementById("mars");

  initPlanet([$earth, $mars]);

  setEvents($space);
}
function initPlanet(planets) {
  planets.forEach(($planet) => {
    drawTransceiver($planet);
  });
}
function setEvents($space) {
  addEvent($space, "input", ".send>input", ({ target }) => {
    const hex = translateDecToHex(target.value);
    const $planet = target.closest(".planet");
    console.log($planet);
    $planet.querySelector(".convertedBox").innerText = hex.join(" ");
  });
}

function convertText(value, type) {}
function translateDecToHex(dec) {
  return dec.split("").map((el) => el.charCodeAt(0).toString(16));
}
function translateHexToDec() {}

function addEvent($target, eventType, selector, callback) {
  const children = [...$target.querySelectorAll(selector)];
  const isTarget = (target) => {
    return children.includes(target) || target.closest(selector);
  };
  $target.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
}

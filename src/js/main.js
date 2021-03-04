import "../scss/main.scss";
import { drawTransceiver } from "./transceiver.js";

window.addEventListener("DOMContentLoaded", setup);

function setup() {
  const $mars = document.getElementById("mars");
  const $earth = document.getElementById("earth");
  initPlanet([$mars, $earth]);
  setEvents();
}
function initPlanet(planets) {
  planets.forEach(($planet) => {
    drawTransceiver($planet);
  });
}
function setEvents() {
  const $space = document.getElementById("space");
  $space.addEventListener("send", receiveMessage);

  addEvent($space, "input", ".send>input", ({ target }) => {
    const hex = target.value.split("").map(translateDecToHex);
    const $planet = getPlanet(target);
    $planet.querySelector(".convertedBox").innerText = hex.join(" ");
  });
  addEvent($space, "click", "[data-to]", ({ target }) => {
    const message = getSendMessage(getPlanet(target));
    const $targetPlanet = document.getElementById(`${target.dataset.to}`);
    sendMessage(target, $targetPlanet, message);
  });
  addEvent($space, "transitionend", ".camera", ({ target }) => {
    console.log("rotate done");
    // const char = getCharFromDegree(target);
    // const $targetPlanet = target.closest(".planet");
    // writeDownChar($targetPlanet, char);
  });
}
function sendMessage(target, $targetPlanet, message) {
  if (!message.length) {
    console.log("done");
    return;
  }
  const $camera = $targetPlanet.querySelector(".camera");

  let time = message[0].length;
  setTimeout(() => {
    const char = message.shift();
    time = char.length;
    const sendEvent = new CustomEvent("send", {
      bubbles: true,
      detail: {
        char,
        $camera,
      },
    });
    target.dispatchEvent(sendEvent);
    // writeDownChar($targetPlanet, char);
    sendMessage(target, $targetPlanet, message);
  }, time * 2000 + 2000);
}
function receiveMessage({ detail: { char, $camera } }) {
  const array = char.split("");
  array.forEach((char, i) => {
    console.log(char, i);
    rotateCamera($camera, char, i);
  });
  // const part = $targetPlanet.querySelector([`data-num=${char}`]);
  // console.log(part);
}
function rotateCamera($camera, char, i) {
  setTimeout(() => {
    $camera.style.transform = `rotate(${(i + 1) * 60}deg)`;
  }, 2000 * i);
}
function getDegree(char){
  // here
}
function writeDownChar($targetPlanet, char) {
  const dec = String.fromCharCode(translateHexToDec(char));
  $targetPlanet.querySelector(".reception input").value += dec;
}
function getPlanet(target) {
  return target.closest(".planet");
}
function getSendMessage($planet) {
  const convertedBox = $planet.querySelector(".convertedBox");
  const message = convertedBox.innerText;
  convertedBox.innerText = "";
  return message.split(" ");
}
function translateDecToHex(dec) {
  return dec.charCodeAt(0).toString(16);
}
function translateHexToDec(hex) {
  return parseInt(hex, 16);
}

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

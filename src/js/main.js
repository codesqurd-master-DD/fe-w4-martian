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
    const $targetPlanet = target.closest(".planet");
    const num = target.dataset.currentNum;
    writeDownNum($targetPlanet, num);
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
    sendMessage(target, $targetPlanet, message);
  }, time * 2000 + 1000);
}
function receiveMessage({ detail: { char, $camera } }) {
  const $targetPlanet = $camera.closest(".planet");
  writeDownNum($targetPlanet, " ");
  rotateCamera($camera, char);
}
function rotateCamera($camera, char) {
  console.log("char ", char);
  if (char === "") return;
  setTimeout(() => {
    const num = char[0];
    const degree = getDegree(num);
    $camera.style.transform = `rotate(${degree}deg)`;
    rotateCamera($camera, char.slice(1));
    $camera.dataset.currentNum = num;
  }, 2000);
}
function getDegree(num) {
  const target = document.querySelector(`[data-num='${num}']`);
  const st = window.getComputedStyle(target, null);
  const tr = st.getPropertyValue("transform");
  const values = tr.split("(")[1].split(")")[0].split(",");
  const [a, b] = values;

  const degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return degree;
}
function blinkPart(num) {
  const target = document.querySelector(`[data-num='${num}']`);
}
function writeDownNum($targetPlanet, num) {
  $targetPlanet.querySelector(".reception input").value += num;
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
  return dec.charCodeAt(0).toString(16).toUpperCase();
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

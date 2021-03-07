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
    blinkPart($targetPlanet, num);
  });
  addEvent($space, "click", ".translateBtn", ({ target }) => {
    const $targetPlanet = target.closest(".planet");
    const receptionBox = $targetPlanet.querySelector(".reception input");
    const convertArray = receptionBox.value.split(" ");
    receptionBox.value = "";
    convertArray.forEach((char) => {
      receptionBox.value += String.fromCharCode(translateHexToDec(char));
    });
  });
}
function sendMessage(target, $targetPlanet, message) {
  if (!message.length) return;
  const $camera = $targetPlanet.querySelector(".camera");
  let isDone = false;
  let time = message[0].length;
  setTimeout(() => {
    const char = message.shift();
    time = char.length;
    if (!message.length) isDone = true;
    const sendEvent = new CustomEvent("send", {
      bubbles: true,
      detail: {
        $targetPlanet,
        char,
        $camera,
        isDone,
      },
    });
    target.dispatchEvent(sendEvent);
    sendMessage(target, $targetPlanet, message);
  }, time * 2000 + 1000);
}
function receiveMessage({ detail: { $targetPlanet, char, $camera, isDone } }) {
  if (isDone) {
    setTimeout(() => {
      onTranslateBtn($targetPlanet);
    }, char.length * 2000 + 1000);
  }
  writeDownNum($targetPlanet, " ");
  rotateCamera($camera, char);
}
function rotateCamera($camera, char) {
  if (char === "") return;
  setTimeout(() => {
    const num = char[0];
    const targetPart = document.querySelector(`[data-num='${num}']`);
    const targetdegree = getDegree(targetPart);
    const cameraDegree = getDegree($camera);
    $camera.style.transform =
      cameraDegree !== targetdegree
        ? `rotate(${targetdegree}deg)`
        : `rotate(${targetdegree + 1}deg)`;
    $camera.dataset.currentNum = num;
    return rotateCamera($camera, char.slice(1));
  }, 2000);
}
function getDegree(target) {
  const st = window.getComputedStyle(target, null);
  const tr = st.getPropertyValue("transform");
  if (tr === "none") return 0;

  const values = tr.split("(")[1].split(")")[0].split(",");
  const [a, b] = values;

  const degree = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return degree;
}
function blinkPart($targetPlanet, num) {
  const target = $targetPlanet.querySelector(`[data-num='${num}']`);
  target.style.backgroundColor = "rgb(45, 176, 194)";
  setTimeout(() => {
    target.style.backgroundColor = "rgb(228, 117, 117)";
  }, 1000);
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
function onTranslateBtn($targetPlanet) {
  $targetPlanet.querySelector(".translateBtn").disabled = false;
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

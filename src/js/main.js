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
  $space.addEventListener("send", rotateCamera);

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
    // camera의 rotate가 끝나면 실행
    const char = getCharFromDegree(target);
    const $targetPlanet = target.closest(".planet");
    receiveMessage($targetPlanet, char);
  });
}
function sendMessage(target, $targetPlanet, message) {
  if (!message.length) {
    console.log("done");
    return;
  }
  let time = message[0].length;
  setTimeout(() => {
    const char = message.shift();
    time = char.length;
    const sendEvent = new CustomEvent("send", {
      bubbles: true,
      detail: {
        char,
        $targetPlanet,
      },
    });
    target.dispatchEvent(sendEvent);
    // receiveMessage($targetPlanet, char);
    sendMessage(target, $targetPlanet, message);
  }, time * 3000);
}
function rotateCamera({ detail: { char, $targetPlanet } }) {
  const camera = $targetPlanet.querySelector(".camera");
  console.log(char);
  // const part = $targetPlanet.querySelector([`data-num=${char}`]);
  // console.log(part);
}
function receiveMessage($targetPlanet, char) {
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

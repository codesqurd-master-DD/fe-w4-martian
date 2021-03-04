export function drawTransceiver($planet) {
  const $target = $planet.querySelector(".transceiverZone");
  $target.innerHTML = _createParts();
}

function _createParts() {
  const numbers = [...Array(10), "A", "B", "C", "D", "E", "F"];
  return numbers
    .map((num, i) => {
      return `<div class="part" style="transform:rotate(${
        22.5 * i
      }deg)">${num}</div>`;
    })
    .join("");
}
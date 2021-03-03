export function drawTransceiver($planet) {
  const $target = $planet.querySelector(".transceiver");
  $target.innerHTML = _createParts();
}

function _createParts() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  return numbers
    .map((num, i) => {
      return `<div class="part" style="transform:rotate(${
        22.5 * i
      }deg)">${num}</div>`;
    })
    .join("");
}

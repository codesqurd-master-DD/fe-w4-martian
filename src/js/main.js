import "../scss/main.scss";
import { drawTransceiver } from "./transceiver.js";

function DecToHex() {}
function HexToDec() {}

const transceiver = document.querySelector("#mars .transceiver");
drawTransceiver(transceiver);

import { switchcHtml1 } from "./datecalc.js";
import { switchcHtml2 } from "./timer.js";

const mainForm = document.getElementById("mainForm");
const btnDatecalc = document.getElementById("btnDatecalc");
const btnTimer = document.getElementById("btnTimer");

btnDatecalc.addEventListener('click', switchcHtml1);
btnTimer.addEventListener('click', switchcHtml2);





import { DateTime } from "./luxon.js";
// import { formatError } from "./utils.js";
import { loadScript } from "./load.js"

export function switchcHtml1() {
    mainForm.innerHTML = "";
    mainForm.insertAdjacentHTML("beforeend",
        `<form id="datecalc">
        <hr>
        <h3>Калькулятор дат</h3>
        <label>
            <strong>Первая дата:</strong>
            <input type="date" name="firstDate" />
        </label>
        <label>
            <strong>Вторая дата:</strong>
            <input type="date" name="secondDate" />
        </label>
        <button type="submit">Расчитать промежуток</button>
        <p id="datecalc__result"></p>
        <hr>
        </form>`);

    const dateCalcForm = document.getElementById("datecalc");
    const dateCalcResult = document.getElementById("datecalc__result");
    dateCalcForm.addEventListener("submit", handleCalcDates);

    function handleCalcDates(event) {
        dateCalcResult.innerHTML = "";
        event.preventDefault();

        let { firstDate, secondDate } = event.target.elements;
        firstDate = firstDate.value, secondDate = secondDate.value;

        if (firstDate && secondDate) {
            const diff = diffDates(firstDate, secondDate);
            dateCalcResult.innerHTML = diffToHtml(diff);
        }
        else {
            loadScript("./src/utils.js", function (error, script) {
                if (error) {
                    console.log(error);
                }
                else {
                    dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля");
                }
            });
        }
    }
}


function diffDates(firstDate, secondDate) {
    firstDate = DateTime.fromISO(firstDate);
    secondDate = DateTime.fromISO(secondDate);

    if (firstDate > secondDate)
        secondDate = [firstDate, firstDate = secondDate][0];

    return secondDate.diff(firstDate, ['years', 'months', 'days']).toObject();
}


const diffToHtml = diff => `
    <span> 
        ${diff.years ? 'Лет: ' + diff.years : ''} 
        ${diff.months ? 'Месяцев: ' + diff.months : ''} 
        ${diff.days ? 'Дней: ' + diff.days : ''}
    </span>
`;
import { pagos } from "./data";

pagos.forEach((item, indice) => {
  let fila = /*html */ `
        <tr>
            <td>${item.id}</td>
            <td>${item.nombre_concepto}</td>
            <td>
              <input type="number" value="${item.costo}" class="costo">
            </td>
            <td>
              <select class="porcentaje_descuento" ${
                item.aplica_descuento ? "" : "disabled"
              }>
                <option value="0" ${
                  item.porcentaje_descuento == 0 ? "selected" : ""
                }>0%</option>
                <option value="10" ${
                  item.porcentaje_descuento == 10 ? "selected" : ""
                }>10%</option>
                <option value="20" ${
                  item.porcentaje_descuento == 20 ? "selected" : ""
                }>20%</option>
              </select>
            </td>
            <td>
              <input type="number" value="${
                item.descuento
              }" class="descuento" readonly>
            </td>
            <td>
              <input type="number" value="${
                item.monto_pagar
              }" class="monto_pagar" readonly>
            </td>
            <td>
              <input type="checkbox" value="${item.desglose}" class="desglose">
            </td>
        </tr>
    `;

  document.querySelector("#tbody").innerHTML += fila;
});

function cambiarMontos(indice) {
  const costo = document.querySelectorAll(`.costo`)[indice].value;
  const porcentaje_descuento = document.querySelectorAll(
    `.porcentaje_descuento`
  )[indice].value;
  const montoDescuento = (costo * (porcentaje_descuento / 100)).toFixed(2);

  document.querySelectorAll(`.descuento`)[indice].value = montoDescuento;
  document.querySelectorAll(`.monto_pagar`)[indice].value = (
    costo - montoDescuento
  ).toFixed(2);
}

document.querySelectorAll(".costo").forEach((item, indice) => {
  item.addEventListener("input", () => {
    cambiarMontos(indice);
  });
});

document.querySelectorAll(".porcentaje_descuento").forEach((item, indice) => {
  item.addEventListener("change", () => {
    cambiarMontos(indice);
  });
});

//<input type="number" value="${item.porcentaje_descuento}" class="porcentaje_descuento" ${item.aplica_descuento ? '' : 'readonly' } min="0" max="100" step="1">

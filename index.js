const form = document.querySelector("#prestamo-form");
const prestamoExistente = localStorage.getItem('prestamo');
const cuotas = [3, 6, 9, 12, 15, 18];
const montos = [50000, 100000, 150000];

const renderOpcionesDeCuotas = () => {
  const selectCuotas = document.querySelector('#cuotas')

  cuotas.forEach(cantCuotas => {
    selectCuotas.innerHTML += `<option value="${cantCuotas}">${cantCuotas} cuotas</option>`
  });
}

const renderOpcionesDeMontos = () => {
  const selectMontos = document.querySelector('#montos')

  montos.forEach(monto => {
    selectMontos.innerHTML += `<option value="${monto}">$${monto}</option>`
  });
}

const getPrecioDolarBlue = async () => {
  let precios = await fetch('https://api.bluelytics.com.ar/v2/latest');
  precios = await precios.json();

  return precios.blue.value_sell;
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  let valores = e.target;

  let nombre = valores[0].value
  if (nombre == '') {
    Swal.fire({
      title: `Poné tu nombre!`,
      icon: "error"
    });
    return;
  }

  let cantidadDeCuotas = valores[1].value
  if (cantidadDeCuotas == '') {
    return;
  }

  let montoElegido = valores[2].value
  if (montoElegido == '') {
    return;
  }

  const precioDolarBlue = await getPrecioDolarBlue();

  const montoEquivalenteEnDolares = (montoElegido / precioDolarBlue).toFixed(2);
  const montoDeCuota = (montoElegido / cantidadDeCuotas).toFixed(2);

  Swal.fire({
    title: `Excelente ${nombre}!`,
    text: `Tu prestamo de $${montoElegido} a pagar en ${cantidadDeCuotas} cuotas de $${montoDeCuota} fue APROBADO!!\nEl total del prestamo equivale a ${montoEquivalenteEnDolares} USD...`,
    icon: "success"
  });
})

renderOpcionesDeCuotas();
renderOpcionesDeMontos();
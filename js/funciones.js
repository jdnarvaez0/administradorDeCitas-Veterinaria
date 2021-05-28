import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

//objeto con la info cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

let editando;

// agrega datos al objeto cita
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// valida y agrega una nueva cita a la clase citas
export function nuevaCita(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //validar
  if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
    ui.imprimirAlerta("Todos los mensajes son Obligatorios", "error");

    return;
  }

  if (editando) {
    // Estamos editando
    administrarCitas.editarCita({ ...citaObj });

    ui.imprimirAlerta("Guardado Correctamente");

    // regresar el estado orignal del boton
    formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

    editando = false;

  } else {
    // Generar un ID único
    citaObj.id = Date.now();

    // Añade la nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // Mostrar mensaje de que todo esta bien...
    ui.imprimirAlerta("Se agregó correctamente");
  }

  // Imprimir el HTML de citas
  ui.imprimirCitas(administrarCitas);

  // Reinicia el objeto para evitar futuros problemas de validación
  reiniciarObjeto();

  // Reiniciar Formulario
  formulario.reset();
}

export function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

export function eliminarCita(id) {
  administrarCitas.eliminarCita(id);

  //muester mensaje
  ui.imprimirAlerta("Ls cita se elimino correctamente");

  //resfrescar las citas
  ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // Llenar los Inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  // cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

  editando = true;
}
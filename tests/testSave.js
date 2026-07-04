import "../src/platform/node/register.js";
import { SaveManager } from "../src/core/saveManager.js";
const saves = new SaveManager();

// Crear entrenador

const trainer = saves.create("Elías");
console.log(trainer);

// Guardar

await saves.save(trainer);
console.log("Guardado correctamente.");

// Cargar

const loaded = await saves.load(

    trainer.trainer.uid

);

console.log(loaded);
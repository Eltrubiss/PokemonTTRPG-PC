import { mkdir, read, write } from "../storage/storage.js";
const SAVE_PATH = "./data/saves";

export class SaveManager {

    // -------------------------
    // Genera un ID aleatorio
    // -------------------------

    #generateId(length = 8) {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let uid = "";

        for (let i = 0; i < length; i++) {
            uid += chars[
                Math.floor(Math.random() * chars.length)
            ];
        }
        return uid;
    }

    // -------------------------
    // Crea un entrenador nuevo
    // -------------------------

    create(nombre) {
        return {

            version: "0.1.0",

            trainer: {

                uid: this.#generateId(),
                nombre,
                dinero: 0
            },

            party: [],
            boxes: [],
            inventory: {},
            campaign: {}

        };
    }

    // -------------------------
    // Guarda un entrenador
    // -------------------------

    async save(data) {
        await mkdir(SAVE_PATH);

        const uid = data.trainer.uid;
        await write(
            `${SAVE_PATH}/${uid}.json`,
            JSON.stringify(
                data,
                null,
                2
            )
        );

    }

    // -------------------------
    // Carga un entrenador
    // -------------------------

    async load(uid) {

        const raw = await read(
            `${SAVE_PATH}/${uid}.json`
        );

        return JSON.parse(raw);

    }

}
import { buscarEvoluciones } from "../evolution.js";
import { createConditions } from "../conditions.js";

export function buildEvolutions(chain, pokemonSlug) {

    const siguientes = buscarEvoluciones(
        chain,
        pokemonSlug
    );

    const evoluciones = [];

    for (const siguiente of siguientes) {

        const detalle = siguiente.evolution_details[0];

        const evolucion = {

            id: null,

            slug: siguiente.species.name,

            nombre: siguiente.species.name,

            condiciones: createConditions()

        };

        if (detalle) {

            if (detalle.min_level) {

                evolucion.condiciones.nivel = Math.max(
                    1,
                    Math.round(detalle.min_level / 5)
                );

            }

            if (detalle.trigger?.name === "trade") {

                evolucion.condiciones.intercambio = true;

            }

            if (detalle.trigger?.name === "use-item") {

                evolucion.condiciones.objeto =
                    detalle.item?.name ?? null;

            }

        }

        evoluciones.push(evolucion);

    }

    return evoluciones;

}
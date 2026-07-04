import { randomChoice } from "../utils/random.js";

export function resolveForm(
    rule,
    genero
) {

    switch (rule.type) {

        case "fixed":

            return rule.default;

        case "determined":

            if (rule.by === "gender") {

                return rule.forms[genero];

            }

            return rule.default;

        case "mutable":

            return rule.default;

        case "switch":

            return rule.default;

        case "choice":

            // Por ahora usamos la primera forma.
            // Más adelante podremos elegirla al azar
            // o dejar que el Director la seleccione.
            return rule.forms[0];

        case "temporary":

            return rule.default ?? "normal";

        default:

            return "normal";

    }

}
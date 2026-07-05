import {
    title,
    subtitle,
    field,
    separator,
    element
} from "../utils/elements.js";

import {
    getPokemon,
    getAbility,
    getNature,
    getMove
} from "../../core/database.js";

export function createPokemonDetails(db,pokemon) {

    const species =
        getPokemon(
            db,
            pokemon.speciesSlug
        );

    const ability =
        getAbility(
            db,
            pokemon.abilitySlug
        );

    const nature =
        pokemon.naturaleza
            ? getNature(
                db,
                pokemon.naturaleza
            )
            : null;

    const panel =
        element(
            "div",
            {
                className: "pokemon-details"
            }
        );

    panel.append(
        title(species.nombre),

        field(
            "Nivel",
            pokemon.nivel
        ),

        field(
            "Sexo",
            formatGender(
                pokemon.sexo
            )
        ),

        field(
            "Naturaleza",
            nature?.nombre ?? "-"
        ),

        field(
            "Habilidad",
            ability?.nombre ?? "-"
        ),

        separator(),

        subtitle(
            "Movimientos"
        )

    );

    panel.append(

        ...createMoveList(
            db,
            pokemon.moveSlug
        )

    );

    return panel;

}

function createMoveList(db,moveSlugs) {
    if (!moveSlugs.length) {
        return [
            field(
                "",
                "Sin movimientos"
            )
        ];
    }

    return moveSlugs.map(
        slug => {
            const move =
                getMove(
                    db,
                    slug
                );
            return field(
                "•",
                move?.nombre ?? slug
            );
        }
    );
}

function formatGender(gender) {

    switch (gender) {

        case "M":
            return "♂";

        case "F":
            return "♀";

        default:
            return "-";

    }

}

function getTraitText(
    nature,
    traitSlug
) {

    if (!nature)
        return "-";

    const trait =
        nature.rasgos.find(
            trait =>
                trait.slug === traitSlug

        );

    return trait?.texto ?? "-";
}

function createMoveList(db,moveSlugs) {

    if (!moveSlugs.length) {
        return [
            field(
                "",
                "Sin movimientos"
            )
        ];
    }

    return moveSlugs.map(
        slug => {
            const move =
                getMove(db,slug);
            return field(
                "•",
                move?.nombre ?? slug
            );
        }
    );
}
import { getPokemon } from "../core/database.js";
import { createPokemonModel } from "../models/pokemon-model.js";
import { generateGender } from "./generatorsFactory/genderFactory.js";
import { getFormRule } from "../../lib/pokemon/forms.js";
import { resolveAbility } from "./generatorsFactory/abilityFactory.js";
import { resolveForm } from "./generatorsFactory/formFactory.js";
import { resolveMoves } from "./generatorsFactory/learnsetsFactory.js";
import { resolveNature } from "./generatorsFactory/natureFactory.js";
import { resolveTrait } from "./generatorsFactory/traitFactory.js";

export function createPokemon( db, speciesSlug, level) {
    const species = getPokemon( db, speciesSlug);
    if (!species) {
    throw new Error(
        `No existe la especie ${speciesSlug}.`
        );
    }

    const genero = generateGender(species);
    const formRule = getFormRule( speciesSlug );
    const form = resolveForm(
        formRule,
        genero
    );
    const abilitySlug = resolveAbility(species);
    const moveSlug = resolveMoves(
        db,
        speciesSlug,
        form,
        level
    );
    const naturaleza = resolveNature(db);
    const rasgo = resolveTrait(
        db,
        naturaleza
    );
    console.log(
        `====================================================\n
        Creando Pokémon ${speciesSlug} de nivel ${level}:\n
        Forma ${form}, género ${genero}, habilidad ${abilitySlug}, movimientos ${moveSlug}, naturaleza ${naturaleza} y rasgo ${rasgo}.\n
        ====================================================`
    );

    return createPokemonModel(
        speciesSlug,
        {
            nivel: level,
            genero,
            form,
            abilitySlug,
            moveSlug,
            naturaleza,
            rasgo
        }

    );
}
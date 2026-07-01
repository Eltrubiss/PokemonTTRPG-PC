const FORM_DEFINITIONS = {

    normal: {
        nombre: "{pokemon}",
        temporal: false
    },

    male: {
        nombre: "{pokemon} Macho",
        temporal: false
    },

    female: {
        nombre: "{pokemon} Hembra",
        temporal: false
    },

    midday: {
        nombre: "{pokemon} Forma Diurna",
        temporal: false
    },

    midnight: {
        nombre: "{pokemon} Forma Nocturna",
        temporal: false
    },

    dusk: {
        nombre: "{pokemon} Forma Crepuscular",
        temporal: false
    },

    shield: {
        nombre: "{pokemon} Forma Escudo",
        temporal: true
    },

    blade: {
        nombre: "{pokemon} Forma Filo",
        temporal: true
    },

    heat: {
        nombre: " {pokemon} Horno",
        temporal: true
    },

    wash: {
        nombre: "{pokemon} Lavadora",
        temporal: true
    },

    frost: {
        nombre: "{pokemon} Heladera",
        temporal: true
    },

    fan: {
        nombre: "{pokemon} Ventilador",
        temporal: true
    },

    mow: {
        nombre: "{pokemon} Cortacésped",
        temporal: true
    },

    mega: {
        nombre: "Mega {pokemon}",
        temporal: true
    },

    "mega-x": {
        nombre: "Mega {pokemon} X",
        temporal: true
    },

    "mega-y": {
        nombre: "Mega {pokemon} Y",
        temporal: true
    }

};

export function hasForm(slug) {

    return slug !== "normal";

}

export function getFormSlug(speciesSlug, pokemonSlug) {

    if (pokemonSlug === speciesSlug)
        return "normal";

    return pokemonSlug.replace(
        `${speciesSlug}-`,
        ""
    );

}

export function getFormName(pokemonName, slug) {

    const template =
        FORM_DEFINITIONS[slug]?.nombre ?? slug;

    return template.replace(
        "{pokemon}",
        pokemonName
    );

}

export function isTemporaryForm(slug) {

    return FORM_DEFINITIONS[slug]?.temporal ?? false;

}
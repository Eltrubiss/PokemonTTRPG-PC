const FORM_DEFINITIONS = {

    normal: {
        nombre: "Normal",
        temporal: false
    },

    male: {
        nombre: "Macho",
        temporal: false
    },

    female: {
        nombre: "Hembra",
        temporal: false
    },

    midday: {
        nombre: "Diurna",
        temporal: false
    },

    midnight: {
        nombre: "Nocturna",
        temporal: false
    },

    dusk: {
        nombre: "Crepuscular",
        temporal: false
    },

    shield: {
        nombre: "Escudo",
        temporal: true
    },

    blade: {
        nombre: "Filo",
        temporal: true
    },

    heat: {
        nombre: "Calor",
        temporal: true
    },

    wash: {
        nombre: "Lavadora",
        temporal: true
    },

    frost: {
        nombre: "Frío",
        temporal: true
    },

    fan: {
        nombre: "Ventilador",
        temporal: true
    },

    mow: {
        nombre: "Cortacésped",
        temporal: true
    },

    mega: {
        nombre: "Mega",
        temporal: true
    },

    "mega-x": {
        nombre: "Mega X",
        temporal: true
    },

    "mega-y": {
        nombre: "Mega Y",
        temporal: true
    }

};

export function getFormSlug(speciesSlug, pokemonSlug) {

    if (pokemonSlug === speciesSlug)
        return "normal";

    return pokemonSlug.replace(
        `${speciesSlug}-`,
        ""
    );

}

export function getFormName(slug) {

    return FORM_DEFINITIONS[slug]?.nombre ?? slug;

}

export function isTemporaryForm(slug) {

    return FORM_DEFINITIONS[slug]?.temporal ?? false;

}
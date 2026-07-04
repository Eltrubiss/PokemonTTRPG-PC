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

const SPECIES_FORM_RULES = {

    aegislash: {
        type: "mutable",
        default: "shield",
        forms: [
            "shield",
            "blade"
        ]
    },

    basculin: {
        type: "choice",
        forms: [
            "normal",
            "red-striped",
            "blue-striped",
            "white-striped"
        ]
    },

    blastoise: {
        type: "temporary",
        forms: [
            "normal",
            "mega",
            "gmax"
        ]
    },

    butterfree: {
        type: "temporary",
        forms: [
            "normal",
            "gmax"
        ]
    },

    charizard: {
        type: "temporary",
        forms: [
            "normal",
            "mega-x",
            "mega-y"
        ]
    },

    castform: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "sunny",
            "rainy",
            "snowy"
        ]
    },

    deoxys: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "attack",
            "defense",
            "speed"
        ]
    },

    darmanitan: {
        type: "mutable",
        groups: {
            normal: [
                "normal",
                "zen"
            ],
            galar: [
                "galar-standard",
                "galar-zen"
            ]
        }
    },

    darumaka: {
        type: "determined",
        forms: [
            "normal",
            "galar"
        ]
    },

    dialga: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "origin"
        ]
    },

    frillish: {
        type: "determined",
        by: "gender",
        forms: {
            M: "male",
            F: "normal"
        }
    },

    garbodor: {
        type: "temporary",
        forms: [
            "normal",
            "gmax"
        ]
    },

    garchomp: {
        type: "temporary",
        forms: [
            "normal",
            "mega",
            "mega-z"
        ]
    },

    gardevoir: {
        type: "temporary",
        forms: [
            "normal",
            "mega"
        ]
    },

    giratina: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "altered",
            "origin"
        ]
    },

    greninja: {
        type: "temporary",
        forms: [
            "normal",
            "battle-bond",
            "ash",
            "mega"
        ]
    },

    jellicent: {
        type: "determined",
        by: "gender",
        forms: {
            M: "male",
            F: "normal"
        }
    },

    keldeo: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "ordinary",
            "resolute"
        ]
    },

    kyogre: {
        type: "temporary",
        forms: [
            "normal",
            "primal"
        ]
    },

    kyurem: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "black",
            "white"
        ]
    },

    landorus: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "incarnate",
            "therian"
        ]
    },

    lilligant: {
        type: "determined",
        forms: [
            "normal",
            "hisui"
        ]
    },

    lucario: {
        type: "temporary",
        forms: [
            "normal",
            "mega",
            "mega-z"
        ]
    },

    lycanroc: {
        type: "choice",
        forms: [
            "midday",
            "midnight",
            "dusk"
        ]
    },

    meowstic: {
        type: "determined",
        by: "gender",
        forms: {
            M: "normal",
            F: "female"
        }
    },

    meloetta: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "aria",
            "pirouette"
        ]
    },

    oinkologne: {
        type: "determined",
        by: "gender",
        forms: {
            M: "normal",
            F: "female"
        }
    },

    palkia: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "origin"
        ]
    },

    pikachu: {
        type: "temporary",
        forms: [
            "normal",
            "rock-star",
            "belle",
            "pop-star",
            "phd",
            "libre",
            "cosplay",
            "hoenn-cap",
            "sinnoh-cap",
            "unova-cap",
            "kalos-cap",
            "alola-cap",
            "partner-cap",
            "starter",
            "world-cap",
            "gmax"
        ]
    },

    pidgeot: {
        type: "temporary",
        forms: [
            "normal",
            "mega"
        ]
    },

    rattata: {
        type: "determined",
        forms: [
            "normal",
            "alola"
        ]
    },

    raticate: {
        type: "determined",
        forms: [
            "normal",
            "alola",
            "totem-alola"
        ]
    },

    rotom: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "heat",
            "wash",
            "frost",
            "fan",
            "mow"
        ]
    },

    samurott: {
        type: "determined",
        forms: [
            "normal",
            "hisui"
        ]
    },

    shaymin: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "land",
            "sky"
        ]
    },

    stunfisk: {
        type: "determined",
        forms: [
            "normal",
            "galar"
        ]
    },

    thundurus: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "incarnate",
            "therian"
        ]
    },

    tornadus: {
        type: "switch",
        default: "normal",
        forms: [
            "normal",
            "incarnate",
            "therian"
        ]
    },

    venusaur: {
        type: "temporary",
        forms: [
            "normal",
            "mega",
            "gmax"
        ]
    },

    wormadam: {
        type: "choice",
        forms: [
            "plant",
            "sandy",
            "trash"
        ]
    },

    yamask: {
        type: "determined",
        forms: [
            "normal",
            "galar"
        ]
    },

    zorua: {
        type: "determined",
        forms: [
            "normal",
            "hisui"
        ]
    },

    zoroark: {
        type: "determined",
        forms: [
            "normal",
            "hisui"
        ]
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

export function getFormRule(species) {

    return SPECIES_FORM_RULES[species] ?? {

        type: "fixed",

        default: "normal",

        forms: [

            "normal"

        ]

    };

}
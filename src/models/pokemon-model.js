export function createPokemonModel(
    speciesSlug,
    options = {}
) {
 return {

        uid: generateUid(),
        speciesSlug,
        form: options.form ?? "normal",
        apodo: options.apodo ?? "",
        sexo: options.genero ?? null,
        naturaleza: options.naturaleza ?? null,
        rasgo: options.rasgo ?? null,
        nivel: options.nivel ?? 1,
        abilitySlug: options.abilitySlug ?? null,
        moveSlug: options.moveSlug ?? []

    };
}

function generateUid(length = 8) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let uid = "";

    for (let i = 0; i < length; i++) {

        uid += chars[
            Math.floor(
                Math.random() * chars.length
            )
        ];

    }

    return uid;

}
export function getSpanishName(names, fallback = "") {

    const spanish = names.find(
        n => n.language.name === "es"
    );

    return spanish?.name ?? fallback;

}
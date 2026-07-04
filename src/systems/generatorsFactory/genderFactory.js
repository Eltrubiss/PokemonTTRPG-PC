export function generateGender(species) {

    const gender = species.genero;

    if (!gender)
        return "N";
    
    if (gender.macho === 100)
        return "M";

    if (gender.hembra === 100)
        return "F";

    if (gender.macho === 0 &&
        gender.hembra === 0)
        return "N";

    const roll = Math.random() * 100;

    return roll < gender.macho
        ? "M"
        : "F";

}
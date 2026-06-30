import { getType } from "../api.js";
import { getSpanishName } from "../translator.js";

export async function buildTypes(typesData) {

    const tipos = [];

    for (const tipo of typesData) {

        const typeData = await getType(
            tipo.type.url
        );

        tipos.push(

            getSpanishName(
                typeData.names,
                tipo.type.name
            )

        );

    }

    return tipos;

}
export function buildInheritance(
    baseMoves,
    formMoves
) {

    const base = new Map();
    const form = new Map();

    for (const move of baseMoves) {
        base.set(
            move.slug,
            move
        );
    }

    for (const move of formMoves) {
        form.set(
            move.slug,
            move
        );
    }

    const learn = [];
    const forget = [];

    for (const move of formMoves) {

        const original = base.get(
            move.slug
        );

        if (!original) {
            learn.push(move);
            continue;
        }

        if (original.nivel !== move.nivel) {
            forget.push(original);
            learn.push(move);
        }

    }

    for (const move of baseMoves) {
        if ( !form.has(move.slug)) {
            forget.push(move);
        }
    } return {
        learn,
        forget
    };

}
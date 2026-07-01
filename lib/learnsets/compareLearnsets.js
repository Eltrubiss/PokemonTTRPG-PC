export function compareLearnsets(baseMoves, formMoves) {
    const baseMap = new Map();
    const formMap = new Map();

    for (const move of baseMoves) {
        baseMap.set(move.slug, move);
    }

    for (const move of formMoves) {
        formMap.set(move.slug, move);
    }

    const learn = [];
    const forget = [];

    for (const move of formMoves) {
        const original = baseMap.get(move.slug);
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
        if (!formMap.has(move.slug)) {
            forget.push(move);
        }
    }
    const result = {};

    if (learn.length) {
        result.learn = learn;
    }
    
    if (forget.length) {
        result.forget = forget;
    }

    return result;
}
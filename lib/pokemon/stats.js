export function buildStats(statsData) {

    const stats = {};

    for (const stat of statsData) {

        switch (stat.stat.name) {

            case "hp":
                stats.hp = stat.base_stat;
                break;

            case "attack":
                stats.atk = stat.base_stat;
                break;

            case "defense":
                stats.def = stat.base_stat;
                break;

            case "special-attack":
                stats.sp_atk = stat.base_stat;
                break;

            case "special-defense":
                stats.sp_def = stat.base_stat;
                break;

            case "speed":
                stats.speed = stat.base_stat;
                break;

        }

    }

    return stats;

}
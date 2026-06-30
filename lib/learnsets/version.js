const VERSION_PRIORITY = [
    "scarlet-violet",
    "brilliant-diamond-and-shining-pearl"
];

export function getBestVersion(details) {

    for (const version of VERSION_PRIORITY) {
        const match = details.find(
            detail => detail.version_group.name === version
        );

        if (match) {
            return match;
        }
    }
    return null;
}
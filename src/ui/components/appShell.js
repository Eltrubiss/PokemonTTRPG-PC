import { element, panel } from "../utils/elements.js";

export function createAppShell() {
    const app = element("div", { className: "app-shell" });

    const topBar = element("header", { className: "top-bar" });
    topBar.append(
        createBrand(),
        createStatusGroup([
            ["Entrenador", "Slot 1"],
            ["Caja actual", "Caja 1", "current-box-name"]
        ])
    );

    const pcPanel = panel({ title: "PC Pokémon", className: "pc-panel" });
    pcPanel.body.append(
        element("div", { id: "box-summary", className: "box-summary" }),
        element("div", { id: "pokemon-grid", className: "pokemon-grid" })
    );

    app.append(topBar, pcPanel.container);

    return app;
}

function createBrand() {
    const brand = element("div", { className: "brand" });
    brand.append(
        element("span", { text: "Pokémon TTRPG", className: "brand__title" }),
        element("span", { text: "PC del entrenador", className: "brand__subtitle" })
    );
    return brand;
}

function createStatusGroup(items) {
    const group = element("div", { className: "trainer-summary" });

    for (const [label, value, id] of items) {
        const item = element("div", { className: "trainer-summary__item" });
        item.append(
            element("span", { text: label, className: "trainer-summary__label" }),
            element("strong", {
                text: value,
                id: id ?? "",
                className: "trainer-summary__value"
            })
        );
        group.append(item);
    }

    return group;
}

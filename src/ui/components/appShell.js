import { button, element, panel } from "../utils/elements.js";

export function createAppShell() {
    const app = element("div", { className: "app-shell" });

    const topBar = element("header", { className: "top-bar" });
    topBar.append(
        createBrand(),
        createStatusGroup([
            ["Entrenador", "Sin registrar"],
            ["Dinero", "₽ 0"],
            ["Caja", "Caja 1"]
        ])
    );

    const main = element("main", { className: "workspace" });
    const leftPanel = panel({ title: "Almacenamiento", className: "storage-panel" });
    const rightPanel = panel({ title: "Información", className: "details-panel" });

    leftPanel.body.append(
        createSearchPlaceholder(),
        element("div", { id: "box-summary", className: "box-summary" }),
        element("div", { id: "pokemon-list", className: "pokemon-list" })
    );

    rightPanel.body.append(element("div", { id: "pokemon-details" }));

    main.append(leftPanel.container, rightPanel.container);

    const actionBar = element("footer", { className: "action-bar" });
    actionBar.append(
        button("Crear Pokémon", { id: "create-pokemon", variant: "primary" }),
        button("Liberar", { id: "release-pokemon", disabled: true }),
        button("Mover", { id: "move-pokemon", disabled: true }),
        button("Cambiar Caja", { id: "change-box", disabled: true }),
        button("Renombrar", { id: "rename-pokemon", disabled: true })
    );

    app.append(topBar, main, actionBar);

    return app;
}

function createBrand() {
    const brand = element("div", { className: "brand" });
    brand.append(
        element("span", { text: "Pokémon TTRPG", className: "brand__title" }),
        element("span", { text: "PC Manager", className: "brand__subtitle" })
    );
    return brand;
}

function createStatusGroup(items) {
    const group = element("div", { className: "trainer-summary" });

    for (const [label, value] of items) {
        const item = element("div", { className: "trainer-summary__item" });
        item.append(
            element("span", { text: label, className: "trainer-summary__label" }),
            element("strong", { text: value, className: "trainer-summary__value" })
        );
        group.append(item);
    }

    return group;
}

function createSearchPlaceholder() {
    const search = element("label", { className: "search-placeholder" });
    search.append(
        element("span", { text: "Buscar" }),
        element("input", {
            attributes: {
                type: "search",
                placeholder: "Próximamente",
                disabled: ""
            }
        })
    );
    return search;
}

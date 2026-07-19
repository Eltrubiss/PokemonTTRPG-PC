export function element(tag, options = {}) {
    const node = document.createElement(tag);
    const {
        text = "",
        className = "",
        id = "",
        type = "",
        ariaLabel = "",
        dataset = {},
        attributes = {}
    } = options;

    if (text !== "") node.textContent = text;
    if (className) node.className = className;
    if (id) node.id = id;
    if (type) node.type = type;
    if (ariaLabel) node.setAttribute("aria-label", ariaLabel);

    for (const [key, value] of Object.entries(dataset)) {
        node.dataset[key] = value;
    }

    for (const [key, value] of Object.entries(attributes)) {
        node.setAttribute(key, value);
    }

    return node;
}

export function title(text) {
    return element("h2", { text, className: "title" });
}

export function subtitle(text) {
    return element("h3", { text, className: "subtitle" });
}

export function separator() {
    return element("hr", { className: "separator" });
}

export function field(label, value) {
    const container = element("div", { className: "field" });

    container.append(
        element("span", {
            text: label ? `${label}:` : "",
            className: "field-label"
        }),
        element("span", {
            text: value ?? "-",
            className: "field-value"
        })
    );

    return container;
}

export function button(text, options = {}) {
    const control = element("button", {
        text,
        type: "button",
        className: options.variant
            ? `button button--${options.variant}`
            : "button",
        id: options.id ?? "",
        attributes: options.disabled ? { disabled: "" } : {}
    });

    if (options.onClick) {
        control.addEventListener("click", options.onClick);
    }

    return control;
}

export function panel({ title: panelTitle, className = "", bodyClassName = "" } = {}) {
    const container = element("section", {
        className: ["panel", className].filter(Boolean).join(" ")
    });

    if (panelTitle) {
        container.append(element("header", {
            text: panelTitle,
            className: "panel-header"
        }));
    }

    const body = element("div", {
        className: ["panel-body", bodyClassName].filter(Boolean).join(" ")
    });

    container.append(body);

    return { container, body };
}

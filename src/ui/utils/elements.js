export function element( tag, {text = "",className = "",id = ""} = {} ) {
    const node = document.createElement(tag);

    if (text)
        node.textContent = text;

    if (className)
        node.className = className;

    if (id)
        node.id = id;

    return node;

}

export function title(text) {

    return element(
        "h2",
        {
            text,
            className: "title"
        }
    );

}

export function subtitle(text) {
    return element(
        "h3",
        {
            text,
            className: "subtitle"
        }
    );
}

export function separator() {
    return element(
        "hr",
        {
            className: "separator"
        }
    );
}

export function field( label, value ) {
    const container = element(
        "div",
        {
            className: "field"
        }
    );

    container.append(
        element(
            "span",
            {
                text: `${label}:`,
                className: "field-label"
            }
        ),

        element(
            "span",
            {
                text: value,
                className: "field-value"
            }
        )

    );

    return container;

}
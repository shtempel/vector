function clear() {
    view.getCanvasContext().clearRect(0, 0, view.getCanvas().width, view.getCanvas().height);
}

function color(colorField) {
    if (colorField.value === "") {
        return "black";
    } else {
        return colorField.value;
    }
}

function number(figures) {
    return figures.length;
}

function deselect() {
    for (var i = 0; i < 3; i++) {
        view.getFiguresButtons()[i].removeAttribute("selected");
    }
}

function selectShapeMenu(li) {
    deselect();
    li.setAttribute("selected", "true");
}

function removeFigure(figures) {
    for (var i = 0; i < figures.length; i++) {
        if (figures[i].selected) {
            // delete(figure[i]);
            figures.splice(i, 1);
        }
    }
}
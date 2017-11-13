'use strict';

VECTORAPP.controller = (function () {

    var model = VECTORAPP.model,
        view = VECTORAPP.view,
        figures = [],
        shape = new Shape(),
        mouse = {
            xUp: 0,
            yUp: 0,
            xDown: 0,
            yDown: 0,
            xMove: 0,
            yMove: 0
        };

    view.getCanvas().onmousemove = function (event) {
        mouse.xMove = event.pageX;
        mouse.yMove = event.pageY;
    };

    view.getCanvas().onmousedown = function (event) {
        mouse.down = true;
        mouse.xDown = event.pageX;
        mouse.yDown = event.pageY;
    };

    view.getCanvas().onmouseup = function (event) {
        mouse.xUp = event.pageX;
        mouse.yUp = event.pageY;
    };

    view.pageElements.ul.addEventListener("click", onUlClick);


    view.render(figures, mouse);

    view.getCanvas().onclick = function () {

        switch (getClickedButton()) {
            case 'square':
                figures.push(new Rect(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - mouse.xDown, mouse.yUp - mouse.yDown, shape.setColor(color(view.pageElements.colorField)), shape.setNumber(number(figures)), shape.setType(getClickedButton())));
                break;
            case 'circle':
                figures.push(new Circle(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - mouse.xDown, 0, 2 * Math.PI, shape.setColor(color(view.pageElements.colorField)), shape.setNumber(number(figures)), shape.setType(getClickedButton())));
                break;
            case 'line':
                figures.push(new Line(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - 175, mouse.yUp - 41, shape.setColor(color(view.pageElements.colorField)), shape.setNumber(number(figures)), shape.setType(getClickedButton())));
                break;
        }

        for (var i in figures) {
            if (figures[i].isCursorInFigure(mouse)) {
                figures[i].select();
            }
        }
        deselect();
    };

    function getClickedButton() {
        for (var i = 0; i < view.getFiguresButtons().length; i++) {
            if (view.getFiguresButtons()[i].getAttribute("selected") === 'true') {
                var clicked = view.getFiguresButtons()[i].getAttribute("id").valueOf();
            }
        }
        return clicked;
    }


    function onUlClick(event) {
        var target = event.target;
        if (target.tagName !== "LI") return;
        selectShapeMenu(target);
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

    function getFiguresButtons() {
        return [view.pageElements.squareButton, view.pageElements.circleButton, view.pageElements.lineButton];
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

})();
'use strict';

VECTORAPP.controller = (function () {

    var view = VECTORAPP.view,
        jsonUtils = VECTORAPP.jsonUtils,
        figures = VECTORAPP.data.figures,
        shape = new Shape(),
        ulArea = view.pageElements.ul,
        colorField = view.pageElements.colorField,
        jsonField = view.pageElements.jsonField,

        mouse = {
            xUp: 0,
            yUp: 0,
            xDown: 0,
            yDown: 0,
            xMove: 0,
            yMove: 0
        },

        clickCases = {
            save: 'save-json-btn',
            load: 'load-json-btn',
            clear: 'clear-btn',
            square: 'square',
            circle: 'circle',
            line: 'line',
            color: 'change-clr-btn'
        };

    view.render(figures, mouse);

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

    ulArea.addEventListener("click", onUlClick);

    document.addEventListener('click', function (e) {

        var target = e.target.id;

        switch (target) {

            case clickCases.save:
                jsonUtils.toJson(jsonField);
                break;

            case clickCases.load:
                jsonUtils.fromJson(jsonField);
                break;

            case clickCases.clear:
                removeAll();
                break;

            case clickCases.color:
                changeColor();
                break;

        }
    });


    view.getCanvas().onclick = function () {

        switch (getClickedButton()) {

            case clickCases.square:
                figures.push(new Rect(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - mouse.xDown, mouse.yUp - mouse.yDown, shape.setColor(getColor(colorField)), shape.setNumber(figures.length), shape.setType(clickCases.square)));
                break;

            case clickCases.circle:
                figures.push(new Circle(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - mouse.xDown, 0, 2 * Math.PI, shape.setColor(getColor(colorField)), shape.setNumber(figures.length), shape.setType(clickCases.circle)));
                break;

            case clickCases.line:
                figures.push(new Line(mouse.xDown - 175, mouse.yDown - 41, mouse.xUp - 175, mouse.yUp - 41, shape.setColor(getColor(colorField)), shape.setNumber(figures.length), shape.setType(clickCases.line)));
                break;

        }

        for (var i in figures) {
            if (figures[i].isCursorInFigure(mouse)) {
                figures[i].select();
            }
        }
        deselect();
    };

    view.getCanvas().ondblclick = function () {
        for (var i in figures) {
            if (figures[i].isCursorInFigure(mouse)) {
                figures[i].move();
            }
        }
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


    function getColor(colorField) {
        if (colorField.value === "") {
            return "black";
        } else {
            return colorField.value;
        }
    }

    function removeAll() {
        for (var i = figures.length; i--;) {
            figures.splice(i, 1);
        }
    }

    function changeColor() {
        for (var i in figures) {
            if (figures[i].selected)
                figures[i].color = getColor(view.pageElements.colorField);
        }
    }

})();
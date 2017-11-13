/*var Shape = function () {

};

Shape.prototype = {
    setNumber: function (number) {
        return number;
    },

    setColor: function (color) {
        return color
    },

    setType: function (type) {
        return type;
    },

    select: function () {
        this.selected = !this.selected;
    }
};

var View = function () {
};

View.prototype = {
    pageElements: {
        squareButton: document.getElementById("square"),
        circleButton: document.getElementById("circle"),
        lineButton: document.getElementById("line"),
        ul: document.getElementById("figures"),
        colorField: document.getElementById("color_field"),
        clearButton: document.getElementById("clear_btn"),
        changeColorButton: document.getElementById("change_clr_btn"),
        saveToJsonButton: document.getElementById("save_json_btn"),
        loadFromJsonButton: document.getElementById("load_json_btn"),
        jsonField: document.getElementById("json_txt_field")
    },

    getFiguresButtons: function () {
        return [view.pageElements.squareButton, view.pageElements.circleButton, view.pageElements.lineButton];
    },

    getCanvas: function () {
        return document.getElementById("canvas");
    },

    getCanvasContext: function () {
        return view.getCanvas().getContext('2d');
    },

    render: function (figures, mouse) {
        view.getCanvasContext().strokeStyle = "black";
        view.getCanvasContext().lineWidth = 2;
        setInterval(function () {
                view.getCanvasContext().clearRect(0, 0, view.getCanvas().width, view.getCanvas().height);
                for (var i = 0; i < figures.length; i++) {
                    figures[i].draw();
                    if (figures[i].selected) {
                        figures[i].drawSelected();
                    }
                    if (figures[i].moving) {
                        figures[i].goTo(mouse);
                    }
                }
            }, 60
        );
    }
};

var Controller = function (shape, view) {

    var figures, mouse;
    figures = [];
    mouse = {
        xUp: 0,
        yUp: 0,
        xDown: 0,
        yDown: 0,
        xMove: 0,
        yMove: 0
    };


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

    view.getCanvas().ondblclick = function () {
        for (var i in figures) {
            if (figures[i].isCursorInFigure(mouse)) {
                figures[i].move();
            }
        }
    };

    view.pageElements.clearButton.addEventListener("click", removeAll);
    view.pageElements.ul.addEventListener("click", onUlClick);
    view.pageElements.changeColorButton.addEventListener("click", changeColor);
    view.pageElements.saveToJsonButton.addEventListener("click", toJson);
    view.pageElements.loadFromJsonButton.addEventListener("click", fromJson);

    document.onkeydown = function (event) {
        if (event.keyCode === 46) {
            removeFigure(figures);
        }
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

    function onUlClick(event) {
        var target = event.target;
        if (target.tagName !== "LI") return;
        selectShapeMenu(target);
    }

    function getClickedButton() {
        for (var i = 0; i < view.getFiguresButtons().length; i++) {
            if (view.getFiguresButtons()[i].getAttribute("selected") === 'true') {
                var clicked = view.getFiguresButtons()[i].getAttribute("id").valueOf();
            }
        }
        return clicked;
    }

    function removeAll() {
        for (var i = figures.length; i--;) {
            figures.splice(i, 1);
        }
    }

    function changeColor() {
        for (var i in figures) {
            if (figures[i].selected)
                figures[i].color = color(view.pageElements.colorField);
        }
    }

    function toJson() {
        view.pageElements.jsonField.value = JSON.stringify(figures);

    }

    function fromJson() {
        var json;
        json = JSON.parse(view.pageElements.jsonField.value);
        removeAll();
        var newArray = json;
        for (var i = 0; i < newArray.length; i++) {
            switch (newArray[i].type) {
                case "square":
                    figures.push(new Rect(newArray[i].x, newArray[i].y, newArray[i].w, newArray[i].h, newArray[i].color, newArray[i].number, newArray[i].type));
                    break;
                case "circle":
                    figures.push(new Circle(newArray[i].x, newArray[i].y, newArray[i].r, newArray[i].startAngle, newArray[i].endAngle, newArray[i].color, newArray[i].number, newArray[i].type));
                    break;
                case "line":
                    figures.push(new Line(newArray[i].x, newArray[i].y, newArray[i].x2, newArray[i].y2, newArray[i].color, newArray[i].number, newArray[i].type));
                    break;
            }
        }
    }
};

var shape = new Shape();
var view = new View();
Controller(shape, view);*/
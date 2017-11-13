'use strict';

VECTORAPP.view = (function () {
    //var model = VECTORAPP.model;
    var view = {
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

    return view;

})();
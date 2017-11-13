'use strict';

VECTORAPP.jsonUtils = (function () {
    var figures = VECTORAPP.data.figures,
        jsonUtils;

    jsonUtils = {
        toJson: (function (jsonField) {
            jsonField.value = JSON.stringify(figures);
        }),

        fromJson: (function (jsonField) {
            var json = JSON.parse(jsonField.value);
            removeAll(figures);
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
        })
    };

    function removeAll() {
        for (var i = figures.length; i--;) {
            figures.splice(i, 1);
        }
    }

    return jsonUtils;

})();
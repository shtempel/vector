var hRect;
hRect = 20;

function Rect(x, y, w, h, color, number, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.number = number;
    this.type = type;
}

Rect.prototype = new Shape();
Rect.prototype.draw = function () {
    view.getCanvasContext().strokeStyle = this.color;
    view.getCanvasContext().strokeRect(this.x, this.y, this.w, this.h);
};

Rect.prototype.drawSelected = function () {
    view.getCanvasContext().strokeStyle = "gray";
    view.getCanvasContext().strokeRect(this.x - 6, this.y - 6, this.w + 12, this.h + 12);
};
Rect.prototype.select = function () {
    this.selected = !this.selected;
};

Rect.prototype.isCursorInFigure = function (mouse) {
    return mouse.xMove - 175 > this.x && mouse.xMove - 175 < this.x + this.w &&
        mouse.yMove - 41 > this.y && mouse.yMove - 41 < this.y + this.h;
};

Rect.prototype.move = function () {
    this.moving = !this.moving;
};

Rect.prototype.goTo = function (mouse) {
    this.x = mouse.xMove - 175 - this.w / 2;
    this.y = mouse.yMove - 41 - this.h / 2;
};

function Circle(x, y, r, startAngle, endAngle, color, number, type) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
    this.number = number;
    this.type = type;
}

Circle.prototype = new Shape();
Circle.prototype.draw = function () {
    view.getCanvasContext().strokeStyle = this.color;
    view.getCanvasContext().beginPath();
    view.getCanvasContext().arc(this.x, this.y, Math.abs(this.r), this.startAngle, this.endAngle);
    view.getCanvasContext().stroke();
    view.getCanvasContext().closePath();
};

Circle.prototype.drawSelected = function () {
    view.getCanvasContext().strokeStyle = "gray";
    view.getCanvasContext().beginPath();
    view.getCanvasContext().arc(this.x, this.y, Math.abs(this.r) + 6, this.startAngle, this.endAngle);
    view.getCanvasContext().stroke();
    view.getCanvasContext().closePath();
};

Circle.prototype.select = function () {
    this.selected = !this.selected;
};

Circle.prototype.isCursorInFigure = function (mouse) {
    return mouse.xMove - 175 > this.x - this.r && mouse.xMove - 175 < this.x + this.r
        && mouse.yMove - 41 > this.y - this.r && mouse.yMove - 41 < this.y + this.r;
};

Circle.prototype.move = function () {
    this.moving = !this.moving;
};

Circle.prototype.goTo = function (mouse) {
    this.x = mouse.xMove - 175;
    this.y = mouse.yMove - 41;
};

function Line(x, y, w, h, color, number, type) {
    this.x = x;
    this.y = y;
    this.x2 = w;
    this.y2 = h;
    this.color = color;
    this.number = number;
    this.type = type;
}

Line.prototype = new Shape();
Line.prototype.draw = function () {
    view.getCanvasContext().strokeStyle = this.color;
    view.getCanvasContext().beginPath();
    view.getCanvasContext().moveTo(this.x, this.y);
    view.getCanvasContext().lineTo(this.x2, this.y2);
    view.getCanvasContext().stroke();
};


Line.prototype.drawSelected = function () {
    view.getCanvasContext().save();
    view.getCanvasContext().strokeStyle = "gray";
    view.getCanvasContext().translate((this.x + this.x2) / 2, (this.y + this.y2) / 2);
    view.getCanvasContext().rotate(Math.atan2(this.y2 - this.y, this.x2 - this.x));
    view.getCanvasContext().strokeRect(-(Math.sqrt(Math.pow((this.x2 - this.x), 2) + Math.pow((this.y2 - this.y), 2))) / 2, -hRect / 2,
        Math.sqrt(Math.pow((this.x2 - this.x), 2) + Math.pow((this.y2 - this.y), 2)), hRect);
    view.getCanvasContext().restore();
};

Line.prototype.isCursorInFigure = function () {
    // return true;
};

var shape = new Shape();
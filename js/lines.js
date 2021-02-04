'use strict';
paper.setup(document.querySelector('#lines'));
var project = paper.project;
var view = paper.view;
var vw = view.bounds.width;
var vh = view.bounds.height;
var lines = [];
var lineColor = '#d1d3d4';
var lineWidth = 5;
var showPoints = false;
var showMoire = false;
var yAxisLocked = false;
var lineSpacing = 12;
var pathSegments = 4;
var snapDist = 116;
var repelDist = 52;
var snapDistSq = snapDist ** 2;
var repelDistSq = repelDist ** 2;
var duration = 2.2;
var easePeriod = 0.3;
var easeStrength = 1.4;
var elasticEase = Elastic.easeOut.config(easeStrength, easePeriod);
var pathSmoothing = { type: 'continuous' };
var debouncedInit = debounce(init, 30);
var center = new paper.Point(vw / 2, vh / 2);
var mouse = { delta: new paper.Point(0, 0), point: center };
var repellerRaster = null;
var repeller = new paper.Shape.Circle({
  radius: repelDist,
  fillColor: '#2196f3',
  center,
});
repeller.fillColor.alpha = 0;
var pointShape = new paper.Path.Circle({
  center: [0, 0],
  radius: 4,
  fillColor: '#e91e63',
  strokeColor: '#ce1956',
});
var pointSymbol = new paper.Symbol(pointShape.rasterize());
pointShape.remove();
pointSymbol.definition.visible = false;
var lineRaster = null;
var lineSymbol = null;
var lineShape = new paper.Path({
  segments: [
    [0, 0],
    [0, vh],
  ],
  strokeColor: lineColor,
  strokeWidth: lineWidth,
});
//
// INIT
// ========================================================================
function init() {
  vw = view.bounds.width;
  vh = view.bounds.height;
  for (var line of lines) {
    line.destroy();
  }
  lines = [];
  rasterizeLine();
  for (var i = 0, x = 0; x <= vw; i++, x += lineSpacing) {
    lines.push(new Line(i, x));
  }
  repellerRaster.bringToFront();
}
//
// CONTROL POINT
// ========================================================================
class ControlPoint {
  constructor(index, line, path, start, canMove) {
    this.index = index;
    this.line = line;
    this.path = path;
    this.start = start;
    this.shape = null;
    this.animation = null;
    this.connected = false;
    if (canMove) {
      this.shape = pointSymbol.place(start);
      this.shape.parent = path.parent;
      this.animation = new TimelineLite();
    }
  }
  destroy() {
    this.animation && this.animation.kill();
    for (var prop in this) {
      this[prop] = null;
    }
  }
  refresh() {
    var isAnimating = this.animation.isActive();
    var segment = this.path.segments[this.index];
    var dist1 = mouse.point.getDistance(segment.point, true);
    var close = this.start.isClose(this.shape.position, 0.1);
    var start = this.start;
    if (dist1 < repelDistSq) {
      this.animation.clear();
      var dist2 = mouse.point.getDistance(start, true);
      if (dist2 > snapDistSq) {
        this.snapBack();
      } else {
        var direction = segment.point.subtract(mouse.point).normalize();
        var offset = direction.multiply(repelDist - 1).add(mouse.point);
        segment.point.x = offset.x;
        segment.point.y = yAxisLocked ? segment.point.y : offset.y;
        this.shape.position = segment.point;
      }
    } else {
      if (!isAnimating && !close) {
        this.snapBack();
      }
    }
    return isAnimating || !close;
  }
  snapBack() {
    var start = this.start;
    var shape = this.shape.position;
    var point = this.path.segments[this.index].point;
    this.animation.clear();
    this.animation.to(
      [point, shape],
      duration,
      {
        x: start.x,
        y: start.y,
        ease: elasticEase,
      },
      0
    );
  }
}
//
// LINE
// ========================================================================
class Line {
  constructor(index, x) {
    this.index = index;
    this.x = x;
    this.controlPoints = [];
    this.group = new paper.Group();
    this.path = new paper.Path({
      parent: this.group,
      strokeColor: lineColor,
      strokeWidth: lineWidth,
    });
    this.pathSymbol = lineSymbol.place([this.x, view.center.y]);
    this.pathSymbol.parent = this.group;
    this.pathSymbol.visible = showMoire;
    var segments = [];
    for (var i = 0; i <= pathSegments; i++) {
      var y = (i / pathSegments) * vh;
      var start = new paper.Point(x, y);
      var canMove = i && i !== pathSegments;
      var controlPoint = new ControlPoint(i, this, this.path, start, canMove);
      this.controlPoints.push(controlPoint);
      segments.push(start);
    }
    this.path.addSegments(segments);
  }
  destroy() {
    this.group.remove();
    for (var controlPoint of this.controlPoints) {
      controlPoint.destroy();
    }
    for (var prop in this) {
      this[prop] = null;
    }
  }
  update() {
    var hasChanges = false;
    var total = this.path.segments.length - 1;
    for (var i = 1; i < total; i++) {
      if (this.controlPoints[i].refresh()) {
        hasChanges = true;
      }
    }
    if (hasChanges) {
      this.path.visible = true;
      this.pathSymbol.visible = showMoire;
      this.smoothPath();
    } else {
      this.path.visible = false;
      this.pathSymbol.visible = true;
    }
  }
  smoothPath() {
    this.path.smooth(pathSmoothing);
  }
}
//
// RASTERIZE LINE
// ========================================================================
function rasterizeLine() {
  if (lineRaster) {
    lineRaster.remove();
  }
  lineShape.visible = true;
  lineShape.segments = [
    [0, 0],
    [0, vh],
  ];
  lineRaster = lineShape.rasterize();
  lineSymbol = new paper.Symbol(lineRaster);
  lineShape.visible = false;
}
//
// RASTERIZE REPELLER
// ========================================================================
function rasterizeRepeller() {
  if (repellerRaster) {
    repellerRaster.remove();
  }
  repeller.visible = true;
  repellerRaster = repeller.rasterize();
  repellerRaster.position = mouse.point;
  repeller.visible = false;
  repellerRaster.blendMode = 'difference';
}
//
// UPDATE
// ========================================================================
function update() {
  for (var line of lines) {
    line.update();
  }
  repellerRaster.position = mouse.point;
}
//
// DEBOUNCE
// ========================================================================
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
//
// MOUSE MOVE
// ========================================================================
function mouseMove(event) {
  mouse = event;
}
rasterizeRepeller();
init();
view.on({
  frame: update,
  mousemove: mouseMove,
  resize: debouncedInit,
});

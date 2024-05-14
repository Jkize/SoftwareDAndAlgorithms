// The component interface declares an 'accept' method that
// takes the base visitor interface as an argument.
interface Shape {
    move(x, y);
    draw();
    accept(v: Visitor);
  }
  
  // Each concrete component class must implement the 'accept' method
  class Dot implements Shape {
    accept(v: Visitor) { v.visitDot(this); }
    move(x, y) {}
    draw() {}
  }
  
  class Circle implements Shape {
    accept(v: Visitor) { v.visitCircle(this); }
    move(x, y) {}
    draw() {}
  }
  
  class Rectangle implements Shape {
    accept(v: Visitor) { v.visitRectangle(this); }
    move(x, y) {}
    draw() {}
  }

  // The Visitor interface declares a set of visiting methods that
// correspond to component classes.
interface Visitor {
    visitDot(d: Dot);
    visitCircle(c: Circle);
    visitRectangle(r: Rectangle);
  }
  
  class JSONExportVisitor implements Visitor {
    visitDot(d: Dot) {
      // Export the dot's ID and coordinates.
    }
  
    visitCircle(d: Circle) {
      // Export the circle's ID, center coordinates and radius.
    }
  
    visitRectangle(d: Rectangle) {
      // Export the rectangle's ID, left-top coordinates, width and height.
    }
  }


// The client code can run visitor operations over any set of
// elements without figuring out their concrete classes. The
// 'accept' operation directs a call to the appropriate operation
// in the visitor object.
const allShapes = [new Dot(), new Circle(), new Rectangle()];
const exportVisitor = new JSONExportVisitor();

allShapes.forEach(shape => shape.accept(exportVisitor));
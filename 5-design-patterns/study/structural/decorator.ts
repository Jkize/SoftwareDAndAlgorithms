interface Coffee{
    getCost();
    getDescription();
}

class SimpleCoffee implements Coffee{
    getCost() {
        return 10;
    }

    getDescription() {
        return 'Simple Coffe'
    }
}

class CoffeeDecorator implements Coffee{
    protected wrappee:Coffee;

    constructor(coffe:Coffee){
        this.wrappee = coffe;
    }
    public getCost() { return this.wrappee.getCost(); }
    public getDescription() { return this.wrappee.getDescription()}
}

class MilkCoffeeDecorator extends CoffeeDecorator {
    public getCost(): number {
      return this.wrappee.getCost() + 2;
    }
  
    public getDescription(): string {
      return this.wrappee.getDescription() + 'with milk';
    }
  }

  class WhipCoffeeDecorator extends CoffeeDecorator {
    public getCost(): number {
      return this.wrappee.getCost() + 3;
    }
  
    public getDescription(): string {
      return this.wrappee.getDescription() + 'and with whip';
    }
  }
  
  let someCoffee = new SimpleCoffee();
  
  someCoffee.getCost(); // 10
  someCoffee.getDescription(); // Simple Coffee
  someCoffee = new MilkCoffeeDecorator(someCoffee);
  someCoffee.getCost(); // 12
  someCoffee = new WhipCoffeeDecorator(someCoffee);
  someCoffee.getDescription(); // Simple Coffee with milk and whip
  
  
// The strategy interface declares operations common
// to all supported versions of some algorithm.
interface Strategy {
    execute(a: number, b: number): number;
  }
  // Concrete strategies implement the algorithm while following
  // the base strategy interface. The interface makes them
  // interchangable in the context.
  class ConcreteStrategyAdd implements Strategy {
    execute(a, b) {
      return a + b;
    }
  }
  
  class ConcreteStrategySubstract implements Strategy {
    execute(a, b) {
      return a - b;
    }
  }
  
  class ConcreteStrategyMultiply implements Strategy {
    execute(a, b) {
      return a * b;
    }
  }

  // The context defines the interface of interest to clients.
class Context {
    private strategy: Strategy;
  
    setStrategy(s: Strategy) {
      this.strategy = s;
    }
      // The context delegates some work to the strategy object
      // instead of implementing multiple versions of the
      // algorithm on its own.
    executeStrategy(a: number, b: number) {
      return this.strategy.execute(a, b);
    }
  }
  
  let ctx = new Context();
  
  ctx.setStrategy(new ConcreteStrategyAdd());
  ctx.executeStrategy(5, 2); // 7
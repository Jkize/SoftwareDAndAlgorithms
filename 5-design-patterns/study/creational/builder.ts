class Car{}

interface Builder{
    reset();
    setSeats(n:number);
    setEngine(n:string);
    setTripComputer(n:boolean);
    setGPS(n:boolean);
}

class CarBuilder implements Builder{
    private car:Car;
    #seats:number;
    #engine:string;
    #tripComputer:boolean;
    #gps:boolean;

    constructor(){
        this.reset();
    }


    reset() {
        this.car = new Car();
    }

    setSeats(n:number) {
        this.#seats = n;
    }
    setEngine(engine:string) {
        this.#engine =engine;
    }
    setTripComputer(b:boolean) {
        this.#tripComputer = b;
    }

    setGPS(b:boolean) {
        this.#gps = b;
    }
  
    getProduct(): Car {
      const product = this.car;
      this.reset();
      return product;
    }
}

class Director{
    private builder:Builder;
    setBuilder(b:Builder){
        this.builder = b;
    }

    makeSportCar(b:Builder = this.builder){
        b.reset();
        b.setSeats(2);
        b.setEngine('V12');
        b.setTripComputer(true);
        b.setGPS(true);
    }
}

const director = new Director();
const builder = new CarBuilder();

director.makeSportCar(builder);
/**
 * 
 */
class Computer {
    public getElectricShock() { return 'Ouch!'; }
    public makeSound() { return 'Beep beep!'; }
    public showLoadingScreen() { return 'Loading..'; }
    public bam() { return 'Ready to be used!'; }
    public closeEverything() { return 'Zzzzzz bup'; }
    public sooth() { return 'shhshh'; }
  }

  class ComputerFacade{
    constructor(protected computer:Computer){
    }

    public turnOn(){
        this.computer.getElectricShock();
        this.computer.makeSound();
        this.computer.showLoadingScreen();
        this.computer.bam();
    }

    public turnOff() {
        this.computer.closeEverything();
        this.computer.sooth();
      }
  }

const computer = new ComputerFacade(new Computer());

computer.turnOn();
computer.turnOff();
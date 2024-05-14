//factory of factories
/**
 * it provides you an interface for creating objects for
 * each class of the product family.
 */

interface Door{
    getDescription();
}

class WoodenDoor implements Door{
    getDescription() {
        return "I am a wooden door";
    }
}

class IronDoor implements Door{
    getDescription() {
        return "I am an iron door";
    }
}

interface DoorFittingExpert{
    getDescription();
}

class Welder implements DoorFittingExpert{
    getDescription() {
        return "I can only fit iron doors";
    }
}

class Carpenter implements DoorFittingExpert{
    getDescription() {
        return  "I can only fit wooden doors.";
    }
}

interface DoorFactory{
    makeDoor():Door;
    makeFittingExpert():DoorFittingExpert;
}

class WoodenDoorFactory implements DoorFactory {
    public makeDoor(): Door {
      return new WoodenDoor();
    }
  
    public makeFittingExpert(): DoorFittingExpert {
      return new Carpenter();
    }
  }
  
  class IronDoorFactory implements DoorFactory {
    public makeDoor(): Door {
      return new IronDoor();
    }
  
    public makeFittingExpert(): DoorFittingExpert {
      return new Welder();
    }
  }
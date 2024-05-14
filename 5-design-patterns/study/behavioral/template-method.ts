abstract class Builder{
    public build(){
        this.test();
        this.lint();
        this.assemble();
        this.deploy();
    }

    abstract test();
    abstract lint();
    abstract assemble();
    abstract deploy();
}

class AndroidBuilder extends Builder {
    public test() { return 'Running android tests'; }
    public lint() { return 'Linting android code'; }
    public assemble() { return 'Assembling android build'; }
    public deploy() { return 'Deploying android build to server'; }
  }
  
  class IosBuilder extends Builder {
    public test() { return 'Running ios tests'; }
    public lint() { return 'Linting ios code'; }
    public assemble() { return 'Assembling ios build'; }
    public deploy() { return 'Deploying ios build to server'; }
  }

  
const androidBuilder = new AndroidBuilder();

androidBuilder.build();
// Running android tests
// Linting android code
// Assembling android build
// Deploying android build to server

const iosBuilder = new IosBuilder();

androidBuilder.build();
// Running ios tests
// Linting ios code
// Assembling ios build
// Deploying ios build to server
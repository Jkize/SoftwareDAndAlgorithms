// Presume we have an input filed with an ID of inputname:
const el = `<input type="text" id="inputname" value="" />`;

// We also have a JS object named myUser with
// an id property which references this input
const myUser = {
  id: 'inputname',
  name: ''
};

// create proxy
const myUserProxy = new Proxy(myUser, {
    set: function(target, prop, newValue) {
      if (prop === 'name' && target.id) {
        // update object property
        target[prop] = newValue;
  
        // update input field value
        document.getElementById(target.id).value = newValue;
  
        return true;
      }
  
      return false;
    }
  });
  
  // set a new name
  myUserProxy.name = 'Craig';
  
  console.log(myUserProxy.name); // Craig
  console.log(document.getElementById('inputname').value);

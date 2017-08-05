var display = {
  isIrreg: false,
  subj: "subjError",
  BFV: "BFVerror",
  SPast: "sPasterror",
  theRest: "theResterror",
  buttonDiv: document.getElementById('buttons'),
  descriptionDiv: document.getElementById('description'),
  currentWord: 0,
  output: [],
  buttonArray: {}

}

display.init = function(myForm) {
  this.isIrreg = myForm.isIrreg;
  this.subj = myForm.sentence['Subj'];
  this.BFV = myForm.BFV;
  this.SPast = myForm.SPast;
  this.theRest = myForm.theRest;
  this.output = []; // clear output display
  console.log(myForm.BFV);
  console.log(this.subj, this.isIrreg, this.BFV, this.SPast, this.theRest);
}

display.setUpButtons = function() {
  // buttons needed:
  // subj, (irreg past form), is, am are, was, were, do, does
  // have, has, BFV, not, ing, ed

  //labels and IDs for buttons
  this.buttonArray = {};

    this.buttonArray[ENUM.is] = "is";
    this.buttonArray[ENUM.am] = "am";
    this.buttonArray[ENUM.are] = "are";
    this.buttonArray[ENUM.do] = "do";
    this.buttonArray[ENUM.did] = "did";
    this.buttonArray[ENUM.does] = "does";
    this.buttonArray[ENUM.was]  = "was";
    this.buttonArray[ENUM.were]  = "were";
    this.buttonArray[ENUM.s]  = "-s";
    this.buttonArray[ENUM.have]  = "have";
    this.buttonArray[ENUM.has]  = "has";
    this.buttonArray[ENUM.BFV]  = this.BFV;
    this.buttonArray[ENUM.not]  = "not";
    this.buttonArray[ENUM.ing]  = "-ing";
    this.buttonArray[ENUM.ed]  = "-ed";
    this.buttonArray[ENUM.subj] = this.subj;

  if (this.isIrreg) {
    this.buttonArray[ENUM.irreg] = this.SPast;
  }

  // clear buttons, if any
  while (this.buttonDiv.firstChild) {
    this.buttonDiv.removeChild(this.buttonDiv.firstChild);
  }

  for (var item in this.buttonArray) {
      //let id = item;
      //console.log(id, buttonArray[id]);
      var btn = document.createElement("Button");
      btn.innerText = display.buttonArray[item];

      /*
      btn.onclick = function () {

        display.buttonPressed(id);
      };
      */
      btn.onclick = (function(i){
        return function(){
          display.buttonPressed(i);
        }
      })(item);



      display.buttonDiv.appendChild(btn);
    };

  // Get the first word out of form before first
  // button is pressed.
  if (this.currentWord === 0) {
    this.currentWord = form.getWord();
  }
}


display.buttonPressed = function (userWordID) {
  console.log("In buttonPressed():" + userWordID, this.currentWord);
  if (userWordID == this.currentWord) {

    this.output.push(this.buttonArray[userWordID]);
    console.log("Treffer! Output: " + this.output);
    if (form.newForm) {
      this.setUpForm();
      this.output = [];
    }

    if (form.newSentence) {
      console.log("newSentence ");

      display.init(form);
      display.setUpButtons();

    }
    this.currentWord = form.getWord();
    return;
  }

  console.log("falsch!!!!!");
}

display.setUpForm = function () {
  this.descriptionDiv.innerText = form.formName;
  console.log("formname is:" + form.formName);
}

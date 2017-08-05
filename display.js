var display = {
  isIrreg: false,
  subj: "subjError",
  BFV: "BFVerror",
  SPast: "sPasterror",
  theRest: "theResterror",
  buttonDiv: document.getElementById('buttons'),
  outputDiv: document.getElementById('output'),
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

      var btn = document.createElement("Button");
      btn.innerText = display.buttonArray[item];

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

    this.outputWord(userWordID);
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

display.outputWord = function(id) {
  console.log("id: " + id);
  this.output.push(id);
  console.log("output:" + this.output);
  this.outputDiv.innerText = "";
  for (word in this.output) {
    console.log("buttonArray[word]:" + this.buttonArray[this.output[word]]);
    this.outputDiv.textContent += this.buttonArray[this.output[word]];
    this.outputDiv.textContent += " ";
  }
  //this.outputDiv.innerText = this.output;

  console.log("Treffer! Output: " + this.output.innerText);
}

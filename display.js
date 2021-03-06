var display = {
  f: {},
  buttonDiv: document.getElementById('buttons'),
  buttonDiv1: document.getElementById('buttons1'),
  buttonDiv2: document.getElementById('buttons2'),
  buttonDiv3: document.getElementById('buttons3'),
  buttonDiv4: document.getElementById('buttons4'),

  outputDiv: document.getElementById('output'),
  wordsDiv: document.getElementById('words'),
  descriptionDiv: document.getElementById('description'),
  theRestDiv: document.getElementById('theRest'),
  punctuationDiv: document.getElementById('punctuation'),
  timeExprDiv: document.getElementById('time-expr'),
  currentWord: 0,
  output: [],
  buttonArray: {},
  outputHolder: "",
  tempF: {}

}

// must be initialized with form object as a parameter
display.init = function(myForm) {
  this.f = myForm;
}

display.setUpButtons = function() {
  var arr;
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
    this.buttonArray[ENUM.BFV]  = this.f.BFV;
    this.buttonArray[ENUM.not]  = "not";
    this.buttonArray[ENUM.ing]  = "-ing";
    this.buttonArray[ENUM.ed]  = "-ed";
    this.buttonArray[ENUM.subj] = this.f.sentence['Subj'];

  if (this.f.isIrreg) {
    this.buttonArray[ENUM.irreg] = this.f.SPast;
  }

  // clear buttons, if any
  while (this.buttonDiv1.firstChild) {
    this.buttonDiv1.removeChild(this.buttonDiv1.firstChild);
  }

  while (this.buttonDiv2.firstChild) {
    this.buttonDiv2.removeChild(this.buttonDiv2.firstChild);
  }

  while (this.buttonDiv3.firstChild) {
    this.buttonDiv3.removeChild(this.buttonDiv3.firstChild);
  }

  while (this.buttonDiv4.firstChild) {
    this.buttonDiv4.removeChild(this.buttonDiv4.firstChild);
  }



  /*
  for (var item in this.buttonArray) {
      var btn = document.createElement("Button");
      btn.textContent = display.buttonArray[item];

      btn.onclick = (function(i){
        return function(){
          display.buttonPressed(i);
        }
      })(item);
      display.buttonDiv.appendChild(btn);
    };
    */
    arr = [ENUM.subj];

    for (var item in arr) {
        var btn = document.createElement("div");
        let textNode = document.createTextNode(display.buttonArray[arr[item]]);
        btn.appendChild(textNode);
        console.log(arr[item]);
        btn.onclick = (function(i){
          return function(){
            display.buttonPressed(i);
          }
        })(arr[item]);
    display.buttonDiv1.appendChild(btn);
    };

    arr = [ENUM.is, ENUM.am, ENUM.are, ENUM.was,
            ENUM.were, ENUM.do, ENUM.does, ENUM.did];
    for (var item in arr) {
      var btn = document.createElement("div");
      let textNode = document.createTextNode(display.buttonArray[arr[item]]);
      btn.appendChild(textNode);
      console.log(arr[item]);
      btn.onclick = (function(i){
        return function(){
          display.buttonPressed(i);
        }
      })(arr[item]);
  display.buttonDiv2.appendChild(btn);
    };

    arr = [ENUM.BFV];
    if (this.f.isIrreg) {
      arr.push(ENUM.irreg);
    }
    arr.push(ENUM.not);


    //  ENUM.not];
    for (var item in arr) {
      var btn = document.createElement("div");
      let textNode = document.createTextNode(display.buttonArray[arr[item]]);
      btn.appendChild(textNode);
      console.log(arr[item]);
      btn.onclick = (function(i){
        return function(){
          display.buttonPressed(i);
        }
      })(arr[item]);
  display.buttonDiv3.appendChild(btn);
    };

    arr = [ENUM.s, ENUM.ing, ENUM.ed];
    for (var item in arr) {
      var btn = document.createElement("div");
      let textNode = document.createTextNode(display.buttonArray[arr[item]]);
      btn.appendChild(textNode);
      console.log(arr[item]);
      btn.onclick = (function(i){
        return function(){
          display.buttonPressed(i);
        }
      })(arr[item]);
  display.buttonDiv4.appendChild(btn);
    };

  // Get the first word out of form before first
  // button is pressed.
  if (this.currentWord === 0) {
    this.currentWord = form.getWord();
  }
}


display.buttonPressed = function (userWordID) {
  var correct = false;
  if (userWordID == this.currentWord) {


    this.outputWord(userWordID);

    if (form.newForm) {
      correct = true;
      if (correct) {this.showCorrect();}
      //this.setUpForm();
      //this.output = [];


    }
    console.log("form new sentence from buttonPressed: " + form.newSentence);


    // make a deep copy of form object so that you can display
    // object data after the non-temp one changes to the
    // next sentence data

    this.tempF = JSON.parse(JSON.stringify(this.f));


    this.currentWord = form.getWord();


    return;
  }
  this.showWrong();
}

display.setUpForm = function () {
  // end game of game
  if (this.f.done) {
    console.log("all done!! good job.");
    document.write("You have won the whole Internet");
    return;
  }

  this.theRestDiv.textContent = this.f.theRest;
  // this.descriptionDiv.textContent = form.formName;
  this.descriptionDiv.innerHTML = "<h3>" + form.formName + "</h3>";
  this.timeExprDiv.textContent = this.f.timeExpr;

  this.wordsDiv.textContent = this.f.sentence['Subj']+ "/" +
    this.f.BFV;
  if (this.f.isNegative) {
    this.wordsDiv.innerHTML += '/<span class="red">not</span>';
    //this.wordsDiv.textContent += "/not";
  }

  if (this.f.isQuestion) {
    this.punctuationDiv.textContent = "?";
  }
  else {
    this.punctuationDiv.textContent = ".";
   }



}

display.outputWord = function(id) {

  var currentWord, nextWord, wordCount;
  var SPres = this.tempF.SPres;
  var SPast = this.tempF.SPast;
  var ingForm = this.tempF.ingForm;

  this.output.push(id);

  this.outputDiv.textContent = "";
  for (wordCount = 0;wordCount < this.output.length;wordCount++) {
    currentWord = this.output[wordCount];
    nextWord = this.output[parseInt(wordCount)+1];


    // Put words together before displaying them
    if (nextWord == ENUM.s && currentWord == ENUM.BFV) {
      this.outputDiv.textContent += SPres;
      wordCount++; // advance over the -s so we don't print it
    } else if (currentWord == ENUM.do && nextWord == ENUM.not) {
      this.outputDiv.textContent += "don't";
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.does && nextWord == ENUM.not) {
      this.outputDiv.textContent += "doesn't";
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.did && nextWord == ENUM.not) {
      this.outputDiv.textContent += "didn't";
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.BFV && nextWord == ENUM.ing) {
      this.outputDiv.textContent += ingForm;
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.is && nextWord == ENUM.not) {
      this.outputDiv.textContent += "isn't";
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.are && nextWord == ENUM.not) {
      this.outputDiv.textContent += "aren't";
      wordCount++; // advance over the 'not' so we don't print it
    } else if (currentWord == ENUM.BFV && nextWord == ENUM.ed) {
      this.outputDiv.textContent += SPast;
      wordCount++; // advance over the '-ed' so we don't print it
    } else if (currentWord == ENUM.was && nextWord == ENUM.not) {
      this.outputDiv.textContent += "wasn't";
      wordCount++; // advance over the '-ed' so we don't print it
    } else if (currentWord == ENUM.were && nextWord == ENUM.not) {
      this.outputDiv.textContent += "weren't";
      wordCount++; // advance over the '-ed' so we don't print it
    } else {
      // capitalize first word
      if (parseInt(wordCount) === 0) {
        var str;
        str = this.buttonArray[this.output[wordCount]];
        this.outputDiv.textContent +=
              str.charAt(0).toUpperCase() + str.slice(1);
      } else {
        this.outputDiv.textContent += this.buttonArray[this.output[wordCount]];
      }
    }
    this.outputHolder = this.outputDiv.textContent;

    this.outputDiv.textContent += " ";
  }

  if (this.f.newForm) {
    //this.outputDiv.textContent = "";
  }
}

// show message when user gets to the end of the sentence
display.showCorrect = function() {
  var el = document.getElementById('correct');
  var that = this; // make an reference to this object for setTimeout

  el.style.visibility = 'visible';
  el.style.color = 'green';
  // el.textContent = this.outputHolder;
  el.textContent = "Correct!!";
  this.buttonsEnabled(false);


  setTimeout( function () {
    document.getElementById('correct').style.visibility = 'hidden';
    //document.getElementById('output'). textContent = "";
    console.log(that.tempF.newSentence);
    display.setUpForm();
    display.output = [];
    display.outputDiv.textContent = "";
    if (that.tempF.newSentence) {
      that.init(form);
      that.setUpButtons();
    }
    display.buttonsEnabled(true);
  }, 1000);


}

display.showWrong = function() {
  var el = document.getElementById('correct');

  this.buttonsEnabled(false);
  el.style.visibility = 'visible';
  el.style.color = 'red';
  el.textContent = "Try again.";

  setTimeout( function () {
    document.getElementById('correct').style.visibility = 'hidden';
    display.buttonsEnabled(true);
  }, 1000);
}

display.buttonsEnabled = function (enabled) {
  var buttons = this.buttonDiv.getElementsByTagName('button');
  var length = buttons.length;
  var i, color = "";

  if (enabled != false) {enabled = true;}
  if (!enabled) {color = "#eee";}
  for (i = 0;i<length;i++) {
    buttons[i].disabled = !enabled;
    buttons[i].style.backgroundColor = color;
  }
}

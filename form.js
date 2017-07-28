// make nextSentence() function to put new sentence
// do something about irregulars? maybe that's in other
// function

var form = {
  wCount: 0,
  fCount: 0,
  sCount: 0,
  sentenceCollection: [],
  sentence: {},
  currentForm: [],
  finished: false
};




  form.init = function () {

    var doForm = ENUM.do;
    var bePresForm = ENUM.are;
    var bePastForm = ENUM.were;
    var haveForm = ENUM.have;

    // get this from another class later
    this.sentenceCollection =
        [{Subj: "Poseurs",
          subjNum: ENUM.pl,
          BFV: "skate",
          isIrreg: false,
          isAction: true,
          SPast: "skated",
          ingForm: "skating",
          theRest: "badly."
        },
         {Subj: "he",
          subjNum: ENUM.sing,
          BFV: "break",
          isIrreg: false,
          isAction: true,
          SPast: "broke",
          ingForm: "breaking",
          theRest: "the machine.",
        },
         {Subj: "we",
          subjNum: ENUM.pl,
          BFV: "study",
          isIrreg: false,
          isAction: true,
          SPast: "studied",
          ingForm: "studying",
          theRest: "English."
        }];

    switch(this.sentence.subjNum) {
      case ENUM.I:
        bePresForm = ENUM.am;
        break;

      case ENUM.sing:
        doForm = ENUM.does;
        bePresForm = ENUM.is;
        bePastForm = ENUM.was;
        haveForm = ENUM.has;
        break;

      case ENUM.pl:
    }


    var simplePresNeg = [ENUM.subj, doForm, ENUM.not, ENUM.BFV];
    simplePresNeg.name = "Simple present, negative";
    var simplePresQ = [doForm, ENUM.subj, ENUM.BFV];
    simplePresQ.name = "Simple present, yes/no question";
    var simplePresAffirm;
    if (doForm === ENUM.does) {
        simplePresAffirm = [ENUM.subj, ENUM.BFV, ENUM.s];
    } else {
        simplePresAffirm = [ENUM.subj, ENUM.BFV ];
    }
    simplePresAffirm.name = "Simple present, affirmative";
    var simplePastAffirm;
    if (this.sentence.isIrreg) {
      simplePastAffirm = [ENUM.subj, ENUM.irreg];
    } else {
      simplePastAffirm = [ENUM.subj, ENUM.BFV, ENUM.ed];
    }
    simplePastAffirm.name = "Simple past, affirmative";
    var simplePastNeg = [ENUM.subj, ENUM.did, ENUM.not, ENUM.BFV];
    simplePastNeg.name = "Simple past, negative";
    var simplePastQ = [ENUM.did, ENUM.subj, ENUM.BFV]
    simplePastQ.name = "Simple past, question";

    var presProgAffirm = [ENUM.subj, bePresForm, ENUM.BFV, ENUM.ing];
    presProgAffirm.name = "Present progressive, affirmative";
    var presProgNeg = [ENUM.subj, bePresForm, ENUM.not, ENUM.BFV, ENUM.ing];
    presProgNeg.name = "Present progressive, negative";
    var presProgQ = [bePresForm, ENUM.subj, ENUM.BFV, ENUM.ing];
    presProgQ.name = "Present progressive, question";

    this.currentForm = [
      simplePresAffirm, simplePresNeg, simplePresQ,
      presProgAffirm, presProgNeg, presProgQ,
      simplePastAffirm, simplePastNeg, simplePastQ];
  }







form.nextWord =  function () {
  if (this.finished) { return; }
  console.log("sentenceCOll: " + this.sentenceCollection.length);
  var currentWord = this.currentForm[this.fCount][this.wCount];
  // if reach the end of sentence, advance to next form
  // set word counter to 0
  if (this.wCount ==
     this.currentForm[this.fCount].length) {
       this.fCount++;
       this.wCount = 0;
       // if reach end of form, get new sentence
       // set form count to 0
       console.log("fCount: " + this.fCount);
       if (this.fCount ===
          this.currentForm.length) {
            this.fCount = 0;

            this.sentence = this.sentenceCollection.pop();
            if (this.sentenceCollection.length === 0) {
              this.finished = true;
              console.log("feenieeesh!!!!!!!!!!!!!!");
            }
            console.log("New sentence<<<<<<<<<<<<<<<<<<<<<<<<<");
            console.log(this.sentence);
          }

     }
console.log(this.currentForm[this.fCount][this.wCount]);
  this.wCount++;  // advance to next word

}

form.getWord = function () {

}
/*
form.init();
for (var i=0;i<200;i++) {
  form.nextWord();
}
*/

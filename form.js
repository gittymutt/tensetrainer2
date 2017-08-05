
// To use form object, call init() and then use getWord()
// to get next word. Use newForm, newSentence and done
// properties to keep track of where you are.


var form = {
  wCount: 0,
  fCount: 0,
  sentenceCollection: [],
  sentence: [],
  formArray: [],
  newSentence: false,
  newForm: false,
  done: false,
  formName: {},
  isIrreg: false,
  isAction: true,
  SPast: "",
  SPres: "",
  ingForm: "",
  theRest: "",
  BFV: ""

};





  form.init = function () {
    // get this from another class later
    this.sentenceCollection =
        [{
          Subj: "he",
           subjNum: ENUM.sing,
           BFV: "break",
           isIrreg: true,
           isAction: true,
           SPast: "broke",
           SPres: "breaks",
           ingForm: "breaking",
           theRest: "the machine."
        },




          {Subj: "Poseurs",
          subjNum: ENUM.pl,
          BFV: "skate",
          isIrreg: false,
          isAction: true,
          SPast: "skated",
          SPres: "skates",
          ingForm: "skating",
          theRest: "badly."
        },
         {Subj: "he",
          subjNum: ENUM.sing,
          BFV: "break",
          isIrreg: true,
          isAction: true,
          SPast: "broke",
          SPres: "breaks",
          ingForm: "breaking",
          theRest: "the machine.",
        },
         {Subj: "we",
          subjNum: ENUM.pl,
          BFV: "study",
          isIrreg: false,
          isAction: true,
          SPast: "studied",
          SPres: "studies",
          ingForm: "studying",
          theRest: "English."
        },
        {Subj: "he",
         subjNum: ENUM.sing,
         BFV: "break",
         isIrreg: true,
         isAction: true,
         SPast: "broke",
         SPres: "breaks",
         ingForm: "breaking",
         theRest: "the Internet.",
        }
      ];

        // Get first form ready for user. User only has to call

        this.getNextSentence();

   }

   form.getNextSentence = function () {
    var simplePresAffirm, simplePresNeg, simplePresQ;
    var simplePastAffirm, simplePastNeg, simplePastQ;
    var presProgAffirm, presProgNeg, presProgQ;

    var doForm = ENUM.do;
    var bePresForm = ENUM.are;
    var bePastForm = ENUM.were;
    var haveForm = ENUM.have;

    if (this.sentenceCollection.length < 1) {
      this.done = true;
      return false;
    }
    this.sentence = this.sentenceCollection.pop();

    this.ingForm = this.sentence['ingForm'];
    this.isAction = this.sentence['isAction'];
    this.SPast = this.sentence['SPast'];
    this.ingForm = this.sentence['ingForm'];
    this.theRest = this.sentence['theRest'];
    this.BFV = this.sentence['BFV'];
    this.isIrreg = this.sentence['isIrreg'];
    this.SPres = this.sentence['SPres'];


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




    if (doForm === ENUM.does) {
        simplePresAffirm = [ENUM.subj, ENUM.BFV, ENUM.s];
    } else {
        simplePresAffirm = [ENUM.subj, ENUM.BFV ];
    }
    simplePresAffirm.name = "Simple present, affirmative";

    simplePresNeg = [ENUM.subj, doForm, ENUM.not, ENUM.BFV];
    simplePresNeg.name = "Simple present, negative";

    simplePresQ = [doForm, ENUM.subj, ENUM.BFV];
    simplePresQ.name = "Simple present, yes/no question";

    if (this.sentence.isIrreg) {
      simplePastAffirm = [ENUM.subj, ENUM.irreg];
    } else {
      simplePastAffirm = [ENUM.subj, ENUM.BFV, ENUM.ed];
    }
    simplePastAffirm.name = "Simple past, affirmative";
    simplePastNeg = [ENUM.subj, ENUM.did, ENUM.not, ENUM.BFV];
    simplePastNeg.name = "Simple past, negative";
    simplePastQ = [ENUM.did, ENUM.subj, ENUM.BFV]
    simplePastQ.name = "Simple past, question";

    presProgAffirm = [ENUM.subj, bePresForm, ENUM.BFV, ENUM.ing];
    presProgAffirm.name = "Present progressive, affirmative";
    presProgNeg = [ENUM.subj, bePresForm, ENUM.not, ENUM.BFV, ENUM.ing];
    presProgNeg.name = "Present progressive, negative";
    presProgQ = [bePresForm, ENUM.subj, ENUM.BFV, ENUM.ing];
    presProgQ.name = "Present progressive, question";

    this.formArray = [simplePresAffirm, simplePresNeg, simplePresQ,
                      simplePastAffirm, simplePastNeg, simplePastQ,
                       presProgAffirm, presProgNeg, presProgQ];

    this.formName = this.formArray[this.fCount]['name'];
    return true;
  }


form.getPosition = function () {
  return {wCount: this.wCount, fCount: this.fCount};

}



// must make a temp variable and return the current word at the end of function
form.getWord = function () {
  var wordValue;

  this.newSentence = false;
  this.newForm = false;


  wordValue = this.formArray[this.fCount][this.wCount];
  this.wCount++;
  if (this.wCount === this.formArray[this.fCount].length) {
    this.wCount = 0;
    this.newForm = true;
    this.fCount++;


    if (this.fCount === this.formArray.length) {
      this.fCount = 0;
      this.newSentence = true;

      this.getNextSentence();

    }
    this.formName = this.formArray[this.fCount]['name']; // to display tense and type of sentence

  }
  return wordValue;
}

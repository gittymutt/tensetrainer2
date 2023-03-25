
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
  isNegative: false,
  isQuestion: false,
  isIrreg: false,     // for non be verbs only
  isAction: true,
  SPast: "",
  SPres: "",
  ingForm: "",
  theRest: "",
  timeExpr: "",
  BFV: "",
  penultimate: false

};





  form.init = function () {
    // get this from another class later
    this.sentenceCollection =
        [
          {
          Subj: "the boy",
           subjNum: ENUM.sing,
           BFV: "break",
           isIrreg: true,
           isAction: true,
           SPast: "broke",
           SPres: "breaks",
           ingForm: "breaking",
           theRest: "his toy"
        }
        ,




          {Subj: "the monks",
          subjNum: ENUM.pl,
          BFV: "sing",
          isIrreg: true,
          isAction: true,
          SPast: "sang",
          SPres: "sings",
          ingForm: "singing",
          theRest: "badly"
        },
         {Subj: "my dog",
          subjNum: ENUM.sing,
          BFV: "eat",
          isIrreg: true,
          isAction: true,
          SPast: "ate",
          SPres: "eats",
          ingForm: "eating",
          theRest: "meat",

        },

        {Subj: "we",
         subjNum: ENUM.pl,
         BFV: "ride",
         isIrreg: true,
         isAction: true,
         SPast: "rode",
         SPres: "rides",
         ingForm: "riding",
         theRest: "our bikes",
         presTE: "every weekend",
         pastTE: "last weekend",
         progTE: "at the moment"
       },
       {
         Subj: "I",
         subjNum: ENUM.I,
         BFV: "be",
         isIrreg: false,
         isAction: false,
         theRest: "nervous",
         presTE: "now",
         pastTE: "an hour ago"
       },
       {Subj: "he",
         subjNum: ENUM.sing,
         BFV: "play",
         isIrreg: false,
         isAction: true,
         SPast: "played",
         SPres: "plays",
         ingForm: "playing",
         theRest: "soccer",
         presTE: "every night",
         pastTE: "last night",
         progTE: "at the moment"
       },
       {
         Subj: "Charlie",
         subjNum: ENUM.sing,
         BFV: "be",
         isIrreg: false,
         isAction: false,
         theRest: "hungry",
         presTE: "now",
         pastTE: "two days ago"
       }
      ];

        // Get first form ready for user. User only has to call

        this.getNextSentence();

   }

   form.getNextSentence = function () {
    var simplePresAffirm, simplePresNeg, simplePresQ;
    var simplePastAffirm, simplePastNeg, simplePastQ;
    var bePresAffirm, bePresNeg, bePresQ
    var bePastAffirm, bePastNeg, bePastQ

    var presProgAffirm, presProgNeg, presProgQ;
    var pastTE = "yesterday";
    var presTE = "every day";
    var progTE = "now";

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

    if (this.sentence['presTE']) {
      presTE = this.sentence['presTE'];
    }

    if (this.sentence['pastTE']) {
      pastTE = this.sentence['pastTE'];
    }

    if (this.sentence['progTE']) {
      progTE = this.sentence['progTE'];
    }



    switch(this.sentence.subjNum) {
      case ENUM.I:
        bePresForm = ENUM.am;
        bePastForm = ENUM.was;
        break;

      case ENUM.sing:
        doForm = ENUM.does;
        bePresForm = ENUM.is;
        bePastForm = ENUM.was;
        haveForm = ENUM.has;
        break;

      case ENUM.pl:
    }

    this.BFV = this.BFV.toLowerCase().trim();

    if (this.BFV === "be") {
        bePresAffirm = [ENUM.subj, bePresForm];
        bePresAffirm.name = "Simple present, affirmative";
        bePresAffirm.negative = false;

        bePresNeg = [ENUM.subj, bePresForm, ENUM.not];
        bePresNeg.name = "Simple present, negative";
        bePresNeg.negative = true;

        bePresQ = [bePresForm, ENUM.subj];
        bePresQ.name = "Simple present, question";
        bePresQ.negative = false;
        bePresQ.question = true;

        bePresAffirm.timeExpr = bePresNeg.timeExpr = bePresQ.timeExpr = presTE;

        bePastAffirm = [ENUM.subj, bePastForm];
        bePastAffirm.name = "Simple past, affirmative";
        bePastAffirm.negative = false;

        bePastNeg = [ENUM.subj, bePastForm, ENUM.not];
        bePastNeg.name = "Simple past, negative";
        bePastNeg.negative = true;

        bePastQ = [bePastForm, ENUM.subj];
        bePastQ.name = "Simple past, question";
        bePastQ.negative = false;
        bePastQ.question = true;

        bePastAffirm.timeExpr = bePastNeg.timeExpr = bePastQ.timeExpr = pastTE;



        this.formArray = [bePresAffirm, bePresNeg, bePresQ
                          ,
                          bePastAffirm, bePastNeg, bePastQ
                        ];

    } else {
      if (doForm === ENUM.does) {
          simplePresAffirm = [ENUM.subj, ENUM.BFV, ENUM.s];
      } else {
          simplePresAffirm = [ENUM.subj, ENUM.BFV ];
      }
      simplePresAffirm.name = "Simple present, affirmative";
      simplePresAffirm.negative = false;

      simplePresNeg = [ENUM.subj, doForm, ENUM.not, ENUM.BFV];
      simplePresNeg.name = "Simple present, negative";
      simplePresNeg.negative = true;

      simplePresQ = [doForm, ENUM.subj, ENUM.BFV];
      simplePresQ.name = "Simple present, yes/no question";
      simplePresQ.negative = false;
      simplePresQ.question = true;

      simplePresAffirm.timeExpr = simplePresNeg.timeExpr = simplePresQ.timeExpr = presTE;

      if (this.sentence.isIrreg) {
        simplePastAffirm = [ENUM.subj, ENUM.irreg];
      } else {
        simplePastAffirm = [ENUM.subj, ENUM.BFV, ENUM.ed];
      }
      simplePastAffirm.name = "Simple past, affirmative";
      simplePastAffirm.negative = false;

      simplePastNeg = [ENUM.subj, ENUM.did, ENUM.not, ENUM.BFV];
      simplePastNeg.name = "Simple past, negative";
      simplePastNeg.negative = true;

      simplePastQ = [ENUM.did, ENUM.subj, ENUM.BFV]
      simplePastQ.name = "Simple past, question";
      simplePastQ.negative = false;
      simplePastQ.question = true;

      simplePastAffirm.timeExpr = simplePastNeg.timeExpr = simplePastQ.timeExpr = pastTE;

      presProgAffirm = [ENUM.subj, bePresForm, ENUM.BFV, ENUM.ing];
      presProgAffirm.name = "Present progressive, affirmative";
      presProgAffirm.negative = false;

      presProgNeg = [ENUM.subj, bePresForm, ENUM.not, ENUM.BFV, ENUM.ing];
      presProgNeg.name = "Present progressive, negative";
      presProgNeg.negative = true;

      presProgQ = [bePresForm, ENUM.subj, ENUM.BFV, ENUM.ing];
      presProgQ.name = "Present progressive, question";
      presProgQ.negative = false;
      presProgQ.question = true;

      presProgAffirm.timeExpr = presProgNeg.timeExpr = presProgQ.timeExpr = progTE;

      this.formArray = [simplePresAffirm, simplePresNeg, simplePresQ,
                        simplePastAffirm, simplePastNeg, simplePastQ,
                        presProgAffirm, presProgNeg, presProgQ];
      }
      this.formName = this.formArray[this.fCount]['name'];
      this.isNegative = this.formArray[this.fCount]['negative'];
      this.isQuestion = this.formArray[this.fCount]['question'];
      this.timeExpr = this.formArray[this.fCount]['timeExpr'];
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
  this.penultimate = false;

  wordValue = this.formArray[this.fCount][this.wCount];
  this.wCount++;
  if (this.wCount === this.formArray[this.fCount].length-1) {
    this.penultimate = true;
  }
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
    this.isNegative = this.formArray[this.fCount]['negative'];
    this.isQuestion = this.formArray[this.fCount]['question'];
    this.timeExpr = this.formArray[this.fCount]['timeExpr'];
  }
  return wordValue;
}

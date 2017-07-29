var form = {
  wCount: 0,
  fCount: 0,
  sCount: 0,
  sentenceCollection: [],
  sentence: [],
  currentForm: []
};





  form.init = function () {
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
   }

   form.getNextSentence = function () {
     console.log("getting next sentencej");
    var doForm = ENUM.do;
    var bePresForm = ENUM.are;
    var bePastForm = ENUM.were;
    var haveForm = ENUM.have;

    this.sentence = this.sentenceCollection.pop();
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

    console.log("doform: " + doForm);

    var simplePresAffirm;
    if (doForm === ENUM.does) {
        simplePresAffirm = [ENUM.subj, ENUM.BFV, ENUM.s];
    } else {
        simplePresAffirm = [ENUM.subj, ENUM.BFV ];
    }
    simplePresAffirm.name = "Simple present, affirmative";

    var simplePresNeg = [ENUM.subj, doForm, ENUM.not, ENUM.BFV];
    simplePresNeg.name = "Simple present, negative";

    var simplePresQ = [doForm, ENUM.subj, ENUM.BFV];
    simplePresQ.name = "Simple present, yes/no question";
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

    this.sentence = [simplePresAffirm, simplePresNeg, simplePresQ,
                      simplePastAffirm, simplePastNeg, simplePastQ,
                       presProgAffirm, presProgNeg, presProgQ];

    //console.log(this.sentence);
  }






form.nextWord =  function () {
  this.wCount++;
  //console.log(this.sentence);
}

form.getWord = function () {
  console.log("wCount:  " + this.wCount);
  console.log(this.sentence[this.fCount][this.wCount]);
}

form.init();
form.getNextSentence();
form.getWord();
form.nextWord();
form.getWord();

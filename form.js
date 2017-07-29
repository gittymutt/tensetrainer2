var form = {
  wCount: 0,
  fCount: 0,
  sentenceCollection: [],
  sentence: [],
  newSentence: false,
  newForm: false,
  done: false
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
     //console.log("getting next sentencej");
    var doForm = ENUM.do;
    var bePresForm = ENUM.are;
    var bePastForm = ENUM.were;
    var haveForm = ENUM.have;

    console.log(this.sentenceCollection);
    if (this.sentenceCollection.length < 1) {
      console.log("DONE!!!!!!!!!!!!!!!!!");
      this.done = true;
      return false;
    }
    this.sentence = this.sentenceCollection.pop();
    /*
    if (this.sentence == undefined) {
      console.log("nothing in sentence");
      return true;
    }
    */

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

    return true;
  }


form.getPosition = function () {
  return {wCount: this.wCount, fCount: this.fCount};

}




form.getWord = function () {
  this.newSentence = false;
  this.newForm = false;
  console.log(this.sentence[this.fCount][this.wCount]);
  console.log(this.done);
  this.wCount++;
  if (this.wCount === this.sentence[this.fCount].length) {
    //console.log("Got to the end of sentence");
    this.wCount = 0;
    this.newForm = true;
    this.fCount++;
    if (this.fCount === this.sentence.length) {
      this.fCount = 0;
      this.newSentence = true;
      if (this.getNextSentence() == undefined) {
        console.log("end of everthing!!!!!!!");
      }

    }
  }
}

form.init();
form.getNextSentence();
while (!form.done) {
  if (form.newForm) {console.log("new form!!!!");}
  if (form.newSentence) {console.log("new sentence");}
  form.getWord();
  console.log(form.getPosition());
}

console.log("got to the end safe and dsound");

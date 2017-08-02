var display = {
  isIrreg: false,
  subj: "subjError",
  BFV: "BFVerror",
  Spast: "sPasterror",
  theRest: "theResterror"
}

display.init = function(myForm) {
  this.isIrreg = myForm.isIrreg;
  this.subj = myForm.sentence['Subj'];
  this.BFV = myForm.BFV;
  this.sPast = myForm.Spast;
  this.theRest = myForm.theRest;
  console.log(myForm.BFV);
  console.log(this.subj, this.isIrreg, this.BFV, this.sPast, this.theRest);
}

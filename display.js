var display = {
  isIrreg: false,
  subj: "subjError",
  BFV: "BFVerror",
  Spast: "sPasterror",
  theRest: "theResterror",
  buttonDiv: document.getElementById('buttons')

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

display.setUpButtons = function() {
  // buttons needed:
  // subj, (irreg past form), is, am are, was, were, do, does
  // have, has, BFV, not, ing, ed

  //labels and IDs for buttons
  var buttonArray = [
    {ID: ENUM.is, label: "is"},
    {ID: ENUM.am, label: "am"},
    {ID: ENUM.are, label: "are"},
    {ID: ENUM.do, label: "do"},
    {ID: ENUM.did, label: "did"},
    {ID: ENUM.does, label:"does"},
    {ID: ENUM.was, label: "was"},
    {ID: ENUM.were, label: "were"},
    {ID: ENUM.s, label: "-s"},
    {ID: ENUM.have, label: "have"},
    {ID: ENUM.has, label: "has"},
    {ID: ENUM.BFV, label: this.BFV},
    {ID: ENUM.not, label: "not"},
    {ID: ENUM.ing, label: "-ing"},
    {ID: ENUM.ed, label: "-ed"},
    {ID: ENUM.subj, label: this.subj}
  ];



  buttonArray.forEach(function (item, index) {
      console.log(item.ID, item.label);
      var btn = document.createElement("Button");
      btn.innerText = item.label;
      btn.onclick = function () {
        var id = item.ID;
        console.log(id);

      }
      display.buttonDiv.appendChild(btn);
    });

}

form.init();

console.log("form name at first: " + form.formName);
while (!form.done) {
  if (form.newForm) {console.log(form.formName);}
  if (form.newSentence) {console.log("new sentence");}
  console.log(" returned from getWord(): " + form.getWord());
  //console.log(form.getPosition());
}

display.init(form);

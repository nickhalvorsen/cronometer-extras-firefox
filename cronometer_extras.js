// ==UserScript==
// @name     Unnamed Script 368664
// @version  1
// @grant    none
// @include     https://cronometer.com/
// ==/UserScript==


document.addEventListener('DOMContentLoaded', function(){ 
	addEventHandlersWhenButtonsExist()
}, false)


function addEventHandlersWhenButtonsExist() {
  
  var checkExist = setInterval(function() {
    console.log("waiting until buttons appear...")
  	var foodButton = getFoodButton()
   	if (foodButton !== undefined) {
    	clearInterval(checkExist);
      console.log("buttons appeared, attaching click event handlers")
      addEventHandlers()
      console.log("click event handlers attached!")
   	}
  }, 150);   
}

function getFoodButton() {
 	return document.getElementsByClassName('GL-TVABCDWB')[0] 
}

function getExerciseButton() {
  return document.getElementsByClassName('GL-TVABCCWB')[0] 
}

function getBiometricButton() {
  return document.getElementsByClassName('GL-TVABCNVB')[0] 
}

function getNoteButton() {
  return document.getElementsByClassName('GL-TVABCEWB')[0]
}

function addEventHandlers() {
  addFoodButtonEventHandler()
  addExerciseButtonEventHandler()
  addBiometricButtonEventHandler()
  addNoteButtonEventHandler()
}

function addFoodButtonEventHandler() {
  	getFoodButton().addEventListener('click', function() {
      var checkExist2 = setInterval(function() {
      console.log("waiting until modal is fully loaded...")
      var submitTable = getFoodButtonSubmitTable()
      if (submitTable !== undefined) {
        clearInterval(checkExist2);
        console.log("modal appeared, creating button")
        addFoodExtraButton()
        console.log("button added!")
      }
    }, 150);  
	});
}

function addFoodExtraButton()
{
  var div = document.createElement('div')
  var button = document.createElement('button')
  var text = document.createTextNode('Add Serving and Continue')
  div.appendChild(button)
  button.appendChild(text)
  button.className += " prettybutton";
  button.addEventListener('click', function() { onFoodExtraButtonClicked() } )

  getFoodButtonSubmitTable().appendChild(div)
}

function onFoodExtraButtonClicked() {
	var realButton = getSubmitTable().getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('button')[0];
  eventFire(realButton, 'click')
  eventFire(getFoodButton(), 'click')
}

function getFoodButtonSubmitTable() {
  return document.getElementsByClassName('GL-TVABCL3')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
}


// from https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}



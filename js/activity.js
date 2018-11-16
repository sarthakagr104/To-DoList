define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon", "webL10n"], function (activity, environment, icon, webL10n) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();
		// Set current language to Sugarizer
	var defaultLanguage = (typeof chrome != 'undefined' && chrome.app && chrome.app.runtime) ? chrome.i18n.getUILanguage() : navigator.language;
	var language = environment.user ? environment.user.language : defaultLanguage;
	webL10n.language.code = language;

		var enterButton = document.getElementById("enter");
		var input = document.getElementById("userInput");
		var ul = document.querySelector("ul");
		var item = document.getElementsByTagName("li");

		function inputLength(){
			return input.value.length;
		}

		function listLength(){
			return item.length;
		}

		function createListElement() {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(input.value));
			ul.appendChild(li);
			input.value = "";



			function crossOut() {
				li.classList.toggle("done");
			}

			li.addEventListener("click",crossOut);




			var dBtn = document.createElement("button");
			dBtn.appendChild(document.createTextNode("X"));
			li.appendChild(dBtn);
			dBtn.addEventListener("click", deleteListItem);



			function deleteListItem(){
				li.classList.add("delete")
			}

		}


		function addListAfterClick(){
			if (inputLength() > 0) {
				createListElement();
			}
		}

		function addListAfterKeypress(event) {
			if (inputLength() > 0 && event.which ===13) {
				createListElement();
			}
		}




		enterButton.addEventListener("click",addListAfterClick);

		input.addEventListener("keypress", addListAfterKeypress);

		// Process localize event
window.addEventListener("localized", function() {
	document.getElementById("heading").innerHTML = "<h1>"+webL10n.get("WORK TO-DO")+"</h1>";
	document.getElementById("first").innerHTML = "<h1>"+webL10n.get("Enter text into the input field to add items to your list.")+"</h1>";
	document.getElementById("second").innerHTML = "<h1>"+webL10n.get("Click Enter button to add items to your list.")+"</h1>";
	document.getElementById("third").innerHTML = "<h1>"+webL10n.get("Click the 'X' to remove the item from your list.")+"</h1>";


});
	});

});

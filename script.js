//Example string that would have a problem with multiple plurals -- 
//He bought a computer.
//-- where "He" could also possibly be either "She" or "They"
//and "a computer" could also possibly be "multiple computers"
//Now we need the combination "He bought multiple computers."
//With the current API, we could only pass in one PLURAL: value
//So we would either get "He bought a computer." or "They bought multiple computers."

//Could pass in an array to plural: and have the API call them as PLURAL1, PLURAL2, PLURAL3, etc.
//so if we resolved {"message", "progress-app", {gender:"female", plural:[4,1,3]}}
//and the plural logic in that language said 4=="many", 1=="one", and 3=="few"
//would call ( {"GENDER": "female", "PLURAL1":"many", "PLURAL2": "one", "PLURAL3": "few"})

var option_select_primary = document.getElementById("option_select_primary");
var option_select_secondary = document.getElementById("option_select_secondary");
var gender_options = ["male", "female", "other"];
var plural_options = ["one", "other"];

option_select_secondary.style.visibility = "hidden";
add_button.style.visibility = "hidden";


option_select_primary.onchange = function()
{
	var selected_value = this.value;
	var add_button = document.getElementById("add_button");

	clear_secondary_options(option_select_secondary);

	option_select_secondary.style.visibility = "hidden";
	add_button.style.visibility = "hidden";

	if(selected_value === "empty")
	{
		return;
	}

	add_button.style.visibility = "visible";

	if(selected_value === "NUMBER")
	{
		return;
	}

	option_select_secondary.style.visibility = "visible";

	get_selection_options("option_select_secondary", selected_value);

};

var clear_secondary_options = function(element)
{
	while (element.firstChild)
	{
		element.removeChild(element.firstChild);
	}
};

var get_selection_options = function(id, selected_value)
{
	var option_array = gender_options;
	var loop_function = create_input_fields;
	var element = document.getElementById(id);

	if(selected_value == "PLURAL")
	{
		option_array = plural_options;
	}

	if(id != "option_select_secondary")
	{
		loop_function = populate_dropdown;
	}

	var count = option_array.length;

	for(var i = 0; i < count; i++)
	{
		loop_function(element, option_array[i]);
	}

};

var create_input_fields = function(element, placeholder)
{
	var current_input = document.createElement("input");
	current_input.placeholder = placeholder;
	element.appendChild(current_input);
	var line_break = document.createElement("br");
	element.appendChild(line_break);
};

var populate_dropdown = function(element, value)
{
	var current_option = document.createElement("option");
	current_option.value = value;
	current_option.innerHTML = value;
	element.appendChild(current_option);
};

var update_preview_dropdowns = function()
{
	get_selection_options("preview_gender_select", "GENDER");
	get_selection_options("preview_plural_select", "PLURAL");

};

update_preview_dropdowns();
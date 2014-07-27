var locale_data;
var gender_options = ["male", "female", "other"];
var plural_options = ["one", "other"];

document.getElementById("option_select_primary_1").onchange = function()
{
	option_select_primary_onchange(1);
};

document.getElementById("option_select_primary_2").onchange = function()
{
	option_select_primary_onchange(2);
}

var option_select_primary_onchange = function(panel_number)
{
	var primary_id = "option_select_primary_" + panel_number;
	var primary_select = document.getElementById(primary_id);
	var secondary_id = "option_select_secondary_" + panel_number;
	var secondary_select = document.getElementById(secondary_id);
	var add_button_id = "add_button_" + panel_number;
	var add_button = document.getElementById(add_button_id);
	var cancel_button_id = "cancel_button_" + panel_number;
	var cancel_button = document.getElementById(cancel_button_id);
	var selected_value = primary_select.value;

	if(panel_number == 1)
	{
		var string_editor = document.getElementById("editor_panel");
		var disabled_message = document.getElementById("disabled_message_editor");

		if(selected_value == "empty")
		{
			string_editor.className = "";
			disabled_message.style.visibility = "hidden";
		}
		else
		{
			string_editor.className = "unclickable";
			disabled_message.style.visibility = "visible";
		}
	}

	clear_secondary_options(secondary_select);

	secondary_select.style.visibility = "hidden";
	add_button.style.visibility = "hidden";
	cancel_button.style.visibility = "hidden";

	if(selected_value == "empty")
	{
		return;
	}

	add_button.style.visibility = "visible";
	cancel_button.style.visibility = "visible";

	if(selected_value == "number")
	{
		return;
	}

	secondary_select.style.visibility = "visible";

	get_selection_options(secondary_id, selected_value, panel_number);
}

var clear_secondary_options = function(element)
{
	while (element.firstChild)
	{
		element.removeChild(element.firstChild);
	}
}

var get_selection_options = function(id, selected_value, panel_number)
{
	var option_array = gender_options;
	var loop_function = create_input_field;
	var element = document.getElementById(id);

	if(selected_value == "plural")
	{
		option_array = plural_options;
	}

	if(id.slice(0,-2) != "option_select_secondary")
	{
		loop_function = populate_dropdown;
	}

	var count = option_array.length;

	for(var i = 0; i < count; i++)
	{
		loop_function(element, option_array[i], selected_value, panel_number);
	}

}

var create_input_field = function(element, option_name, selected_value, panel_number)
{
	var current_input = document.createElement("input");
	current_input.placeholder = option_name;
	current_input.className = "option_input_field input_" + selected_value + "_" + panel_number;
	current_input.id = "input_" + selected_value + "_" + option_name + "_" + panel_number;
	element.appendChild(current_input);

	if(panel_number == 1) //For now, only show this on first option panel
	{
		var new_option_button = document.createElement("input");
		new_option_button.type = "button";
		new_option_button.value = "Add new option within " + option_name;
		new_option_button.id = "button_" + selected_value + "_" + option_name + "_" + panel_number;
		new_option_button.onclick = function()
		{
			add_new_option_within_init(option_name, panel_number, current_input.id);
		}

		element.appendChild(new_option_button);
	}

	var line_break = document.createElement("br");
	element.appendChild(line_break);
}

var add_new_option_within_init = function(option_name, previous_panel_number, target_input_field_id)
{
	var panel_number = previous_panel_number + 1;
	var previous_panel = document.getElementById("options_content_" + previous_panel_number);
	previous_panel.className = "unclickable";

	document.getElementById("disabled_message_" + previous_panel_number).style.visibility = "visible";
	document.getElementById("options_panel_" + panel_number).style.display = "inline-block";
	document.getElementById("options_panel_" + panel_number + "_heading").innerHTML = 'Add New Option within "' + option_name + '"';
	document.getElementById("add_button_" + panel_number).onclick = function()
	{
		add_button_onclick(panel_number, target_input_field_id);
		add_new_option_close(panel_number, previous_panel_number);
	};

	document.getElementById("cancel_button_" + panel_number).onclick = function()
	{
		add_new_option_close(panel_number, previous_panel_number);
	}
}

var create_option_code = function(panel_number, selected_value)
{
	var return_string = "{" + selected_value.toUpperCase();

	if(selected_value == "number")
	{
		return return_string + "}";
	}

	if(selected_value == "plural")
	{
		return_string += ", plural,";
	}
	else
	{
		return_string+= ", select,"
	}
	
	var input_fields = document.getElementsByClassName("input_" + selected_value.toLowerCase() + "_" + panel_number);
	var count = input_fields.length;

	for(var i = 0; i < count; i++)
	{
		return_string += " " + input_fields[i].placeholder + "{" + input_fields[i].value + "}";
	}

	return return_string + "}";
}

var add_new_option_close = function(panel_number, previous_panel_number)
{
	document.getElementById("options_content_" + previous_panel_number).className = "";
	document.getElementById("disabled_message_" + previous_panel_number).style.visibility = "hidden";
	cancel_button_onclick(panel_number);
	document.getElementById("options_panel_" + panel_number).style.display = "none";
}

var populate_dropdown = function(element, option_name)
{
	var current_option = document.createElement("option");
	current_option.value = option_name;
	current_option.innerHTML = option_name;
	element.appendChild(current_option);
}

var update_preview_dropdowns = function()
{
	get_selection_options("preview_gender_select", "GENDER");
	get_selection_options("preview_plural_select", "PLURAL");

}();

var cancel_button_onclick = function(panel_number)
{
	document.getElementById("option_select_primary_" + panel_number).value = "empty";
	option_select_primary_onchange(panel_number);
}

var add_button_onclick = function(panel_number, target_input_field_id)
{
	var selected_value = document.getElementById("option_select_primary_" + panel_number).value;
	var target = document.getElementById(target_input_field_id);

	target.value += create_option_code(panel_number, selected_value);
	target.focus();
	cancel_button_onclick(panel_number);
}

var preview_button_onclick = function()
{
	var preview_text = document.getElementById("preview_content_text");
	preview_text.style.color = "#000000";
	preview_text.innerHTML = document.getElementById("editor_content").value;
	preview_text.innerHTML += "<br/>TODO: Include messageformat.js and compile with the above as input."
}

var reset_preview = function()
{
	var preview_text = document.getElementById("preview_content_text");
	preview_text.style.color = "#777777";
	preview_text.innerHTML = 'Click the "Show Preview" button to update with your changes.';
} 
//For some reason, #editor_content onclick and onkeyup say reset_preview() 
//is undefined when I try to self-call? So I guess:
reset_preview();
//to be sloppy.

var get_locale_data = function(selected_locale) 
{

    var path = "locales/" + selected_locale + ".json";
    var xobj = new XMLHttpRequest();
    var returned_data;


    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false);

    xobj.onreadystatechange = function() 
    {
        handle_ready_state(xobj);
    }

    xobj.send(null);

}

var handle_ready_state = function(xobj) 
{
    if (xobj.readyState == 4 && xobj.status == "200") 
    {
        locale_data = JSON.parse(xobj.responseText);

    } 
    else if (xobj.readyState == 4 && xobj.status == "404") 
    {
        locale_data = get_locale_data("en");

    }
}

get_locale_data("en");

console.log(locale_data.gender);

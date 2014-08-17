//TODO
//Put included_locales list in a separate file.
//Could be populated using filenames in the /locale directory?
//Only problem with that is that you'd have "en" but not "English"
//unless you add another key to en.json that's "name" or something
//Also, have them appear sorted alphabetically to the user,
//not alphabetically in the code by language code

//Names for the language codes in included_locales
//(for example, knowing "Welsh" corresponds to "cy")
//mostly come from http://search.cpan.org/~sburke/I18N-LangTags/lib/I18N/LangTags/List.pm

var locale_data;
var included_locale_option_array = [];
var included_locales = 
{
	af: "Afrikaans",
	am: "Amharic",
	ar: "Arabic",
	bg: "Bulgarian",
	bn: "Bengali",
	br: "Breton",
	ca: "Catalan",
	cs: "Czech",
	cy: "Welsh",
	da: "Danish",
	de: "German",
	el: "Greek",
	en: "English",
	es: "Spanish",
	et: "Estonian",
	eu: "Basque",
	fa: "Persian",
	fi: "Finnish",
	fr: "French",
	ga: "Irish",
	gl: "Galician",
	gsw: "gsw (Name Unknown)",
	gu: "Gujarati",
	he: "Hebrew",
	hi: "Hindi",
	hr: "Croatian",
	hu: "Hungarian",
	id: "Indonesian",
	is: "Icelandic",
	it: "Italian",
	ja: "Japanese",
	kn: "Kannada",
	ko: "Korean",
	lag: "lag (Name Unknown)",
	ln: "Lingala",
	lt: "Lithuanian",
	lv: "Latvian",
	mk: "Macedonian",
	ml: "Malayalam",
	mo: "Moldavian",
	mr: "Marathi",
	ms: "Malay",
	mt: "Maltese",
	nl: "Dutch",
	no: "Norwegian",
	or: "Oriya",
	pl: "Polish",
	pt: "Portuguese",
	ro: "Romanian",
	ru: "Russian",
	shi: "shi (Name Unknown)",
	sk: "Slovak",
	sl: "Slovenian",
	sq: "Albanian",
	sr: "Serbian",
	sv: "Swedish",
	sw: "Swahili",
	ta: "Tamil",
	te: "Telugu",
	th: "Thai",
	tl: "Tagalog",
	tr: "Turkish",
	uk: "Ukrainian",
	ur: "Urdu",
	vi: "Vietnamese",
	zh: "Chinese"
}

if(!localStorage.getItem("current_locale"))
{
    localStorage.setItem("current_locale", "en");
}

var get_locale_data = function(selected_locale, passed_path) 
{
	var path;

	if(passed_path)
	{
		path = passed_path;
	}
	else
	{
		path = "locales/" + selected_locale + ".json";
	}

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
    	console.log("Couldn't load " + localStorage.getItem("current_locale") + ".json");
    	localStorage.setItem("current_locale", "en");
    	locale_data = { "gender": ["male", "female", "other"], "plural": ["one", "other"] }; 
    }
}
	
get_locale_data(localStorage.getItem("current_locale"));

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

var initialize_included_locale_option_array = function()
{
	var included_locale_keys = Object.keys(included_locales);
	var count = included_locale_keys.length;

	for(var i = 0; i < count; i++)
	{
		//Creates something like [ ["ar", "Arabic"], ["en", "English"] ]
		included_locale_option_array[i] = 
		[ included_locale_keys[i], included_locales[included_locale_keys[i]] ];
	}
}();

var get_selection_options = function(id, selected_value, panel_number)
{
	var option_array = locale_data.gender;
	var loop_function = create_input_field;
	var element = document.getElementById(id);

	if(selected_value == "plural")
	{
		option_array = locale_data.plural;
	}
	else if(selected_value == "included_locales")
	{
		option_array = included_locale_option_array;
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

var populate_dropdown = function(element, option_value)
{
	var option_name;

	if(typeof option_value == "object")
	{
		option_name = option_value[1];
		option_value = option_value[0];
	}

	var current_option = document.createElement("option");
	current_option.value = option_value;
	current_option.innerHTML = option_name || option_value;
	element.appendChild(current_option);
}

var update_dropdowns = function()
{
	get_selection_options("preview_gender_select", "gender");
	get_selection_options("preview_plural_select", "plural");
	get_selection_options("editor_locale_select", "included_locales");
	document.getElementById("editor_locale_select").value = localStorage.getItem("current_locale");

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
	require(["thirdparty/messageformat"], compile_preview);
}

var locale_dropdown_onchange = function()
{
	var locale_dropdown = document.getElementById("editor_locale_select");
	var response = confirm("Because different languages have different plural rules, changing the language will clear all the fields on the page. Are you sure you want to change the language?")

	if(response == true)
	{
    	localStorage.setItem("current_locale", locale_dropdown.value);
    	location.reload();
	}
	else
	{
    	locale_dropdown.value = localStorage.getItem("current_locale");
	}
}

var compile_preview = function(messageformat)
{
	var preview_text = document.getElementById("preview_content_text");
	var preview_string = new messageformat();
	var gender_value = document.getElementById("preview_gender_select").value;
	var plural_value = document.getElementById("preview_plural_select").value;
	var number_value = document.getElementById("preview_number_input").value;

	preview_string = preview_string.compile(document.getElementById("editor_content").value);

	try
	{
		preview_string = preview_string({"GENDER": gender_value, "PLURAL": plural_value, "NUMBER": number_value});
		preview_text.innerHTML = preview_string;
	} 
	catch(error)
	{
		preview_text.innerHTML = "There was an error compiling what you entered in the string editor.";
	}

	preview_text.style.color = "#000000";
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

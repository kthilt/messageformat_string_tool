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

document.getElementById("editor_content").innerHTML = "Test";
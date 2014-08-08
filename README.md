MessageFormat String Tool
=========================

This is a basic JavaScript tool to help translators write translations that need "code", like gender or plural options. Currently, the rules this tool follows are just compliant with the "labels" API written for Cengage Learning, so only one value for previewing gender/plural/number is available. In the future, the API may be modified to support multiple different gender/plural/number values (for example, first gender tag being "male" and second gender tag being "female"), and in that case, this tool will need to be modified.

Getting the Tool Running
------------------------

You will need to serve the files somehow. An easy way to do this is with Python, so make sure you have installed Python if you take the below route.

After cloning the repository, navigate to the repository's root directory on the command line and enter

```
python -m SimpleHTTPServer
```

Then open your browser and go to ```localhost:8000``` to begin using the tool.

Using the Tool
--------------

Hopefully this part is pretty simple. Begin by selecting the language in which you will be typing by using the dropdown near the top of the "String Editor" panel. This will load the gender and pluralization rules for that selected language.

Use the "String Editor" text field to type the parts of the message that are constant between all gender/plural combinations. Whenever you reach a section that needs to change based on gender/plural/number, use the dropdown under "Add New Option" to select whatever option you need. Then proceed to type the option-specific messages in their respective fields and click "Add Option" to append the option "code" to the end of the text field above.

You also have the ability to add an option within an option (for example, a pluralization switch within the "male" case for a gender option). To do this, click the "Add new opton within ... " button next to a given field while adding the first-level option. Since options within options are likely rare, only two levels deep is supported at the moment. However, the code is written in a way that nesting a near infinite amount of options would be easy enough, if desired.

At any time during your string construction, you can preview how your input will be interpreted by using the "Preview" panel. Simply select the options with which you'd like to preview and click the "Show Preview" button. This directly uses the messageformat objects as they are used in the "labels" API to render the preview.

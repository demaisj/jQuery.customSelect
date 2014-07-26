jQuery.customSelect
===================

Simple &amp; lightweight select customizer

*For the latest release (v1.0.1), see the releases tab.*

##Features

#####Simple
Call once a function and customize your select element with the power of CSS !

#####Lightweight
This jQuery plugin has been designed to be small, so the production file is only 4.15 Kb minimified !

#####Accessible
The plugin supports well the keyboard navigation like on a standart select element.

#####Fully customizable
Add html into your options, use the power of css, disabe some features, do what you want with this plugin !

##How it works

You have just 2 steps to complete.
First, simply call ``jQuery.customSelect()`` to start a new instance of the plugin:

```js
$("#MySelect").customSelect();
```

After, write some css like this one to customize your new select element !

```css
.custom-select {

}
.custom-select .select-trigger {

}
.custom-select .select-inner-wrap {

}
.custom-select .select-inner-wrap .select-options {

}
.custom-select.select-open .select-inner-wrap .select-options {

}
.custom-select .select-inner-wrap .select-options li.select-selected {

}
.custom-select .select-inner-wrap .select-options li.select-hover {

}
.custom-select .select-inner-wrap .select-options li.select-disabled {

}
```

##Options
The main method arguments are like below:
```js
jQuery.customSelect( options )
```

The default options values are:
```js
{
    cssClass: "custom-select",
    keyNav: true,
    markup: "<button type='button' class='select-trigger'></button><div class='select-inner-wrap'><ul class='select-options'></ul></div>",
    allowHTML: true
}
```

#####cssClass
With this option you can change the main css class of the custom select if it's in conflict with other components.

#####keyNav
Enable or disable the keyboard navigation.

#####markup
Change the markup of the select element. Don't change the classes otherwise the plugin won't work anymore. The options are inside the ``ul.select-option`` in a ``li`` element.

#####allowHTML
Enable or disable the HTML feature of the options. To pass HTML to an option, add a ``data-html`` attribute with the specified HTML inside.

##Methods
To call a method, call the plugin with the method name instead of the options:
```js
jQuery.customSelect( method [ , args... ] )
```

#####render
No arguments.

Call this when you have modified the options of the original select element to rerender the options on the customized select.

#####val
Optionnal argument: New value to set

Call ``val`` when you want to read the select value or you want to alter the select value properly.

#####destroy
No arguments.

Use this method to destroy the instance of the plugin, deleting the custom element and let the original select element show.

##Todo

* Support of ``optgroup``
* Demo
* Better doc

##License
This plugin is licensied under [the MIT License](https://github.com/DeathMiner/jQuery.customSelect/blob/master/LICENSE)

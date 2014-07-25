/*!
 * jQuery.customSelect: Simple & lightweight select customizer
 * Version 1.0.0
 * https://github.com/DeathMiner/jQuery.customSelect
 * The MIT License
 * (c) 2014 Death_Miner
 */

/* jshint undef: true, unused: true */
/* global jQuery */

(function($){
	"use strict";

	/*
	 * PLUGIN MAIN CLASS
	 */
	var CustomSelect = function(element, options){
		// Store args in this (_this)
		var _this = this;
		_this.$element  = $(element);
		_this.options   = $.extend({}, CustomSelect.DEFAULTS, options);

		// Create custom select
		_this.$select = $("<div></div>");
		_this.$select.addClass(_this.options.cssClass);
		_this.$select.html(_this.options.markup);
		_this.$select.insertAfter(_this.$element);

		// Hide current select
		_this.$element.hide();

		// Render options
		_this.render();
		
		// Toggle select open state on click
		_this.$select.on("click", function(event){
			_this.$select.toggleClass("select-open");

			// Clean hover states when select opened
			if(_this.$select.hasClass("select-open")){
				// Remove all hover states
				_this.$select.find(".select-options li").removeClass("select-hover");

				// Add back the selected class of the selected option
				_this.$select.find(".select-options li[data-opt-id='"+_this.currentVal.id+"']").addClass("select-selected");
			}

			// Stop event propagation
			event.stopPropagation();
		});
		
		// On body click, close select
		$("body").on("click", function(){
			_this.$select.removeClass("select-open");
		});
		
		// Option clicked
		_this.$select.find(".select-options li").on("click", function(){
			var $option = $(this);

			if(!$option.hasClass("select-disabled")){
				// Set val
				_this.val(parseInt($option.attr("data-opt-id"), 10));
				
				// focus select
				_this.$select.find(".select-trigger").focus();
			}
			else{
				return false;
			}
		})
		// Option hover
		.on("mouseover", function(){
			// Add the hover class
			_this.$select.find(".select-options li").removeClass("select-hover");
			$(this).addClass("select-hover");

			// Remove the selected class of the selected option
			_this.$select.find(".select-options li[data-opt-id='"+_this.currentVal.id+"']").removeClass("select-selected");
		});
		
		// Select (trigger) focused (ATTACH KEY EVENT IF ACTIVATED)
		if(_this.options.keyNav){
			_this.$select.find(".select-trigger").on("focus", function(){

				// Key pressed
				_this.$select.on("keydown", function(event){
					// Up key
					if(event.keyCode == 38){ 
						// Save current prevOption key
						var key = _this.currentVal.value;

						// Loop while we don't find an option
						while(true){
							// Get previous option
							var prev = _this.prevOption(key);

							// Check if option exisst
							if(typeof prev != "undefined"){
								// Check if option is not disabled
								if(prev.disabled !== true){
									// If not, save value & exit
									_this.val(prev.id);
									return false;
								}

								// Save key for next iteration
								key = prev.value;
							}
							else{
								// Exit loop if option doesn't exists
								break;
							}
						}
					}
					// Down key
					else if(event.keyCode == 40){ 
						// Save current nextOption key
						var key = _this.currentVal.value;

						// Loop while we don't find an option
						while(true){
							// Get next option
							var next = _this.nextOption(key);

							// Check if option exisst
							if(typeof next != "undefined"){
								// Check if option is not disabled
								if(next.disabled !== true){
									// If not, save value & exit
									_this.val(next.id);
									return false;
								}

								// Save key for next iteration
								key = next.value;
							}
							else{
								// Exit loop if option doesn't exists
								break;
							}
						}
					}
					// Enter & Esc keys
					else if(event.keyCode == 27 || event.keyCode == 13){
						// Close select if not closed
						if(_this.$select.hasClass("select-open")){
							_this.$select.removeClass("select-open");
							return false;
						}
					}
				});

				// Remove key listenner when focus out
				_this.$select.find(".select-trigger").one("blur", function(){
					_this.$select.off("keydown");
				});
			});
		}
	};

	/*
	 * PLUGIN VERSION
	 */
	CustomSelect.VERSION = "1.0.0";

	
	/*
	 * PLUGIN DEFAULT SETTINGS
	 */
	CustomSelect.DEFAULTS = {
		cssClass: "custom-select",
		keyNav: true,
		markup: "<button type='button' class='select-trigger'></button><div class='select-inner-wrap'><ul class='select-options'></ul></div>",
		allowHTML: true
	};
	
	/*
	 * RENDER OPTIONS
	 */
	CustomSelect.prototype.render = function(){
		// Clear current options
		var _this = this;
		_this.selectOptions = [];

		// Iterate through select options
		_this.$element.find("option").each(function(){
			// Save option data
			var option_id = _this.selectOptions.length,
				optionObj = {
					id: option_id,
					value: $(this).val(),
					name: $(this).text(),
					html: typeof $(this).attr("data-html") != "undefined" ? $(this).attr("data-html") : false,
					disabled: $(this).prop('disabled')
				};
			_this.selectOptions.push(optionObj);

			// Create custom select option
			var option = $("<li></li>");
			option.attr("data-opt-id", optionObj.id);

			if(optionObj.html) option.html(optionObj.html);
			else option.text(optionObj.name);

			if(optionObj.disabled) option.addClass("select-disabled");

			option.appendTo(_this.$select.find(".select-options"));
		});

		// Set curent value
		_this.val(_this.$element.val());
	};

	/*
	 * GET AN OPTION BY ITS KEY
	 */
	CustomSelect.prototype.searchOptionByKey = function(key){
		var _this = this;
		for (var i = _this.selectOptions.length - 1; i >= 0; i--) {
			if(_this.selectOptions[i].value === key){
				return _this.selectOptions[i];
			}
		}
	};

	/*
	 * GET THE NEXT OPTION
	 */
	CustomSelect.prototype.nextOption = function(key){
		var _this = this,
			key = key || _this.currentVal.value;

		for (var i = _this.selectOptions.length - 1; i >= 0; i--) {
			if (_this.selectOptions[i].value === key) {
				return _this.selectOptions[i+1];
			}
		}
	};

	/*
	 * GET THE PREVIOUS OPTION
	 */
	CustomSelect.prototype.prevOption = function(key){
		var _this = this,
			key = key || _this.currentVal.value;
		
		for (var i = _this.selectOptions.length - 1; i >= 0; i--) {
			if (_this.selectOptions[i].value === key) {
				return _this.selectOptions[i-1];
			}
		}
	};

	/*
	 * SET OR GET THE VALUE
	 */
	CustomSelect.prototype.val = function(id){
		var _this = this,
			optionObj;

		// If no id provided, return the current value
		if(typeof id == "undefined"){
			return _this.currentVal.value;
		}
		// If string, get the option by its key
		else if(typeof id == "string"){
			optionObj = _this.searchOptionByKey(id);
		}
		// If number get the option by its id
		else if(typeof id == "number"){
			optionObj = _this.selectOptions[id];
		}

		// Set the new trigger text
		if(optionObj.html) _this.$select.find(".select-trigger").html(optionObj.html);
		else _this.$select.find(".select-trigger").text(optionObj.name);

		// Set legacy select value
		_this.$element.val(optionObj.value);

		// Set new local value
		_this.currentVal = optionObj;

		// Set selected class to the option
		_this.$select.find(".select-options li").removeClass("select-selected").removeClass("select-hover");
		_this.$select.find(".select-options li[data-opt-id='"+optionObj.id+"']").addClass("select-selected");
	};

	/*
	 * DESTROY CUSTOM SELECT INSTANCE
	 */
	CustomSelect.prototype.destroy = function(){
		var _this = this;

		_this.$element.show();
		_this.$select.empty().remove();
	};

	/*
	 * PLUGIN DEFINITION
	 */
	function Plugin(option, add_options) {

		return this.filter("select").each(function(){
			var $this   = $(this),
				data    = $this.data("customSelect"),
				options = typeof option == 'object' && option;

			if (!data) $this.data("customSelect", (data = new CustomSelect(this, options)));

			if (option == "render") data.render();
			else if (option == "val") data.val(add_options);
			else if (option == "destroy") data.destroy();
		});
	}

	var old = $.fn.customSelect;

	$.fn.customSelect = Plugin;
	$.fn.customSelect.Constructor = CustomSelect;

	/*
	 * CUSTOM SELECT NO CONFLICT
	 */
	$.fn.customSelect.noConflict = function () {
		$.fn.customSelect = old;
		return this;
	};
})(jQuery);
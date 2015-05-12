define(
		[],
		function() {
			
			return {
				// summary:
				//      This module is used to convert European digits to Arabic Digits & vice versa. 
				// description:
				//		Arabic and many other languages have classical shapes for digits (National Digits)
				//		That are different from the conventional Western Digits (European).
				//		Arabic digits have the same semantic meaning as the European digits. The difference is
				//		Only a difference in glyphs.
				//		This module is used to shape the digits contained in any string from Arabic to European
				//		And vice versa.
				
				
				// _context: [private] int
				//		The current effective context.
				//		Used to shape the digits in 'Contextual' mode.
				//		If the value is 1 & the mode is contextual, the digits will be European.
				//		If the value is 2 & the mode is contextual, the digits will be Arabic.
				//		Allowed values:
				//		'1': European context
				//		'2': Arabic context
				_context : 1,
				
				shape: function(/*String*/ text, /*String*/ shaperType, /*String?*/ textDir){
					// summary:
					//		Converts the digits in the text to European or Arabic digits
					//		According to the shaperType & the textDir.
					// description:
					//      This function is intended to convert the digits in the input 
					//		Text from European to Arabic & vice versa according to 
					//		The shaperType & the textDir as the following:
					//		1-Arabic: if shaperType = 'Arabic'.
					//      2-Arabic: if shaperType = 'Contextual' & the preceding character is Arabic.
					//		3-Arabic: if shaperType = 'Contextual' & textDir='rtl' & no preceding strong character.
					//		4-European: if shaperType = 'European'.
					//		5-European: if shaperType = 'Contextual' & the preceding character is English.
					//		6-European: if shaperType = 'Contextual' & textDir='ltr' & no preceding strong character.
					// text: String
					//		The text to be shaped.
					// shaperType: String
					//		The type of the shaper to be used.
					//		Allowed values:
					//		1."Arabic"
					//		2."European"
					//		3."Contextual"
					// textDir: String
					//		The direction of the input text.
					//		Allowed values:
					//		1. "ltr"
					//		2. "rtl"
					//		3. "auto"
					// returns:
					//		The shaped string.
					
					if(!text){
						return;
					}
					
					if(["Arabic", "European", "Contextual"].indexOf(shaperType) === -1){
						return text;
					}
					
					if(shaperType === "Arabic"){
						return this._shapeArabic(text);
					}else if(shaperType === "European"){
						return this._shapeEuropean(text);
					}else if(shaperType === "Contextual" && textDir === "rtl"){
						this._context = 2;
						return this._shapeContextual(text);
					}else{
						this._context = 1;
						return this._shapeContextual(text);
					}
				},
				
				_shapeEuropean: function (/*String*/ text){
					// summary:
					//		Converts the digits in the text to European digits.
					// text: String
					//		The text to be shaped.
					// return:
					//		The shaped string in European format.
					// tags:
			        //		private
					
					var textArr = text.split("");
					var c = "";
					for (var i = 0; i < text.length; ++i) {
						c = textArr[i];
						if (c >= "\u0660" && c <= "\u0669") { // Arabic digits range
							textArr[i] = c.charCodeAt(0) - 1632;
						}
					}
					return textArr.join("");
				},
				
				_shapeArabic: function(/*String*/ text){
					// summary:
					//		Converts the digits in the text to Arabic digits.
					// text: String
					//		The text to be shaped.
					// return:
					//		The shaped string in Arabic format.
					// tags:
			        //		private
					
					var textArr = text.split("");
					var c = "";
					for (var i = 0; i < text.length; ++i) {
						c = textArr[i];
						if (c >= "0" && c <= "9") { // European digits range
							textArr[i] = String.fromCharCode(parseInt(c) + 1632);
						}
					}
					return textArr.join("");
				},
				
				_shapeContextual: function(/*String*/ text){
					// summary:
					//		Converts the digits in the text to European or Arabic digits
					//		According to the type of the preceding strong character.
					// text: String
					//		The text to be shaped.
					// return:
					//		The shaped string.
					// tags:
			        //		private
					
					var textArr = text.split("");
					var c = "";
					for (var i = 0; i < text.length; ++i) {
						c = textArr[i];
						if (c >= "0" && c <= "9") {  // European digits range
							if(this._context === 2){ // context = 2 so convert from European to Arabic. else skip.
								textArr[i] = String.fromCharCode(parseInt(c) + 1632);
							}
						}else if (c >= "\u0660" && c <= "\u0669"){ // Arabic digits range
							if(this._context === 1){ // context = 1 so convert from Arabic to European. else skip.
								textArr[i] = c.charCodeAt(0) - 1632;
							}
						}else{ // this is not an Arabic or European digit.
							this._setContext(c);
						}
						
					}
					return textArr.join("");
				},
				
				_setContext: function(/*String*/ char){
					// summary:
					//		Set the current context according to the type of the input char.
					//		If the char is strong Arabic character this._context will be 2
					//		Else if it is a strong English character this._context will be 1
					//		Otherwise do nothing.
					// char: String
					//		The input character which will be checked 
					//		To determine if it is a strong Arabic or strong English character.
					// tags:
			        //		private
					
					var strongArabic = [["\u0608", "\u0608"],
					                    ["\u060B", "\u060B"],
					                    ["\u060D", "\u060D"],
					                    ["\u061B", "\u064A"], 
					                    ["\u066D", "\u066F"],
					                    ["\u0671", "\u06D5"],
					                    ["\u06E5", "\u06E6"],
					                    ["\u06EE", "\u06EF"],
					                    ["\u06FA", "\u06FF"],
					                    ["\u0750", "\u077F"],
					                    ["\u08A0", "\u08E3"],
					                    ["\u200F", "\u200F"],
					                    ["\u202B", "\u202B"],
					                    ["\u202E", "\u202E"],
					                    ["\u2067", "\u2067"],
					                    ["\uFB50", "\uFD3D"],
					                    ["\uFD40", "\uFDCF"],
					                    ["\uFDF0", "\uFDFC"],
					                    ["\uFDFE", "\uFDFF"],
					                    ["\uFE70", "\uFEFE"]];
					
					var strongLatin = [ ["\u0041", "\u005A"],
										["\u0061", "\u007A"],
										["\u00AA", "\u00AA"],
										["\u00B5", "\u00B5"],
										["\u00BA", "\u00BA"],
										["\u00C0", "\u00D6"],
										["\u00D8", "\u00F6"],
										["\u00F8", "\u02B8"],
										["\u02BB", "\u02BF"],
										["\u02E0", "\u02E4"],
										["\u02EE", "\u02EE"],
										["\u1D00", "\u1DBF"],
										["\u1E00", "\u1EFF"],
										["\u200E", "\u200E"],
										["\u202A", "\u202A"],
										["\u202D", "\u202D"],
										["\u2066", "\u2066"],
										["\u2071", "\u2073"],
										["\u207F", "\u207F"],
										["\u2090", "\u209F"],
										["\u2124", "\u2124"],
										["\u2126", "\u2126"],
										["\u2128", "\u2128"],
										["\u212A", "\u212D"],
										["\u212F", "\u2139"],
										["\u213C", "\u213F"],
										["\u2145", "\u2149"],
										["\u214E", "\u214F"],
										["\u2160", "\u2188"],
										["\u218A", "\u218F"],
										["\u2C60", "\u2C7F"],
										["\uA722", "\uA787"],
										["\uA789", "\uA7BF"],
										["\uA7F0", "\uA7FF"],
										["\uAB30", "\uAB6F"],
										["\uFB00", "\uFB0F"],
										["\uFF21", "\uFF3A"],
										["\uFF41", "\uFF5A"]];
					
					if(this._binarySearch(strongArabic, char) > -1){
						this._context = 2;
					}else if(this._binarySearch(strongLatin, char) > -1){
						this._context = 1;
					}
				},
				
				_binarySearch: function(/*Array*/ arr, /*string*/ key) {
					var low = 0;
					var high = arr.length - 1;
					while (low <= high) {
						var mid = parseInt(low + ((high - low) / 2));
						if (key >= arr[mid][0] && key <= arr[mid][1]){
							return mid;
						}else if (key > arr[mid]){
							low = mid + 1;
						}else if (key < arr[mid]){
							high = mid - 1;
						}
					}
					return -1;
				}
				
			};
		});
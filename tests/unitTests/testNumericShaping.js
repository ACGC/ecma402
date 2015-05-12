define(
		[ "intern!object", "intern/chai!assert", "ecma402/NumericShapingUtil"],
		function(registerSuite, assert, NumericShapingUtil) {
			registerSuite({
				name : "testNumericShaping",
				testNumericShaping : function() {
					var testCases = [ {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "abc 123",
						"expected" : "abc 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "اول 123",
						"expected" : "اول 123"
					}, {
						"shape" : "European",
						"textDir" : "rtl",
						"value" : "اول 123",
						"expected" : "اول 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "اول 123 abc 123",
						"expected" : "اول 123 abc 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "123",
						"expected" : "123"
					}, {
						"shape" : "European",
						"textDir" : "rtl",
						"value" : "123",
						"expected" : "123"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "abc 123",
						"expected" : "abc ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "اول 123",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "rtl",
						"value" : "اول 123",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "اول 123 abc 123",
						"expected" : "اول ١٢٣ abc ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "123",
						"expected" : "١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "rtl",
						"value" : "123",
						"expected" : "١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "abc 123",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "اول 123",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "اول 123 abc 123",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "123",
						"expected" : "123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "abc 123",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "اول 123",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "اول 123 abc 123",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "123",
						"expected" : "123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "abc 123",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "اول 123",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "اول 123 abc 123",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "123",
						"expected" : "١٢٣"
					},
					// Arabic Inputs
					{
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "abc ١٢٣",
						"expected" : "abc 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "اول ١٢٣",
						"expected" : "اول 123"
					}, {
						"shape" : "European",
						"textDir" : "rtl",
						"value" : "اول ١٢٣",
						"expected" : "اول 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "اول ١٢٣ abc ١٢٣",
						"expected" : "اول 123 abc 123"
					}, {
						"shape" : "European",
						"textDir" : "ltr",
						"value" : "١٢٣",
						"expected" : "123"
					}, {
						"shape" : "European",
						"textDir" : "rtl",
						"value" : "١٢٣",
						"expected" : "123"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "abc ١٢٣",
						"expected" : "abc ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "اول ١٢٣",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "rtl",
						"value" : "اول ١٢٣",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "اول ١٢٣ abc ١٢٣",
						"expected" : "اول ١٢٣ abc ١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "ltr",
						"value" : "١٢٣",
						"expected" : "١٢٣"
					}, {
						"shape" : "Arabic",
						"textDir" : "rtl",
						"value" : "١٢٣",
						"expected" : "١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "abc ١٢٣",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "اول ١٢٣",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "اول ١٢٣ abc ١٢٣",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "",
						"value" : "١٢٣",
						"expected" : "123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "abc ١٢٣",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "اول ١٢٣",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "اول ١٢٣ abc ١٢٣",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "ltr",
						"value" : "١٢٣",
						"expected" : "123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "abc ١٢٣",
						"expected" : "abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "اول ١٢٣",
						"expected" : "اول ١٢٣"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "اول ١٢٣ abc ١٢٣",
						"expected" : "اول ١٢٣ abc 123"
					}, {
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "١٢٣",
						"expected" : "١٢٣"
					},
					// Weak & Strong test
					{
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "\u200E١٢٣",
						"expected" : "\u200E123"
					},{
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "ش,123",
						"expected" : "ش,١٢٣"
					},{
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "ش\u00A9123",
						"expected" : "ش\u00A9١٢٣"
					},{
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "ش\u00AA123",
						"expected" : "ش\u00AA123"
					},{
						"shape" : "Contextual",
						"textDir" : "rtl",
						"value" : "ش\u2124123",
						"expected" : "ش\u2124123"
					}];
					testCases.forEach(function(testCase) {
						var actual = NumericShapingUtil.shape(testCase.value, testCase.shape, testCase.textDir);
						var message = "[shape:" + testCase.shape + ", textDir:" + testCase.textDir + "]";
						assert.strictEqual(testCase.expected, actual, message);

					});
				}
			});
		});

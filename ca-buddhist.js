define(
	[ "./Record", "./calendarFunctions"], function (Record, calendarFunctions) {

	var ca_buddhist = {};
	ca_buddhist.ToLocalTime = function (date, timeZone) {
			var result = new Record();
			var dt = new Date(date);
			result.set("weekday", timeZone == "UTC" ? dt.getUTCDay() : dt.getDay());
			result.set("era", 0);
			var year = ( timeZone == "UTC" ? dt.getUTCFullYear() : dt.getFullYear() ) - calendarFunctions.eraOffset("buddhist",0);
			result.set("year", year);
			result.set("month", timeZone == "UTC" ? dt.getUTCMonth() : dt.getMonth());
			result.set("day", timeZone == "UTC" ? dt.getUTCDate() : dt.getDate());
			result.set("hour", timeZone == "UTC" ? dt.getUTCHours() : dt.getHours());
			result.set("minute", timeZone == "UTC" ? dt.getUTCMinutes() : dt.getMinutes());
			result.set("second", timeZone == "UTC" ? dt.getUTCSeconds() : dt.getSeconds());
			var localMinutes = dt.getHours() * 60 + dt.getMinutes();
			var UTCMinutes = dt.getUTCHours() * 60 + dt.getUTCMinutes();
			result.set("inDST", timeZone == "UTC" ? false : localMinutes + dt.getTimezoneOffset() != UTCMinutes);
			return result;
	};
	return ca_buddhist;
});
var table;

var dates;
var yearMin;
var yearMax;
var count;

function preload (){
	table = loadTable("https://media.githubusercontent.com/media/3milychu/majorstudio/master/labs/analysis/selected_mediums_MetObjects.csv","csv","header");

	console.log("Hello World!");
	createCanvas(windowWidth, windowHeight);

}

function setup (){
	console.log(table);

	dates = [];

	dates = sort(int(table.getColumn('objectBeginDate')));
	console.log(dates);

	yearMin = min(int(table.getColumn("objectBeginDate")));
	console.log(yearMin);

	yearMax = max(int(table.getColumn("objectBeginDate")));
	console.log(yearMax);

	objectCount = table.getRowCount("objectBeginDate");
	console.log(objectCount);

	getYearLabel();
}


function getYearLabel() {

// Create dictionary of objecs by Year

d3.csv("https://media.githubusercontent.com/media/3milychu/majorstudio/master/labs/analysis/selected_mediums_MetObjects.csv", function(data) {
	  		data.forEach(function(d) {
	   			d.objectBeginDate = +d.objectBeginDate;
	   			 });
	  		
	  		// console.log(data);
	  		
			var groupByYear = d3.nest()
				.key(function(d) { return d.objectBeginDate; })
				.entries(data);
	  		console.log(groupByYear[0]);

// Create dictionary of objects with key: year; value: number of objects in year

			var countByYear = d3.nest()
			  .key(function(d) { return d.objectBeginDate; })
			  .rollup(function(v) { return v.length; })
			  .entries(data);
			console.log(JSON.stringify(countByYear[0]));

// Create histogram

			// set the dimensions and margins of the graph
				var margin = {top: 10, right: 30, bottom: 30, left: 40},
				    width = 960 - margin.left - margin.right,
				    height = 500 - margin.top - margin.bottom;

				// set the ranges
				var x = d3.scaleLinear()
				          .domain(yearMin, yearMax)
				          .rangeRound([0, width]);
				var y = d3.scaleLinear()
				          .range([height, 0]);

				// set the parameters for the histogram
				var histogram = d3.histogram()
				    .value(function(d) { return d.countByYear; })
				    .domain(x.domain())
				    .thresholds(x.ticks(11));

				// append the svg object to the body of the page
				// append a 'group' element to 'svg'
				// moves the 'group' element to the top left margin
				var svg = d3.select("body").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", 
				          "translate(" + margin.left + "," + margin.top + ")");


				  data.forEach(function(d) {
				      // d.objectBeginDate = parseDate(d.dtg);

					for (var i=0; i<d.countByYear.length; i++){
						if (d.countByYear[i] < 0) {
							d.countByYear = (abs(countyByYear.key[i])  + " BCE");
							} else {
							d.countByYear = d.countByYear.key[i];
							}
						}
						console.log(d.countByYear.key["1945"]);

				  });

				  // group the data for the bars
				  var bins = histogram(data);

				  // Scale the range of the data in the y domain
				  y.domain([0, d3.max(bins, function(d) { return d.length; })]);

				  // append the bar rectangles to the svg element
				  svg.selectAll("rect")
				      .data(bins)
				    .enter().append("rect")
				      .attr("class", "bar")
				      .attr("x", 1)
				      .attr("transform", function(d) {
						  return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
				      .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
				      .attr("height", function(d) { return height - y(d.length); });

				  // add the x Axis
				  svg.append("g")
				      .attr("transform", "translate(0," + height + ")")
				      .call(d3.axisBottom(x));

				  // add the y Axis
				  svg.append("g")
				      .call(d3.axisLeft(y));
			      
				});

	};


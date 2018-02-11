var table;

var dates;
var yearMin;
var yearMax;
var count;


//Sketch histogram

function preload() {

	// Get the data
	table = loadTable("https://media.githubusercontent.com/media/3milychu/majorstudio/master/labs/analysis/selected_mediums_MetObjects.csv","csv","header");
	console.log("Hello World!");
	
	};

function setup(){
	// console.log(table);
	var canvas = createCanvas(windowWidth/3, windowHeight);

	dates = [];

	dates = sort(int(table.getColumn('objectBeginDate')));
	// console.log(dates);

	yearMin = min(int(table.getColumn("objectBeginDate")));
	console.log("The smallest year in the dataset is " + yearMin);

	yearMax = max(int(table.getColumn("objectBeginDate")));
	console.log("The largest year in the dataset is " + yearMax);

	objectCount = table.getRowCount("objectBeginDate");
	console.log("There are " + objectCount + " objects in this dataset");

	getYearLabel();

	};

function getYearLabel(){

// Create dictionary of objecs by Year

d3.csv("https://media.githubusercontent.com/media/3milychu/majorstudio/master/labs/analysis/selected_mediums_MetObjects.csv", function(data) {
	  		data.forEach(function(d) {
	   			d.objectBeginDate = +d.objectBeginDate;
	   			d.hasGold = +d.hasGold;
	   			d.hasSilver = +d.hasSilver;
	   			d.hasBronze = +d.hasBronze;
	   			 });
	  		// console.log(data);
	  		
	  		// key value pairs with key:"year"; value:"object count"

			var groupByYear = d3.nest()
				.key(function(d) { return d.objectBeginDate; })
				.entries(data);
	  		// console.log(groupByYear);

			// key value pairs with key=year; value=number of objects in year

			var countByYear = d3.nest()
			  .key(function(d) { return d.objectBeginDate; })
			  .rollup(function(v) { return v.length; })
			  .object(data);

			// console.log(JSON.stringify(countByYear[0]));

			// create subsets of data for each medium selector

		   		total = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(data)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

		   		// Data for "gold" selection
			   goldData = data.filter(function(d) { 
			    	return d.hasGold == 1
			    	});

			   goldDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(goldData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(goldDataUse);

			   // Data for "silver" selection
			   silverData = data.filter(function(d) { 
			    	return d.hasSilver == 1
			    	});

			   silverDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(silverData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(silverDataUse);

			    // Data for "bronze" selection
			   bronzeData = data.filter(function(d) { 
			    	return d.hasBronze == 1
			    	});

			   bronzeDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(bronzeData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(bronzeDataUse);

			     // Data for "glass" selection
			   glassData = data.filter(function(d) { 
			    	return d.hasGlass== 1
			    	});

			   glassDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(glassData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(bronzeDataUse);


			     // Data for "leather" selection
			   leatherData = data.filter(function(d) { 
			    	return d.hasLeather == 1
			    	});

			   leatherDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(leatherData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(bronzeDataUse);

			     // Data for "steel" selection
			   steelData = data.filter(function(d) { 
			    	return d.hasSteel == 1
			    	});

			   steelDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(steelData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(bronzeDataUse);

			     // Data for "zinc" selection
			   zincData = data.filter(function(d) { 
			    	return d.hasZinc == 1
			    	});

			   zincDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(zincData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(bronzeDataUse);

			    // draw the histogram
				var margin = {
							top: (parseInt(d3.select('body').style('height'), 10)/10), 
							right: (parseInt(d3.select('body').style('width'), 10)/20), 
							bottom: (parseInt(d3.select('body').style('height'), 10)/100), 
							left: (parseInt(d3.select('body').style('width'), 10)/20)},
				            width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
				            height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

				var div = d3.select("body").append("div").attr("class", "toolTip");

				var formatPercent = d3.format(",.2r");

				    // define x and y parameters

					var x = d3.scaleLinear()
				            .range([100, windowWidth/3]);

				    var y = d3.scaleLinear()
				            .range([height/6, 0]);

				    var xAxis = d3.axisBottom(x);

				    var yAxis = d3.axisLeft(y);

				var svg = d3.select("svg")
				// var svg = d3.select("body").append("svg")
				            .attr("width", windowWidth/3 + margin.left + margin.right)
				            .attr("height", height/6)
				            .append("g")
				            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				svg.append("g")
				            .attr("class", "x axis")
				            .attr("transform", "translate(0," + height + ")")
				            .call(xAxis);

				change(total);

// define change datasetTotal
function change(dataset) {

    x.domain([d3.min(dataset, function(d) { return d.key; }), d3.max(dataset, function(d) { return d.key; })]);
  	y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height/6 + ")")
            .call(xAxis);

    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

    var bar = svg.selectAll(".bar")
            .data(dataset, function(d) { return d.key; });

    // new data:
    bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height/6 - y(d.value); })
            .attr("width", 5);

    bar
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html("Year" + (d.key)+"<br>"+(d.value) + Objects);
            });
    bar
            .on("mouseout", function(d){
                div.style("display", "none");
            });

    // removed data:
    bar.exit().remove();
    // updated data:
    bar
            .transition()
            .duration(750)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height/6 - y(d.value); });
};

// change dataset to selected dataset
				d3.select("input[value=\"total\"]").property("checked", true);

			    d3.selectAll("input").on("change", selectDataset);

			    function selectDataset()
			    {
			        var value = this.value;
			        if (value == "All")
			        {
			            change(total);
			        }
			        else if (value == "Gold")
			        {
			            change(goldDataUse);
			        }
			        else if (value == "Silver")
			        {
			            change(silverDataUse);
			        }
			        else if (value == "Bronze")
			        {
			            change(bronzeDataUse);
			        }
			        else if (value == "Glass")
			        {
			            change(glassDataUse);
			        }
			        else if (value == "Leather")
			        {
			            change(leatherDataUse);
			        }
			        else if (value == "Steel")
			        {
			            change(steelDataUse);
			        }
			        else if (value == "Zinc")
			        {
			            change(zincDataUse);
			        }
			    }



//end d3.csv function
			      
		});

//endgetyearlabel function
	};

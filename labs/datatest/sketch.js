var table; 

function preload() {
	table = loadTable('assets/MetObjects5000.csv','csv','header');
	var mediums = _.groupBy(table,'Mediums');
		objectNames = _.groupBy(table,'objectNames');
		classifications = _.groupBy(table,'objectNames');
	//console.log(table);

}

function setup(){
	// createCanvas(windowWidth, windowHeight);
	noCanvas();
	textSize(12);
	fill(0);
	showData();
}

function showData(){
	var count = table.getRowCount();

	for (var i=0;i<count;i++){
		var medium = table.getString(i,24);
		var text = createDiv(medium);

	// 	var span = createSpan(objectName + " | ");
	// 	if (objectName == "Coin"){
	// 		span.addClass("highlight");
	// 	}
	}
}

// function to get unique values from an array
function getUniqueValues(array){
	_.uniq(_.map(table, "'" + array + "'"));
}



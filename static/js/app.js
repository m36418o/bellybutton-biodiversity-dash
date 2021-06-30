
/*

HINT 1

 When importing json, try using metadata

 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    console.log(result);

 });

HINT 2

 Event Listener is different in this html, review id="selDataset" in index.html
 <select id="selDataset" onchange="optionChanged(this.value)"></select>

*/

// To populate info panel of selected id
function populateInfo(id){
   // Load in data from samples.json and match info based on id parameter
   d3.json("https://m36418o.github.io/plotly-challenge/data/samples.json").then((data) => {
      // Saving parts of data into separate variables
      var metadata = data.metadata; // Metadata, or personal information
      var keys = [];
      var values = [];
      var node = document.getElementById("sample-metadata");

      for (i = 0; i < metadata.length; i++){
         if (metadata[i].id == id){
            keys = Object.keys(metadata[i])
            values = Object.values(metadata[i])
         };
      };
      
      for (i = 0; i < keys.length; i++){
         node.innerHTML += `<p style="font-weight: bold">${keys[i]}: ${values[i]}</p>`;
      }
   });
};


// Testing populateInfo() function
// populateInfo('940');

// To populate graphic panels of selected id
function plotGraphs(id){
   // load in data from samples.json and match data based on id parameter
   d3.json("https://m36418o.github.io/plotly-challenge/data/samples.json").then((data) => {
      var samples = data.samples; // Samples data, or bacterial data collected by id
      var sampleValues = null;
      var otuIds = null;
      var otuLabels = null;
      var otuIdsText = Array(10);

      for (i = 0; i < samples.length; i++){
         if (samples[i].id == id){
            sampleValues = samples[i].sample_values;
            otuIds = samples[i].otu_ids;
            otuLabels = samples[i].otu_labels;
         }
      };
   // Adding "OTU " to the beginning of each otu ids
   for (i = 0; i < otuIds.length; i++){
      otuIdsText[i] = "OTU " + otuIds[i];
   }
   // Beging graphing
   // Create trace for bar graph.
   var barTrace = {
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse(),
      x: sampleValues.slice(0,10),
      type: "bar",
      orientation: "h",
      text: otuLabels.slice(0,10),
   };
   // Set layout for bar graph
   var barLayout = {
      yaxis: {
         tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse(),
         ticktext: otuIdsText.slice(0,10)}
   };
   // Create the data array for bar graph
   var barData = [barTrace];
   // Plot the bar graph to a div tag with id "bar"
   Plotly.newPlot("bar", barData, barLayout);

   // Create trace for bubble graph.
   var bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      mode: "markers",
      text: otuLabels,
      marker: {
         size: sampleValues,
         color: otuIds
      }
   };
   // Set layout for bubble graph
   var bubbleLayout = {
      xaxis: {
         title: "OTU ID"}
   };
   // Create the data array for bubble graph
   var bubbleData = [bubbleTrace];
   // Plot the bubble graph to a div tag with id "bubble"
   Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   });  
};

// Testing plotGraphs() function
// plotGraphs(940);

// Loading in sample ids into the dropdown menu
d3.json("https://m36418o.github.io/plotly-challenge/data/samples.json").then((data) => {
   // Saving parts of data into separate variables
   var names = data.names; // Names data, or sample id assigned
   var node = document.getElementById("selDataset"); // Selecting the drop down menu by its element id
   // Looping through names and add options to drop down menu
   for (i = 0; i < names.length; i++){
      node.innerHTML += `<option value="${names[i]}">${names[i]}</option>`
   };
});


// To plot wash frequency of selected id
function plotGauge(id){
    // load in data from samples.json and match data based on id parameter
    d3.json("https://m36418o.github.io/plotly-challenge/data/samples.json").then((data) => {
        var metadata = data.metadata; // Metadata, or overall data collected by id
        var wfreq = null;
 
        for (i = 0; i < metadata.length; i++){
            if (metadata[i].id == id){
                wfreq = metadata[i].wfreq;
            }
        };

        // Beging graphing
        // Create trace for gauge graph.
        var gaugeTrace = {
            type: "indicator",
            mode: "gauge+number",
            value: wfreq,
            title: { text: "Scrubs Per Week", font: { size: 24 } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickvals: [0,1,2,3,4,5,6,7,8,9]},
                bar: { color: "darkblue" },
                bgcolor: "white",
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: wfreq
                }
            }
        };
        // Create the data array for gauge graph
        var gaugeData = [gaugeTrace];
        // Plot the bar graph to a div tag with id "gauge"
        Plotly.newPlot("gauge", gaugeData);
    });
};  
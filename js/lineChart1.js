function createLineChart(data,columnNumber){
  console.log(data);
  console.log(columnNumber);
  var xLabel=(d3.keys(data[0]))[0];
  //console.log(xLabel);
  var yLabel=(d3.keys(data[0]))[1];
  //console.log(yLabel);

  //to retrieve the data table column headings
  var ykeys=[];
  for(i=1;i<columnNumber;i++){
    ykeys[i]=(d3.keys(data[0]))[i];
  }
  console.log(ykeys);

  var greatest=[];
  var q=0;

  for(var k=1;k<ykeys.length;k++){
    console.log(ykeys[k]);
    maxy=d3.max(data,function(d){
      var ykey=ykeys[k];
      return +d[ykey];
    })
    console.log(maxy);
    greatest[q]=maxy;
    q++;
  }
  console.log(greatest);
  //finding maximum of all key values
  var high=Math.max(...greatest);
  console.log(high);
  
  maximumY=d3.max(data,function(d){
    return +d[yLabel];
  });
  //console.log(maximumY);
  var margin ={top:50,right:50,bottom:50,left:50}
  ,width = 3000 - margin.left - margin.right
  ,height = 300 - margin.top - margin.bottom;

  var xAxis=d3.scaleBand()
  .domain(data.map(function(d){return d[xLabel]}))
  //.ticks(5)
  .range([0,900]);

  /*xAxis
  .ticks(2)*/

  var yAxis = d3.scaleLinear()
  .domain([high,0])
  .range([0,height]);

  //yAxis(d3.scaleLinear())
  //.ticks(2)
  
  var svg=d3.select("#svg").append("svg")
  .attr("width",3000)
  .attr("height",300)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
  
 svg.append("g")
  .attr("class","x axis")
  .attr("transform","translate(0," + height +")")
  .style("font-family","Josefin-Sans")
  //.call(d3.axisBottom(xAxis).ticks(2));
  //.style("font-weight","bold")
  .call(d3.axisBottom(xAxis).tickValues(xAxis.domain().filter(function(d,i){return !(i%5)})));
  //.call(d3.axisBottom(xAxis).ticks(2));

 svg.append("g")
  .attr("class","y axis")
  .style("font-family","Josefin-Sans")
  .call(d3.axisLeft(yAxis));
  //.call(d3.axisLeft(yAxis).ticks(2));

 /*var lineFunction = d3.line()
  .x(function (d) {
  return xAxis(d[xLabel]);
  })
  
  .y(function (d) {
    //for(var j=2;j<ykeys.length;j++){
     //var labels=ykeys[j];
     //console.log(ykey);
  return yAxis(d[yLabel]);
   // }
  });*/

  //for tool tip
var div = d3.select("#svg").append("div")
 .attr("class", "tooltip")
 .style("opacity", 0);


for(var j=1;j<ykeys.length;j++){
  var labels=ykeys[j];

  var lineFunction = d3.line()
  .x(function (d) {
  return xAxis(d[xLabel]);
  })
  .y(function(d){
    return yAxis(d[labels]);
  })

 svg.append("path")
  .attr("d", lineFunction(data))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");

 /*svg.append("text")
 .attr("transform","translate(" + (width+10) + "," + yAxis(data[0].labels) + ")")
 .attr("dy",".35em")
 .attr("text-anchor","start")
 .style("fill","black")
 .text(labels);*/

 //console.log(labels);
 svg.selectAll("dot")
  .data(data)
.enter().append("circle")
  .attr("r", 3)
  .attr("fill-opacity",1)
  .attr("cx", function(d) { return xAxis(d[xLabel]); })
  .attr("cy", function(d) { return yAxis(d[labels]); })
  .on("mouseover", function(d) {
  
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div .html(
     // '<a href= "http://google.com">' + // The first <a> tag
     '<p>'+
      d[xLabel] +
      //"</a>" +                         // closing </a> tag
      "<br/>"  + d.iPod)     
      .style("left", (d3.event.pageX) + "px")             
      .style("top", (d3.event.pageY - 28) + "px");
      console.log(labels); 
    });
}


 /*svg.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 3)
     .attr("fill-opacity",1.2)
     .attr("cx", function(d) { return xAxis(d[xLabel]); })
     .attr("cy", function(d) { return yAxis(d[yLabel]); })
     .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div .html(
        // '<a href= "http://google.com">' + // The first <a> tag
        '<p>'+
         d[xLabel] +
         //"</a>" +                         // closing </a> tag
         "<br/>"  + d[yLabel])     
         .style("left", (d3.event.pageX) + "px")             
         .style("top", (d3.event.pageY - 28) + "px");
       });*/
}
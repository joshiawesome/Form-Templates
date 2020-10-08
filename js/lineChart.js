function demo(jsonObj1){
  //getting json array 
  var samObj=JSON.parse(JSON.stringify(jsonObj1));
  console.log(samObj);
  /*var data={"top":20,"bottom":20};
  var l=d3.keys(data);
  console.log(l);
  var m=d3.values(data);
  console.log(m);
  var n=d3.entries(data);
  console.log(n);*/
  
  //var datapoints=jsonObj.length;
  //console.log(datapoints);
  var o=d3.keys(jsonObj1[0]);
  
  var o1=(d3.keys(jsonObj1[0]))[0];
  console.log(o1);
  var o2=(d3.keys(jsonObj1[0]))[1];
  console.log(o2);

  var p=d3.values(jsonObj1);
  var a=o[0];
  var b=o[1];
  console.log(a);
  console.log(b);
  console.log(o);
  console.log(p);

  //maxX1=d3.max()
  maxX = d3.max(jsonObj1, function(c){
    return +c[b];
  });
  console.log(maxX);
  maxY = d3.max(jsonObj1, function(d){
    return d.Quarter;
  
  });
  console.log(maxY);
  
  var date="11-01-2017 1:48:00 PM";
  var date1="Q4 2010";

  var format = d3.timeFormat("%Y");
  var quarter=format(date1);
  console.log(quarter);
  //var parseTime=d3.timeFormat("%Y");
  var parseTime = d3.timeParse("%d-%m-%Y %H:%M:%S %p"); 

  var parseDate=d3.timeParse("%Y-%m-%d");
  console.log(parseDate("Q4 2010"));
  console.log(parseTime(date));
  var le=parseTime("Q4 2010");
  console.log(le);
  var dates=[];
  /*for (let obj of jsonObj){
    dates.push(parseTime(obj.Quarter));
  }*/
  
  //console.log(dates);

  const color = ["lightgreen", "lightblue"];
  
  const strokeWidth = 1.5;
  
  var margin ={top:50,right:50,bottom:50,left:50}
  ,width = 3000 - margin.left - margin.right
  ,height = 300 - margin.top - margin.bottom;
  
  
  var lon=jsonObj1.map(function(d){return d.Quarter});
  console.log(lon);

 
  const regex =/\d+/gm;
  let m;
  const filter=[];
  while((m=regex.exec(lon))!==null){
    if(m.index === regex.lastIndex){
      regex.lastIndex++;
    }
    m.forEach((match,groupIndex)=>{
    filter.push(parseInt(match))
  });
  }
  console.log(filter);
  var x=[];
  for(var i=1;i<filter.length;i=i+2){
    x.push(filter[i]);
  }
  console.log(x);

  for(var y=0;y<jsonObj1.length;y++){
    samObj[y].Quarter=x[y];
  }
  console.log(samObj);

  maxY1 = d3.max(samObj, function(d){
    return d.Quarter;
  
  });
  console.log(maxY1);

  var o3=(d3.keys(samObj[0]))[0];
  console.log(o3);

  minY1=d3.min(samObj,function(d){
    return d[o3];
  });
  console.log(minY1);

  /*var xScale = d3.scaleLinear()
  .domain(0,[d3.max(jsonObj,function(d){ 
    return d.Quarter.length-1
  })])
  .range([0,width]);*/
  var o3=(d3.keys(samObj[0]))[0];
  console.log(o3);
  //console.log(samObj[o3]);
 var xScale = d3.scaleBand()
  //.domain(x)
  .domain(samObj.map(function(d){return d[o3]}))
  .range([0,900]);

  var xaxis=d3.axisBottom(xScale);
  //.tickFormat(format);
  
  var yScale = d3.scaleLinear()
  .domain([maxX,0])
  //.domain([maxX-1,0])
  .range([0,height]);
  
  var line=d3.line()
  .curve(d3.curveCatmullRomOpen)
  .x(function(d){return xScale(d.Quarter);})
  .y(function(d) {return yScale(d.iPhone);})
  
  //var dataset=jsonObj.map(function(d){return{"Quarter": d3.randomUniform(1)()}})
  //console.log(dataset);
  
  var svg=d3.select("#svg").append("svg")
  .attr("width",3000)
  .attr("height",300)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
  .attr("class","x axis")
  .attr("transform","translate(0," + height +")")
  .call(d3.axisBottom(xScale));
  
  svg.append("g")
  .attr("class","y axis")
  .call(d3.axisLeft(yScale));
  
  var lineFunc = d3.line()
  .x(function (d) {
  return xScale(d.Quarter);
  })
  
  .y(function (d) {
  return yScale(d.iPhone);
  });
   
  var lineFunc1 = d3.line()
  .x(function (d) {
  return xScale(d.Quarter);
  })
  
  .y(function (d) {
  return yScale(d.Mac);
  });


  var lineFunc2 = d3.line()
  .x(function (d) {
  return xScale(d.Quarter);
  })
  
  .y(function (d) {
  return yScale(d.iPad);
  });

  var lineFunc3 = d3.line()
  .x(function (d) {
  return xScale(d.Quarter);
  })
  
  .y(function (d) {
  return yScale(d.iPod);
  });

  svg.append("path")
  .attr("d", lineFunc(samObj))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  //.attr("shape-rendering",auto)
  .attr("fill", "none");

  svg.append("path")
  .attr("d", lineFunc1(samObj))
  .attr("stroke", "green")
  .attr("stroke-width", 2)
  .attr("fill", "none");

  svg.append("path")
  .attr("d", lineFunc2(samObj))
  .attr("stroke", "red")
  .attr("stroke-width", 2)
  .attr("fill", "none");

  svg.append("path")
  //.append("text")
  .attr("d", lineFunc3(samObj))
  .attr("stroke", "orange")
  .attr("stroke-width", 2)
  .attr("fill", "none");
  //.text("iPod");
  
  var bisect = d3.bisector(function(d) { return d.xScale; }).left;
  //console.log(bisect);
 
  var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

  var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

  svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
    //  .on('mousemove', mousemove)
      .on('mouseout', mouseout);

  function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
      }
    
 /* function mousemove() {
        // recover coordinate we need
        var x0 = xScale.invert(d3.mouse(this)[0]);
        var i = bisect(jsonObj, x0, 1);
        selectedData = jsonObj[i]
        focus
          .attr("cx", x(selectedData.xScale))
          .attr("cy", y(selectedData.yScale))
        focusText
          .html("x:" + selectedData.xScale + "  -  " + "y:" + selectedData.yScale)
          .attr("x", x(selectedData.xScale)+15)
          .attr("y", y(selectedData.yScale))
        }*/

  function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }
  
  }

  
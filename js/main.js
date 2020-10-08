/*const { table } = require("console");*/

(function($) {



    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            email: {
                email: true
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: 'Back',
            next: 'Next',
            finish: 'Finish',
            current: ' ',
          /*  onInit :function (event, current) {
                $('.actions a[href=\\#next]').attr('id', 'next1');
             },*/
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            }
            if (currentIndex === 1) {
                form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 2) {
                form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 3) {
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
            }
            // if(currentIndex === 4) {
            //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // }
            
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            alert('Submited');
        },
        onStepChanged: function(event, currentIndex, priorIndex) {

            return true;
        },
        /*changing id of the "next" button*/ 
        onInit :function (event, current) {
            $('.actions a[href="#next"]').attr('id', 'next1');
         }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: '',
        monthDefault: '',
        yearDefault: '',
        minimumAge: 0,
        maximumAge: 120
    });
    var marginSlider = document.getElementById('slider-margin');
    if (marginSlider != undefined) {
        noUiSlider.create(marginSlider, {
              start: [1100],
              step: 100,
              connect: [true, false],
              tooltips: [true],
              range: {
                  'min': 100,
                  'max': 2000
              },
              pips: {
                    mode: 'values',
                    values: [100, 2000],
                    density: 4
                    },
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    prefix: '$ ',
                })
        });
        var marginMin = document.getElementById('value-lower'),
	    marginMax = document.getElementById('value-upper');

        marginSlider.noUiSlider.on('update', function ( values, handle ) {
            if ( handle ) {
                marginMax.innerHTML = values[handle];
            } else {
                marginMin.innerHTML = values[handle];
            }
        });
    }
})(jQuery);

/* to allow upload button to accept only the specified file format */
var fl = document.getElementById('file-input');

fl.onchange = function(e){ 
    var ext = this.value.match(/\.(.+)$/)[1];
    switch(ext)
    {
        case 'xls':
        case 'csv':
        case 'xlsx':
            /*alert('allowed');*/
            break;
        default:
           /*alert('not allowed');*/
            this.value='';
    }
};

  /*displaying different text content when different icos are clicked*/ 
  function changeText(value){
    var div=document.getElementById("div");
    var div2=document.getElementById("div2");
    var text="";
    var text1="";
    if(value==1)
    {
        /*text+="For XLS/CSV files:";*/
        text1+="Upload data and click on NEXT";
        div.innerHTML=text;
        div2.innerHTML=text1;
    }
    if(value==2)
    {
        /*text+="For Data files:";*/
        text1+="Copy/Paste dataset into the box below";
        div.innerHTML=text;
        div2.innerHTML=text1;
    }
  }

 /*pop up and close text-area on click of dataset icon*/ 
 function showTextArea(){
        document.getElementById('textAreaDiv').style.visibility="visible";
  }
  function hideTextArea(){
        document.getElementById('textAreaDiv').style.visibility="hidden";
  }
 
/*var text1=$("#upload-data").val();
console.log(text1);*/

//for textarea text
$(document).ready(function () { 
            
    //This function called when the next button is clicked 
   // $("#FormButton1").change(function(){
    $("#FormButton1").click(function () { 
     
    //text area text input from user    
    var txt = $("#upload-data").val(); 
    console.log(txt);
    //parsing text area text to object
    var obj=Papa.parse(txt);
    console.log(obj);
    //converting textarea text to object to be displayed on console in third page
    toObject(obj);
    //parsing text area text to array for table creation use
    var den = Papa.parse(txt).data;
    
    console.log(den);
    createTable(den);

   /* function getJSONfromArray(data,headers){
        var obj1 = {};
           data.map(function(item)
        { 
          console.log(data);
           for (var i in headers) 
           {    
               
            obj1[headers[i]] = data[i]; 
           } 
        })
    return obj1;  }

    var header = den[0];
    console.log(header);
    var jsonData =[]
    den.map(function(item,index) {
    if(index==0){return}
    jsonData.push(getJSONfromArray(item,header));
    })   
    console.log(header);
    $.noConflict();
    $(document).ready(function(){
        var columns=[];
        console.log(header);
        for(var c in header){
            columns.push({data: header[c],
                 title:header[c] });
        }
    $("#tbl-data").DataTable({
        data:jsonData,
        columns:columns,
        "ordering":true,
        "scrolly": "200px",
        "scrollCollapse":true,
        "paging":false
    });
});*/
/*$(document).ready(function(){
$("#tbl-data").find("tbody>tr:first").remove();
});*/

//appending generated table to table
/*$('#tbl-data').append(generateTable(den));*/

//automatic serial numbering for textarea table        
 /*$('.tableStyle tr td:first-child').each(function(index) {
        $(this).before('<td>'+(index+1)+'</td>');
});*/

//finding total number of columns in  text area table
   /* $(document).ready(function(){
        var num = 0;
        $('#TableDiv table tr:nth-child(1) td').each(function () {
          if ($(this).attr('colspan')) {
            num += +$(this).attr('colspan');
          } else {
          num++;
        }
      });
    console.log(num);*/

    //inserting a new row before the first row in existing text area table
    //$('<tr id="newRow"></tr>').insertBefore('#tbl-data tr:first');    
    
    //inserting new cells in the new row generated
    /*for(var j=0;j<num;j++){
    var newCell=document.getElementById("newRow");
    var t =newCell.insertCell(j);
    }*/

    //appending alphabets on new cells starting from cell with index 1
    /*for(var k=1;k<num;k++){
        var newCell1=document.getElementById("newRow").cells[k];
        //hex function called here
        var alphabet=hex(k-1).toUpperCase();
        newCell1.innerHTML=alphabet;
    }*/
    /*for(var k=0;k<num;k++){
        var newCell1=document.getElementById("newRow").cells[k];
        //hex function called here
        var alphabet=hex(k).toUpperCase();
        newCell1.innerHTML=alphabet;
    }*/
    });
//});
    //string containing alphabets
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    //function to convert number to aphabet
    function hex(a) {
    a += 1; 
    var c = 0;
    var x = 1;      
    while (a >= x) {
      c++;
      a -= x;
      x *= 26;
    }
    var s = "";
    for (var i = 0; i < c; i++) {
      s = alpha.charAt(a % 26) + s;
      a = Math.floor(a/26);
    }
    
    return s;
    }
    //}); 
 
});
//function to create data table
function createTable(den){
    console.log(den);
    function getJSONfromArray(data,headers){
        var obj1 = {};
           data.map(function(item)
        { 
          console.log(data);
           for (var i in headers) 
           {    
               
            obj1[headers[i]] = data[i]; 
           } 
        })
    return obj1;  }

    var header = den[0];
    console.log(header);
    var jsonData =[]
    den.map(function(item,index) {
    if(index==0){return}
    jsonData.push(getJSONfromArray(item,header));
    })   
    console.log(header);
   
    console.log(jsonData);
   //line(jsonData);
    
    $.noConflict();
    $(document).ready(function(){
        var columns=[];
        console.log(header);
        for(var c in header){
            columns.push({data: header[c],
                 title:header[c] });
        }
    $("#tbl-data").DataTable({
        data:jsonData,
        columns:columns,
        "ordering":true,
        "scrolly": "200px",
        "scrollCollapse":true,
        "paging":false,
        "columnDefs": [{
            "defaultContent": "-",
            "targets": "_all"
          }]
    });
});
    $(document).ready(function(){
        var num = 0;
        $('#tbl-data tr:nth-child(1) td').each(function () {
          if ($(this).attr('colspan')) {
            num += +$(this).attr('colspan');
          } else {
          num++;
        }
      });
    console.log(num);
    //console.log(jsonData);
   // $("#LineCharts").click(function(){
     document.getElementById("LineCharts").onclick=function(){  
    line(jsonData,num);
     }
  //  });
    $('<tr id="newRow"></tr>').insertBefore('#tbl-data tr:first');    
    for(var j=0;j<num;j++){
    var newCell=document.getElementById("newRow");
    var t =newCell.insertCell(j);
    }
    for(var k=0;k<num;k++){
        var newCell1=document.getElementById("newRow").cells[k];
        var alphabet=hex(k).toUpperCase();
        newCell1.innerHTML=alphabet;
    }
    });
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    function hex(a) {
    a += 1; 
    var c = 0;
    var x = 1;      
    while (a >= x) {
      c++;
      a -= x;
      x *= 26;
    }
    var s = "";
    for (var i = 0; i < c; i++) {
      s = alpha.charAt(a % 26) + s;
      a = Math.floor(a/26);
    }
    
    return s;
    }
//demo(jsonData);
function line(jsonData1,colnum){
createLineChart(jsonData1,colnum);
}
}
//csv file datatable
$(document).ready(function() {
$("#file-input").change(function(){
   let btn_upload=document.addEventListener("change",()=>{
    Papa.parse(document.getElementById('file-input').files[0],{
            download:true,
            header:false,
           // header:false,
            complete:function(results){
                console.log(results);
                toObject(results);
                //debugDataset(results);
               // mycsvfiledata(results);
              //createTable(results.data);
               var lo=results.data;
               console.log(lo);
               var arrlen=lo.length;
               console.log(arrlen);
               //removing null sets in array
               lo.splice(arrlen-1);
               console.log(lo);
               createTable(lo);
              // lo.splice()
              // var lo=results.data;

            }
        });
       // console.log(csvData);
   });
});

/*function mycsvfiledata(data){
    console.log(data);
    var den1=data.data;
    console.log(den1);
    //var header2=Object.keys(data.data[0]);
    //console.log(header2);
    
    //var getArray=data.data;
    //console.log(getArray);
    function getJSONfromArray(data,headers){
        var obj = {};
           data.map(function(item)
        { 
          
           for (var i in headers) 
           {    
               
            obj[headers[i]] = data[i]; 
           } 
         
         
   })
     return obj;  }
   var header2 = den1[0];
   console.log(header2);
   var jsonData =[]
   den1.map(function(item,index) {
   if(index==0){return}
   jsonData.push(getJSONfromArray(item,header2));
  
   })
    
   console.log(jsonData);
   
    $.noConflict();
    $(document).ready(function(){
        var columns=[];
        for(var o in header2){
            columns.push({data:header2[o],
                        title:header2[o]});
        }
    
     $("#tbl-data").DataTable({
        data:jsonData,
        columns:columns,
        "paging":true,
        "scrollX":true,
        "ordering":true,
        //"scrollY":"300px",
        "columnDefs": [{
            "defaultContent": "-",
            "targets": "_all"
          }]
     });
    })

    $(document).ready(function(){
        var num = 0;
        //console.log("hello");
        $('#TableDiv table tr:nth-child(1) td').each(function () {
          if ($(this).attr('colspan')) {
            num += +$(this).attr('colspan');
          } else {
          num++;
         // console.log(num);
        }
      });
    
    console.log(num);
    //inserting a new row before the first row in existing text area table
   $('<tr id="newRow"></tr>').insertBefore('#tbl-data tr:first');    
    //inserting new cells in the new row generated
    for(var j=0;j<num;j++){
    var newCell=document.getElementById("newRow");
    var t =newCell.insertCell(j);
    }
    for(var k=0;k<num;k++){
        var newCell1=document.getElementById("newRow").cells[k];
        //hex function called here
        var alphabet=hex(k).toUpperCase();
        newCell1.innerHTML=alphabet;
        
    }
   });

    var alpha = "abcdefghijklmnopqrstuvwxyz";
    //function to convert number to aphabet
    function hex(a) {
    a += 1; 
    var c = 0;
    var x = 1;      
    while (a >= x) {
      c++;
      a -= x;
      x *= 26;
    }
    
    var s = "";
    for (var i = 0; i < c; i++) {
      s = alpha.charAt(a % 26) + s;
      a = Math.floor(a/26);
    }
    
    return s;
    }
    

//}

}*/
});

//parsing CSV file using papaparse and displaying it on html table
$(document).ready(function() {

$("#file-input").click(function(){
//function displayTable(){
let btn_upload=document.addEventListener("change",()=>{    
//let btn_upload=document.addEventListener("mouseover",()=>{
     //console.log('GetData');
  Papa.parse(document.getElementById('file-input').files[0],{
         download:true,
         header:false,
      complete:function(results){
           console.log(results);
             let i=0;
             //var y=results;
             //console.log(y);
           //results.data.map((data,index)=>{
           // console.log(results);
           // var arr2=Object.values(results);

           //converting object to array
           /* var arr3=results.data;
            console.log(arr3);
         //   console.log(data.data);
               
          //  if(i==0){
                //let table=document.getElementById('tbl-data');
                //$('#tbl-data').append(generateTableHead(table,data));
                //generateTableHead(table,data);
                //}else{
                //let table=document.getElementById('tbl-data');
                //$('#tbl-data').append(generateTableRows(table,data));
                // generateTableRows(table,data);
                //}
                //i++;
                debugDataset(results);
        
          function getJSONfromArray(data,headers){
                    var obj1 = {};
                       data.map(function(item)
                    { 
                     // console.log(data);
                       for (var i in headers) 
                       {    
                           
                        obj1[headers[i]] = data[i]; 
                       } 
                     
                     
               })
               return obj1;
            }
           
               
          

           var header2=arr3[0];
            var jsonData1=[]
            arr3.map(function(item,index){
                if(index==0){return}
                jsonData1.push(getJSONfromArray(item,header2));
            })
            console.log(header2);
            console.log(jsonData1);

            //generating table for file    
           //$('#tbl-data').append(generateTable(data));

           jQuery.noConflict();    
            jQuery(document).ready(function(){
                var columns=[];
                //columnNames=Object.values(y.data[0]);
                //console.log(header2);
                //console.log(y.data);
               for(var c in header2){
                    columns.push({data: header2[c],
                         title:header2[c] });
                }
        
            $("#tbl-data").DataTable({
                data:jsonData1,
                columns:columns,
                "columnDefs": [{
                    "defaultContent": "-",
                    "targets": "_all"
                  }]
               // "bDestroy": true
               
            });
            
       });*/
       //debugDataset(results);

           // });

//finding row count of the table

/*var rowCount=$('#tbl-data tr').length;
console.log(rowCount);*/
            
//finding total number of columns in table
/*$(document).ready(function(){
    var num = 0;
        $('tr:nth-child(1) td').each(function () {
            if ($(this).attr('colspan')) {
                num += +$(this).attr('colspan');
                } else {
                num++;
                }
        });
for(var k=0;k<num;k++){
    var newCell1=document.getElementById("newRow").cells[k];
    //hex function called here
    var alphabet=hex(k).toUpperCase();
    newCell1.innerHTML=alphabet;
}
});*/
//string containing alphabets
var alpha = "abcdefghijklmnopqrstuvwxyz";
//function to convert number to aphabet;
function hex(a) {
           
            a += 1; 
            var c = 0;
            var x = 1;      
            while (a >= x) {
              c++;
              a -= x;
              x *= 26;
            }
          
            // Now you can do normal base conversion.
            var s = "";
            for (var i = 0; i < c; i++) {
              s = alpha.charAt(a % 26) + s;
              a = Math.floor(a/26);
            }
          
            return s;
          }



//converting file data to object to be displayed on console in third page
toObject(results);
}
});
});
});
});


function debugDataset(dataset){

    //results.data.map((data,index);
    dataset.data.map((data,index)=>{
    console.log(data);


    });   
   
}

//function to generate the table
/*function generateTable(data) {
    var html = '';

    if (typeof (data[0]) === 'undefined') {
        return null;
    }

    if (data[0].constructor === String) {
        html += '<tr>\r\n';
        for (var item in data) {
            html += '<td>' + data[item] + '</td>\r\n';
        }
        html += '</tr>\r\n';
    }

    if (data[0].constructor === Array) {
        for (var row in data) {
            html += '<tr>\r\n';
            for (var item in data[row]) {
                html += '<td>' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }
    }

    if (data[0].constructor === Object) {
        for (var row in data) {
            html += '<tr>\r\n';
            for (var item in data[row]) {
                html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }
    }

    return html;
}*/

//generate table head function
/*function generateTableHead(table,data){
     let thead=table.createTHead();
     let row=thead.insertRow();
     for(let key of data){
        let th=document.createElement('th');
        let text=document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
     }
 }*/

//generate table row function
/*function generateTableRows(table,data){
   // let tbody=table.createT();
    // let tbody=table.createTBody();
    // let newRow=tbody.insertRow(-1);
     let newRow=table.insertRow(-1);
     data.map((row,index)=> {
         let newCell =newRow.insertCell();
         let newText=document.createTextNode(row);
         newCell.appendChild(newText);
     });
 }*/

 //array to table function
 /*function arrayToTable(tableData) {
    var table = $('<table></table>');
    $(tableData).each(function (i, rowData) {
        var row = $('<tr></tr>');
        $(rowData).each(function (j, cellData) {
            row.append($('<td>'+cellData+'</td>'));
        });
        table.append(row);
    });
    return table;
}*/

/*var visibleDiv = 0;
function showDiv(){
    $(".DTable").hide();
    $(".DTable:eq("+ visibleDiv +")").show();
}
showDiv()
function showNext(){
    console.log("Next");
    if(visibleDiv==$(".DTable").length-1){
        visibleDiv=0;
    }
    else{
        visibleDiv++;
    }
    showDiv();
}*/
/*function goForward(){
    window.history.forward();
}*/

/*document.getElementById("file-input").onchange=function(){
    document.getElementById("signup-form").submit();
};*/

/*moving to next page directly on file upload*/
$("#file-input").change(function(){
    $("#next1").click();
});

/*$("#FormButton1").change(function(){
    $("#next1").click();
});*/


var myform=$("#TableDiv"),
iter=0;
  
//adding columns
 $('#btnAddCol').click(function(){
       $('table tr td:last-child').after('<td>Enter Here</td>');
    });
   
//serial numbering for textarea text table
$('.tableStyle tr td:first-child').each(function(i){
    $(this).before('<td>'+(i+1)+'</td>');
    });
  
//displaying the object in console on click of next button to move to "visualizing your data" page    
function toObject(object){
    $("#next1").click(function() {
        console.log(object);
    });
}

//$('<tr><td>Hello</td></tr>').before('table>tr:first');
//$("#TableDiv table").prepend("<tr><td><td>...contents...</td></td></tr>");
//$("#TableDiv table").prepend("table > tr:first");


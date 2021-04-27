// connect to api sdk client
var apigClient = apigClientFactory.newClient();

// Search text in searchbar when search button pressed
$(function() {
  $('#unitOptions').change(function() {
    let timeOptions = document.getElementById('timeOptions');
    timeOptions.innerHTML = "";
    if ($(this).val() == 'm') {
      let times = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      for ( let i = 0; i < times.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = times[i];
        opt.value = times[i];
        timeOptions.appendChild(opt);
      }
    }
    else {
      let times = ['1', '2', '3', '4', '5'];
      for ( let i = 0; i < times.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = times[i];
        opt.value = times[i];
        timeOptions.appendChild(opt);
      }
    }
  }).change(); // Trigger the event
});

$('#searchbtn').click(function(){
  query = $('#searchbar').val();
  timeNumber = $('#timeOptions').val();
  unitVal = $('#unitOptions').val();
  params = {q: query, unit: unitVal, time: timeNumber};
  console.log(params)
  apigClient.userGet(params, {}, {})
    .then(function(result){
      // Add success callback code here.
      console.log("SUCCESS CALLBACK")
      console.log(result.data)

      var elements = document.getElementsByClassName("subheader");
      for (let i = 0; i < elements.length; i++ ) {
        elements[i].style.display = "block";
      }

      // popChart(result.data)
      // popularity
      popChart(result.data[0], chartdiv0)
      // Reddit sentiment
      popChart2(result.data[1], chartdiv1)
      popChart2(result.data[2], chartdiv2)
      popChart2(result.data[3], chartdiv3)
      popChart2(result.data[4], chartdiv4)
      // Reddit emotion
      popChart2(result.data[5], chartdiv5)
      popChart2(result.data[6], chartdiv6)
      popChart2(result.data[7], chartdiv7)
      popChart2(result.data[8], chartdiv8)
      popChart2(result.data[9], chartdiv9)

      // Twitter sentiment
      popChart2(result.data[10], chartdiv10)
      popChart2(result.data[11], chartdiv11)
      popChart2(result.data[12], chartdiv12)
      popChart2(result.data[13], chartdiv13)
      // Twitter emotion
      popChart2(result.data[14], chartdiv14)
      popChart2(result.data[15], chartdiv15)
      popChart2(result.data[16], chartdiv16)
      popChart2(result.data[17], chartdiv17)
      popChart2(result.data[18], chartdiv18)


    }).catch(function(result){
      // Add error callback code here.
      console.log("UNSUCCESS CALLBACK")
      alert("Data unavailable. Please try other keywords.")
      console.log(result.data)
    });

  });


function popChart(apiData, divId){

  am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create(divId, am4charts.XYChart);

  // Enable chart cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;

  // Enable scrollbar
  chart.scrollbarX = new am4core.Scrollbar();

  // Add data

  chart.data = apiData

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0.5;
  dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
  dateAxis.renderer.minGridDistance = 40;
  dateAxis.tooltipDateFormat = "MMM dd, yyyy";
  dateAxis.dateFormats.setKey("day", "dd");

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.strokeDasharray = 3;
  series.strokeWidth = 2
  series.strokeOpacity = 0.3;
  series.strokeDasharray = "3,3"

  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.strokeWidth = 2;
  bullet.stroke = am4core.color("#fff");
  bullet.setStateOnChildren = true;
  bullet.propertyFields.fillOpacity = "opacity";
  bullet.propertyFields.strokeOpacity = "opacity";

  var hoverState = bullet.states.create("hover");
  hoverState.properties.scale = 1.7;

  function createTrendLine(data) {
  var trend = chart.series.push(new am4charts.LineSeries());
  trend.dataFields.valueY = "value";
  trend.dataFields.dateX = "date";
  trend.strokeWidth = 2
  trend.stroke = trend.fill = am4core.color("#c00");
  trend.data = data;

  var bullet = trend.bullets.push(new am4charts.CircleBullet());
  bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  bullet.strokeWidth = 2;
  bullet.stroke = am4core.color("#fff")
  bullet.circle.fill = trend.stroke;

  var hoverState = bullet.states.create("hover");
  hoverState.properties.scale = 1.7;

  return trend;
  };

  // createTrendLine([
  //   { "date": "2012-01-02", "value": 10 },
  //   { "date": "2012-01-11", "value": 19 }
  // ]);

  // var lastTrend = createTrendLine([
  //   { "date": "2012-01-17", "value": 16 },
  //   { "date": "2012-01-22", "value": 10 }
  // ]);

  // Initial zoom once chart is ready
  // lastTrend.events.once("datavalidated", function(){
  // series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
  // });

  }); // end am4core.ready()
}

function popChart2(apiData, divId){

  am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create(divId, am4charts.XYChart);

  // Enable chart cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;

  // Enable scrollbar
  chart.scrollbarX = new am4core.Scrollbar();

  // Add data

  chart.data = apiData

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0.5;
  dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
  dateAxis.renderer.minGridDistance = 40;
  dateAxis.tooltipDateFormat = "MMM dd, yyyy";
  dateAxis.dateFormats.setKey("day", "dd");

  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  series1.dataFields.valueY = "value1";
  series1.dataFields.dateX = "date";
  series1.strokeDasharray = 3;
  series1.strokeWidth = 2
  series1.strokeOpacity = 0.3;
  series1.strokeDasharray = "3,3"


  var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
  bullet1.strokeWidth = 2;
  bullet1.stroke = am4core.color("#fff");
  bullet1.setStateOnChildren = true;
  bullet1.propertyFields.fillOpacity = "opacity";
  bullet1.propertyFields.strokeOpacity = "opacity";

  var hoverState1 = bullet1.states.create("hover");
  hoverState1.properties.scale = 1.7;

  // Create series
  var series2 = chart.series.push(new am4charts.LineSeries());
  series2.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  series2.dataFields.valueY = "value2";
  series2.dataFields.dateX = "date";
  series2.strokeWidth = 2;//虛線寬度

  }); // end am4core.ready()
}

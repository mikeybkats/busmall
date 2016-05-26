var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var displayButton = document.getElementById('chart-results');
var resetButton = document.getElementById('reset-results');
var playAgainButton = document.getElementById('play-again');
var chartViews = document.getElementById('myChartViews');
var chartClicks = document.getElementById('myChartClicks');
var chartPercentage = document.getElementById('myChartPercentage');
var allProducts = [];
var allPics = [];
var allClicks = 0;
var maxClicks = 25;
var picNames = ['bag', 'banana', 'bathroom', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var parsedProductItems = JSON.parse(localStorage.getItem('productData'));
console.log(parsedProductItems);

function productAllClicks (){
  var productAllClicks = [];
  for (var i = 0; i < allProducts.length; i++){
    productAllClicks.push(parsedProductItems[i].clicks);
    console.log(productAllClicks);
  }
  return productAllClicks;
};

function productAllViews (){
  var productAllViews = [];
  for (var i = 0; i < allProducts.length; i++){
    productAllViews.push(parsedProductItems[i].views);
    //console.log(productAllViews);
  }
  return productAllViews;
};

function percentageOfClicks(clicks, views){
  var percentage = clicks / views;
  return percentage;
}

var clickPercentageData = function(){
  var array1 = productAllViews();
  // console.log(array1);
  var array2 = productAllClicks();
  // console.log(array2);
  var arrayResult = [];
  for (var i = 0; i < allProducts.length; i++){
    var finalPercentage = percentageOfClicks(array2[i], array1[i]);
    arrayResult.push(finalPercentage);
  }
  console.log(arrayResult);
  return arrayResult;
};

function Product(name) {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.path = 'images/' + name + '.jpg';
}

for (var i = 0; i < picNames.length; i++){
  allProducts.push(new Product(picNames[i]));
}

function randNum (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function displayPics (){
  if (allClicks < maxClicks){
    var leftIndex = randNum( 0 , allProducts.length);
    left.src = allProducts[leftIndex].path;
    allProducts[leftIndex].views += 1; // this adds to the object through the array
    left.alt = allProducts[leftIndex].name;
    console.log(allProducts[leftIndex].name + ' has been shown ' + allProducts[leftIndex].views + ' times');

    var centerIndex = randNum( 0 , allProducts.length);
    while (centerIndex === leftIndex) {
      centerIndex = randNum(0 , allProducts.length);
    }
    center.src = allProducts[centerIndex].path;
    allProducts[centerIndex].views += 1;
    center.alt = allProducts[centerIndex].name;
    console.log(allProducts[centerIndex].name + ' has been shown ' + allProducts[leftIndex].views + ' times');

    var rightIndex = randNum( 0 , allProducts.length);
    while (rightIndex === centerIndex || rightIndex === leftIndex) {
      var rightIndex = randNum(0 , allProducts.length);
    }
    right.src = allProducts[rightIndex].path;
    allProducts[rightIndex].views += 1;
    right.alt = allProducts[rightIndex].name;
    console.log(allProducts[centerIndex].name + ' has been shown ' + allProducts[leftIndex].views + ' times');
  }
}

function handlePicContainerClick (event){
  displayPics();
  if (event.target.id === 'pic-container' && allClicks < maxClicks ){
    return alert('click on a picture');
  }
  for (var i = 0; i < allProducts.length; i++){
    if(event.target.alt === allProducts[i].name && allClicks < maxClicks){
      allProducts[i].clicks += 1;

      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
      allClicks += 1;
      console.log(allClicks);

      // localStorage.clear();
      // var allClicksStringified = JSON.stringify(allClicks);
      // localStorage.setItem('numberOfClicks', allClicksStringified);
    }
  }
  if (allClicks >= maxClicks){
    displayButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
  }

  var allProductsStringged = JSON.stringify(allProducts);
  localStorage.setItem('productData', allProductsStringged);
}

function renderChartClicks(){
  var chartClicks = document.getElementById('myChartClicks');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'the most clicked products',
        data: []
      }
    ]
  };
  if (allClicks < maxClicks){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }

  if (allClicks >= maxClicks){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
      console.log(picNames[i]);
      data.datasets[0].data.push(allProducts[i].clicks);
      console.log(allProducts[i].clicks);
    }
  }

  var myChartClicks = new Chart(chartClicks, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

function renderChartViews(){
  var chartViews = document.getElementById('myChartViews');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'the most viewed products',
        data: []
      }
    ]
  };
  if (allClicks < maxClicks){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }
  if (allClicks >= maxClicks){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
      console.log(picNames[i]);
      data.datasets[0].data.push(parsedProductItems[i].views);
      console.log(parsedProductItems[i].views);
    }
  }

  var myChartViews = new Chart(chartViews, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  // myChartViews.update();
}

function renderChartPercentage(){
  var chartPercentage = document.getElementById('myChartPercentage');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'percentage of clicks per product',
        data: []
      }
    ]
  };
  if (allClicks < maxClicks){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }
  var chartData = clickPercentageData();
  if (allClicks >= maxClicks){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
      data.datasets[0].data.push(chartData[i]);
    }
  }
  var myChartPercentage = new Chart(chartPercentage, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

function resetCharts(event){
  var chartViews = document.getElementById('myChartViews');
  var chartClicks = document.getElementById('myChartClicks');
  var chartPercentage = document.getElementById('myChartPercentage');
  // chartClicks.parentNode.removeChild(chartClicks);
  // chartViews.parentNode.removeChild(chartViews);
  // chartPercentage.parentNode.removeChild(chartPercentage);
  // return false;
  displayButton.style.display = 'none';
  resetButton.style.display = 'none';
  allClicks = 0;
}

function renderCharts(event){
  renderChartViews();
  renderChartClicks();
  renderChartPercentage();
}

displayPics();

function playAgain (){
  displayPics();
}

resetButton.style.display = 'none';
displayButton.style.display = 'none';
picContainer.addEventListener('click', handlePicContainerClick);
displayButton.addEventListener('click', renderCharts);
resetButton.addEventListener('click', resetCharts);

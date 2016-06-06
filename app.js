var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var displayButton = document.getElementById('chart-results');
var resetButton = document.getElementById('reset-results');
var playAgainButton = document.getElementById('play-again');
var backEndResults = document.getElementById('backend-results');
var chartViews = document.getElementById('myChartViews');
var chartClicks = document.getElementById('myChartClicks');
var chartPercentage = document.getElementById('myChartPercentage');
var allProducts = [];
var allPics = [];
var allClicks = 0;
var maxClicks = 25;
var parsedProductItems = [];
var picNames = ['bag', 'banana', 'bathroom', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var parsedProductItems = JSON.parse(localStorage.getItem('productData'));

if (JSON.parse(localStorage.getItem('productData')) === null) {
  var parsedProductItems = [];
}

function Product(name) {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.percentage = 0;
  this.path = 'images/' + name + '.jpg';
  this.recommended = 'NO';
}

function productAllClicks (){
  parsedProductItems = JSON.parse(localStorage.getItem('productData'));
  var productAllClicks = [];
  for (var i = 0; i < allProducts.length; i++){
    if (JSON.parse(localStorage.getItem('productData')) != null){
      productAllClicks.push(parsedProductItems[i].clicks);
    }
    else {
      productAllClicks.push(allProducts[i].clicks);
    }
  }
  return productAllClicks;
};

function productAllViews (){
  parsedProductItems = JSON.parse(localStorage.getItem('productData'));
  var productAllViews = [];
  for (var i = 0; i < allProducts.length; i++){
    if (JSON.parse(localStorage.getItem('productData')) != null){
      productAllViews.push(parsedProductItems[i].views);
    }
    else { productAllViews.push(allProducts[i].views);
    }
  }
  return productAllViews;
};

function percentageOfClicks(clicks, views){
  var percentage = clicks / views;
  return percentage;
}

var clickPercentageData = function(){
  var array1 = productAllViews();
  var array2 = productAllClicks();
  var arrayResult = [];
  for (var i = 0; i < allProducts.length; i++){
    var finalPercentage = Math.round((percentageOfClicks(array2[i], array1[i])) * 100);
    if (isNaN(finalPercentage) === true){
      finalPercentage = 0;
    }
    arrayResult.push(finalPercentage);
    allProducts[i].percentage = finalPercentage;
  }
  return arrayResult;
};

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
    console.log(allProducts[centerIndex].name + ' has been shown ' + allProducts[centerIndex].views + ' times');

    var rightIndex = randNum( 0 , allProducts.length);
    while (rightIndex === centerIndex || rightIndex === leftIndex) {
      var rightIndex = randNum(0 , allProducts.length);
    }
    right.src = allProducts[rightIndex].path;
    allProducts[rightIndex].views += 1;
    right.alt = allProducts[rightIndex].name;
    console.log(allProducts[rightIndex].name + ' has been shown ' + allProducts[rightIndex].views + ' times');
  }
}

function handlePicContainerClick (event){
  if (event.target.id === 'pic-container' && allClicks < maxClicks ){
    return alert('click on a picture');
  }
  for (var i = 0; i < allProducts.length; i++){
    if(event.target.alt === allProducts[i].name && allClicks < maxClicks){
      allProducts[i].clicks += 1;
      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
      allClicks += 1;
    }
  }

  if (allClicks >= maxClicks){
    displayButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    backEndResults.style.display = 'inline-block';
  }

  clickPercentageData();

  var allProductsStringged = JSON.stringify(allProducts);
  localStorage.setItem('productData', allProductsStringged);

  displayPics();
}

function viewProductsOnBackEnd(event){
  var allProductsStringged = JSON.stringify(allProducts);
  localStorage.setItem('productData', allProductsStringged);

  window.open('index-back.html');
}

function renderChartClicks(){
  var chartClicks = document.getElementById('myChartClicks');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'the most clicked products',
        data: [],
        backgroundColor: '#DE5126'
      }
    ]
  };
  if (allClicks < maxClicks){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }

  if (allClicks >= maxClicks){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
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
        data: [],
        backgroundColor: '#DE5126'
      }
    ]
  };
  if (allClicks < maxClicks){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }
  if (allClicks >= maxClicks){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
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
}

function renderChartPercentage(){
  var chartPercentage = document.getElementById('myChartPercentage');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'percentage of clicks per product',
        data: [],
        backgroundColor: '#DE5126'
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
  displayButton.style.display = 'none';
  resetButton.style.display = 'none';
  backEndResults.style.display = 'none';
  allClicks = 0;
}

function renderCharts(event){
  parsedProductItems = JSON.parse(localStorage.getItem('productData'));
  renderChartViews();
  renderChartClicks();
  renderChartPercentage();
}

function playAgain (){
  displayPics();
}

displayPics();

resetButton.style.display = 'none';
displayButton.style.display = 'none';
backEndResults.style.display = 'none';
backEndResults.addEventListener('click', viewProductsOnBackEnd);
picContainer.addEventListener('click', handlePicContainerClick);
displayButton.addEventListener('click', renderCharts);
resetButton.addEventListener('click', resetCharts);

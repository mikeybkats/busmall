// first steps lines 1-4 - define variables
var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var displayButton = document.getElementById('chart-results');
var resetButton = document.getElementById('reset-results');
var allProducts = [];
var allPics = [];
var allClicks = 0;
var picNames = ['bag', 'banana', 'bathroom', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
resetButton.style.display = 'none';
displayButton.style.display = 'none';

function Product(name) {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.path = 'images/' + name + '.jpg';
}

for (var i = 0; i < picNames.length; i++){
  allProducts.push(new Product(picNames[i]));
}

// allProducts.push(this);
//left.src = allProducts[15].path;

function randNum (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function displayPics (){
  if (allClicks < 25){
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
  if (event.target.id === 'pic-container' && allClicks < 25){
    return alert('click on a picture');
  }
  for (var i = 0; i < allProducts.length; i++){
    if(event.target.alt === allProducts[i].name && allClicks < 25){
      allProducts[i].clicks += 1;
      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
      allClicks += 1;
      console.log(allClicks);
    }
  }
  if (allClicks >= 25){
    displayButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';

  }
  console.log(event.target);
}

var ctx = document.getElementById('myChart');

function renderChart(event){
  var data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: []
      }
    ]
  };
  if (allClicks < 25){
    alert('you have to choose another 25 products for busmall before you can see your results');
  }

  if (allClicks >= 25){
    for (var i = 0; i < picNames.length; i++){
      data.labels.push(picNames[i]);
      console.log(picNames[i]);
      data.datasets[0].data.push(allProducts[i].clicks);
      console.log(allProducts[i].clicks);
    }
  }

  var myChart = new Chart(ctx, {
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
  myChart.update();
}
function resetChart(event){
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '',
        data: []
      }]
    },
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
  myChart.update();
  allClicks = 0;
}

displayPics();
picContainer.addEventListener('click', handlePicContainerClick);
displayButton.addEventListener('click', renderChart);
resetButton.addEventListener('click', resetChart);

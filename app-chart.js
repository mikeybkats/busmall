var picNames = ['bag', 'banana', 'bathroom', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var parsedProductItems = JSON.parse(localStorage.getItem('productData'));

if (JSON.parse(localStorage.getItem('productData')) === null) {
  var parsedProductItems = [];
}

for (var i = 0; i < parsedProductItems.length; i++){
  parsedProductItems[i].recommended = function(){
    if (this.percentage > 30){
      this.recommended = 'YES';
    }
    else {
      this.recommended = 'NO';
    }
  };
  parsedProductItems[i].recommended();
}

var table = document.getElementById('results-table');
var row = document.createElement('tr');
var dataItem = document.createElement('th');
var dataViews = document.createElement('th');
var dataClicks = document.createElement('th');
var dataPercentClicks = document.createElement('th');
var dataRecommended = document.createElement('th');
table.appendChild(row);
row.appendChild(dataItem); // tells JS to build a row with a data
row.appendChild(dataViews);
row.appendChild(dataClicks);
row.appendChild(dataPercentClicks);
row.appendChild(dataRecommended);
dataItem.textContent = 'Product Name';
dataViews.textContent = 'Number of Views';
dataClicks.textContent = 'Number of Clicks';
dataPercentClicks.textContent = 'Percentage of Clicks';
dataRecommended.textContent = 'Recommended?';

for (var i = 0; i < picNames.length; i++){
  var row = document.createElement('tr');
  var dataItem = document.createElement('th');
  var dataViews = document.createElement('th');
  var dataClicks = document.createElement('th');
  var dataPercentClicks = document.createElement('th');
  var dataRecommended = document.createElement('th');
  table.appendChild(row);
  row.appendChild(dataItem); // tells JS to build a row with a data
  row.appendChild(dataViews);
  row.appendChild(dataClicks);
  row.appendChild(dataPercentClicks);
  row.appendChild(dataRecommended);
  dataItem.textContent = picNames[i];
  dataViews.textContent = parsedProductItems[i].views;
  dataClicks.textContent = parsedProductItems[i].clicks;
  dataPercentClicks.textContent = parsedProductItems[i].percentage;
  dataRecommended.textContent = parsedProductItems[i].recommended;
}

// first steps lines 1-4 - define variables
var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var allProducts = [];
var allPics = [];
var picNames = ['bag', 'banana', 'bathroom', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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

function handlePicContainerClick (event){
  displayPics();
  if (event.target.id === 'pic-container'){
    return alert('click on a picture');
  }
  for (var i = 0; i < allProducts.length; i++){
    if(event.target.alt === allProducts[i].name){
      allProducts[i].clicks += 1;
      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
    }
  }
  console.log(event.target);
}

picContainer.addEventListener('click', handlePicContainerClick);

displayPics();

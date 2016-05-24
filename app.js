var testImageArray = [];

var TestImage = function(name, path, number){
  this.name = name;
  this.src = path;
  this.identifier = number;
  this.clickTally = 0;
  this.displayTally = 0;
  testImageArray.push(this);
};

var bag = new TestImage ('bag', 'images/bag.jpg', 0);
var banana = new TestImage ('banana', 'images/banana.jpg', 1);
var bathroom = new TestImage ('bathroom', 'images/bathroom.jpg', 2);
var boots = new TestImage ('boots', 'images/boots.jpg', 3);
var breakfast = new TestImage ('breakfast', 'images/breakfast.jpg', 4);
var bubblegum = new TestImage ('bubblegum', 'images/bubblegum.jpg', 5);
var chair = new TestImage ('chair', 'images/chair.jpg', 6);
var cthulhu = new TestImage ('chair', 'images/cthulhu.jpg', 7);
var dogduck = new TestImage ('dog-duck', 'images/dog-duck.jpg', 8);
var dragon = new TestImage ('dragon', 'images/dragon.jpg', 9);
var pen = new TestImage ('pen', 'images/pen.jpg', 10);

var randomImage = function (){
  var number = Math.floor(Math.random() * testImageArray.length);
  // var selection = testImageArray[number].src;
  return number;
};

var buttonAction = document.getElementById('take-test');
buttonAction.addEventListener('click', loadImage);

function loadImage(event){
  var imageSelectionNumber = randomImage();
  var selectedImage = testImageArray[imageSelectionNumber].src;
  console.log(selectedImage);
  var leftImageDiv = document.getElementById('imageleft'); // get element
  leftImageDiv.src = selectedImage;
  // on click push 1 to tally to correct object
}

var clickDivLeft = document.getElementById('imageleft');
clickDivLeft.addEventListener('click', tallyImage);

// function name (event){
function tallyImage (event){
  var imageSelectionNumber = randomImage();
  console.log('The random number is ' + imageSelectionNumber);
  var selectedImage = testImageArray[imageSelectionNumber].src;
  console.log(selectedImage);
  var leftImageDiv = document.getElementById('imageleft'); // get element
  leftImageDiv.src = selectedImage;
  // on click push 1 to tally to correct object
  var clickProperty = testImageArray[imageSelectionNumber].clickTally;
  var tallyOfSelection = 1 + clickProperty; // selects the attribute
  //clickProperty.push(tallyOfSelection);
  console.log(clickProperty);
};

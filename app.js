var testImageArray = [];

var TestImage = function(name, path, number){
  this.name = name;
  this.src = path;
  this.identifier = number;
  this.clickTally = 0;
  this.displayTally = 0;
  this.pushToArray = function (){
    var imageToArray = this;
    testImageArray.push(imageToArray);
  };
};

var bag = new TestImage ('bag', 'images/bag.jpg', 1);
var banana = new TestImage ('banana', 'images/banana.jpg', 2);
var bathroom = new TestImage ('bathroom', 'images/bathroom.jpg', 3);

var randomizer = function (){
  var number = Math.floor(Math.random() * 20);
  console.log('The random number is ' + number);
  return number;
};

var clickDivLeft = document.getElementById('image-left');

// add event listener var.addEventListener('click', function);
clickDivLeft.addEventListener('click', tallyImage);

// function name (event){
function tallyImage (event){
  console.log(event.target.id);
};

var buttonAction = document.getElementById('take-test');
buttonAction.addEventListener('click', )

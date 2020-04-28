//let and const

/*
//ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';

console.log(name5+''+age5);
//ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';//error
console.log(name6+''+age6);

//ES5
function driverLicense5(passedTest){
    if(passedTest)
    {
        console.log(firstName);//undefined : variables are hoisted in execution context and set to undefined
        var firstName ='John';
        var yearOfBirth = 1990;
       
    }
    console.log(firstName+' born in '+yearOfBirth+' is allowed to drive car');
}

driverLicense5(true);

//ES6
function driverLicense6(passedTest){
   // console.log(firstName);//Uncaught ReferenceError: Cannot access 'firstName' before initialization 
    //hoisting doest work with let 
    let firstName ;
    const  yearOfBirth = 1990;
    if(passedTest)
    {
         firstName ='John';
        
       
    }
    console.log(firstName+' born in '+yearOfBirth+' is allowed to drive car');
}

driverLicense6(true);

let i=24;

for(let i=0;i<5;i++)
{
    console.log(i); // 0 1 2 3 4 

}
console.log(i);//24
*/

//BLOCKS AND IIFEs

/*
//ES6
{
    const a = 4;
    let b = 5;
    var c= 3;
}

console.log(a+b);//script.js:67 Uncaught ReferenceError: a is not defined
console.log(c); //3 , because var is function scoped and it doesnt matter if variable declared with var is inside a block or not
//ES5
(function(){
    var c= 6;
})();

console.log(c);//Uncaught ReferenceError: c is not defined
*/

//STRINGS
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(){
    return 2020 - yearOfBirth;
}

//ES5
console.log(firstName + ' '+ lastName+' '+yearOfBirth+' he is '+calcAge(yearOfBirth)+' years old.');

//ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth} and today he is ${calcAge(yearOfBirth)} years old`);

const n = `${firstName} ${lastName}`;
//To check if a string starts with a particular alphabet
console.log(n.startsWith('J')); //true
console.log(n.startsWith('N')); //false
console.log(n.startsWith('j')); //false

//To check if a string ends with a particular alphabet
console.log(n.endsWith('h'));//true
console.log(n.endsWith('G'));//true

//To check if a string includes  a particular alphabet
console.log(n.includes(' '));//true
console.log(n.includes('o'));//true

console.log(firstName.repeat(5)); //JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5)); //John John John John John  --> if we need a space after John, need to write a template literal
*/

//ARROW FUNCTIONS
/*
const years = [2000,2004,2008,2012,2016];

//ES5
var ages5  = years.map(function(el){ //remember that here in the map method, we have access to the current element, the current index, and also the entire years array.
   //el is the current parameter for map
    return 2020-el; //if we then return something here,  which will be 2020, minus the element in this case,  it then gets stored into this array that we specified here.
});

console.log(ages5);// [20, 16, 12, 8, 4]

//ES6

let ages6 = years.map(el => 2020-el); // (current_element followed by arrow operator followed by the return stmt)
//produces the same result as above
//for a simple callback function like this here with only one argument, it really is as simple as this. no fn/return keyword
console.log(ages6); // [20, 16, 12, 8, 4]

//If we have to provide more than one argument here '
 ages6 = years.map((el,index) => `Age element ${index + 1} : ${2020 - el}.`) // here we are accessing the current element and index both
console.log(ages6);//["Age element 1 : 20.", "Age element 2 : 16.", "Age element 3 : 12.", "Age element 4 : 8.", "Age element 5 : 4."]

//If we have more than one line return stmt, then we also have to use the curly braces that we have to use in normal functions. And also the return keyword is then not implicit and we have to write it again.
ages6 = years.map((el,index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1} : ${age}.`
});
console.log(ages6);// same o/p as above
*/
//ARROW FUNCTIONS  2

//ES5
/*
var box5 = {
    color: 'green',
    position : 1,
    clickMe : function(){
        var self= this;
        document.querySelector('.green').addEventListener('click',function(){
            var str = 'This is box number '+self.position+' and it is '+self.color;
            alert(str);
        })
    }
}
box5.clickMe();
*/

//ES6
/*
const box6 = {
    color: 'green',
    position : 1,
    clickMe : function(){
       
        document.querySelector('.green').addEventListener('click',
       () => {
            var str = 'This is box number '+this.position+' and it is '+this.color;
            alert(str);
        })
    }
}
*/
//box6.clickMe();
/*
const box6 = {
    color: 'green',
    position : 1,
    clickMe : () => {
       
        document.querySelector('.green').addEventListener('click',
       () => {
            var str = 'This is box number '+this.position+' and it is '+this.color;
            alert(str);
        })
    }
}
box6.clickMe();





function Person(name){
    this.name = name;
}

//ES5
Person.prototype.myFriends5=function(friends){
    var arr = friends.map(function(el){
        return this.name + 'is friends with '+el;
    }.bind(this));

    console.log(arr);
}

var friends =['bob','Jane','mark'];

new Person('john').myFriends5(friends); //0: "johnis friends with bob" 1: "johnis friends with Jane" 2: "johnis friends with mark"



//0: "is friends with bob" 1: "is friends with Jane" 2: "is friends with mark"

//ES6
Person.prototype.myFriends6 =function(friends){
    let arr = friends.map((el)=> `${this.name} is friends with ${el}`);

    console.log(arr);
}

var friends =['bob','Jane','mark'];

new Person('john').myFriends6(friends);//0: "johnis friends with bob" 1: "johnis friends with Jane" 2: "johnis friends with mark"

*/

////DESTRUCTURING

/*
//ES5
var John=['John',26];
var name = John[0];
var age = John[1];

//ES6
const [name,age]=['John',26]; //Destructing array
console.log(name); //John
console.log(age); //26

const obj ={ // it's an object, and so we use the curly braces here, because the object is also constructed like that, so that's also how we destruct it
    firstName : 'John',
    lastName : 'Smith'
};
const{firstName,lastName}= obj;//these variable names here has to match the keys name
console.log(firstName);
console.log(lastName);

const{firstName : a,lastName : b}= obj; //Now if we don't want the variable names to match with the key names, then we can also use different names, and it's gonna work simply like this.
console.log(a);
console.log(b);

//function that returns multiple values
function calcAgeRetirement(year){
    const age2 = new Date().getFullYear() - year;
    return [age2,65-age2];
}

const[age2,retirement]=calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
*/

//ARRAY IN ES6
/*
const boxes = document.querySelectorAll('.box'); //returns nodelist instead of array

//ES5

var boxes5 = Array.prototype.slice.call(boxes);
boxes5.forEach(function(current) {
    current.style.backgroundColor ='dodgerblue';
});

//ES6
const boxes6 = Array.from(boxes); //simply transform the boxes list to array
boxes6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//above can be written as : 
//Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//loops

//ES5
/*
for(var i=0;i<boxes5.length;i++ )
{
    if(boxes5[i].className === 'box blue')
    {
        continue;
    }

    boxes5[i].textContent = 'I changed to blue';
}

//ES6
for(const cur of boxes6){
   // if(cur.className==='box blue')
    if(cur.className.includes('blue'))
    {
        continue;
    }
    cur.textContent='I changed to blue 6';
}

//So suppose that we have a group of children and we know that only one of them is a full age. So let's now find out who and how old that person is.
//ES5
var ages = [12,17,8,21,14,11];
var full = ages.map(function(cur){
    return cur>=18;

});

console.log(full); //now we have to find out the position of this element here in array (which is true). And in order to do that, we use the index off method.

console.log(full.indexOf(true)); //3
console.log(ages[full.indexOf(true)]); //21 // to retreive the age of full child (true)

//ES6
//In find index method, we can pass a call back function into it and it's then gonna return us the index of the array where the call back function returns true.
//this works a bit like the map or the for each methods so we have a call back function that has access to the current element to the current index and the entire array and so I can write cur, then my arrow function and then what I want is the same expression that we had before which is when the current is greater or equal to 18 years old.

console.log(ages.findIndex(cur => cur >= 18)); //3 

//find method ---- to get the element instead of index
console.log(ages.find(cur => cur>=18)); //21
*/

////SPREAD OPERATOR 

//the new spread operator is a very convenient way to expand elements of an array in places like arguments and function calls.

/*
function addfourages(a,b,c,d){
    return a+b+c+d;
}

var sum1=addfourages(18,21,30,12);
console.log(sum1);

//Now imagine that we had these four numbers in an array instead of, for example, four different variables.

//ES5
var ages = [18,30,12,21];
var sum2 = addfourages.apply(null,ages);//here apply will take the null as this as its not required here and ages as argument and pass the array elements as the arguments to the function addFourAges

console.log(sum2);

//ES6
const sum3=addfourages(...ages); // this spread operator (...) here expand this array into its components, so in this case 18, 30, 12, and 21.
//So this here is now exactly the same as writing18, 30, 21, and 21
console.log(sum3);

//combining arrays using spread operator (...)
const familySmith = ['John','Jane','Mark'];
const familyMiller = ['Mary','Bob','Ann'];

const bigFamily = [...familySmith,...familyMiller];
//it basically takes the array elements out of the array and puts them here
console.log(bigFamily);//"John", "Jane", "Mark", "Mary", "Bob", "Ann"

const bigFamily2 = [...familySmith,'lily',...familyMiller];
console.log(bigFamily2); //"John", "Jane", "Mark", "lily", "Mary", "Bob", "Ann"

//nodelist with spread operator (...)
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all =[h,...boxes]; //spread op works with nodelist also

Array.from(all).forEach(cur => cur.style.color = 'purple');
*/

////REST PARAMETERS

//So suppose we want to create a function that receives an arbitrary number of years, and then prints to the console whether each person corresponding to these years is of full age or not.

//ES5

// in ES5, if we want to receive an undefined number of arguments, then we simply don't define any parameters for our function, and then just use the arguments keyword

//And remember the arguments keyword, or variable, is very similar to the this variable and it's a variable that each execution context gets access to.
/*

function isFullAge5(){
    console.log(arguments); //It returns an array like structure but not exactly array, since teh prototype is Object instead of array here

    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2020-cur)>=18);
    });
}

isFullAge5(1990,1995,1998,2014); 

//ES6
function isFullAge6(...years){ //And so, what this is gonna do is as soon as we call the function, it will transform the arguments, for example, these three arguments or these five.  It will transform them into an array  and then pass it into this function. And we can then access that years array automatically in a function and use it as we did before

console.log(years); // It returns an array of all the arguments we passed to this function
years.forEach(cur => console.log((2020-cur)>=18));

}

isFullAge6(1990,1998,2018);


//-->now what we want to change is to accept another parameter which will act as the age limit. So instead of having the 18 here, we will pass a parameter which is going to tell us
//ES5
function isFullAge5(limit){ //pass the number of usual parameters here (fixed ones only)
    console.log(arguments); 

    var argsArr = Array.prototype.slice.call(arguments,1);//if we have one argument which will be limit here, then we pass 1 here so that arguments after first are considered and thats how we handle a usual parameter plus a number of arbitrary parameters

    console.log(argsArr);
    argsArr.forEach(function(cur) {
        console.log((2020-cur)>=limit);
    });

   
}

isFullAge5(21,1990,1995,1998,2014); 

//ES6
function isFullAge6(limit,...years){ // in ES 6 we just add the usual parameter and then comma and the spread operator parameter

console.log(years); 
years.forEach(cur => console.log((2020-cur)>=limit));

}

isFullAge6(15,1990,1998,2018);
*/

////DEFAULT PARAMETERS

//ES5
/*
function SmithPerson(firstName,yearOfBirth,lastName,nationality){
   
    lastName===undefined ? lastName='Smith' : lastName = lastName;
    nationality===undefined ? nationality = 'American' : nationality=nationality;
   
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John',1990) //JavaScript actually allows us to call any function without specifying all of the arguments. In this case, we only specify first name and year of birth, but leave the last name and nationality empty. What JavaScript does, in this case, is that it simply assigns undefined to these two parameters, so they will be undefined, and we're gonna make use of that

var emily = new SmithPerson('Emily',1980,'Dias','Spanish'); //{firstName: "Emily", lastName: "Dias", yearOfBirth: 1980, nationality: "Spanish"}

//ES6
function SmithPerson(firstName,yearOfBirth,lastName='Smith',nationality='American'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John',1990)

var emily = new SmithPerson('Emily',1980,'Dias','Spanish'); //{firstName: "Emily", lastName: "Dias", yearOfBirth: 1980, nationality: "Spanish"}
*/

////MAPS
/*
const question = new Map();

question.set('question','What is the name of lastest JS version?');
question.set(1,'ES5');
question.set(2,'ES6');
question.set(3,'ES2015');
question.set(4,'ES7');

question.set('correct',3);
question.set(true,'Correct Answer');
question.set(false,'Wrong! Try Again');

console.log(question.get('question'));
console.log(question.size);
question.delete(4);
question.delete(4); // nothing happens if we delete this key value pair twice

if(question.has(2))
{
    //question.delete(2); 
    console.log('Answer 2 is here');
}

//question.clear(); // deleted everything from  the map //Map(0) {}

question.forEach((value,key)=> console.log(`this is ${key}, and its set to ${value}`));

for(let [key,value] of question.entries()){
    if(typeof(key)==='number') // using typeof here to check the type first
    {
    console.log(`Answer ${key} :  ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer?'));

console.log(question.get(ans===question.get('correct')));

*/

////CLASSES
/*
//ES5

var Person5 = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job ;
}

Person5.prototype.calculateAge=function(){
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John',1990,'Teacher');

//ES6

class Person6{
    constructor(name,yearOfBirth,job){
        this.name = name ;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    //to add a method to this class
    calculateAge(){
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }

    //static class
    static greeting(){
        console.log('Hey there');
    }

}
const john6 = new Person6('John',1990,'teacher');//john5 and john6 are similar object
Person6.greeting(); // JHey There 
*/

////CLASSES AND SUBCLASSES

//ES5
/*
var Person5 = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job ;
}

Person5.prototype.calculateAge=function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athelete5 = function(name,yearOfBirth,job,olympicGames,medals){

    Person5.call(this,name,yearOfBirth,job); ////1
    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athelete5.prototype = Object.create(Person5.prototype); ////2
Athelete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
}

var johnAthelete5 = new Athelete5('John',1990,'Swimmer',3,10);
johnAthelete5.calculateAge(); //30
johnAthelete5.wonMedal(); //11

//ES6
class Person6{
    constructor(name,yearOfBirth,job){
        this.name = name ;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    //to add a method to this class
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    //static class
    static greeting(){
        console.log('Hey there');
    }

}

class Athelete6 extends Person6{ // here we just needs to say that the subclass extends  superclass
    constructor(name,yearOfBirth,job,olympicGames,medals)
    {
        super(name,yearOfBirth,job); // this will call superclass and we dont need to set the variables specifically
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal(){ //adding Athelete method
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthelete6 = new Athelete6('John',1990,'Swimmer',3,10);
johnAthelete6.wonMedal(); //11
johnAthelete6.calculateAge(); //30
*/

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Ele{

    constructor(name,buildYear)
    {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Ele{
    constructor(name,buildYear,numberOfTrees,area){
        super(name,buildYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area;
       // this.age = age;
    }

    calcAge(){
        return new Date().getFullYear() - this.buildYear;
    }

    parkDensity(){
        console.log(`Density of Park : ${this.name} is ${this.numberOfTrees/this.area}`)
    }
}

class Street extends Ele{
    constructor(name,buildYear,length,size=3)
    {
        super(name,buildYear);
        this.length=length;
        this.size=size;
    }

    sizeOfStreet(){
        const sizeMap= new Map();
        sizeMap.set(1,'huge');
        sizeMap.set(2,'big');
        sizeMap.set(3,'default');
        sizeMap.set(4,'small');
        sizeMap.set(5,'tiny');
        console.log(`Size of ${this.name} is ${sizeMap.get(this.size)}`);
    }
}

const allParks = [new Park('Park1',2001,100,0.2),new Park('Park2',2002,800,0.5),new Park('Park3',2004,1200,2.0)];
const allStreets = [new Street('Street1',2005,100,4),new Street('Street2',2006,200,5),new Street('Street3',2007,70),new Street('Street4',2008,10,1)];

function calcSum(arr){
    var sum=0;
    for(var i=0;i<arr.length;i++)
    {
        sum+=arr[i];
    }
    return sum;
}

function parkReport(allParks){

    console.log('--------PARKs REPORT-----------');
    //Density
    allParks.forEach((cur) => cur.parkDensity());

    //Avg age of town park
    const ages = allParks.map((el)=> el.calcAge());
    console.log(`Average age of towns park is ${calcSum(ages)/allParks.length}`);

    //more than 1000 trees
    const tree1000 = allParks.map(el=>el.numberOfTrees).findIndex(el=> el>=1000);
    console.log(`The Park with more than 1000 trees is ${allParks[tree1000].name}`);

}

function streetReport(allStreets){
    console.log('----------------STREETs REPORT--------------------');
    const len = allStreets.map((el)=>el.length);
    const sumlen = calcSum(len);
    console.log(`Total length of all streets is ${sumlen}, and average is ${sumlen/allStreets.length}`);

    //size
    allStreets.forEach((el)=>el.sizeOfStreet());
}

parkReport(allParks);
streetReport(allStreets);


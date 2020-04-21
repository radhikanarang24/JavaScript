// BUDGET CONTROLLER
var budgetController=(function()
{
    //function costructor to create income and expense objects
    var Expense = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage= function(totalIncome){
        if(totalIncome >0)
             this.percentage = Math.round( (this.value /  totalIncome)*100);
        else 
        this.percentage = -1;
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        var sum =0;

        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });

        /*
        0
        [200,400,100]
        sum = 0+200
        sum = 200+400
        and so on...
        */
        data.totals[type] = sum;
    };
// data object is a data structure here to recieve all the data on income and expense  
var data ={

     allItems :{
         exp : [],
         inc : []
     },

     totals :{
        exp : 0,
        inc : 0
     },

     budget : 0,
     percentage : -1
}

return {
    addItem : function(type, des, val){

        var newItem, ID;

        //create new ID
        //[data.allItems[type].length - 1] --> for last element of the exp/inc array]

        if( data.allItems[type].length >0)
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        else 
            ID =0;

        //create new item based on 'exp' or 'inc' type
         if(type==='exp'){
            newItem = new Expense(ID, des,val);      
        }
        else if(type==='inc')
        {
            newItem=new Income(ID,des,val);
        }

        //push it into our data structure
        data.allItems[type].push(newItem);

        //return the item
        return newItem;
    },

    //adding a new method to check the data object
    testing : function()
    {
        console.log(data);
    },

    calculateBudget : function(){
        //calculate total income and expenses
        calculateTotal('inc');
        calculateTotal('exp');
        //calculate the total budget : income - expenses

        data.budget=data.totals.inc - data.totals.exp;

        //calculate the percentage of income that we spent
        if(data.totals.inc > 0)
        {
        data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
        }
        else
        {
            data.percentage = -1;
        }
        //Expense = 100, income =200 , percentage = 100/200=0.5
    },

    getBudget : function(){

        return {
           budget : data.budget,
           totalIncome : data.totals.inc,
           totalExpenses : data.totals.exp,
           percentage : data.percentage

        }
    },

    deleteItem : function(type, id){

        var ids,index;
        //ids=[1,2,4,6]
         ids = data.allItems[type].map(function(current){
            return current.id;
        });

        index=ids.indexOf(id);

        if(index !== -1){
                data.allItems[type].splice(index,1);
        }
    },

    calculatePercentages : function(){
        /*
            a=20 (20/100 = 20%)
            b=30 (30/100 = 30%)
            c=10 (10/100 = 10%)
            income =100
        */

        data.allItems.exp.forEach(function(current){
            current.calcPercentage(data.totals.inc);

        });
    },

    getPercentages : function(){
        //The difference to the loop that we wrote here in our other method is that this time, we don't wanna just loop over the array and do something. No, we also want to return something. So we want to store it somewhere. And remember, that's what the map method is for. So instead of forEach, we're gonna use map.
        var allPercentages = data.allItems.exp.map(function(current){ 
                return current.getPercentage();
        });

        return allPercentages;
    }
};

})();




//UI CONTROLLER
var UIController=(function(){

    var DOMstrings={
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container',
        expensesPercentageLabel : '.item__percentage',
        dateLabel : '.budget__title--month'
    }
    
    var formatNumber = function(num, type){
        /** exactly 2 decimal point
         * + or - for inc/exp
         * comma separating thousands
         */
        var numSplit,int,dec,sign;
         num = Math.abs(num);
         num = num.toFixed(2); // method of number prototype

         numSplit = num.split('.');
         int = numSplit[0];
         dec = numSplit[1];

         if(int.length > 3)
         {
             int = int.substr(0,int.length - 3)+','+int.substr(int.length-3,3); ///2390 =>2,390
         }
         
         

         return (type==='exp'?'-':'+') + ' '+int+'.'+dec; 

    };

    var nodeListForEach = function(list,callback){
        for(var i=0;i<list.length;i++)
        {
            callback(list[i],i);
        }
    };

    return {
        getInput : function(){

            return {
                type : document.querySelector(DOMstrings.inputType).value, // will be either inc or exp as its a select element
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)

            }
        },

        getDOMstrings : function(){
            return DOMstrings;
        },

        addListItem : function(obj,type){

            var html,newHtml,element;
            //Create HTML string with placeolder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html= '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> $description$ </div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = html = ' <div class="item clearfix" id="exp-%id%"> <div class="item__description"> $description$ </div>  <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"></div> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div>  </div>'
            }
            

          //Replace the placeholder text with the actual data
          newHtml = html.replace('%id%', obj.id);
        //  console.log(obj.description);
          newHtml = newHtml.replace('$description$', obj.description);
          newHtml = newHtml.replace('%value%',formatNumber(obj.value,type));
          
          // Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields : function(){
            var fields,fieldsArr;
            //querySelectorAll returns list, not array
            //slice method returns a copy of array when we use it with array, here we trick the method and use it on list so that it returns a copy of array
            
           fields= document.querySelectorAll(DOMstrings.inputDescription+','+DOMstrings.inputValue);

           fieldsArr = Array.prototype.slice.call(fields);

           fieldsArr.forEach(function(current,index,array) {
               current.value="";
           });

           fieldsArr[0].focus();

        },

        displayBudget : function(obj){
            
            var type;
            obj.budget>0 ?type='inc' : type='exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome,type);
            
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpenses,type);
            
          //  document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if(obj.percentage >0)
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
            }
            else
            {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        deleteListItem : function(selectorId){
            var el= document.getElementById(selectorId);
            el.parentNode.removeChild(el);

        },

        displayPercentages : function(percentages){
                var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
                //Alright, and this, again, returns a list. And actually, it's called a node list. Not just list, but nodeList and that is because in a DOMtree, where all of the html elements of our page are stored, each element is called a node and that's also why the property that we used before for moving up in the DOM was called parentNode.

              

                nodeListForEach(fields,function(current,index){
                        if(percentages[index] > 0)  
                            current.textContent = percentages[index] + '%';
                        else 
                        current.textContent ='---';
                });
       
            },

            displayMonth : function(){
                var now,year,month,months;

                 now = new Date();
                year = now.getFullYear();
                month = now.getMonth();
                
                months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
                document.querySelector(DOMstrings.dateLabel).textContent = months[month]+' '+ year;

            },

            changedType : function(){
                var fields = document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue);

                console.log(fields);
                nodeListForEach(fields,function(current){
                    current.classList.toggle('red-focus');

                });

                document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            }

     
    };

})();





//GLOBAL APP CONTROLLER
var controller=(function(budgetCtrl, UICtrl){

    var setupEventListeners=function(){
    
    var DOM=UICtrl.getDOMstrings();
            
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
  
    document.addEventListener('keypress',function(event){ // most developers use e instead of event
  
         // console.log(event);
  
         if(event.keyCode===13 || event.which === 13)
         {
            // console.log('Enter key was pressed');
            ctrlAddItem();
             
         }
  
    });

    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    
};

var updatePercentages = function(){
    //1. Calculate the Pecentage
    budgetCtrl.calculatePercentages();
    //2. Read the percentages from the budget controller
   var percentages = budgetCtrl.getPercentages();
    //3. Update the new UI with the new percentages
 //   console.log(percentages);
    UICtrl.displayPercentages(percentages);

}
   var updateBudget=function(){
        //1. CALCULATE THE BUDGET
        budgetCtrl.calculateBudget();
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        //3. DISPLAY THE BUDGET ON THE UI
        //console.log(budget);
        UICtrl.displayBudget(budget);
   }

    var ctrlAddItem =function(){

        var input,newItem;
        //1. GET THE INPUT FIELD VALUE
        input = UICtrl.getInput();
       // console.log(input);
        if(input.description !=="" && !isNaN(input.value) && input.value >0){
       
            //2. ADD THE ITEM TO THE BUDGET CONTROLLER
        newItem =  budgetCtrl.addItem(input.type,input.description,input.value); // the values that we get from the UI using the above method  UICtrl.getInput(); is being passed here as input parameters to budget controller

         //3. ADD THE ITEM TO THE UI
        UICtrl.addListItem(newItem,input.type);

        //4. CLEAR THE FIELDS
        UICtrl.clearFields();

        //5. Calculate and update budget
        updateBudget();

        //6. Calculate and update percentages
        updatePercentages();
        }
       
    }

    var ctrlDeleteItem = function(event){

        var itemID,splitID,type,id;
      //  console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID)
        {
                splitID = itemID.split('-');
                type=splitID[0];
                id=parseInt(splitID[1]);

                //1. Delete the item from the data structure
                budgetCtrl.deleteItem(type,id);
                //2. Delete the item from the UI
                UICtrl.deleteListItem(itemID);
                //3. Update and show the new budget
                updateBudget();
                 //4. Calculate and update percentages
                updatePercentages();

        }
    }

    return {
        init : function(){
            console.log('Application has started. ');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget : 0,
                totalIncome : 0,
                totalExpenses : 0,
                percentage : 0     
             });
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();


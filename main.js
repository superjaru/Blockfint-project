var allMenu = document.querySelector('.headDetail');
var allPerson = document.querySelector('.headDetail2');
var addMenuButton = document.querySelector('#addfood');
var inputs = document.querySelectorAll('input');
var addPerson = document.querySelector('#addperson');
var section = document.querySelector('#section');
var sum = document.querySelector('.sum');
var tr = document.querySelector('.result');
var tickTick = document.querySelectorAll('.checkla');
var form = document.querySelectorAll('form')[1];

addMenuButton.addEventListener('click',addedMenu);
addPerson.addEventListener('click',addedperson);
form.addEventListener('submit',function (e){
    e.preventDefault();
    addedperson();
});




var foodCostList = [];
var fixedFoodCostList = [];
var countPerson = 0;
var countMenu = 0;
var nodeName = '';
var uselessCount = 0;
var countyoyo = 0;
var yposition = 0;
var xposition = 0 ;
var countZero = 0;




function addedMenu(){
    foodName = inputs[0].value;
    foodCost = inputs[1].value;
    if (foodName ===''){
        foodName = 'Food has no name!'
    }
    if (foodCost === ''){
        alert("Please fill value");
        return;
    }
    foodCostList.push(foodCost);
    fixedFoodCostList.push(foodCost);
    countMenu += 1;
    let inputMenu = document.createElement('ul');
    let rowSum = document.createElement('ul');
    inputMenu.textContent = foodName + '(' + foodCost + ')';
    allMenu.appendChild(inputMenu);

    //รวมทุกคนเริ่มต้น
    if (countPerson !== 0){
    rowSum.textContent = foodCost;
    sum.appendChild(rowSum);
    }else{
        rowSum.textContent = 0;
        sum.appendChild(rowSum);
    }

    //add menu to person if menu was added after person being added
    if ( countPerson !== 0){
        for (k = 0 ; k< countPerson ; k++){
        let nodeName2 = `headDetailun${k+1}`
        let addNewMenuToPerson = document.querySelector('#' + nodeName2);
        let inputPerson = document.createElement('ul');
        inputPerson.setAttribute('class','konDiv gamu');
        let konDiv = document.createElement('div');
        
        let checkBox = document.createElement('input');
        checkBox.setAttribute('type','checkBox');
        checkBox.setAttribute('class','konDiv checkla');
        checkBox.setAttribute('onclick','clicked(event)');
        konDiv.setAttribute('class','yoyo');
        inputPerson.textContent = Number(foodCostList[countMenu-1])/countPerson;
        konDiv.appendChild(checkBox);
        konDiv.appendChild(inputPerson);
        addNewMenuToPerson.appendChild(konDiv);
        allPerson.appendChild(addNewMenuToPerson);

        //start with checked box
        document.querySelectorAll('.yoyo')[countyoyo].childNodes[0].checked = true;
        countyoyo += 1;

    }
    }
    //sum of all menu
    for(l = 1 ; l <= countPerson ; l++){
        let eachDiv = document.querySelector(`#headDetailun${l}`);
        var sumEachList = [];
        for (m = 1 ; m <= countMenu ; m++){
            var sumEach =  Number(document.querySelector(`#headDetailun${1}`).childNodes[m].textContent);
            sumEachList.push(sumEach);
            var sumEachAll = sumEachList.reduce((acc,curr) => acc+curr , 0);
            //แก้ก่อนหน้า
            if (m === countMenu && l < countPerson){
                var b = document.querySelector(`#alignNoi${l}`);
                b.textContent = sumEachAll;
            }
            //อันล่าสุด
            if (m === countMenu && l=== countPerson){
                document.querySelector('.result').removeChild(document.querySelector(`#alignNoi${l}`));
                var a = document.createElement('ul');
                a.setAttribute('id',`alignNoi${l}`);
                a.setAttribute('class',`alignNoi`);
                a.textContent = sumEachAll;
                tr.appendChild(a);
            }
            }
        }
        //make sum to be always right position
    if (uselessCount <= 0 &&  countPerson !== 0){
        tr.removeChild(document.querySelector('.special'));
        var a = document.createElement('ul');
        a.setAttribute('class',`special`);
        a.textContent = (fixedFoodCostList.reduce((acc,curr) => Number(acc)+Number(curr),0));
        tr.appendChild(a);
        uselessCount -= 1
    }
    inputs[0].value = '';
    inputs[1].value = '';
}




function addedperson(){
    if (countMenu === 0){
        return alert('Please add Menu first!');
    }
    personName = inputs[2].value;
    if (personName === ''){
        personName = 'Noname';
    }
    countPerson += 1;
    let inputPerson = document.createElement('ul');
    let inputPersonDiv = document.createElement('div');
    inputPersonDiv.setAttribute('id',`headDetailun${countPerson}`);
    inputPersonDiv.setAttribute('class','container inside');
    inputPerson.textContent = personName ;
    inputPersonDiv.appendChild(inputPerson);

    
    for(i = 0 ; i < foodCostList.length ; i++){
        let konDiv = document.createElement('div');
        konDiv.setAttribute('class','yoyo');
        let inputPerson = document.createElement('ul');
        inputPerson.setAttribute('class','konDiv gamu');
        let checkBox = document.createElement('input');
        checkBox.setAttribute('type','checkBox');
        checkBox.setAttribute('class',`konDiv checkla`);
        checkBox.setAttribute('onclick','clicked(event)');
        inputPerson.textContent = Number(foodCostList[i])/countPerson ;
        konDiv.appendChild(checkBox);
        konDiv.appendChild(inputPerson);
        inputPersonDiv.appendChild(konDiv);
        allPerson.appendChild(inputPersonDiv);
        //start with checked box
        document.querySelectorAll('.yoyo')[countyoyo].childNodes[0].checked = true;
        countyoyo += 1;
    //แก้คนก่อน
    if (countPerson !== 1){
        for (j = 1 ; j < countPerson ; j++){
        nodeName = `headDetailun${countPerson-j}`;
        var item = document.querySelector('#'+ nodeName).childNodes[i+1].childNodes[1];
        item.textContent = Number(foodCostList[i])/countPerson ;
    }
    }
    //แก้รวมให้เริ่มต้นเป็น 0
    if (countPerson === 1){
        for (k = 0 ; k < countMenu ; k++){
            var item2 = document.querySelector('.sum').childNodes[k+3];
            item2.textContent = fixedFoodCostList[k] ;
        
    }
}
    }
    //sum of all menu
    for(l = 1 ; l <= countPerson ; l++){
        let eachDiv = document.querySelector(`#headDetailun${l}`);
        var sumEachList = [];
        for (m = 1 ; m <= countMenu ; m++){
            var sumEach =  Number(document.querySelector(`#headDetailun${1}`).childNodes[m].textContent);
            sumEachList.push(sumEach);
            var sumEachAll = sumEachList.reduce((acc,curr) => acc+curr , 0);
            //แก้ก่อนหน้า
            if (m === countMenu && l < countPerson){
                var b = document.querySelector(`#alignNoi${l}`);
                b.textContent = sumEachAll;
            }
            //อันล่าสุด
            if (m === countMenu && l=== countPerson){
                var a = document.createElement('ul');
                a.setAttribute('id',`alignNoi${l}`);
                a.setAttribute('class',`alignNoi`);
                a.textContent = sumEachAll;
                tr.appendChild(a);
            }
            }
        }
    //make sum to be always in right position
    if (uselessCount <= 0 ){
    tr.removeChild(document.querySelector('.special'));
    var a = document.createElement('ul');
    a.setAttribute('class',`special`);
    a.textContent = (fixedFoodCostList.reduce((acc,curr) => Number(acc)+Number(curr),0));
    tr.appendChild(a);
    uselessCount -= 1
}
    for(qi = 0 ; qi < countyoyo ; qi++){
        document.querySelectorAll('.yoyo')[qi].childNodes[0].checked = true;
    }
    inputs[2].value = '';
    }


function clicked(event){
    var status = event.target.checked;
    var z = event.target.parentNode.childNodes[1];
    var blockz = event.target.parentNode;
    var rowz = event.target.parentNode.parentNode;
    var initial = z.textContent;
    // console.log(z);
    // console.log(event.target.parentNode.parentNode);


    //checked case (true)------------------------------------------------------------------------------------
    //check position of clicked
    if (status){
        for (i = 0 ; i < countMenu ; i++){
            yposition += 1;
            blockz = blockz.nextSibling;
            if (blockz === null){
                realyposition = countMenu - yposition + 1;
                yposition = 0 ;
                break;
            }
    }
        for (i = 0 ; i < countPerson ; i++){
            xposition += 1;
            rowz = rowz.nextSibling;
            if (rowz === null){
                realxposition = countPerson - xposition + 1;
                xposition = 0;
                break;
            }
        }
        //check whether in the row has 0 value;
        //check left
        for (i = 0 ; i < realxposition-1 ; i++){
            if (Number(allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent) === 0){
                countZero += 1;
            }
        }
        //check right
        for (j = 0 ; j <= countPerson - realxposition ; j++){
            if (Number(allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent) === 0)
                countZero += 1;
            }
        var replaceVal = Number(sum.childNodes[realyposition+2].textContent) / (countPerson - countZero + 1);
        z.textContent = replaceVal;

        //append result (left)
        for (i = 0 ; i < realxposition-1 ; i++){
            if (Number(allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent) !== 0){
                allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent = replaceVal;
            }
        }
        //append result (right)
        for (j = 0 ; j <= countPerson - realxposition ; j++)
            if (Number(allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent) !== 0){

                allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent = replaceVal;
            }
        //append sum (right)
        for (m = 0 ; m < countPerson - realxposition +1; m++){
            var sumRoll = 0;
            for (n = 1 ; n <= countMenu ; n++){
                sumRoll += Number(allPerson.childNodes[realxposition+m].childNodes[n].childNodes[1].textContent);
                if (n === countMenu){
                    tr.childNodes[realxposition+3+m].textContent = sumRoll;        
                
            }
        }
        }
        //append sum (left)
        for (m = 0 ; m < realxposition ; m++){
            var sumRoll = 0;
            for (n = 1 ; n <= countMenu ; n++){
                sumRoll += Number(allPerson.childNodes[realxposition-m].childNodes[n].childNodes[1].textContent);
                if (n === countMenu){
                    tr.childNodes[realxposition+3-m].textContent = sumRoll;   
            }
        }
        }



    countZero = 0;    
    //unchecked case (false)---------------------------------------------------------------------------------
    //check position of clicked
    }else{
        z.textContent = 0;
        for (i = 0 ; i < countMenu ; i++){
            yposition += 1;
            blockz = blockz.nextSibling;
            if (blockz === null){
                realyposition = countMenu - yposition + 1;
                yposition = 0 ;
                break;
            }
    }
        for (i = 0 ; i < countPerson ; i++){
            xposition += 1;
            rowz = rowz.nextSibling;
            if (rowz === null){
                realxposition = countPerson - xposition + 1;
                xposition = 0;
                break;
            }
        }
        //check whether in the row has 0 value;
        //check left
        for (i = 0 ; i < realxposition-1 ; i++){
            if (Number(allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent) === 0){
                countZero += 1;
            }
        }
        //check right
        for (j = 0 ; j <= countPerson - realxposition ; j++){
            if (Number(allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent) === 0)
                countZero += 1;
            }
        //append result (left)
        for (i = 0 ; i < realxposition-1 ; i++){
            if (Number(allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent) !== 0){
                allPerson.childNodes[i+1].childNodes[realyposition].childNodes[1].textContent = Number(fixedFoodCostList[realyposition-1]/(countPerson -countZero));
            }
        }
        //append result (right)
        for (j = 0 ; j <= countPerson - realxposition ; j++)
            if (Number(allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent) !== 0){

                allPerson.childNodes[realxposition+j].childNodes[realyposition].childNodes[1].textContent = Number(fixedFoodCostList[realyposition-1]/(countPerson -countZero));
            }
        //append sum (right)
        for (m = 0 ; m < countPerson - realxposition +1; m++){
            var sumRoll = 0;
            for (n = 1 ; n <= countMenu ; n++){
                sumRoll += Number(allPerson.childNodes[realxposition+m].childNodes[n].childNodes[1].textContent);
                if (n === countMenu){
                    tr.childNodes[realxposition+3+m].textContent = sumRoll;        
                
            }
        }
        }
        //append sum (left)
        for (m = 0 ; m < realxposition ; m++){
            var sumRoll = 0;
            for (n = 1 ; n <= countMenu ; n++){
                sumRoll += Number(allPerson.childNodes[realxposition-m].childNodes[n].childNodes[1].textContent);
                if (n === countMenu){
                    tr.childNodes[realxposition+3-m].textContent = sumRoll;   
            }
        }
        }
        
        }
        

        //no one pay that menu
        if (countZero === countPerson){
            alert(`It's impossible that no one will pay this menu 


            Please choose one person to pay!!`);
        }
        countZero = 0;
}



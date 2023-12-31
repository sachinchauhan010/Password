const inputSlider=document.querySelector("[datalengthSlider]");
const inputNumber=document.querySelector("[datalengthNumber]");

const dataPassword=document.querySelector("[dataPasswordDisplay]");
const copyBtn=document.querySelector('#copyBtn');
const copyMsg=document.querySelector('#dataCopyMsg');

const upperCheck= document.querySelector("#upperCheck");
const lowerCheck= document.querySelector("#lowerCheck");
const numberCheck= document.querySelector("#numberCheck");
const symbolCheck= document.querySelector("#symbolCheck");

let strengthIndicator=document.querySelector(".strengthIndicator");
let generateBtn=document.querySelector("#genPass");

const allCheck=document.querySelectorAll("input[type=checkbox]");
let symbol=" !#$%&\'()*+,-./";


let password="";
let passwordLength=10;
let checkCount=0;




//sliderHandle
function sliderHandle(){
    inputSlider.value=passwordLength;
    inputNumber.innerHTML=passwordLength;
}

// set Indicator
function setIndicator(color){
    strengthIndicator.style.backgroundColor=color;
}

// gerneral function for generate the number
function getRdmInteger(min, max){
    return Math.floor(Math.random() * (max-min))+min;
}

//Number generator
function  generateRdmNumber(){
    return getRdmInteger(0,9);
}

// Lower case generator
function generateLowerCase(){
    return String.fromCharCode(getRdmInteger(97,123));
}

// Upper Case generator
function generateUpperCase(){
    return String.fromCharCode(getRdmInteger(65,91));
}

// Symbol generator
function generateSymbol(){
    const rdm=getRdmInteger(0,symbol.length);
    return symbol.charAt(rdm);
}

// Strength
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;


    if(upperCheck.checked){
        hasUpper=true;
    }
    if(lowerCheck.checked){
        hasLower=true;
    }
    if(numberCheck.checked){
        hasNumber=true;
    }
    if(symbolCheck.checked){
        hasSymbol=true;
    }

    if(hasLower && hasUpper && (hasNumber && hasSymbol) && passwordLength>=8){
        setIndicator("#00FF00");
    }else if(hasLower || hasUpper &&(hasNumber || hasSymbol) && passwordLength >=6){
        setIndicator("#FFFF00");
    }else{
        setIndicator("#0FF000");
    }
}


async function copyContent(){

    try{
        await navigator.clipboard.writeText(dataPassword.value);    
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    // copyMsg.classList.add("active");
    setTimeout(function(){
        // copyMsg.classList.remove("active");
    },2000);

}

//slider handle event
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    sliderHandle();
});


function sufflePassword(array){
    let i = array.length;
    while (--i > 0) {
       let temp = Math.floor(Math.random() * (i + 1));
       [array[temp], array[i]] = [array[i], array[temp]];
    }
    return array;
}



function handleChexkedBox(){
    checkCount=0;
    allCheck.forEach((checkbox)=>{
        
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        sliderHandle();
    }
}

allCheck.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleChexkedBox);
});


// Copy
copyBtn.addEventListener('click',()=>{
    if(dataPassword.value)  copyContent();
})

// Generate Password
generateBtn.addEventListener('click',()=>{

    console.log("Corrner case");
    if(checkCount<=0) return;
    console.log("Corrner case");

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        sliderHandle();
    }

    // make new Password
    password="";
    let funcArr=[];

    if(upperCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowerCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        funcArr.push(generateRdmNumber);
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

    //
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    // Additional
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let radmIndex=getRdmInteger(0,funcArr.length);

        console.log("Hello" +radmIndex);
        console.log(funcArr);
        password+=funcArr[radmIndex]();
        console.log("Done");
    }
    console.log("Additional Done");
    //Suffle Password
    console.log(password);
    // password=sufflePassword(Array.from(password));
    console.log(password);
    dataPassword.value=password;
    console.log(dataPassword.value);

    calcStrength();
})
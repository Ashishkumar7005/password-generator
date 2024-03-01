const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const eye = document.querySelector(".show-hide");

//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");

function passwordVisible(){
    eye.addEventListener("click",()=>{
        if(passwordDisplay.type=='password'){
        passwordDisplay.type = 'text';
        eye.innerText = "Hide";
        }
    else{
        passwordDisplay.type = 'password';
        eye.innerText = "Show";
    }
})} 

passwordVisible();


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}



generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});



























// const passwordDisplay = document.querySelector("[data-passwordDisplay]");
// const lengthDisplay = document.querySelector("[data-lengthNumber]");
// const copyMsg = document.querySelector("[data-copyMsg]");
// const lengthSlider = document.querySelector("[data-lengthSlider]");
// const uppercaseCheck = document.querySelector("#uppercase");
// const lowercaseCheck = document.querySelector("#lowercase");
// const numberCheck = document.querySelector("#numbers");
// const symbolCheck = document.querySelector("#symbols");
// const indicator = document.querySelector("[data-indicator]");
// const copyBtn = document.querySelector("[data-copy]");
// const generateBtn = document.querySelector(".generateButton");
// const allCheckBtn = document.querySelectorAll("input[type=checkbox]");

// console.log("started")

// let password = "";
// let passwordLength  = 10;
// let checkCount = 0;
// let symbols = "~!@#$%^&*(_)`{}[]|\"':;?/>.<,+-="

// handleSlider();
// function handleSlider(){
//     lengthSlider.value = passwordLength;
//     lengthDisplay.innerText = passwordLength;
// }

// function setIndicator(color){
//     indicator.style.backgroundColor = color;
//     //shadow
// }

// function generateRandom(min,max){
//    return Math.floor(Math.random() * (max-min)) + min ;
// }

// function generateRandomNumber(){
//    return generateRandom(0,9);
// }

// function generateLowercase(){
//     return String.fromCharCode(generateRandom(97,123));
//  }
 
// function generateUppercase(){
//     return String.fromCharCode(generateRandom(65,91));
//  }
 
// function generateSymbols(){
//     let index = generateRandom(0,symbols.length);
//      return symbols.charAt(index);
//  }

// function calcStrength(){
//     let nums = false;
//     let lower = false;
//     let upper = false;
//     let symb = false;

//     if(uppercaseCheck.checked) upper = true;
//     if(lowercaseCheck.checked) lower = true;
//     if(numberCheck.checked) nums = true;
//     if(symbolCheck.checked) symb = true;
    
//     if(upper && lower && (nums || symb) && passwordLength>=7){
//         setIndicator("#0f0");
//     }
//     else if(
//         (lower || upper) && (nums || symb) && passwordLength>=6
//         ){
//             setIndicator("#ff0");
//         }
//         else{
//             setIndicator("#f00");
//         }
// }


// async function copyContent(){
//     try{
//         await navigator.clipboard.writeText(passwordDisplay.value);
//         copyMsg.innerText = "Copied";
//     }
//     catch{
//           copyMsg.innerText = "Failed"
//     }

//     copyMsg.classList.add("active");

//     setTimeout(() => {
//         copyMsg.classList.remove("active");        
//     }, 2000);


// }

// lengthSlider.addEventListener('input',(e)=>{
//     passwordLength = e.target.value;
//     handleSlider();
// })

// copyBtn.addEventListener("click",()=>{
//     if(passwordDisplay.value){
//         copyContent();
//     }
// })

// allCheckBtn.forEach((checkBox) =>  {
//     checkBox.addEventListener("change", handleCheckBoxChange);
// });
// function handleCheckBoxChange(){
//     let checkCount = 0;
    
//     allCheckBtn.forEach(checkBox =>{
//         if(checkBox.checked){
//             checkCount++;
//         }
//     })

//     if(passwordLength < checkCount){
//         passwordLength= checkCount;
//         handleSlider();
//     }

// }



// function shufflePassword(password){
//     for(let i=password.length-1;i>0;i--){

//         const j = Math.floor(Math.random() * (i+1));
//         const temp = password[i];
//         password[i] = password[j];
//         password[j] = temp;
//     }
//     let str = "";
//     password.forEach((el)=> (str+=el));
//     return str;
// }

// generateBtn.addEventListener("click",()=>{
//     if(checkCount==0) return;

//     if(passwordLength < checkCount){
//         passwordLength = checkCount;
//         handleSlider();
//     }

//     password = "";

//     let funcArr = [];
//     if(uppercaseCheck.checked){
//         funcArr.push(generateUppercase);
//     }
//     if(lowercaseCheck.checked){
//         funcArr.push(generateLowercase);
//     }
//     if(numberCheck.checked){
//         funcArr.push(generateRandomNumber);
//     }
//     if(symbolCheck.checked){
//         funcArr.push(generateSymbols);
//     }

//     //compulsory addition
// console.log("adding compulsory");
//     for(let i=0; i<funcArr.length;i++){
//         password+=funcArr[i]();
//     }

//     //remaining

//     console.log("adding remaining");

//     for(let i=0;i<passwordLength-funcArr.length;i++){
//         let randIndex = generateRandom(0,funcArr.length);
//         password+= funcArr[randIndex]();
//     }


// console.log("shuffling");
//     shuffle = shufflePassword(Array.from(password));

//     console.log("display password");
//     passwordDisplay.value = password;
//     calcStrength();
    
// })
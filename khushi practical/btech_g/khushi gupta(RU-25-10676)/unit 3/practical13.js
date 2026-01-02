
function addNumbers(a, b) {
    return a + b;
}


function greetUser(name) {
    return "Hello, " + name + "!";
}


function scopeDemo() {
    var x = 10;      
    let y = 20;      
    const z = 30;    

    console.log("Inside function:");
    console.log("var x:", x);
    console.log("let y:", y);
    console.log("const z:", z);

    if (true) {
        var x = 50;     
        let y = 60;       
        const z = 70;    

        console.log("Inside block:");
        console.log("var x:", x);  
        console.log("let y:", y);  
        console.log("const z:", z);
    }

    console.log("Outside block:");
    console.log("var x:", x);  
    console.log("let y:", y);  
    console.log("const z:", z); 
}



console.log("Addition:", addNumbers(10, 5)); 
console.log(greetUser("Khushi Gupta"));      
scopeDemo();

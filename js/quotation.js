window.onload = function (){
    
let priceService = [business = 0, games = 0, web = 0];
let nameService = ["business", "videogame", "webpage"]
let serviceMultiplier = [1, 4, 2];

let totalPrice = 0;

let clientService = new Service(priceService, nameService);
let message = new PriceMessage(totalPrice);
console.log(clientService);




//Función encargada de dar mensajes a los usuarios
function PriceMessage(price) {
    this.price = price;
    let quotationPrice = document.getElementById("quotation");
    let priceText = document.getElementById("price");
    let contactMe = document.getElementById("contactMe");

    if (price === 0) {
        quotationPrice.setAttribute("class", "card-text");
        quotationPrice.innerHTML = "It looks like you don't want any service :(";
        // alert("It looks like you don't want any service :(");
    } else {
        quotationPrice.setAttribute("class", "card-text");
        quotationPrice.innerHTML = "Thanks for your time! Your estimated service quote is: ";
        priceText.innerText = "$ " + price;
        priceText.setAttribute("class", "card-text btn btn-danger btn-lg btn-block");
        priceText.setAttribute("style", "font-size: 15px;");
        // alert("Thanks for your time! Your estimated service quote is: $" + price);
    }

    contactMe.innerHTML = "If you have questions or doubts, feel free to contact me!";
    // alert("If you have questions or doubts, feel free to contact me!");

}

//Función encargada de calcular el precio del servicio
function Service() {
    let price = 0;
    // this.price = price;
    // this.name = name;       

    for (let i = 0; i < 3; i++) {
        let answer = prompt("Are you interested in a " + nameService[i] + " service? (Please answer with " +
            "´yes´ or ´no´").toLowerCase();

        while (answer !== "yes" && answer !== "no") {
            answer = prompt("That's not a valid option. Please answer with ´yes´ or ´no´");
        }

        if (answer === "yes") {
            Price();
        } else {
            price = 0;
        }

        function Price() {
            let servicePrice = 1000;
            let quality = parseInt(prompt("Could you rate the service quality of the " + nameService[i] + " you want, from 1 (standard service) to 5 (top quality service)?"));

            while (Number.isNaN(quality) || (quality > 5) || (quality <= 0)) {
                quality = parseInt(prompt("That's not a valid number. Please rate from 1 (standard service) to 5 (top quality service)"));
            }

            price = servicePrice * quality * serviceMultiplier[i];


        }

        priceService[i] = price;
        totalPrice += priceService[i];
    }
}
}

//---------------TESTING----------------







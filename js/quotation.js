let priceService = [business = 0, games = 0, web = 0];
let nameService = ["business", "videogame", "webpage"]
let serviceMultiplier = [1, 4, 2];

let totalPrice = 0;
    
window.onload = function () {
    Service();
}

//jQuery ".val" para "value" nativo


//Función encargada de dar mensajes a los usuarios
function PriceMessage(price) {
    this.price = price;
    let quotationPrice = document.getElementById("quotation");
    let priceText = document.getElementById("price");
    let contactMe = document.getElementById("contactMe");

    if (price === 0) {
        quotationPrice.setAttribute("class", "card-text"); //para agregar atributo es .attr("class", "card-text")
        quotationPrice.innerHTML = "It looks like you don't want any service :(";
        // alert("It looks like you don't want any service :(");
    } else {
        quotationPrice.setAttribute("class", "card-text");
        quotationPrice.innerHTML = "Thanks for your time! Your estimated service quote is: ";
        priceText.innerText = "$ " + price;
        priceText.setAttribute("class", "card-text btn btn-danger btn-lg btn-block");
        priceText.addEventListener("mouseover", changeColor);
        priceText.addEventListener("mouseout", changeColor);
        function changeColor(event){
            if (event.type === "mouseover") {
                this.style.background = 'black';
            }
            if (event.type === "mouseout") {
                this.style.background = "#DC3545";
            }
            
        }
        priceText.setAttribute("style", "font-size: 15px;");
        // alert("Thanks for your time! Your estimated service quote is: $" + price);
    }

    contactMe.innerHTML = "If you have questions or doubts, feel free to contact me!";
    // alert("If you have questions or doubts, feel free to contact me!");

}

//Función encargada de calcular el precio del servicio
    function Service() {
        let price = 0;
        let quality = 0;
        let i = 0;

        let controlSelect = document.getElementById("rateControlSelect");
        document.getElementById("yesAnswer").addEventListener("click", enabledRate);
        document.getElementById("noAnswer").addEventListener("click", disableRate);
        controlSelect.addEventListener("change", option);

        function option() {
            let optionSelected = controlSelect.options;
            let indexSelected = optionSelected.selectedIndex;
            quality = optionSelected.item(indexSelected).value;
            console.log(quality);            
        }


        function enabledRate() {
            document.getElementById("rateControlSelect").disabled = false;          
        }

        function disableRate() {
            document.getElementById("rateControlSelect").disabled = true;
            quality = 0;
        }
        
        
        document.getElementById("nextBtn").addEventListener("click", addedServices);

        function addedServices() {
            
            if (i <= 2) {
                
                document.getElementById("serviceToQuote").innerText = nameService[i+1];
                let servicePrice = 1000;
                price = servicePrice * quality * serviceMultiplier[i];
                console.log(price)


                priceService[i] = price;
                totalPrice += priceService[i];
                i++;  
            }            
            
            if (i === 3){
                document.getElementById("serviceToQuote").innerText = nameService[i-1];                
                document.getElementById("yesAnswer").disabled = true;
                document.getElementById("noAnswer").disabled = true;
                document.getElementById("rateControlSelect").disabled = false;
                document.getElementById("nextBtn").remove();

                new PriceMessage(totalPrice);

                userPrice();
            }            
        }
        
    }
    
    //Función para guardar datos del usuario y convertirlos a JSON
    
    document.getElementById("inputName").addEventListener("change", userName);
    document.getElementById("inputEmail").addEventListener("change", userEmail);    
    
    function userPrice(){
        
        let userPrice = {
            price : parseInt(totalPrice)
        }
        sessionStorage.setItem("price", userPrice.price);
        let jsonPrice = JSON.stringify(userPrice);
        console.log(jsonPrice);
    }
        
    
    function userName(){
        let nameField = {
            name : document.getElementById("inputName").value.toString().toLowerCase()            
        }       
        sessionStorage.setItem("name", nameField.name);
        let jsonName = JSON.stringify(nameField);
        console.log(jsonName);
    }
    
    function userEmail(){
        let mailField = {
            mail : document.getElementById("inputEmail").value.toString().toLowerCase()
        }        
        sessionStorage.setItem("mail", mailField.mail);
        let jsonEmail = JSON.stringify(mailField);
        console.log(jsonEmail);
    }
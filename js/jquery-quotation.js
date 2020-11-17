let totalServicePrice = [business = 0, games = 0, web = 0];
let nameService = ["Business", "Videogame", "Webpage"]

let servicePrice = [0, 0, 0];
let imageQuotation = $("#showCard");

let controlSelect = $("#rateControlSelect")
let yesAnswer = $("#yesAnswer");
let noAnswer = $("#noAnswer");
let errorMsg = $("#errorMessage");
let nextBtn = $("#nextBtn");

let totalPrice = 0;

imageQuotation.hide();
$(document).ready(Service());
getFunction();


//jQuery ".val" para "value" nativo



//Función encargada de dar mensajes a los usuarios
function PriceMessage(price) {
    this.price = price;
    var quotationPrice = $("#quotation");
    let priceText = $("#price")
    let contactMe = $("#contactMe");


    imageQuotation.fadeIn("slow", ShowQuotation);

    function ShowQuotation() {

        if (price === 0) {
            quotationPrice.fadeOut("slow", function () {
                quotationPrice.attr("class", "card-text");
                quotationPrice.text("It looks like you don't want any service :(");
                quotationPrice.fadeIn("slow");
            });

            contactMe.fadeOut("slow", function () {
                contactMe.fadeIn("slow");
                contactMe.text("If you have questions or doubts, feel free to contact me!");
            })

            imageQuotation.fadeIn("slow");

        } else {


            quotationPrice.fadeOut("slow", function () {
                quotationPrice.attr("class", "card-text");
                quotationPrice.html("Thanks for your time "+ inputName.val().toString() +"! Your estimated service quote is: ");
                quotationPrice.fadeIn("slow");
            });

            priceText.fadeOut("slow", function () {
                priceText.fadeIn("slow");
                priceText.text("$ " + price);
                priceText.attr("class", "card-text btn btn-danger btn-lg btn-block");
                priceText.attr("style", "font-size: 15px;");
                priceText.hover(function(){
                    $(this).css("background-color", "red");
                })
            })

            contactMe.fadeOut("slow", function () {
                contactMe.fadeIn("slow");
                contactMe.text("If you have questions or doubts, feel free to contact me!");
            })
        }

    }
    
 
}

//Función encargada de calcular el precio del servicio
function Service() {
    let price = 0;
    let quality;
    let i = 0;
        
    
    yesAnswer.click(enabledRate);
    noAnswer.click(disableRate);
   
    controlSelect.change(option);

    function option() {       
        quality = $("#rateControlSelect option:selected").val();        
        console.log(quality);
    }


    function enabledRate() {
        controlSelect.attr("disabled", false);        
    }

    function disableRate() {
        controlSelect.attr("disabled", true);
        quality = 0;
    }


    nextBtn.click(addedServices);    

    function addedServices() {
            
        inputName.attr("disabled", true)
        inputName.attr("class", "form-control")
        inputEmail.attr("disabled", true)
        inputEmail.attr("class", "form-control")
        errorMsg.text("If you made a typo, please refresh the page")
        errorMsg.css({"background-color": "darkred", "color": "white", 
            "border-radius": "15px", "padding": "12px","font-size": "10px", "font-style": "italic",
            "filter": "opacity(70%)"})

        if (i <= 2) {

            let colorService = [
                color1 = "background: #b4d0e9; border-radius: 15px",
                color2 = "background: white; border-radius: 15px"
            ]

            var serviceToQuote = $("#serviceToQuote")
            serviceToQuote.text(nameService[i + 1]);
            serviceToQuote.attr("style", colorService[i]);
            //let servicePrice = 1000;
            price = servicePrice[i] * quality; // * serviceMultiplier[i]
            console.log(price)


            totalServicePrice[i] = price;
            totalPrice += totalServicePrice[i];
            i++;
        }

        if (i === 3){
            //Name of the last service
            serviceToQuote.text(nameService[i-1]);   
            
            //Disable buttons and radio
            noAnswer.attr("disabled", true)            
            yesAnswer.attr("disabled", true)            
            controlSelect.attr("disabled", true)            
            nextBtn.hide();            

            //Setting price
            new PriceMessage(totalPrice);

            userPrice();
        }
    }

}

//Función para guardar datos del usuario y convertirlos a JSON

let inputName = $("#inputName")
let inputEmail = $("#inputEmail")
let jsonName;


inputName.attr("placeholder", "Please, fill this information in to continue")
inputEmail.attr("placeholder", "Please, fill this one in, too :)")



inputName.change(nameValidate)
inputEmail.change(emailValidate)

yesAnswer.attr("disabled", true);
noAnswer.attr("disabled", true);

nextBtn.attr("disabled", true);
nextBtn.attr("style", "background: gray")

function nameValidate() {

    if(inputName.val().toString() !== "") {        
        inputName.change(userName);
        inputEmail.attr("disabled", false);
        inputEmail.attr("class", "form-control is-invalid")
    } else{
        inputEmail.attr("disabled", true);
    }

    function userName(){
        let nameField = {
            name : inputName.val().toString().toLowerCase()
        }
        console.log(nameField.name)
        sessionStorage.setItem("name", nameField.name);
        jsonName = JSON.stringify(nameField);
        console.log(jsonName);
    }
}

function emailValidate(){
    
    // console.log(inputEmail.attr("required"))
    if(inputEmail.val().toString() !== "" && inputEmail.val().toString().includes("@")
        && inputEmail.val().toString().includes(".com")){
        yesAnswer.attr("disabled", false);
        noAnswer.attr("disabled", false);
        nextBtn.attr("disabled", false)
        nextBtn.attr("style", "background: #007bff")
        errorMsg.text("")
        
        inputEmail.change(userEmail);
    } else {
        yesAnswer.attr("disabled", true);
        noAnswer.attr("disabled", true);
        nextBtn.attr("disabled", true);
        errorMsg.text("Please enter a valid email address")
        errorMsg.css({"color": "red", "padding": "0","font-size": "12px", "font-style": "italic",
            "filter": "opacity(70%)"})
    }
    
    


    function userEmail(){
        let mailField = {
            mail : inputEmail.val().toString().toLowerCase()
        }
        sessionStorage.setItem("mail", mailField.mail);
        var jsonEmail = JSON.stringify(mailField);
        console.log(jsonEmail);

    }
}


function userPrice(){

    let userPrice = {
        price : parseInt(totalPrice)
    }
    sessionStorage.setItem("price", userPrice.price);
    let jsonPrice = JSON.stringify(userPrice);
    console.log(jsonPrice);
}



//USING AJAX

function getFunction(){
    $.ajax({
        url: "./ajax-prices.json",
        type: "GET",
        dataType: "json",

    }).done(function(resultadoJson){
        
        for(let i = 0; i < resultadoJson.servicios.length; i++) {
            servicePrice[i] = resultadoJson.servicios[i].precio;
            console.log(servicePrice[i])
        }
        
        console.log("Get prices successful")
        
    }).fail(function (xhr, status, error){
        console.log("Get prices failed")
        
        console.log(xhr);
        console.log(status);
        console.log(error);
    })

}



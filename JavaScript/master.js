let inputs = document.querySelectorAll("input[type=text]")
let cardHolderName = document.querySelector(".cardholder-name")
let theCardNumber = document.querySelector(".card-number")
let mm = document.querySelector(".mm")
let yy = document.querySelector(".yy")
let cvc = document.querySelector(".cvc")
let confirmBtn = document.querySelector("input[type=submit]")

let array = []

theCardNumber.oninput = (e) => {
    let cardRegExp = /.{1,4}/ig 
/*     if (e.target.value.match(cardRegExp) === null) {
        e.target.value = ""                                     Numbers Input Only Solution
    } else {
    } */
    let cardNumber = e.target.value.split(" ").join("")
    cardNumber = cardNumber.match(cardRegExp).join(" ")
    e.target.value = cardNumber
    e.target.value.length === 19 ? mm.focus() : ""
}

mm.oninput = (e) => {
        e.target.value = e.target.value.match(/\d+/ig)
        if (e.target.value.length === 1 && e.target.value > 1) {
            e.target.value = `0${e.target.value}`
        }
        if (e.target.value === "00") {
            e.target.value = "01"
        } 
        else if (e.target.value > 12) {
            e.target.value = "12"
        }
        e.target.value.length === 2 ? yy.focus() : ""
    }
yy.oninput = (e) => {
    e.target.value = e.target.value.match(/\d+/ig)
    e.target.value.length === 2 ? cvc.focus() : ""
}
cvc.oninput = (e) => {
    e.target.value = e.target.value.match(/\d+/ig)
    e.target.value.length === 3 ? confirmBtn.focus() : ""
}




confirmBtn.addEventListener("click" , (e) => {
    inputs.forEach(input => {
        if (input.value === "") {
            e.preventDefault()
            input.classList.add("red")
            document.querySelector(`label[${input.getAttribute("data-name")}]`).classList.add("empty")
        } else {
            input.classList.remove("red")
            document.querySelector(`label[${input.getAttribute("data-name")}]`).classList.remove("empty")

            if (yy.value.length === 2 || yy.value.length === 1) {
                if (+yy.value <= +new Date().getFullYear().toString().substring(2)) {
                    yy.classList.add("red")
                    document.querySelector(`label[${mm.getAttribute("data-name")}]`).classList.add("empty")
                } else {
                    document.querySelector(`label[${mm.getAttribute("data-name")}]`).classList.add("empty")
                    if (mm.value !== "" && yy.value !== "") {
                        document.querySelector(`label[${mm.getAttribute("data-name")}]`).classList.remove("empty")
                    }
                }
            }
            if (theCardNumber.value.split(" ").join("").match(/\d{16}/ig) === null) {
                e.preventDefault()
                theCardNumber.classList.add("red")
                theCardNumber.previousElementSibling.classList.add("format")
            }
            else {
                theCardNumber.classList.remove("red")
                theCardNumber.previousElementSibling.classList.remove("format")
            }
            if (cvc.value.length < 3) {
                e.preventDefault()
                cvc.classList.add("red")
                document.querySelector(`label[${cvc.getAttribute("data-name")}]`).classList.add("empty")
            }
        }
        array.push(input.value)
    })

    e.preventDefault()
    localStorage.setItem("info" , array)
    array[0] !== "" ? document.querySelector(".card-name").innerHTML = array[0] : ""
    array[1] !== "" ? document.querySelector(".card-num").innerHTML = array[1] : ""
    if (array[2] !== "" && array[3] !== "") {
        document.querySelector(".exp-date").innerHTML = `${array[2]}/${array[3]}`
    } else if (array[2] !== "") {
        document.querySelector(".exp-date").innerHTML = `${array[2]}/00`
    } else array[3] !== "" ? document.querySelector(".exp-date").innerHTML = `00/${array[3]}` : ""
    array[4] !== "" ? document.querySelector(".cvc-number").innerHTML = array[4] : ""

    if (!cardHolderName.classList.contains("red") &&
    !theCardNumber.classList.contains("red") && 
    !mm.classList.contains("red") && 
    !yy.classList.contains("red") && 
    !cvc.classList.contains("red")) {
        document.querySelector("form").classList.add("hide")
        document.querySelector(".confirmation").classList.add("show")
    }

    array = []
})

if (localStorage.getItem("info")) {
    let newArray = localStorage.getItem("info").split(",")
    newArray[0] !== "" ? document.querySelector(".card-name").innerHTML = newArray[0] : ""
    newArray[1] !== "" ? document.querySelector(".card-num").innerHTML = newArray[1] : ""
    if (newArray[2] !== "" && newArray[3] !== "") {
        document.querySelector(".exp-date").innerHTML = `${newArray[2]}/${newArray[3]}`
    } else if (newArray[2] !== "") {
        document.querySelector(".exp-date").innerHTML = `${newArray[2]}/00`
    } else newArray[3] !== "" ? document.querySelector(".exp-date").innerHTML = `00/${newArray[3]}` : ""
    newArray[4] !== "" ? document.querySelector(".cvc-number").innerHTML = newArray[4] : ""

    cardHolderName.value = newArray[0]
    theCardNumber.value = newArray[1]
    mm.value = newArray[2]
    yy.value = newArray[3]
    cvc.value = newArray[4]
}

document.querySelector(".continue-btn").onclick = (e) => {
    e.target.parentElement.classList.remove("show")
    document.querySelector("form").classList.remove("hide")
}
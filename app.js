

function showdata() {
  var mark="";
  fetch('products.JSON')   
  .then((res)=>res.json())
  .then(comp=>{
    console.log(comp);
    for (var key in comp) {
   mark+=`
  <div class="card  col-md-3 mb-2"onclick='detail("${comp[key].title}","${comp[key].description}","${comp[key].image}","${comp[key].price}","${comp[key].category}")'>
  <img src="${comp[key].image}" width="100%" height="180px" alt="">
  <button class="btn btn-warning position-absolute ms-2" style="color:#002f34;margin-top: 130px;font-size:12px;">Futured</button>
  <div class="content">
    <p id='name' class="fw-bold p-2">${comp[key].title}</p>
    <p class="fw-bold p-2" style="color:#002f34;">${comp[key].price}</p>
  </div>
  </div>
  `
  }
  var existingData = localStorage.getItem("Products");
  var json=JSON.parse(existingData)
  var mark1="";
  for(var i in json){
    mark1+=`
    <div class="card col-md-3 mb-2" onclick='detail("${json[i].name}","${json[i].des}","${json[i].img}","${json[i].cost}","${json[i].brand}")'>
    <img src="${json[i].img}" width="100%" height="180px" alt="">
    <button class="btn btn-warning position-absolute ms-2" style="color:#002f34;margin-top: 130px;font-size:12px;">Futured</button>
    <div class="content">
    <p id='name' class="fw-bold p-2">${json[i].name}</p>
    <p class="fw-bold p-2" style="color:#002f34;">${json[i].cost}</p>
    </div>
    </div>
    `
  }
  document.getElementById("card").innerHTML=mark1+mark;
}
)
}

function detail(name,description,image,price,brand) {
var product={
name:name,
des:description,
img:image,
cost:price,
brand:brand,
}
var json=JSON.stringify(product)
localStorage.setItem("detail",json)
  window.location.href="detail.html";
}

showdata();
function showlogin(){
  var div=document.getElementById("login_div");
  div.style.display="grid"
}

function signup() {
  var time=moment().format("MMMM  YYYY");
  let prev = localStorage.getItem("users");
  let userData = prev ? JSON.parse(prev) : [];
  var name = document.getElementById("name1").value;
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password").value;
  console.log(name+email+password);
  var flag = false;

  // Check if email already exists
  for (let i = 0; i < userData.length; i++) {
    if (email === userData[i].email) {
      flag = true;
      break;
    }
  }

  // If email already exists, show alert
  if (flag) {
    alert("Duplicate data is not allowed.");
    return;
  }

  // Validate if name, email, and password are not empty
  if (name && email && password) {
    var user = {
      name: name,
      email: email,
      password: password,
      create:time,
      authen: true,
    };

    userData.push(user);
    let stringifiedData = JSON.stringify(userData);
    localStorage.setItem("users", stringifiedData);


    // Clear the input fields after successful signup
    document.getElementById("name").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login_div").style.display="grid";
    document.getElementById("signup_div").style.display="none";
 
  } else {
    alert("Please fill in all the fields.");
  }
}




function login() {
  var flag=false;
    var email=document.getElementById("email");
    var isauthen=localStorage.getItem("authenticate");
    if (email.value!=="") {
var userrec=localStorage.getItem("users")
 var json=JSON.parse(userrec)
for(var i=0;i<json.length;i++){
if (email.value==json[i].email) {
  document.getElementById("login_div").style.display="none"
  alert("Login Successfully");
  localStorage.setItem("email",json[i].email);
    localStorage.setItem("authenticate",json[i].authen);
    flag=true;
    localStorage.setItem("detail_name",JSON.stringify(json[i].name))
    localStorage.setItem("create",JSON.stringify(json[i].create))
    window.location.reload()
}
}
if (flag==false) {
    alert("Enter Valid Details")
    
}

    }
else{

email.style.border="1px solid red";


}}

function shownav() {
  
  var gt=localStorage.getItem("users")
  var email=localStorage.getItem("email")
  var isauthen=localStorage.getItem("authenticate");
  var jso=JSON.parse(gt)
for(var i=0;i<jso.length;i++){
if (email===jso[i].email&&isauthen=="true") {

  document.getElementById("user").style.display="inline";
  document.getElementById("log").style.display="none";
  document.getElementById("logout").style.display="inline";
}}

}
shownav()

function logout() {
  var confirmed = confirm("Are you sure you want to log out?");

  if (confirmed) {
    // Perform logout action
    var authe=false
    
    localStorage.setItem("authenticate",authe)
    window.location.reload()
    document.getElementById("logout").style.display = "none";
  }
}

function sel() {
    var flag = false;
    var gt = localStorage.getItem("users");
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("password");
    var isauthen = localStorage.getItem("authenticate");
    var jso = JSON.parse(gt);
  
    for (var i = 0; i < jso.length; i++) {
      if (email === jso[i].email && password === jso[i].password && isauthen === "true") {
        flag = true;
        document.getElementById("log").innerText = jso[i].name;
        window.location.href = "sel.html";
        break; // Add a break statement to exit the loop once a match is found
      }
    }
  
    if (flag === false) {
      document.getElementById("login_div").style.display="grid";
    }
  }
  
  function sel() {
    var flag = false;
    var gt = localStorage.getItem("users");
    var email = localStorage.getItem("email");
    
    var isauthen = localStorage.getItem("authenticate");
    
    // Check if local storage data exists
    if (gt) {
      var jso = JSON.parse(gt);
  
      for (var i = 0; i < jso.length; i++) {
        if (email == jso[i].email&& isauthen == "true") {
          flag = true;
          document.getElementById("log").innerText = jso[i].name;
          window.location.href = "sel.html";
          break; // Add a break statement to exit the loop once a match is found
        }
      }
    }
  
    if (flag === false) {
      document.getElementById("login_div").style.display="grid";
    }
  }
  

function sellnow() {
  var existingData = localStorage.getItem("Products");
  var arr = existingData ? JSON.parse(existingData) : [];

  var name = document.getElementById("name");
  var des = document.getElementById("des");
  var loc = document.getElementById("loc");
  var img = document.getElementById("img");
  var cost = document.getElementById("price");
  var brand = document.getElementById("brand");
if (name.value!==""&&des.value!==""&&loc.value!==""&&img.value!==""&&cost.value!==""&&brand.value!==""){
    
    var product = {
        name: name.value,
    des: des.value,
    loc: loc.value,
    img: img.value,
    cost: cost.value,
    brand: brand.value
};

arr.push(product);

var json = JSON.stringify(arr);
localStorage.setItem("Products", json);
window.location.href="index.html"
}
else{
name.style.border="2px solid red"
des.style.border="2px solid red"
loc.style.border="2px solid red"
img.style.border="2px solid red"
cost.style.border="2px solid red"
brand.style.border="2px solid red"

}
}

function cls() {

  document.getElementById("login_div").style.display="none"
}
function regcls(){

  document.getElementById("signup_div").style.display="none"
}
function reg() {
  document.getElementById("login_div").style.display="none";
document.getElementById("signup_div").style.display="grid";


}
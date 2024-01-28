$(".fa-bars").click(toggleNav);
let page = "search"
launch()


$(".options ul li").click(async (e) => {
  toggleNav();
  page = e.target.attributes.to.nodeValue;
  console.log(page);
  launch();
});
async function launch(){
  if (page == "categories") {
    showPage("loading");
    let result;
    console.log("fetching categories");
    result = await fetchData("categories", "", "");
    displayCategories(result, page);
    $("#categories .meal-card").click(async (e) => {
      showPage("loading");
      let category = e.target.attributes.dataTarget.nodeValue;
      console.log(category);
      result = await fetchData("filter", "c", category);
      displayMeals(result, page);
    });
  } else if (page == "search") {
    showPage(page);
    let searchKeyword = '';
      console.log('fetching with no keyword on startup');
  $("#searchLoading").removeClass("display");
  $("#searchLoading").addClass("active");


      result = await fetchData("search", "s", searchKeyword);
      displayMeals(result, page);


    $("#searchInput").keyup(async () => {
      let searchKeyword = $("#searchInput").val();
      console.log("searching" + searchKeyword);
      $("#searchLoading").removeClass("display");
      $("#searchLoading").addClass("active");
      result = await fetchData("search", "s", searchKeyword);
      displayMeals(result, page);
    });
    $("#letterSearchInput").keyup(async () => {
      let searchKeyword = $("#letterSearchInput").val();
      console.log("searching letter");
      $("#searchLoading").removeClass("display");
      $("#searchLoading").addClass("active");
      result = await fetchData("search", "f", searchKeyword);
      displayMeals(result, page);
    });
  } else if (page == "area") {
    showPage("loading");
    let result;
    showPage("loading");
    result = await fetchData("list", "a", "list");
    displayAreas(result, page);
    $("#area .meal-card").click(async (e) => {
      showPage("loading");
      let area = e.target.attributes.dataTarget.nodeValue;
      console.log(area);
      result = await fetchData("filter", "a", area);
      displayMeals(result, page);
    });
  } else if (page == "ingredients") {
    showPage("loading");
    let result;
    showPage("loading");
    result = await fetchData("list", "i", "list");
    displayIngredients(result, page);
    $("#ingredients .meal-card").click(async (e) => {
      showPage("loading");
      let ingredient = e.target.attributes.dataTarget.nodeValue;
      console.log(ingredient);
      result = await fetchData("filter", "i", ingredient);
      displayMeals(result, page);
    });
  } else if (page == "contact") {
    showPage("loading");
    showPage(page);
    let nameRegex = /^[a-z A-Z]{2,25}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^01[0-9]{9}$/;
    let ageRegex = /^[0-9]{1,2}$/;
    let passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/;

    $('#nameInput').keyup(()=>{
        if(nameRegex.test($('#nameInput').val())){
            $('#nameError').text('')
        }else{
            $('#nameError').text('Invalid Name Format (Accepts only letters and spaces 2->25 characters)')
        }
    })
    $('#emailInput').keyup(()=>{
        if(emailRegex.test($('#emailInput').val())){
            $('#emailError').text('')
        }else{
            $('#emailError').text('Invalid Email Format')
        }
    })
    $('#phoneInput').keyup(()=>{
        if(phoneRegex.test($('#phoneInput').val())){
            $('#phoneError').text('')
        }else{
            $('#phoneError').text('Invalid Phone Number Format (Accepts only phone numbers starting "01" and are 11 numbers long')
        }
    })
    $('#ageInput').keyup(()=>{
        if(ageRegex.test($('#ageInput').val())){
            if ($('#ageInput').val()>15){
                $('#ageError').text('')
            }else{
                $('#ageError').text('You must be at least 15 years old')
            }
        }else{
            $('#ageError').text('Invalid Age (Accepts 15->99)')
        }
    })
    $('#passwordInput').keyup(()=>{
        if(passwordRegex.test($('#passwordInput').val())){
            $('#passwordError').text('')
        }else{
            $('#passwordError').text('Password must at least have one letter and one number and at least 8 characters')
        }
    })
    $('#passwordConfirmInput').keyup(()=>{
        if($('#passwordConfirmInput').val()===$('#passwordInput').val()){
            $('#passwordConfirmError').text('')
        }else{
            $('#passwordConfirmError').text('Both inputs must match')
        }
    })
    $('#contact').keyup(()=>{
        if(nameRegex.test($('#nameInput').val())&&emailRegex.test($('#emailInput').val())&&phoneRegex.test($('#phoneInput').val())&&ageRegex.test($('#ageInput').val())&&passwordRegex.test($('#passwordInput').val())&&$('#passwordConfirmInput').val()===$('#passwordInput').val()){
            $('#contactSubmitBtn').removeAttr('disabled')
        }else{
            $('#contactSubmitBtn').attr('disabled','disabled') 
        }
    })

  } else {
    showPage("loading");
    let result;
    console.log("no such page");
  }
}
//used to end here
function displayMeals(result, page) {
  let cols = "";
  if(result.meals.length>20){
    result.meals.length = 20
  }
  for (let i = 0; i < result.meals.length; i++) {
    cols += `<div dataTarget ='${result.meals[i].idMeal}' class='meal-card col-md-3 p-3'>
    <img dataTarget ='${result.meals[i].idMeal}' class="meal-pic w-100" src='${result.meals[i].strMealThumb}'>
        <span dataTarget ='${result.meals[i].idMeal}'> ${result.meals[i].strMeal}</span>
        </div>`;
  }
  showPage(page);
  if (page == "search") {
    $(".active #searchDataDisplay").html(cols);
  } else {
    $(".active").html(cols);
  }
  $(`#${page} .meal-card`).click(async (e) => {
    showPage("loading");
    let recipe = e.target.attributes.dataTarget.nodeValue;
    console.log(recipe);
    result = await fetchData("lookup", "i", recipe);
    // console.log(result)
    displayRecipe(result);
  });
}
function displayCategories(result, page) {
  let cols = "";
  for (let i = 0; i < result.categories.length; i++) {
    cols += `<div dataTarget ='${result.categories[i].strCategory}' class='meal-card col-md-4 p-3'>
        <img dataTarget ='${result.categories[i].strCategory}' class="meal-pic w-100" src='${result.categories[i].strCategoryThumb}'>
        <span dataTarget ='${result.categories[i].strCategory}'>${result.categories[i].strCategory}</span>
        </div>`;
  }
  showPage(page);
  $(".active").html(cols);
}
function displayAreas(result, page) {
  let cols = "";
  for (let i = 0; i < result.meals.length; i++) {
    cols += `<div DataTarget ='${result.meals[i].strArea}' class='meal-card col-md-2 p-2'>
        <i DataTarget ='${result.meals[i].strArea}' class="fa-regular fa-flag"></i>
        <span DataTarget ='${result.meals[i].strArea}'>${result.meals[i].strArea}</span>
        </div>`;
  }
  showPage(page);
  $(".active").html(cols);
}
function displayIngredients(result, page) {
  let cols = "";
  for (let i = 0; i < result.meals.length; i++) {
    cols += `<div dataTarget ='${result.meals[i].strIngredient}' class='meal-card col-md-3'>
        <i dataTarget ='${result.meals[i].strIngredient}' class="fa-solid fa-pepper-hot"></i>
        <span dataTarget ='${result.meals[i].strIngredient}'>${result.meals[i].strIngredient}</span>
        </div>`;
  }
  showPage(page);
  $(".active").html(cols);
}

function toggleNav() {
  $("nav").toggleClass("open");
  $(".options").slideToggle(1000);
}
function showPage(page) {
  $(".active").removeClass("active").addClass("display");
  $("#" + page).removeClass("display");
  $("#" + page).addClass("active");
}

async function fetchData(type = "search", action = "s", keyword = "") {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${type}.php${
      "?" + action + "="
    }${keyword}`
  );
  var finalResponse = await response.json();
  console.log(finalResponse);
  return finalResponse;
}

function displayRecipe(result) {
  let details = result.meals[0];
  cols = `<div class='row'>
  <div class='col-md-3'><img class='w-100' src='${details.strMealThumb}'></img></div>
   <div class='col-md-9'>
        <p class='text-start'>
        Meal Name:${details.strMeal}<br>
        Area: ${details.strArea}<br>
        Category: ${details.strCategory} <br>
        Ingredients: 
                ${details.strIngredient1} 
                ${details.strIngredient2} 
                ${details.strIngredient3} 
                ${details.strIngredient4}  
                ${details.strIngredient5} 
                ${details.strIngredient6} 
                ${details.strIngredient7} 
                ${details.strIngredient8}  
                ${details.strIngredient9} 
                ${details.strIngredient10} 
                ${details.strIngredient11} 
                ${details.strIngredient12}  
                ${details.strIngredient13} 
                ${details.strIngredient14} 
                ${details.strIngredient15} 
                ${details.strIngredient16}  
                ${details.strIngredient17} 
                ${details.strIngredient18} 
                ${details.strIngredient19} 
                ${details.strIngredient20} 
        <br>
        Instructions: ${details.strInstructions}<br>
        <a class='btn btn-warning' href='${details.strSource}'>Source </a>
        <a class='btn btn-warning' href='${details.strYoutube}'> Youtube</a>
        </p>
    </div> `;
  showPage("mealDetails");
  $(".active").html(cols);
}

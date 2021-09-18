const inputField = () => {
    const inputElement = document.getElementById('input-field');
    const input = inputElement.value;
    inputElement.value = ' ';
    const error= document.getElementById('error');
    if(input.value == ''){        
        error.innerHTML=`<h1>Please Search food By name</h1>`
    }
    else{
        //data load
        error.innerHTML='';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayFoodItem(data.meals));
        
    }
    
}


const displayFoodItem = melas => {
    const displayField = document.getElementById('search-result');
    displayField.innerHTML='';
    console.log(melas);

    melas.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" onclick="mealDetails(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
        </div>
        `;
        displayField.appendChild(div);
    })
}

const mealDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displatMealDetails(data.meals))
}
const displatMealDetails = (meal) => {
    const food = meal[0];
    const mealDetais = document.getElementById('melaDetails');
    mealDetais.textContent='';
    const div = document.createElement('div');
    div.classList.add('row');
    div.classList.add('g-0');
    div.innerHTML = `
        <div class="col-md-4">
          <img src="${food.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
    <div class="col-md-8">
        <div class="card-body">
           <h5 class="card-title">${food.strMeal}</h5>
           <p class="card-text"><small class="text-muted">${food.strArea}</small></p>
           <p class="card-text">${food.strInstructions}</p>
           <a href="${food.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
     </div>
    `
    mealDetais.appendChild(div);

}
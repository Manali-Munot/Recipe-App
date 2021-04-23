"use strict";
fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=28226ed687644380aff2572ec129c93d&?query=recipe')
    .then(function (response) {
    return response.json();
})
    .then(function (myJson) {
    var _loop_1 = function (int) {
        var recipename = " ";
        recipename = myJson.results[int].title;
        var ul = document.querySelector('.mylist');
        var li = document.createElement('li');
        var h4 = document.createElement('h4');
        h4.innerText = recipename;
        li.append(h4);
        h4.addEventListener("click", function () {
            disprecipe(myJson.results[int].id, recipename);
        });
        ul.append(li);
        console.log(recipename);
    };
    for (var int = 0; int < myJson.results.length; int++) {
        _loop_1(int);
    }
})
    .catch(function (error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
});
function disprecipe(recievedid, recipename) {
    var ingredientslist = " ";
    var recipeimage;
    var recipesteps = [];
    var recipestepsstring = " ";
    var x = recievedid;
    console.log(recipename);
    console.log(x);
    var url = 'https://api.spoonacular.com/recipes/' + x + '/information?apiKey=28226ed687644380aff2572ec129c93d&?includeNutrition=false';
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (ujson) {
        for (var i = 0; i < ujson.analyzedInstructions.length; i++)
            for (var j = 0; j < ujson.analyzedInstructions[i].steps.length; j++) {
                recipesteps.push(ujson.analyzedInstructions[i].steps[j].step);
                for (var k = 0; k < ujson.analyzedInstructions[i].steps[j].ingredients.length; k++)
                    ingredientslist = ingredientslist + ujson.analyzedInstructions[i].steps[j].ingredients[k].name + ",";
            }
        console.log("Ingredients : " + ingredientslist);
        recipeimage = ujson.image;
        var imgtag = document.getElementById("recipeimg");
        imgtag.src = recipeimage;
        console.log(recipeimage);
        for (var stepno = 0; stepno < recipesteps.length; stepno++) {
            console.log(stepno + ") " + recipesteps[stepno]);
        }
        var append1 = document.getElementById("recipename");
        append1.innerText = recipename;
        var append2 = document.getElementById("ingredients");
        append2.innerText = "Ingredients : " + '\n' + ingredientslist;
        var append3 = document.getElementById("recipesteps");
        for (var stepno = 0; stepno < recipesteps.length; stepno++) {
            recipestepsstring = recipestepsstring + '\n' + stepno + ") " + recipesteps[stepno];
        }
        append3.innerText = "Recipe Steps" + '\n' + recipestepsstring;
    })
        .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
}

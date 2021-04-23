fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=28226ed687644380aff2572ec129c93d&?query=recipe')
  .then(function(response) {
  return response.json();
})
.then(function(myJson) {
  
    for(let int=0;int<myJson.results.length;int++)
    {
      let recipename=" ";
      recipename=myJson.results[int].title;
      const ul = document.querySelector('.mylist') as HTMLUListElement;
      const li=document.createElement('li');
      const h4 = document.createElement('h4');
      h4.innerText=recipename;
      li.append(h4);
      h4.addEventListener("click", function() {
        disprecipe(myJson.results[int].id,recipename);
      });
      ul.append(li);
     
      console.log(recipename);
  }
})
.catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});


function disprecipe(recievedid: number,recipename:string)
{
      let ingredientslist=" ";
      let recipeimage;
      let recipesteps:string[] = [];
      let recipestepsstring:string=" ";
      let x=recievedid;
      console.log(recipename);
      console.log(x);
      let url='https://api.spoonacular.com/recipes/'+x+'/information?apiKey=28226ed687644380aff2572ec129c93d&?includeNutrition=false';
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(ujson) { 
         
         for(let i=0;i<ujson.analyzedInstructions.length;i++)
         for(let j=0;j<ujson.analyzedInstructions[i].steps.length;j++)
         {
           recipesteps.push(ujson.analyzedInstructions[i].steps[j].step);
            for(let k=0;k<ujson.analyzedInstructions[i].steps[j].ingredients.length;k++)
               ingredientslist=ingredientslist+ujson.analyzedInstructions[i].steps[j].ingredients[k].name+",";
         }
          console.log("Ingredients : "+ingredientslist);
          recipeimage=ujson.image;
          let imgtag=document.getElementById("recipeimg") as HTMLImageElement;
          imgtag.src = recipeimage;
          console.log(recipeimage);

          for(let stepno=0;stepno<recipesteps.length;stepno++)
          {
            console.log(stepno+") "+recipesteps[stepno])
          }
          let append1:HTMLParagraphElement = document.getElementById("recipename") as HTMLParagraphElement;
            append1.innerText = recipename;
            let append2:HTMLParagraphElement = document.getElementById("ingredients") as HTMLParagraphElement;
            append2.innerText = "Ingredients : "+'\n'+ ingredientslist;
            let append3:HTMLParagraphElement = document.getElementById("recipesteps") as HTMLParagraphElement;
            for(let stepno=0;stepno<recipesteps.length;stepno++)
          {
            recipestepsstring=recipestepsstring+'\n'+stepno+") "+recipesteps[stepno]; 
          }
            append3.innerText ="Recipe Steps"+'\n'+recipestepsstring;
           
      })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    })
  }
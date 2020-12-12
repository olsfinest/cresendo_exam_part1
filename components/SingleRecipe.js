import axios from 'axios';
import React from 'react';
import Link from 'next/link'

class SingleRecipe extends React.Component {

    state = {
        recipe : [],
        recipes : [],
        specials : [],
        parameter : null,
        isLoaded : false,
        isLoaded1 : false,
        isLoaded2 : false
        
    }

    componentDidMount() {

        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        const uuid = getUrlParameter('uuid');

        axios.get( process.env.JSONURL + "/recipes/" + uuid)
        .then(res => this.setState({
            recipe : res.data ,
            parameter : uuid ,
            isLoaded : true,
           
        }))
        .catch(err => console.log(err));


        axios.get( process.env.JSONURL + "/recipes/")
        .then(res => this.setState({
            recipes : res.data ,
            parameter : uuid ,
            isLoaded1 : true,
           
        }))
        .catch(err => console.log(err));


        axios.get( process.env.JSONURL + "/specials/")
        .then(res => this.setState({
            specials : res.data ,
            parameter : uuid ,
            isLoaded2 : true,
           
        }))
        .catch(err => console.log(err));

    }

   
    render() {

        // console.log(uuid);

        const isLoaded = this.state.isLoaded;
        const isLoaded1 = this.state.isLoaded1;
        const isLoaded2 = this.state.isLoaded2;
        const recipe = this.state.recipe;
        const recipes = this.state.recipes;
        const specials = this.state.specials;
        const ingredients = this.state.recipe.ingredients;
        const parameter = this.state.parameter;
      
        if(isLoaded == true && isLoaded1 == true && isLoaded2 == true) {

            var j;
            var h;
            var ingredientsdata = [];
         

            // console.log(ingredients);

            for (j = 0; j < ingredients.length; j++) {

  

                for (h = 0; h < specials.length; h++) {

                    if(specials[h].ingredientId == ingredients[j].uuid) {

                            ingredientsdata.push([ingredients[j].name , ingredients[j].amount , ingredients[j].measurement , specials[h].title , specials[h].geo , specials[h].text]);

                            break;
                        
                    }  else {

                        if((specials.length - 1) == h) {

                            ingredientsdata.push([ingredients[j].name , ingredients[j].amount , ingredients[j].measurement]);


                        }
                        
                    }

                }


            }

        console.log(ingredientsdata);

      
        const listItems = ingredientsdata.map((data) =>

        <div>

            <h5 className="textcapitalize"><strong>{data[3]}</strong> <strong><small><i>{data[0]}</i></small></strong></h5>
            <p>{data[1] ? '$' + data[1]  : ''} {data[2] ? 'per ' + data[2]  : ''}  <br/>   {data[5]} <br/> {data[4]}</p>
            
            <hr/> 
        </div>

        );

        //    const listItems = ingredientsdata.map((item,i) => <div key={i}>{item}</div>);

           
            var i;
            var images = "null";

            for (i = 0; i < recipes.length; i++) {

                if(recipes[i].uuid == parameter) {

                    images = recipes[i].images.full;

                }

            }



        return (


          
      <div className="container">
        <div className="row">
            
            <div className="col-md-12">

                <Link href={'/'}><a className="homepage-back" href="">click to main list</a></Link>
                
            </div>    
          
            <div className="col-md-8">
                <h2 className="textcapitalize">{recipe.title}</h2>
                <p class="textcapitalize">{recipe.description}</p>
                <p>Serving : {recipe.servings} serving/s<br/>
                Preparation time : {recipe.prepTime} min/s<br/>
                Cooking time : {recipe.cookTime} min/s</p>
                <br/>
                <h2>Ingredients</h2>
                <br/>
                <div className="borderlist">
                {listItems}
                </div>
            </div>

            <div className="col-md-4">
                <img className="imageresponsive" src={process.env.JSONURL + images} /> 
            </div>

        </div>
      </div>      
        );

    } else {

        return (
            <div>
            
            </div>
        );

    }

    }

}

export default SingleRecipe;
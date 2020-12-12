import axios from 'axios';
import React from 'react';
import Link from 'next/link'

class Recipe extends React.Component {

    state = {
        recipe : [],
        isLoaded : false
    }

    componentDidMount() {
        axios.get( process.env.JSONURL + '/recipes')
        .then(res => this.setState({
            recipe : res.data ,
            isLoaded : true,
        }))
        .catch(err => console.log(err));
    }

   
    render() {

        const isLoaded = this.state.isLoaded;

        const recipe = this.state.recipe;

        console.log(recipe);

        if(isLoaded) {


            const listItems = recipe.map((data) =>

            <div className="col-md-3">

                <Link href={'/recipe/?uuid=' + data.uuid}><a><img src={process.env.JSONURL + data.images.small} alt="image" title="images" className="imageresponsive" /></a></Link>
                
                <h2> <Link href={'/recipe/?uuid=' + data.uuid}><a>{data.title}</a></Link></h2>

                <p>{data.description}<br/>
                Serving : {data.servings} serving/s<br/>
                Preparation time : {data.prepTime} min/s<br/>
                Cooking time : {data.cookTime} min/s<br/>
                <a> <Link href={'/recipe/?uuid=' + data.uuid}><a>Click here for more info...</a></Link></a></p>
            
                <br/>
            </div>

            );

           
            return (
                <div className="container">
                    <div className="row">

                    {listItems}

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

export default Recipe;
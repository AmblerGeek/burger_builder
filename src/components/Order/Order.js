import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];


    // for (let i = 0; i < props.ingredients.length; i++)  {
    //     console.log(props.ingredients[i]);
    //     ingredients.push( {
    //         name: ingredientName,
    //         amount: props.ingredients[ingredientName];
    // })
    // };

    const ingredientKeys = Object.keys(props.ingredients);
    for (let i = 0; i < ingredientKeys.length; i++)  {
        ingredients.push( {
            name: ingredientKeys[i],
            amount: props.ingredients[ingredientKeys[i]]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px ',
                border: '1px solid #CCCCCC',
                padding: '5px'
            }}
        >{ingredient.name} ({ingredient.amount})</span>
    });

    // let transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    //     return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
    //         return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
    //     });
    // }).reduce( (array, element) => {
    //     return array.concat(element);
    // }, [] );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{ Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div>
    );
};

export  default order;
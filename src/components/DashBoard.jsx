// import React, { useState,useEffect } from 'react'

// export default function DashBoard() {

//   const[loadingMeals,setLoadingMeals]=useState([]);

//   useEffect(()=>{
//     async function fetchmeals(){
//     const data=await fetch('http://localhost:5173/meals');

//     if(!data.ok){
//       //...
//     }

//     const meals=await data.json();
//     setLoadingMeals(meals);
//   }

//   fetchmeals();

// },[])
  
//   return <ul id='meals'>
//     {loadingMeals.map((meal)=>
//     (<li key={meal.id}> {meal.name} </li>

//     ))}
//   </ul>
// }


import React, { useState, useEffect } from 'react';

export default function DashBoard() {
  const [loadingMeals, setLoadingMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch('http://localhost:5173/meals');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const meals = await response.json();
        setLoadingMeals(meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadingMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}

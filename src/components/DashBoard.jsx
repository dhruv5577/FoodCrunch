import useHttp from '../Hooks/useHttp';
import ListItem from './ListItem';

const requestConfig={};

export default function DashBoard() {

  const {data:loadingMeals ,isLoading,error } = useHttp('http://localhost:3000/meals',requestConfig,[])

  if(isLoading){
    return <p className='center'>Fetching Meals...</p>
  }
   
  return <ul id='meals'>
    {loadingMeals.map((meal)=>
    (
      <ListItem key={meal.id} meal={meal}/>
    ))}
  </ul>
}
 
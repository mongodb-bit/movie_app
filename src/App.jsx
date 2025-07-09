import { useEffect,useState, useSyncExternalStore } from "react"
import { useDebounce } from 'react-use';
import Search from "./components/search.jsx"
import Movie_cards from "./components/movie_cards.jsx";
// const API_BASE_URL='https://api.themoviedb.org/3';
// const API_key='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzRkYWRmMDYyOTgxZTQ2YTExNDQwNzVkNDMwN2FiNyIsIm5iZiI6MTc1MTk5MTk0NS4zNzMsInN1YiI6IjY4NmQ0Njg5MWUyZDQwMGZlMDcwMzRlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UmRZ9U65R6T6Jbg-_kgT54fUo6UVqUZjrQ5v2gKBYbo';

// const API_OPTIONS={
//   method:'GET',
//   header:{
//     accept:'application/json',
//     Authorization:`Bearer ${API_key}`
//   }
// }
const url1 = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzRkYWRmMDYyOTgxZTQ2YTExNDQwNzVkNDMwN2FiNyIsIm5iZiI6MTc1MTk5MTk0NS4zNzMsInN1YiI6IjY4NmQ0Njg5MWUyZDQwMGZlMDcwMzRlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UmRZ9U65R6T6Jbg-_kgT54fUo6UVqUZjrQ5v2gKBYbo'
  }
};


const App = ()=>{
    
  const [searchTerm,setSearchTerm] = useState('');
  //WHENEVER THAT COMPONENT IS LOADING WHATEVER IN  USEEFFECT WILL  BE COMPILED
  useEffect(()=>{
     fetchMovies(searchTerm);
  },[searchTerm ]);
// },[]  THIS WILL DECIDE CHANGE IN WHAT COMPONENTS WILL TRIGGER USEEFFECT

  const [Movies,setMovies] = useState([]);
  const [isLoaded,setisLoaded] =useState(false);
  const [debouncesearchterm ,setdebouncesearchterm]=useState('');
  useDebounce(() => setdebouncesearchterm(searchTerm), 500, [searchTerm]);
 


 const fetchMovies = async (query='')=>{
  try{
    setisLoaded(true);
     const url2 =`https://api.themoviedb.org/3/search/movie?query=${query}`;
     const url= query ? url2 :url1;
    const response=await fetch(url,options);
    const data = await response.json(); // or .text(), depending on API
    console.log(data); // Log the actual movie data
    
    setMovies(data.results || []);
    
  }catch(error){
    console.error(`${error}`)

  }finally{
    setisLoaded(false);
  }
 }





  return (
    <main>
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
           Find <span className="text-gradient"> Movies</span> you will enjoyy with Hassle
          </h1>
         </header>
         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <section className="all-movies ">
            <h2>All Movies</h2>
            {
              isLoaded ? (<p className="text-white"> loading</p>
              ): (
                <ul className="all-movies ">
                  {
                    Movies.map((movie)=>(
                    <Movie_cards key={movie.id} movie={movie}/>
                    ))}
                </ul>
              )
            }
          </section>
      </div>
    
    </div>
    </main>
   )
}

export default App

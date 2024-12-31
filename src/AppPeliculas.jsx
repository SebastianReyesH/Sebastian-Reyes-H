import { useState } from 'react'

export const AppPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '297fa1187887cc8d38b49e9dc353b9a2'

    const [buscador, setBuscador] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleBuscador = (e) => {
        setBuscador(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()    
        fetchBuscador()    
        console.log(peliculas)
    }

    const fetchBuscador = async() => {
        try{
            const response = await fetch(`${urlBase}?query=${buscador}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        }catch(error){
            console.log(error)
        }
        
    }

  return (
    <div className='container'>

        <h1 className='title'>Buscador de Peliculas</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={buscador} onChange={handleBuscador}/>
            <button type='submit' className='search-button'>Buscar</button>
        </form>

        <div className='movie-list'>
            {peliculas.map((pelicula) => (
                <div key={pelicula.id} className='movie-card'>
                    <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}
                    `} alt="a" />
                    <h2>{pelicula.title}</h2>
                    <h4>Año de lanzamiento: {pelicula.release_date}</h4>
                    <p>{pelicula.overview}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

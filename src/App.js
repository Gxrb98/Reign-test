import './App.css';
import hackerNews from './img/hacker-news.png'
import { Card } from './components/Card'
import axios from 'axios';
import { useState, useEffect } from 'react';



function App() {
  /************************************************************************************* 
 ***************** These variables store data from the local storage *****************
 *************************************************************************************/
  const newsSelectedLocalStorage = localStorage.getItem('newsSelected') || ''
  const hitsLocalStorage = JSON.parse(localStorage.getItem('hits')) || []
  const [newsSelected, setNewSelected] = useState(newsSelectedLocalStorage)
  const [hits, setHits] = useState(hitsLocalStorage)



  /************************************************************************************* 
   ***************** get data from API and store it con local storage *****************
   *************************************************************************************/
  const selectNews = async (event) => {
    setNewSelected(event.target.value)
    const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=${event.target.value}&page=0`)
    try {
      setHits(res.data.hits);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    //store the filter selected in local storage
    localStorage.setItem('newsSelected', newsSelected)

  }, [newsSelected])

  useEffect(() => {

    //store the Hits in local storage
    localStorage.setItem('hits', JSON.stringify(hits))
  }, [hits])


  return (
    <div className="home-view">
      <div className="header">
        <img src={hackerNews} className="hacker-news" alt='Hacker News'>
        </img>
      </div>
      <div className='all-myFaves'>
        <span className="rectangle">
          All
        </span>
        <span className="rectangle">
          My faves
        </span>
      </div>
      <div >
        <select className="select" value={newsSelected} onChange={selectNews}>
          <option>Select your news</option>
          <option value='reactjs'>React</option>
          <option value='vuejs'>Vuejs</option>
          <option value='angular'>Angular</option>
        </select>
      </div>
      <div className='cards-section'>
        <button onClick={() => console.log(hits)}>See whats is going on</button>
        {
          hits.map((hit) => {
            return <Card cardInfo={hit} key={hit.objectID} hits={hits} />
          })
        }
      </div>
    </div >
  );
}

export default App;

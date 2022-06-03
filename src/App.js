import './App.css';
import hackerNews from './img/hacker-news.png'
import { Card } from './components/Card'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Pagination } from './components/Pagination';
import hearth1 from './img/hearth1.svg'



function App() {


  /************************************************************************************* 
 ***************** variables to paginate **********************************************
 *************************************************************************************/
  const [currentPage, setCurrentPage] = useState(1)
  const [hitsPerPage] = useState(8)

  /************************************************************************************* 
 ***************** These variables store data from the local storage *****************
 *************************************************************************************/
  const newsSelectedLocalStorage = localStorage.getItem('newsSelected') || ''
  const hitsLocalStorage = JSON.parse(localStorage.getItem('hits')) || []
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favorite')) || false

  const [newsSelected, setNewSelected] = useState(newsSelectedLocalStorage)
  const [hits, setHits] = useState(hitsLocalStorage)
  const [showFavorites, setShowFavorites] = useState(favoriteLocalStorage)


  /************************************************************************************* 
   ***************** get current hits *****************
   *************************************************************************************/
  const indexOfLastHit = currentPage * hitsPerPage
  const indexOfFirstHit = indexOfLastHit - hitsPerPage
  const currentHits = hits.slice(indexOfFirstHit, indexOfLastHit)

  /************************************************************************************* 
   *************** get data from API, filtering it   ***********************************
   *************************************************************************************/
  const selectNews = async (event) => {
    setNewSelected(event.target.value)
    const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=${event.target.value}&page=0`)
    try {
      let filteredHits = res.data.hits.filter(hit =>
        hit.story_url && hit.created_at && hit.author && hit.story_title
      )
      setHits(filteredHits);
    } catch (e) {
      console.log(e)
    }
  }

  /************************************************************************************* 
   ****************************** Changes pagination current Page **********************
   *************************************************************************************/
  const paginate = pageNumber => setCurrentPage(pageNumber)


  useEffect(() => {

    //store the selected filter in local storage
    localStorage.setItem('newsSelected', newsSelected)

  }, [newsSelected])


  /************************************************************************************* 
   *************************** organize favorite hits first **********************
   *************************************************************************************/
  const organizeHits = (toFilter, toCompare, toCompareIfPushOrUnshift) => {

    let auxVar = toFilter.filter((hit) => hit.objectID !== toCompare.objectID)
    toCompareIfPushOrUnshift === hearth1 ? auxVar.unshift(toCompare) : auxVar.push(toCompare)
    setHits(auxVar)
    localStorage.setItem('hits', JSON.stringify(auxVar))
  }


  useEffect(() => {

    //store the Hits in local storage
    localStorage.setItem('hits', JSON.stringify(hits))
  }, [hits])

  //Manage all and fave button colors
  const [allBtn, setAllBtn] = useState('btn-clicked')
  const [favBtn, setFavBtn] = useState('btn')



  useEffect(() => {
    const handleAllFavesBtns = () => {
      if (showFavorites === true) {
        setAllBtn('btn')
        setFavBtn('btn-clicked')
      } else {
        setAllBtn('btn-clicked')
        setFavBtn('btn')
      }
    }
    handleAllFavesBtns()
  }, [showFavorites])

  return (
    <div className="home-view">
      <div className="header">
        <img src={hackerNews} className="hacker-news" alt='Hacker News'>
        </img>
      </div>
      <div className='all-myFaves'>
        <button className={allBtn}
          onClick={() => {
            setShowFavorites(false);
            localStorage.setItem('favorite', false)
          }}>
          All
        </button>
        <button className={favBtn}
          onClick={() => {
            setShowFavorites(true)
            localStorage.setItem('favorite', true)
          }}>
          My faves
        </button>
      </div>
      <div >
        <select className="select" value={newsSelected} onChange={selectNews}>
          <option hidden>Select your news</option>
          <option value='angular' >Angular</option>
          <option value='reactjs'>Reactjs</option>
          <option value='vuejs'>Vuejs</option>

        </select>
      </div>
      <div className='cards-section'>
        <div className='container'>
          {
            currentHits.map(hit => {
              if (showFavorites && hit.favorite) {
                return (<Card cardInfo={hit} key={hit.objectID} hits={hits} organizeHits={organizeHits} />)
              }
              else if (showFavorites === false) {
                return (<Card cardInfo={hit} key={hit.objectID} hits={hits} organizeHits={organizeHits} />)
              } else {
                return console.log('');
              }
            })
          }
        </div>
      </div>
      <div className='nav'>
        <Pagination hitsPerPage={hitsPerPage} totalHits={hits.length} paginate={paginate} />
      </div>
    </div >
  );
}

export default App;

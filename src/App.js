import './App.css';
import React , {useEffect} from 'react'
import { TextField }from '@material-ui/core'
import axios from 'axios'

const URL = "https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words"

function App() {
  const [search, setSearch] = React.useState("")
  const [words, setWords] = React.useState([])
  const [result, setResult] = React.useState([])
  const [loading, setLoading] = React.useState(false)  

  useEffect(()=>{
    setLoading(true)
    axios.get(URL).then( res => {
      setWords(res.data.split('\n'))
      setLoading(false)
    })

  },[])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    if(event.target.value.length > 2){
      setResult(words.filter( word => word.toLowerCase().includes(event.target.value.toLowerCase())))
    } else {
      setResult([])
    }
  }

  const output = (word,index) => {
    let parts = word.split(new RegExp(`(${search})`,'gi')) 
    return <p key={index}>
              <span>{parts.map((part,index) => part.toLowerCase() === search.toLowerCase() ? <span key={index} className="blue">{part}</span> : part )}</span>
           </p>
  }

  return (
    <div className="App">
      <h1>Nareash</h1>
      <TextField 
        placeholder={loading? "Please wait.." : "Type here..."}
        value={search}
        onChange={handleSearch}
        variant="outlined"
        disabled={loading}
      />
      <h2> Result </h2>
      <div className="result">
      {
        result.map( (res,index) => output(res,index) )
      }
      </div>
    </div>
  );
}

export default App;

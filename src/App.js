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

  const output = (word) => {
    let start = word.toLowerCase().indexOf(search.toLowerCase())
    let end = start + search.length
    let p 
    if(start !== 0 && end !== (word.length -1))
      p = <p key={word}> {word.substring(0,start)}<span className="yellow">{word.substring(start,end)}</span>{word.substring(end,word.length-1)}</p>
    else if(start === 0 && end !== (word.length -1))
      p = <p key={word}><span className="yellow">{word.substring(start,end)}</span>{word.substring(end,word.length-1)}</p>
    else if(start !== 0 && end === (word.length -1))
      p = <p key={word}>{word.substring(0,start)}<span className="yellow">{word.substring(start,end)}</span></p>
    else
      p = <p key={word}><span className="yellow">{word.substring(start,end)}</span></p>
    return p
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
        result.map( res => output(res) )
      }
      </div>
    </div>
  );
}

export default App;
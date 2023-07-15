import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { TestTs } from './TestTs.tsx';
import { ReducerTest } from './ReducerTest';
import { ReducerObject } from './ReducerObject';

const useFetch = (uri) => {
    const [retData, setRetData] = useState([])

    useEffect( () => {
        fetch(uri)
        .then(
            (res) => {
                return res.json();
            }
        )
        .then(
            (data) => {
                setRetData(data)
            }
        )
        .catch(
            (err) => { console.log(err)}
        )

    }, [uri]) 

   
    return retData;
}

const Index = () => {
    const data = useFetch("http://localhost:3001/towork")
    console.log(data)

    const ret = data.map( (xx) => { return <Link key={xx.id} to={`/work/${xx.id}`}><span>{xx.id}</span></Link> } )

    return (
        <>
            {ret}
        </>
    )
}

const DispPage = () => {
    const pageId = Number( useParams().id )
    //console.log(pageId);

    const data = useFetch(`http://localhost:3001/towork/${pageId}`)

    const ret = <div>id : {data.id}  title : {data.title}  detail : {data.detail }</div>

    return (
        <>{ret}</>
    )
}

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect executed');

    // Cleanup function
    return () => {
      console.log('Cleanup function executed');
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const Body = () => {
  return (
    <div>
      <Index />
      <DispPage />
    </div>
  )
}

const Create = (props) => {
  const navigate = useNavigate();

  //console.log(props)
  useEffect( () => {
    props.setCreateModeOn()
    console.log("setCreateModeOn executed")

    return ()=>{
      props.setCreateModeOff()
      console.log("setCreateModeOff executed")
    }
  }, [props])


  return (
    <form onSubmit={ (event) => {
        event.preventDefault()

        const newData = {"id": event.target.id.value , "title": event.target.title.value, "detail":event.target.detail.value }

        fetch(`http://localhost:3001/towork`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newData)
        })
        .then(
          (res) => {
            return res.json()
          }
        )
        .then(
          (data)=>{ 
          }
        )
        .catch(
          (err) => {
            console.log(err);
          }
        )

        navigate("/")
      }}>
      id : <input id="id" type="text" /> <br></br>
      title : <input id="title" type="text" /> <br></br>
      detail : <textarea id="detail" /><br></br>
      <button>Create</button>
    </form>
  )
}



function App() {
  const [onCreate, setOnCreate] = useState(false)

  const setCreateModeOn = () => setOnCreate( true )
  const setCreateModeOff = () => setOnCreate( false)

  let members = [
    {name : '동욱이', age : 56},  
    {name : '정향이', age : 50}
]

  const MESS = {
    ADD : "add",
    MOD : "modifiy",
    DEL : "delete"
}


const reducer = (state, action) => {
    console.log("reducer in app.js", state)
    switch(action.type) {    
        case MESS.ADD :
            //console.log('add')
            return state
        case MESS.DEL :
            //console.log('del')
            return state
        case MESS.MOD:
            //console.log('mod')
            let retMember = [...state]  // state자체가 안 바뀌면 상태 변화가 없ㄷ음
            retMember[0].age = 55
            return retMember
        default :
            return state
    }
}

  const [member, dispatch1] = useReducer(reducer, members)

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Header Area</h1>
            <ReducerTest></ReducerTest>
            <ReducerObject list={member} 
                createNew={() => {
                    //console.log('add')
                    dispatch1({type:MESS.ADD, payload:member}) }} 
                modifyMember={() => dispatch1({type:MESS.MOD, payload:members})}   
                delMember={() => dispatch1({type:MESS.DEL, payload:members})}              
            ></ReducerObject> 
          </header>
          <Routes>
            <Route path={"/"} element={<Index />} />
            <Route path={"/video"} element={<ExampleComponent />} />
            <Route path={"/work/:id"} element={<Body />} />
            <Route path={"/create"} element={<Create setCreateModeOn={setCreateModeOn}
                 setCreateModeOff={setCreateModeOff} />} />
          </Routes>
            {!onCreate && <div><Link to={"/create"} >Create New</Link></div>}
            <TestTs></TestTs>
        </div>
    
    </BrowserRouter>

  );
}

export default App;

import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {

  const [ret, SetRet] = useState('');

  useEffect( () => {
    fetch("http://localhost:3001/towork")
    .then( (res) => {
      //console.log(res);
      return res.json();
    })
    .then( (data) => {
      //console.log(data);
      SetRet( data.map( (xx) => {return ( <Link key={xx.id} to={`/work/${xx.id}`} ><span >{xx.id}</span></Link> )}) )
    })
    .catch( (err) => {
      console.log(err);
    })

    return (
      () => {   }
    )

  }, [])


  return (
    <>
      {ret}
    </>
  )
}

const DispPage = () => {
  const pageId = Number( useParams().id )
  //console.log(pageId);

  const [ret, SetRet] = useState('');

  useEffect( () => {
    fetch(`http://localhost:3001/towork/${pageId}`)
    .then(
      (res) => {
        //console.log(res);
        return res.json()
      }
    )
    .then(
      (data)=>{ 
        SetRet( 
          <div>
             <span>id : {data.id}</span><span>title : {data.title}</span><span>detail : {data.detail}</span>
          </div>
        )
      }
    )
    .catch(
      (err) => {
        console.log(err);
      }
    )
      
    return (
      () => {   }
    )

  }, [pageId] )

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
            //console.log(res);
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

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Header Area</h1>
          </header>
          <Routes>
            <Route path={"/"} element={<Index />} />
            <Route path={"/video"} element={<ExampleComponent />} />
            <Route path={"/work/:id"} element={<Body />} />
            <Route path={"/create"} element={<Create setCreateModeOn={setCreateModeOn}
                 setCreateModeOff={setCreateModeOff} />} />
          </Routes>
            {!onCreate && <div><Link to={"/create"} >Create New</Link></div>}
        </div>
    
    </BrowserRouter>

  );
}

export default App;

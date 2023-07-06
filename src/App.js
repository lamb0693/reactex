import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
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
    <div>
      {ret}
    </div>
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
    <div>{ret}</div>
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

function App() {

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
          </Routes>
        </div>
    
    </BrowserRouter>

  );
}

export default App;

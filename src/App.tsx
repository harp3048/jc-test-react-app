import React, { useEffect, useState } from 'react';
import { BrowserRouter, redirect, useNavigate, useSearchParams } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>THIS IS JS-TEST-REACT-APP</div>
        <Routes>
          {/* <Route path="/" element={<Layout />}/> */}
          <Route index element={<Login />} />

          <Route path='/home' element={<Home />} />
            {/* <Route path='?code' element={<Home />} />
          </Route> */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li> */}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {/* <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li> */}
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  const [searchParams] = useSearchParams();

  // const [accessToken, setAccessToken] = useState(null);
  // const [code, setCode] = useState('');


  useEffect(() => {
    const code = searchParams.get("code"); // "text"
    console.log("code", code);
    // if (code!=='') {
    //   getData(code as string);
    //   setCode(code as string);
    // }
    // else setCode('');
  }, []);

 async function getData(code: string) {
    console.log("Called")
    const config = {
      domainUrl:
        "https://azureadpool.auth.us-east-1.amazoncognito.com/oauth2/token",
      clientId: "7ndril32viqphk55tkm2kjn61f",
      loginRedirectUri: "http://localhost::4000/home",
      grant_type: "authorization_code",
      code: code,
    };

    const url =
      "https://azureadpool.auth.us-east-1.amazoncognito.com/oauth2/token";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `grant_type=${config.grant_type}&code=${code}&client_id=${config.clientId}&redirect_uri=${config.loginRedirectUri}`,
    };


    try {
      const response = await fetch(url, requestOptions)
      console.log("response---", response.body);
    } catch (error) {
      // console.error(error.message);
      console.error("error:---", error);
    }
  }

  // const navigate = useNavigate();
  // if (code !== "")
  //   navigate("/home")

  return ( 
    <div>
      <h2 style={{ marginTop: "50px" }}>Home PAGE </h2>
      <button
        style={{ marginTop: "20px", backgroundColor: "lightgrey", padding: 10 }}
        // onClick={() =>
        //   (window.location.href =
        //     "https://azureadpool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3tt220vg49agg2v6uls5nqq8r&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdf22c1gtijm7k.cloudfront.net%2F")
        // }
        id="signinbtn"
      >
        SSO Signin on HOME PAGE
      </button>
      <br />
      <br />
      <br />
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

function Login() {

  async function loguser(url: string) {
    console.log("loggin in...");
    const config = {
      domainUrl:
        "http://ckn.life"
    };

    const requestOptions = {
      method: "GET",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        // Accept: "application/json",
        mode:'no-cors'
      },
      // body: `grant_type=${config.grant_type}&code=${code}&client_id=${config.clientId}&redirect_uri=${config.loginRedirectUri}`,
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log("response---", response.body);
    } catch (error) {
      // console.error(error.message);
      console.error("error:---", error);
    }
  }

  return (
    <>
      <h2 style={{ marginTop: "50px" }}>Login PAGE </h2>
      <button
        style={{ marginTop: "20px", backgroundColor: "lightgrey", padding: 10 }}
        onClick={() => loguser("http://ckn.life/")}
        // onClick={() => { window.location.href = "https://ckn.life"; }}
        id="signinbtn"
      >
        SSO Signin
      </button>
      <br />

      <button
        style={{ marginTop: "20px", backgroundColor: "lightgrey", padding: 10 }}
        onClick={() => loguser("http://ckn.life/random-book")}
        id="getbooksbtn"
      >
        get Boonks
      </button>
      <br />
    </>
  );
  };

function Dashboard() {
  return (
    <div>
      <h2 style={{marginTop:'50px'}}>Dashboard PAGE </h2>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          This App is deployed from Github to AWS S3
        </a>
      </header>

      <p>
        <Link to="/home">Go HOME</Link>
      </p>

      <button
        style={{ marginTop: "20px", backgroundColor: "lightgrey", padding: 10 }}
        onClick={() =>
          (window.location.href ='https://www.microsoft.com/cascadeauth/microsoft-365/account/signout?ru=https%3A%2F%2Fwww.microsoft.com%2Fen-us%2Fmicrosoft-365%2Foutlook%2Femail-and-calendar-software-microsoft-outlook%3Fdeeplink%3D%252fowa%252f%253fstate%253d1%2526redirectTo%253daHR0cHM6Ly9vdXRsb29rLmxpdmUuY29tL21haWwv%2526realm%253dhotmail.com%26sdf%3D0&sessionId=ddbc12d6-16ad-4568-8e7b-5958a1226798')
        }
        id="signoutbtn"
      >
       Signout
      </button>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

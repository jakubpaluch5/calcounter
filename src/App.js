import React from 'react';
import { Layout, Header, Content } from 'react-mdl';
import 'react-mdl/extra/material.css';   
import 'react-mdl/extra/material.js';
import Main from './components/main';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
  

      <div className="demo-big-content">
      <Layout fixedHeader className="background">
          <Header transparent title={<Link className="logo" to="/">Calcounter</Link>}>
            
          </Header>
         
          <Content className="content">
            <Main />
            <div className="footer"><div><i class="far fa-copyright"></i>JPcollab</div></div>
          </Content>
          
      </Layout>
      </div>
  );
}

export default App;

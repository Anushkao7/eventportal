
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './comp/SIDE/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EventPage from './pages/EventPage.jsx';
import EventOrganizing from './pages/EventOrganizing.jsx';
import EventParticipation from './pages/EventParticipation.jsx';
import BudgetTracker from './FORM/form-2/BudgetTracker.js'
import Evento from './FORM/form-2/genai.js'
import Header from './comp/Header/header.js';
import Feedback from './comp/login/feedback.js'
import Login_form from './comp/login/login_f.js'
import  { useState } from 'react';
import Footer from './comp/Footer/footer.jsx';
import Reg from './comp/Regist/Registration.jsx';
import RandomEventComponent from './comp/Regist/RandomEventComponent.js';
import EventList from './comp/login/teacher.js'




function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');}
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
      <Header toggleTheme={toggleTheme}/>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/eventorganizing" element={<EventOrganizing />} />
          <Route path="/eventparticipation" element={<EventParticipation />} />
          <Route path='/BudgetTracker' element={<BudgetTracker />}/>
          <Route path="/Evento" element={<Evento />}/>
          <Route path="/login" element={<Login_form />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/RandomEvent" element={<RandomEventComponent />} />
          <Route path="/eventlist" element={<EventList />} />
        </Routes>
      </Sidebar>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;

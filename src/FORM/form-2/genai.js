import React, { useState, useEffect } from 'react';
import './f2.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Evento() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventSummary, setEventSummary] = useState("");

  useEffect(() => {
    function setFormFields(text) {
      setLoading(false); 
      const lines = text.split('\n');
      let foundDate = false;
      let foundTime = false;
  
      lines.forEach(line => {
        const [key, value] = line.split(':');
        console.log(key, value);
        switch (key.trim()) {
          case 'Event name':
            setEventName(value.trim());
            break;
          case 'Event Name':
            setEventName(value.trim());
            break;
          case 'Date':
            if (!foundDate) {
              setEventDate(value.trim());
              foundDate = true;
            }
            break;
          case 'Time':
            foundTime = true;
            setEventTime(value.trim());
            
            break;
          default:
            break;
        }
      });
  
      if (!foundDate) {
        setEventDate('');
      }
      if (!foundTime) {
        setEventTime('');
      }
    }
  
    if (generatedText) {
      setFormFields(generatedText);
    }
  }, [generatedText]);

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }

  const handleGenerate = async () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDYecx7ZQUfrUOksHRU1JHLFPxJuHyfy5Y');
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "read the image and find name of event  ,time in am or pm ,date in this format dd/mm/yy if any thing is not mention say not mention" ;

    if (selectedImage) {
            setLoading(true); 
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imagePart = {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: selectedImage.type
          },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = await response.text();
        setGeneratedText(text);
      };
      reader.readAsDataURL(selectedImage);
    }
  }
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      eventName,
      eventDate,
      eventTime,
    });
  };

  localStorage.setItem('name', JSON.stringify(eventName));

  const handSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('time', eventTime);
    formData.append('summary', eventSummary);
    formData.append('poster', selectedImage);

    try {
      await axios.post('http://127.0.0.1:8000/api/events/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Event saved successfully!');
    } catch (error) {
      alert('Error saving event detail');
    }
  };
  return (
    <div>    
      <h1 className='he'>For Organising An Event Please Enter All The Details </h1>
      <form onSubmit={handleSubmit}style={{marginBottom:"100px" }}>
        <div className="sui">
        <div className='ocr'>
        <label htmlFor="image" style={{marginTop:"20px",marginBottom:"20px"}}>Upload Poster</label><br />
        <div>
          <input type="file" accept="image/*" onChange={handleChange} style={{marginBottom:"20px"}} />
          <button onClick={handleGenerate}style={{marginLeft:"30px"}}>Submit</button>
          </div>
          {loading && <p>Loading...</p>}
          </div>
        </div>

        <div className='deatail'>
          Event Name: 
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: '350px', marginLeft:"20px" }}/>
        </div>
        <br />
        <div className='deatail'>
          Date of Event:
          <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ width: '350px', marginLeft:"10px" }} />
        </div>
        <br />
        <div className='deatail'>
          Time of Event:
          <input type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} style={{ width: '350px', marginLeft:"10px" }}/>
        </div>
        <br />
        <div className='deatail'>
          Event Summary:
          <textarea value={eventSummary} onChange={(e) => setEventSummary(e.target.value)} style={{ width: '350px', marginLeft:"10px" }} />
        </div>
        <div className='but'>
        <button type="submit" onClick={handSubmit} style={{marginLeft:"30px",width: '100px' }}>Save</button>

        <button type="submit" onClick={() => navigate('/BudgetTracker')} style={{marginLeft:"30px",width: '100px' }}>Next</button>
        </div>
      </form>
    </div>
  );
}

export default Evento;

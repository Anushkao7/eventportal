import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Feed() {
  const [eventName, setEventName] = useState('');
  const [duration, setDuration] = useState('');
  const [achievement, setAchievement] = useState('');
  const [Namestudent, setNamestudent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function setFormFields(text) {
      setLoading(false); 
      const lines = text.split('\n');
      let foundDate = false;
      
      lines.forEach(line => {
        const [key, value] = line.split(':');
        console.log(key, value);
        switch (key.trim()) {
          case 'Event Name':
            setEventName(value.trim());
            break;
          case 'Date':
            if (!foundDate) {
              setEventDate(value.trim());
              foundDate = true;
            }
            break;

            case 'Student Name':
            setNamestudent(value.trim());
            break;
            case 'Achievement':
            setAchievement(value.trim());
            break;
            case 'Duration':
              setDuration(value.trim());
              break;
              default:
        }
      });
  
      if (!foundDate) {
        setEventDate('');
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

    const prompt = "read the image and find name of event,name of student  ,time,date in this format dd/mm/yy ,achievement like participat or got first or second position in event, also find the duration of even";

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
        console.log(text);
        setGeneratedText(text);

      };
      reader.readAsDataURL(selectedImage);
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      eventName,
      eventDate,
    });
  };

  return (
    <div>    
      <h1 className='he'>For Organising An Event Please Enter All The Details </h1>
      <form onSubmit={handleSubmit}>
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
          Name:
        <input type="text" value={Namestudent} onChange={(e) => setNamestudent(e.target.value)} style={{ width: '350px', marginLeft:"10px" }}/>
        </div>
        <br />
        <div className='deatail'>
          Achievement:
          <input type="text" value={achievement} onChange={(e) => setAchievement(e.target.value)} style={{ width: '350px', marginLeft:"10px" }}/>
        </div>
        <div className='deatail'>
          Duration:
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: '350px', marginLeft:"10px" }}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feed;
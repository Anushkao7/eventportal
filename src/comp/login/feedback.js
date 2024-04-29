import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './feed.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const [eventName, setEventName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [rating, setRating] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false); // State for showing success message


    const navigate = useNavigate();
    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    useEffect(() => {
        // Fetch event name from backend
        // For now, setting a sample event name
        setEventName("Technical Event");

        // Generate questions
        async function generateQuestions() {
            const genAI = new GoogleGenerativeAI('AIzaSyDYecx7ZQUfrUOksHRU1JHLFPxJuHyfy5Y');
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Write me 5 meaningful questions for the feedback form of ${eventName} in proper format only question no other thing`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            // Split the text into individual questions
            const generatedQuestions = text.split("\n");
            setQuestions(generatedQuestions);
        }

        generateQuestions();
    }, [eventName]);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted!');
        setShowSuccess(true); // Show success message
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/') // Hide success message after 2 seconds // Navigate to dashboard after successful submission
        }, 2000);
    };

    return (
        <div className="feedback-container">
            <h2>Feedback form for {eventName}</h2>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question}</p>
                    <input type="text" placeholder="Your answer" />
                </div>
            ))}
            <p>Please rate the event</p>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < rating ? 'active' : ''}
                        onClick={() => handleStarClick(index)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p>Selected Rating: {rating}</p>
            <div className='bu'>
                <button onClick={handleSubmit}>Submit Feedback</button>
            </div>
            {showSuccess && <p className="success-message">Form submitted successfully!</p>}
        </div>
    );
};

export default Feedback;

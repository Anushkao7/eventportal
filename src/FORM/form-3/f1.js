import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './f1.css';

const App = () => {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventSubType, setEventSubType] = useState('');
  const [eventSubSubType, setEventSubSubType] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [duration, setDuration] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const departments = ["INFORMATION TECHNOLOGY", "COMPUTER ENGINEERING", "ELECTRONICS AND TELECOMMUNICATION", "ELECTRONICS", "AIDS", "AIML", "MECHANICAL"];
  const years = ["FE", "SE", "TE", "BE"];
  const eventTypes = [
    { label: "Technical Event", subTypes: ["Hackathons", "Coding Competitions", "Robotics Competitions", "Engineering Design Challenges"] },
    { label: "Career Development Events", subTypes: ["Job Fairs/Internship Expos", "Resume Workshops", "Mock Interview Sessions"] },
    { label: "Industry Interaction Events", subTypes: ["Guest Lectures", "Industry Visits"] },
    { label: "Project and Research Events", subTypes: ["Project Exhibitions", "Research Paper Competitions"] },
    { label: "Social and Cultural Events", subTypes: ["Cultural Festivals", "Sports Tournaments"] },
    { label: "Entrepreneurship Events", subTypes: ["Startup Competitions", "Entrepreneurship Workshops"] }
  ];

  const jobFairInternshipExposSubSubTypes = [
    "College-specific Job Fairs",
    "Industry-wide Job Fairs",
    "Internship Expos",
    "Tech Recruitment Drives"
  ];

  const resumeWorkshopsSubSubTypes = [
    "Resume Building Sessions",
    "CV Writing Workshops",
    "Personal Branding Seminars",
    "LinkedIn Profile Optimization Workshops"
  ];

  const mockInterviewSessionsSubSubTypes = [
    "Technical Interview Practice",
    "Behavioral Interview Practice",
    "Industry-specific Interview Workshops",
    "Interview Skill Development Bootcamps"
  ];

  const guestLecturesSubSubTypes = [
    "Industry Expert Talks",
    "Alumni Talks",
    "Tech Entrepreneur Speaker Series",
    "Panel Discussions on Emerging Technologies"
  ];

  const industryVisitsSubSubTypes = [
    "Factory Visits",
    "Research Lab Tours",
    "Tech Company Tours",
    "Startup Incubator Visits"
  ];

  const projectExhibitionsSubSubTypes = [
    "Engineering Project Expo",
    "Poster Presentations",
    "Project Showcases",
    "Innovation Fairs"
  ];

  const researchPaperCompetitionsSubSubTypes = [
    "Technical Paper Presentations",
    "Conference Paper Submissions",
    "Engineering Research Symposiums",
    "Student Research Conferences"
  ];

  const codingCompetitionSubTypes = [
    { label: "Intra-college Coding Competitions", subSubTypes: [] },
    { label: "Inter-college Coding Competitions", subSubTypes: [] },
    { label: "Algorithm Challenges", subSubTypes: [] },
    { label: "Programming Contests (e.g., ACM ICPC)", subSubTypes: [] }
  ];

  const hackathonSubTypes = [
    { label: "College-level Hackathons", subSubTypes: [] },
    { label: "Inter-college Hackathons", subSubTypes: [] },
    { label: "Industry-sponsored Hackathons", subSubTypes: [] },
    { label: "Theme-based Hackathons", subSubTypes: [] }
  ];

  const roboticsCompetitionSubTypes = [
    { label: "Robot Wars", subSubTypes: [] },
    { label: "Autonomous Robotics Challenges", subSubTypes: [] },
    { label: "Line-following Robot Competitions", subSubTypes: [] },
    { label: "Robo-Soccer Tournaments", subSubTypes: [] }
  ];

  const engineeringDesignChallengeSubTypes = [
    { label: "Design-a-Thon", subSubTypes: [] },
    { label: "Prototyping Competitions", subSubTypes: [] },
    { label: "Engineering Innovation Challenges", subSubTypes: [] },
    { label: "3D Printing Competitions", subSubTypes: [] }
  ];

  const startupCompetitionsSubSubTypes = [
    "Business Plan Competitions",
    "Startup Pitch Events",
    "Entrepreneurship Challenges",
    "Venture Capitalist Pitching Sessions"
  ];

  const culturalFestivalsSubSubTypes = [
    "College Fests",
    "Tech-Cultural Fests",
    "Tech-Cultural Competitions (e.g., Robo-Warriors in Cultural Fests)",
    "Hackathons within Fests"
  ];

  const sportsTournamentsSubSubTypes = [
    "Inter-departmental Sports Competitions",
    "College-wide Sports Tournaments",
    "Engineering Sports Leagues",
    "Tech Sports Events (e.g., E-Sports, Drone Racing)"
  ];

  const careerDevelopmentSubSubTypes = [
    { label: "Job Fairs/Internship Expos", subSubTypes: jobFairInternshipExposSubSubTypes },
    { label: "Resume Workshops", subSubTypes: resumeWorkshopsSubSubTypes },
    { label: "Mock Interview Sessions", subSubTypes: mockInterviewSessionsSubSubTypes }
  ];

  const entrepreneurshipWorkshopsSubSubTypes = [
    "Lean Startup Workshops",
    "Business Model Canvas Sessions",
    "Startup Incubation Programs",
    "Mentoring Sessions with Entrepreneurs"
  ];

  const entrepreneurshipSubSubTypes = [
    { label: "Startup Competitions", subSubTypes: startupCompetitionsSubSubTypes },
    { label: "Entrepreneurship Workshops", subSubTypes: entrepreneurshipWorkshopsSubSubTypes }
  ];

  const convertToDate = (dateString) => {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getDate())) return ''; // If parsing fails, return empty string
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);

      try {
        const { data: { text } } = await Tesseract.recognize(
          file,
          'eng',
          {
            logger: m => console.log(m)
          }
        );

        const fullNameMatch = text.match(/((This is to certify that)|(This certificate is awarded to)|(This certificate is presented to))\s+((Mr.|Ms\.)?\s*[^,.\n]+)/i);
        if (fullNameMatch) {
          let fullNameCandidate = fullNameMatch[5].trim();
          if (fullNameCandidate.includes("Mr.") || fullNameCandidate.includes("Ms.")) {
            fullNameCandidate = fullNameCandidate.replace(/Mr\.|Ms\./i, "").trim();
          }
          setFullName(fullNameCandidate);
        }

        const eventNameMatch = text.match(/(?:for securing\s+\d+(?:st|nd|rd|th) position in|for participating in|participated in|on the topic of|in the course of)\s+([^,.\n]+)/i);
        if (eventNameMatch) setEventName(eventNameMatch[1]);

        const dateMatch = text.match(/\b(?:\d{1,2}[./-]\d{1,2}[./-]\d{2,4}|\d{4}[./-]\d{1,2}[./-]\d{1,2}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})\b/g);
        if (dateMatch) {
          const formattedDate = convertToDate(dateMatch.join(' - '));
          setDate(formattedDate);
        } else {
          setDate(''); // If date extraction fails, clear the date
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (acceptTerms) {
      console.log('Form submitted!');
      // Proceed with form submission...
    } else {
      alert('Please acknowledge that you agree to the details entered.');
    }
  };

  return (
    <div className="App">
      <h1>Event Participation Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fileUpload">Upload Image (JPG format only):</label>
          <input type="file" id="fileUpload" accept=".jpg" onChange={handleFileUpload} />
        </div>

        {loading && <p>Loading...</p>}

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Year:</label>
          <div className="radio-group-horizontal">
            {years.map((yr, index) => (
              <label key={index} className="radio-inline">
                <input type="radio" value={yr} checked={year === yr} onChange={() => setYear(yr)} />
                {yr}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input id="eventName" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Event Type:</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="">Select</option>
            {eventTypes.map((type, index) => (
              <option key={index} value={type.label}>{type.label}</option>
            ))}
          </select>
        </div>

        {eventType && eventType !== "Select" &&
          <div className="form-group">
            <label>Event Sub-Type:</label>
            <select value={eventSubType} onChange={(e) => setEventSubType(e.target.value)}>
              <option value="">Select</option>
              {eventTypes.find(type => type.label === eventType).subTypes.map((subType, index) => (
                <option key={index} value={subType}>{subType}</option>
              ))}
            </select>
          </div>
        }

        {eventSubType && eventSubType !== "Select" &&
          <div className="form-group">
            <label>Event Sub-Sub-Type:</label>
            <select value={eventSubSubType} onChange={(e) => setEventSubSubType(e.target.value)}>
            <option value="">Select</option>
      {(() => {
        switch (eventSubType) {
          case "Job Fairs/Internship Expos":
            return jobFairInternshipExposSubSubTypes.map((subSubType, index) => (
              <option key={index} value={subSubType}>{subSubType}</option>
            ));
          case "Resume Workshops":
            return resumeWorkshopsSubSubTypes.map((subSubType, index) => (
              <option key={index} value={subSubType}>{subSubType}</option>
            ));
          case "Mock Interview Sessions":
            return mockInterviewSessionsSubSubTypes.map((subSubType, index) => (
              <option key={index} value={subSubType}>{subSubType}</option>
            ));
                  case "Coding Competitions":
                    return codingCompetitionSubTypes.map((subType, index) => (
                      <option key={index} value={subType.label}>{subType.label}</option>
                    ));
                  case "Hackathons":
                    return hackathonSubTypes.map((subType, index) => (
                      <option key={index} value={subType.label}>{subType.label}</option>
                    ));
                  case "Robotics Competitions":
                    return roboticsCompetitionSubTypes.map((subType, index) => (
                      <option key={index} value={subType.label}>{subType.label}</option>
                    ));
                  case "Engineering Design Challenges":
                    return engineeringDesignChallengeSubTypes.map((subType, index) => (
                      <option key={index} value={subType.label}>{subType.label}</option>
                    ));
                  case "Career Development Events":
                    return careerDevelopmentSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType.label}>{subType.label}</option>
                    ));
                  case "Guest Lectures":
                    return guestLecturesSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Industry Visits":
                    return industryVisitsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Project Exhibitions":
                    return projectExhibitionsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Research Paper Competitions":
                    return researchPaperCompetitionsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Cultural Festivals":
                    return culturalFestivalsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Sports Tournaments":
                    return sportsTournamentsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Startup Competitions":
                    return startupCompetitionsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  case "Entrepreneurship Workshops":
                    return entrepreneurshipWorkshopsSubSubTypes.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ));
                  default:
                    return null;
                }
              })()}
            </select>
          </div>
        }



        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input id="date" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>achievement:</label>
          <input type="text" value={achievement} onChange={(e) => setAchievement(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration of Course Event:</label>
          <input id="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
            I acknowledge that the information provided is accurate and agree to its use.
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;

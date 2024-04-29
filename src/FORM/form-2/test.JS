import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Gemini() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState("");

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }

  const handleGenerate = async () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDYecx7ZQUfrUOksHRU1JHLFPxJuHyfy5Y');

    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "read the image and find name of event  ,time,date";

    if (selectedImage) {
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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleGenerate}>Submit</button>
      {selectedImage && (
        <div>
          <p>Selected file: {selectedImage.name}</p>
        </div>
      )}
      {generatedText && <p>{generatedText}</p>}
    </div>
  );
}

export default Gemini;
// import React, { useState } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function Up() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [generatedText, setGeneratedText] = useState("");

//   const handleChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//     handleGenerate(); // Call handleGenerate when image is selected
//   }

//   const handleGenerate = async () => {
//     const genAI = new GoogleGenerativeAI('AIzaSyDYecx7ZQUfrUOksHRU1JHLFPxJuHyfy5Y');

//     // For text-and-image input (multimodal), use the gemini-pro-vision model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     const prompt = "read the image and find name of event  ,time,date";

//     if (selectedImage) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const imagePart = {
//           inlineData: {
//             data: reader.result.split(",")[1],
//             mimeType: selectedImage.type
//           },
//         };

//         const result = await model.generateContent([prompt, imagePart]);
//         const response = await result.response;
//         const text = await response.text();
//         setGeneratedText(text);
//       };
//       reader.readAsDataURL(selectedImage);
//     }
//   }

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleChange} />
//       {selectedImage && (
//         <div>
//           <p>Selected file: {selectedImage.name}</p>
//         </div>
//       )}
//       {generatedText && <p>{generatedText}</p>}
//     </div>
//   );
// }

// export default Up;

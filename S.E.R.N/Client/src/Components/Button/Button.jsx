import { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload }  from '@fortawesome/free-solid-svg-icons';
import './Button.css';

function Button({onDataSent}) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // For success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false);


const handleSubmit = (e) => {
e.preventDefault();
setIsSubmitting(true);
setStatusMessage('');

fetch(`${API_BASE_URL}${API_ENDPOINTS.MESSAGES}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, text }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to send data. Please try again.');
    }
    return response.json();
  })
  .then(() => {
    setStatusMessage('Success!'); // Show success message
    onDataSent(); // Notify parent component
    setName('');
    setText('');
  })
  .catch((error) => {
    setStatusMessage('Error: ' + error.message); // Show error message
  })
  .finally(() => {
    setIsSubmitting(false);
    setTimeout(() => setStatusMessage(''), 2000); // Clear message after 2 seconds
  });
};


  return (
    <>
    
    <div className="buttonContainer">
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <div className="input-Animated">
            <input type="text" name="text" className="input" placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <div className="highlight"></div>
          </div>

          <div className="input-Animated">
            <input type="text" name="text" className="input" placeholder="Enter Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <div className="highlight"></div>
          </div>

        </div>
        <div className="submitButtonContainer">
        <button type="submit"> <FontAwesomeIcon icon={faUpload} /> &nbsp; {statusMessage || 'Send'} </button>
        </div>
      </form>

    </div>
    </>
  );
}

export default Button;



import './App.css';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from './axios';

function App() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      name: fullName || 'test full name',
      email: email || 'test email',
      note: note || '1234567890'
    }

    try {
      let responseData = await axios.post('/api/form/send', formData);
      console.log('responseData: ', responseData);
      let getResData = responseData?.data;
      if (getResData.status === 200) {
        alert('Data Saved. Thanks for contacting.. get back to you soon.');
      } else {
        alert('some thing went wrong');
      }
    } catch (error) {
      alert(error);
    }

  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className='pt-5'>Enter Detail</div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            defaultValue={''}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue={''}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Notes"
            defaultValue={''}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>

        <Button variant="contained" onClick={(event) => handleSubmit(event)}>Submit</Button>
      </Box>

    </div>
  );
}

export default App;

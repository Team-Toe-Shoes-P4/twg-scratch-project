//onclick functions to be established here and passed as props??
//planning page for trip

import React from 'react';
import logo from '../images/journalLogo.png';
import {useState} from 'react';

function JournalForm (props) {
    //'my itinerary': Day1, Day2, etc
    const [totalDays, updateDays] = useState('');
    const [location, locationSetter] = useState('');
    const [journalEntry, journalUpdater] = useState('');
    const [deleter, entryDeleter] = useState('');
    const [editor, entryEditor] = useState('');
    const [{_id: entryId, entry, title}] = useState({});
    //endpoint to create a comment: api/trips/:tripId/comments
    const handleSubmission = () => {};
    //function that makes a get request to trip journal endpoint
    //send back note data which we'll render on page
      //with map with editing and deleting ability
      
    return (
      <div>
        {/* {props.userName}, you're on your way to: <br/> */}
        <a href='http://localhost:8080/Login'> <img src={logo} alt='Travel Planner logo'/> </a> <h2>My Trip Journal...</h2>
        <form> 
          <div>
            <div className="currentEntry">
              {/* map displaying dynamic trip entries */}
                <textarea className="cell">
                  New Entry
                </textarea><br/>
                <button class='SubmitButton' onClick={handleSubmission}>Submit Entry </button>
                <br/>
            </div>
            <div className="allEntries">
                <div className="cell" className='divScroll'>
                  Prev Entries:
                <p>
                slfjslkfjs klfjsklfj fkljsfkl
                slfjslkfjs fkljs flksfj sklfj
                </p>
                <p>
                slfjslkfjs klfjsklfj fkljsfkl
                slfjslkfjs fkljs flksfj sklfj
                </p>
                <p>
                slfjslkfjs klfjsklfj fkljsfkl
                slfjslkfjs fkljs flksfj sklfj
                </p>
                </div><br/>
            </div>
            <button class='SubmitButton' onClick={handleSubmission}>Edit An Entry</button>
            <button class='SubmitButton' onClick={handleSubmission}>Delete An Entry </button>
            <label for='html'></label><br/>
        </div>
        </form>
          
      </div>
    
    )

  }

  export default JournalForm;
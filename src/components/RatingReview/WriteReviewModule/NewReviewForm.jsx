import React from 'react';
import CharacteristicInput from './CharacteristicInput.jsx';
import RecommendInput from './RecommendInput.jsx';
import ReviewerInfoInput from './ReviewerInfoInput.jsx';
import ReviewBodyInput from './ReviewBodyInput.jsx';

const ReviewFormStyles = {
  position: 'fixed',
  bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex:  2,
};

const FormOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1
};

const NewReviewForm = ({ onClose, characteristics }) => {
  let charaList = Object.entries(characteristics);

  return (
    <div style={FormOverlayStyles}>
      <form style={ReviewFormStyles}>
        <button onClick={onClose}>X</button>
        <h3>Write a new review</h3>

        <div className='ratingInput'>
          <h4>Overall rating</h4>
          (stars)
        </div>

        <div className='recommendInput'>
          <RecommendInput />
        </div>

        <div className='characteristicsInput'>
          {charaList.map((chara) => <CharacteristicInput chara={chara} key={chara} />)}
        </div>

        <div className='summaryInput'>
          <h4>Review Summary</h4>
          <textarea maxLength='60' placeholder='Example: Best purchase ever!'></textarea>
        </div>

        <div className='bodyInput'>
          <ReviewBodyInput />
        </div>

        <div className='photoUpload'>
          <h4>Upload photos</h4>
          *IN PROGRESS*
        </div>

        <div className='reviewerInfo'>
          <ReviewerInfoInput />
        </div>

        <input type='submit' value='Submit'></input>
      </form>
    </div>
  );
};

export default NewReviewForm;
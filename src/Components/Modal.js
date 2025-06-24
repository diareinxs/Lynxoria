import React from 'react';
// Modal component displays detailed information about a selected item in an overlay
const Modal = ({ show, item, onClose }) => {
  // If 'show' is false, do not render the modal
  if (!show) {
    return null;
  }

  // Get the thumbnail image if available
  let thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;

  return (
    <div className="overlay">
      <div className="overlay-inner">
        {/* Close button to trigger the onClose callback */}
        <button className="close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="inner-box">
          {/* Display the book's thumbnail */}
          <img src={thumbnail} alt={item.volumeInfo.title} />
          <div className="info">
            <h2>Details</h2>
            <br />

            {/* Book title */}
            <h1>{item.volumeInfo.title}</h1>

            {/* Book authors */}
            <h3>{item.volumeInfo.authors?.join(', ')}</h3>
            
            {/* Publisher and published date */}
            <h4>
              {item.volumeInfo.publisher}
              {item.volumeInfo.publisher && item.volumeInfo.publishedDate ? <br /> : null}
              <span>{item.volumeInfo.publishedDate}</span>
            </h4>
            
            <br />
            {/* Link to preview the book */}
            <a href={item.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              <button>More</button>
            </a>
          </div>
        </div>
        {/* Description section */}
        <h4 className="subtitle"> Description</h4>
        <div
          className="description"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '8px',
            background: '#f9f9f9',
            borderRadius: '4px'
          }}
        >
          {item.volumeInfo.description}
        </div>
      </div>
    </div>
  );
};

export default Modal;
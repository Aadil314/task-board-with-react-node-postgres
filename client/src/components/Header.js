import React from 'react';

const Header = ({ title, logOut }) => {
  return (
    <div className="header">
      <h2 style={{ marginLeft: '20px' }}>{title}</h2>
      {logOut && (
        <button 
          className="btn" 
          type="button" 
          onClick={logOut}
          style={{marginRight:"20px"}}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;

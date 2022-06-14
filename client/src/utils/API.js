// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };

  export const createUser = (userData) => {
    return fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  export const loginUser = (userData) => {
    return fetch('/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      
    });
  };
  export const getHighscores = () => {
    return fetch('/api/users/highscores'), {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };
  export const getSingleHighscore = (token, username) => {
    console.log(username)
    return fetch(`/api/users/highscores/${username}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      
    }
    
  }
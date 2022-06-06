import decode from 'jwt-decode';

class AuthService {
    // get user data
    getProfile() {
      return decode(this.getToken());
    }
    // check if user's logged in
    loggedIn() {
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
      }
      getToken() {
        return localStorage.getItem('id_token');
      }
      login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }
   
}

export default new AuthService();
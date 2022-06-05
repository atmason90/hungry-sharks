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
}

export default new AuthService();
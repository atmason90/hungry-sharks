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
}

export default new AuthService();
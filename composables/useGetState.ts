import axios from 'axios';

export default function useFacebookLogin() {
  async function getCookie(email: string, password: string): Promise<any> {
    try {
      const res = await axios.post('https://cookie-fb-8277dhysy0.onrender.com/login', {
        email, 
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  return { getCookie };
}
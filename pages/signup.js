import { useState } from 'react';
import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CustomInput from '../components/CustomInput';
import validateEmail from "../utils/validators/validateEmail";
import validateRequired from "../utils/validators/validateRequired";

const initialState = {
  email: '',
  password: '',
  name: '',
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(initialState);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password, name } = signupInfo;
    if (!email || !password || !name) {
      return;
    }

    try {
      const res = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signup',
        { ...signupInfo },
      );
      nookies.set(null, 'token', res.data.token, { path: '/' });
      router.replace('/[country]', '/us');
    } catch (error) {
      setError(error.message);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  }

  return (
    <div className="signin">
      <form action="" onSubmit={handleSubmit}>
        <CustomInput
          name="name"
          placeholder="Enter you name"
          value={signupInfo.name}
          onChange={handleChange}
          onBlur={validateRequired}
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter you email"
          value={signupInfo.email}
          onChange={handleChange}
          onBlur={validateEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter you password"
          value={signupInfo.password}
          onChange={handleChange}
          onBlur={validateRequired}
        />
        {error && <p className='error'>{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <Link href="/signin">
        <a>Already have an account</a>
      </Link>
    </div>
  );
};

export default Signup;
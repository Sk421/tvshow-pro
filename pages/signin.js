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
};

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState(initialState);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = signinInfo;
    if (!email || !password) {
      return;
    }

    try {
      const res = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signin',
        { ...signinInfo },
      );
      nookies.set(null, 'token', res.data.token, { path: '/' });

      const { plannedRoute } = nookies.get();
      const plannedRouteObj = plannedRoute && JSON.parse(plannedRoute);
      const plannedHref = plannedRouteObj ? plannedRouteObj.href: '/[country]';
      const plannedAs = plannedRouteObj ? plannedRouteObj.as: '/us';
      router.replace(plannedHref, plannedAs);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  }

  return (
    <div className="signin">
      <form action="" onSubmit={handleSubmit}>
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter you email"
          value={signinInfo.email}
          onChange={handleChange}
          onBlur={validateEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter you password"
          value={signinInfo.password}
          onChange={handleChange}
          onBlur={validateRequired}
        />
        {error && <p className='error'>{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <Link href="/signup">
        <a>Create an account</a>
      </Link>
    </div>
  );
};

export default Signin;
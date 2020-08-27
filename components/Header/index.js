import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from 'nookies';
import Link from 'next/link';

import { isAuthenticated } from '../../utils/withAuthorization';

const countries = [
  {
    label: 'us',
    name: 'United states'
  },
  {
    label: 'br',
    name: 'Brazil'
  },
  {
    label: 'in',
    name: 'India'
  },
];

const Header = () => {
  const router = useRouter();
  const [country, setCountry] = useState(router.query.country);

  useEffect(() => {
    if(country) {
      nookies.set(null, 'defaultCountry', country, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  }, [country]);

  const handleChange = e => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    router.push('/[country]', `/${selectedCountry}`);
  }

  const renderCountries = () => {
    return countries.map(country =>
      <option value={country.label} key={country.label}>{country.name}</option>
    );
  }

  const handleSignout = () => {
    nookies.destroy(null, 'token');
  }

  return (
    <div className="header">
      <select onChange={handleChange} value={country}>
        {renderCountries()}
      </select>
      {
        isAuthenticated() &&
        <Link href="/[country]" as={`/${country}`}>
          <a onClick={handleSignout}>Signout</a>
        </Link>
      }
      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          margin-bottom: 10px;
          text-align: center;
          display: flex;
          justify-content: space-between;
        }
    `}</style>
    </div>
  );
};

export default Header;
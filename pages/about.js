import Link from 'next/link';

const About = () => {
  return (
    <>
    <div>This is about page.</div>
    <Link href="/about2">
      <a>
        About2
      </a>
    </Link>
    </>
  );
}

export default About;
const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="50"
      height="50"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
      <path
        d="M35 50l10 10 20-25"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        opacity="0.2"
      />
    </svg>
  );
};

export default Logo;

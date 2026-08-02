export default function LogoIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="50" y1="27" x2="28" y2="63" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="50" y1="27" x2="72" y2="63" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="63" x2="72" y2="63" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="50" cy="27" r="5.5" fill="#3b82f6" />
      <circle cx="28" cy="63" r="5.5" fill="#3b82f6" />
      <circle cx="72" cy="63" r="5.5" fill="#3b82f6" />
    </svg>
  )
}
interface Props {
  color?: string
  size?: number
}
export default function CartIcon({ color, size }: Props) {
  const iconSize = size ? size : 28
  const strokeColor = color ? color : 'white'
  return (
    <>
      <svg
        width={iconSize}
        height={iconSize}
        className="icon"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.02096 12.0768H16.4594L17.6133 6.30762H6.07481C5.99043 6.30793 5.90714 6.32674 5.83083 6.36274C5.75451 6.39873 5.68701 6.45103 5.6331 6.51594C5.57919 6.58085 5.54018 6.6568 5.51881 6.73843C5.49744 6.82006 5.49423 6.90538 5.50942 6.98839L6.45558 11.6038C6.47765 11.7372 6.54683 11.8583 6.65056 11.9451C6.7543 12.0319 6.88572 12.0787 7.02096 12.0768V12.0768Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.6133 6.30763L18.0979 4.46148C18.1245 4.33117 18.1953 4.21405 18.2983 4.12994C18.4014 4.04584 18.5303 3.99991 18.6633 3.99994H20.4979"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.4594 12.0768L15.9748 14.4999C15.9482 14.6302 15.8773 14.7474 15.7743 14.8315C15.6713 14.9156 15.5424 14.9615 15.4094 14.9615H8.38245"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.95937 19C9.27799 19 9.53629 18.7417 9.53629 18.4231C9.53629 18.1044 9.27799 17.8461 8.95937 17.8461C8.64074 17.8461 8.38245 18.1044 8.38245 18.4231C8.38245 18.7417 8.64074 19 8.95937 19Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.7287 19C15.0473 19 15.3056 18.7417 15.3056 18.4231C15.3056 18.1044 15.0473 17.8461 14.7287 17.8461C14.41 17.8461 14.1517 18.1044 14.1517 18.4231C14.1517 18.7417 14.41 19 14.7287 19Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx>{`
        .icon:hover {
          color: green;
        }
      `}</style>
    </>
  )
}

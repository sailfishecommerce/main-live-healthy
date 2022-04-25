interface Props {
  className: string;
  text: string;
  onClick?: () => void;
  type: "button" | "reset" | "submit";
}

export default function Button({ className, text, onClick, type }: Props) {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
      <style jsx>
        {`
          .light-green {
            background-color: var(--mountain-green);
            color: white;
            padding: 10px;
            border-radius: 10px;
          }
          .light-green:hover {
            background-color: var(--mountain-mist);
          }
          .plain {
            border: 1px solid black;
            padding: 10px;
            border-radius: 10px;
          }
          .plain:hover {
            background-color: var(--mountain-green);
            color: white;
            border: none;
          }
        `}
      </style>
    </>
  );
}

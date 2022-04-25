export default function LoadingBar() {
  return (
    <>
      <div id="bar">
        <div></div>
      </div>
      <style jsx>
        {`
          #bar {
            position: fixed;
            z-index: 1000000;
            top: 0px;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 100%;
            height: 15px;
            background: #f9b3b3;
            overflow: hidden;
          }
          #bar div::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            background: #f54c4c;
            -webkit-animation: Line1 2100ms cubic-bezier(0.65, 0.81, 0.73, 0.4)
              infinite;
            animation: Line1 1000ms cubic-bezier(0.65, 0.81, 0.73, 0.4) infinite;
          }
          @keyframes Line1 {
            0% {
              left: -35%;
              right: 100%;
            }
            60%,
            100% {
              left: 100%;
              right: -90%;
            }
          }
          #bar div:after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            background: #f54c4c;
            -webkit-animation: Line2 2100ms cubic-bezier(0.16, 0.84, 0.44, 1)
              infinite;
            animation: Line2 1500ms cubic-bezier(0.16, 0.84, 0.44, 1) infinite;
            animation-delay: 20ms;
          }
          @keyframes Line2 {
            0% {
              left: -200%;
              right: 100%;
            }
            60%,
            100% {
              left: 107%;
              right: -8%;
            }
          }
        `}
      </style>
    </>
  );
}

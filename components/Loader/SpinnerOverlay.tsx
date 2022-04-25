import SpinnerRipple from '@/components/Loader/SpinnerLoader'

export default function SpinnerOverlay() {
  return (
    <>
      <div className="spinner-overlay">
        <SpinnerRipple />
      </div>
      <style jsx>
        {`
          .spinner-overlay {
            display: flex;
            width: 100%;
            position: fixed;
            top: 0px;
            left: 0;
            z-index: 400;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: #0000008c;
          }
        `}
      </style>
    </>
  )
}

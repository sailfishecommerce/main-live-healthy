import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { AiFillEdit, AiFillSave } from 'react-icons/ai'

export default function AdminContactusBlock({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const [content, setContent] = useState({
    edit: false,
    text: '',
  })

  function toggleTextAreaVisibility(status: boolean) {
    setContent({
      ...content,
      edit: status,
    })
  }
  const borderStyles = content.edit ? 'editting' : ''
  return (
    <>
      <div className="contactus-block relative">
        <div className="button-group absolute left-0">
          {!content.edit ? (
            <button
              type="button"
              className="button"
              onClick={() => toggleTextAreaVisibility(true)}
            >
              <AiFillEdit />
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => toggleTextAreaVisibility(false)}
            >
              <AiFillSave />
            </button>
          )}
        </div>
        <div
          className={`children-wrapper pl-8 ${borderStyles}`}
          contentEditable={content.edit}
        >
          {children}
        </div>
      </div>
      <style jsx>
        {`
          button.button {
            background-color: var(--color-1);
            height: 30px;
            width: 30px;
            color: var(--color-13);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-left: -5px;
            margin-top: 5px;
          }
          button.button:hover {
            background-color: var(--color-2);
          }
          .editting {
            border: 1px solid var(--color-1);
            max-width: 70%;
          }
        `}
      </style>
    </>
  )
}

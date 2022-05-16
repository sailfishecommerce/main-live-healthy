import { useMemo, useState } from 'react'
import type { BaseEditor } from 'slate'
import { createEditor } from 'slate'
import type { ReactEditor } from 'slate-react'
import { Slate, Editable, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function DashboardEditor() {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate value={initialValue} editor={editor}>
      <Editable />
    </Slate>
  )
}

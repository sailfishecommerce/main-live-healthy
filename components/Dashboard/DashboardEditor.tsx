import { EditorState } from 'draft-js'
import { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function DashboardEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  function onEditorStateChange(editorStateData: any) {
    setEditorState(editorStateData)
  }
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassNam"
      wrapperClassName="bg-white p-4 mt-4"
      editorClassName="h-full"
      onEditorStateChange={onEditorStateChange}
    />
  )
}

import { EditorState } from 'draft-js'
import { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function DashboardEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  console.log('editorState', editorState)
  const onEditorStateChange = (textEditorState: any) =>
    setEditorState(textEditorState)

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="bg-white h-96 mt-4 px-4 rounded-xl"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}

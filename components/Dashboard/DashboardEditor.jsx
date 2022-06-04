import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class DashboardEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    const content = window.localStorage.getItem(
      `${this.props?.editorKey}-content`
    )

    if (content) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      )
    } else {
      this.state.editorState = EditorState.createEmpty()
    }
  }

  saveContent = (content) => {
    window.localStorage.setItem(
      `${this.props.editorKey}-content`,
      JSON.stringify(convertToRaw(content))
    )
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
    console.log('content state', convertToRaw(contentState))
    this.saveContent(contentState)
    this.setState({
      editorState,
    })
  }

  render() {
    const { editorState } = this.state
    console.log('this.props', this.props)

    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassNam"
        wrapperClassName="bg-white p-4 mt-4"
        editorClassName="h-full"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}

export default DashboardEditor

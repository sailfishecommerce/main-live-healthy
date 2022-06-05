import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import debounce from 'lodash.debounce'
import firebaseDatabase from '@/lib/firebaseDatabase'
class DashboardEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  componentDidMount() {
    const { readData } = firebaseDatabase()
    const databaseRefId = 'articles/' + this.props.editorKey
    const datafromDB = readData(databaseRefId)
    console.log('datafromDB', datafromDB)
  }
  // firebaseDatabase
  saveContent = debounce((content) => {
    const { writeData } = firebaseDatabase()
    const databaseRefId = 'articles/' + this.props.editorKey
    console.log('datbaseRefId')
    writeData(databaseRefId, {
      content: JSON.stringify(convertToRaw(content)),
    })
  }, 1000)

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
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

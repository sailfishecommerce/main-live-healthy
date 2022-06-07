import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import firebaseDatabase from '@/lib/firebaseDatabase'
import { getDatabase, ref, onValue } from 'firebase/database'
import debounce from 'lodash/debounce'

class DashboardEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const db = getDatabase()
    const databaseRefId = 'articles/' + this.props.editorKey + '/content'
    const dbRef = ref(db, databaseRefId)
    onValue(dbRef, (snapshot) => {
      const dbArticle = snapshot.val()

      if (dbArticle) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(dbArticle))
          ),
        })
      } else {
        this.setState({ editorState: EditorState.createEmpty() })
      }
    })
  }
  // firebaseDatabase
  saveContent = debounce((content) => {
    const { writeData } = firebaseDatabase()
    const databaseRefId = 'articles/' + this.props.editorKey
    console.log('datbaseRefId', databaseRefId)
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
    console.log('this.state', this.state)

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

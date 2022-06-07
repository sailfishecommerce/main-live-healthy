import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Component } from 'react'
import debounce from 'lodash/debounce'
import { BiSave } from 'react-icons/bi'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import firebaseDatabase from '@/lib/firebaseDatabase'

class DashboardEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
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
    this.setState({ loading: true })
    writeData(databaseRefId, {
      content: JSON.stringify(convertToRaw(content)),
    }).then(() => {
      this.setState({ loading: false })
    })
  }, 1000)

  saveArticleHandler = () => {
    const article = this.state.editorState.getCurrentContent()
    this.saveContent(article)
  }

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

    const buttonState = this.state.loading ? 'saving ...' : 'Save'

    return (
      <>
        <div className="policy mt-4 flex justify-between">
          <h1 className="text-xl">
            {this.props.editorKey?.toUpperCase().replaceAll('-', ' ')}
          </h1>
          <button
            type="button"
            className="text-base flex items-center bg-mountain-green py-1 rounded-md px-3 text-white"
            onClick={this.saveArticleHandler}
          >
            <BiSave className="mr-2" size={20} /> {buttonState}
          </button>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassNam"
          wrapperClassName="bg-white p-4 mt-4"
          editorClassName="h-full"
          onEditorStateChange={this.onEditorStateChange}
        />
      </>
    )
  }
}

export default DashboardEditor

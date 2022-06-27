import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Component } from 'react'
import debounce from 'lodash/debounce'
import { BiSave } from 'react-icons/bi'
import { withRouter } from 'next/router'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import firebaseDatabase from '@/lib/firebaseDatabase'
import toSlug from '@/lib/toSlug'
import { IoIosArrowBack } from 'react-icons/io'

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

      if (dbArticle && this.state?.editorState === undefined) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(dbArticle))
          ),
        })
      } else {
        this.setState({
          editorState: EditorState.createEmpty(),
        })
      }
    })
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router

    const queryValue =
      typeof query?.slug === 'string'
        ? query?.slug
        : query?.slug === undefined
        ? null
        : query?.slug[0]

    const formatEditorKey = prevProps?.editorKey.includes('blog/post')
      ? prevProps?.editorKey.split('/')[2]
      : prevProps?.editorKey

    console.log('formatEditorKey', formatEditorKey)

    if (formatEditorKey && query.slug && formatEditorKey !== queryValue) {
      const db = getDatabase()
      const databaseRefId = 'articles/' + this.props.editorKey + '/content'
      const dbRef = ref(db, databaseRefId)
      onValue(dbRef, (snapshot) => {
        const dbArticle = snapshot.val()
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(dbArticle))
          ),
        })
      })
    }
  }

  // firebaseDatabase
  saveContent = debounce((content) => {
    const { writeData } = firebaseDatabase()
    const createdTime = new Date()
    const articleType = this.props.type
      ? `/${toSlug(this.props?.blogPostTitle)}`
      : ''
    const databaseRefId = 'articles/' + this.props.editorKey + articleType
    const articleData = this.props.type
      ? {
          content: JSON.stringify(convertToRaw(content)),
          title: JSON.stringify(this.props.blogPostTitle),
          author: JSON.stringify(this.props.author),
          createdAt: JSON.stringify(createdTime.toISOString()),
        }
      : {
          content: JSON.stringify(convertToRaw(content)),
        }
    this.setState({ loading: true })
    writeData(databaseRefId, articleData).then(() => {
      this.setState({ loading: false })
    })
  }, 1000)

  saveArticleHandler = () => {
    const article = this.state.editorState.getCurrentContent()
    this.saveContent(article)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  goBack = () => {
    this.props.router.back()
  }

  render() {
    const { editorState } = this.state

    const buttonState = this.state.loading ? 'saving ...' : 'Save'
    const postTitle = this.props.title
      ? this.props.title
      : this.props.editorKey?.toUpperCase()?.replaceAll('-', ' ')

    const showButton = this.props?.type
      ? this.props.blogPostTitle.length > 5 && this.props.author
      : true

    return (
      <>
        <div className="policy -mt-4 flex justify-between">
          <div className="post-title flex items-center">
            <button
              className="mr-4 hover:bg-red-300 bg-red-500 text-white"
              onClick={this.goBack}
            >
              <IoIosArrowBack size={25} />
            </button>
            <h1 className="text-xl">{postTitle}</h1>
          </div>
          {showButton && (
            <button
              type="button"
              className="text-base flex items-center bg-mountain-green py-1 rounded-md px-3 text-white"
              onClick={this.saveArticleHandler}
            >
              <BiSave className="mr-2" size={20} /> {buttonState}
            </button>
          )}
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

export default withRouter(DashboardEditor)

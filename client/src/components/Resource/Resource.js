import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import axios from "axios"
import MicrolinkCard from '@microlink/react'
import './Resource.css'


class Resource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      title: '',
      author:[],
      url: '',
      duration:'',
      description: '',
      upvotes: 0,
      views: 0,
      notes: '',
      media: '',
      mediaType: '',
      institution: '',
      categories: [],
      level: '',
      path: [],
      position: 0,
      pathPosition: [],
      open:false,
      expanded: false
    }
  }

  componentDidMount = () => {
    let resource = this.props
    this.setState({
      _id: resource._id,
      title: resource.title,
      author:resource.author,
      url: resource.url,
      duration: resource.duration,
      description: resource.description,
      upvotes: resource.upvotes,
      views: resource.views,
      notes: resource.notes,
      media: resource.media,
      mediaType: resource.mediaType,
      institution: resource.institution,
      categories: resource.categories,
      level: resource.level,
      path: resource.path,
      position: resource.position,
      pathPosition: resource.pathPosition
    })
  }



  handleUpvote = () => {
    const upvoted = this.state.upvotes + 1
    this.setState({upvotes:upvoted})
    axios.put("/api/resources/" + this.state._id, {
      upvotes: upvoted
    })
    this.props.history.push('/')
  }

  handleUpViews = () => {
    const viewed = this.state.views + 1
    this.setState({views:viewed})
    axios.put("/api/resources/" + this.state._id, {
      views: viewed
    })
  }

  handleOpen = () => {
    this.handleUpViews()
    if(this.state.media) {
      window.open(this.state.media)
    } else {
      window.open(this.state.url)
    }
  }

  render() {
    // console.log('this.props.history', this.props.history);
    return (
      <div className="list-item">
          <div className="Resource">
            <div className="resource-body">

                <p className="small-text">
                <span onClick={this.handleUpvote}>
                  <FontAwesome
                    className='heart'
                    name='heart'
                    style={{ padding: 5, margin:0}}
                  /> {this.state.upvotes}</span>
                <span>
                  <FontAwesome
                  className='icon'
                  name='eye'
                  style={{ padding: 5, margin:0}}
                />{this.state.views}</span>
                </p>


              <h5 className={this.state.category}>
                <span>Rank:{this.props.index + 1}.</span>
                <span>Upvotes:{this.state.upvotes}</span>
                <span>Views:{this.state.upvotes}</span>
                <MicrolinkCard url={this.state.url} target='_blank' size='large' />
              </h5>
            </div>
          </div>
      </div>

    )
  }
}

export default Resource

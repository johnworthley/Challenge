import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios'
import EOSIOClient from './utils/eosio-client'
import IOClient from './utils/io-client'
import { updatePostsForCreateAndEdit, updatePostsForLike, updatePostsForDelete } from './utils/posts-updater'
import CreatePost from './CreatePost/CreatePost'
import Posts from './Posts/Posts'
import RealLogo from './assets/styles/img/logoReal.png';
import Splash from './screens/Splash';
import PrimarySearchAppBar from './components/appBar';
import ECOESList from './components/eventList';
import JJ from './jj.js';
import { ECONNRESET } from 'constants';

class App extends Component {


  render() {
    const routesInfo = [
      {
        path: '/',
        component: Splash,
        title: 'splash'
      },
      {
        path: '/home',
        component: Home,
        title: 'home'
      },
      {
        path: '/user',
        component: User,
        title: 'user',
      },
      {
        path: '/project',
        component: Project,
        title: 'project'
      }
    ];

    const routes = routesInfo.map( route => {
      return(
        <Route exact
          path = {route.path}
          render = {(props) => <route.component {...props} /> }
          key = {route.title}
        />
      )
    })

    return (
      <Router>
        <div>
          {routes}
        </div>
      </Router>
    )
  }
}

class User extends Component {
  state = {

  }

  // Instantiate shared eosjs helper and socket io helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
  }



  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }))
  }

  render () {
    const user = {
      name: 'Bob Walters',
      ranking: 27,
      badges: {
        sponsor: true,
        contributor: true,
      }
    };


    const projectInfo = [
      {
        name: 'Plant Trees 800 Trees Near Sydney',
        description: 'Native vegetation binds and nourishes our ancient soils; shelters and sustains wildlife; protects streams, wetlands, estuaries, and coastlines; absorbs carbon dioxide and emits oxygen. Help prevent land degradation, salinity and declining water quality, and biodiversity loss by planting trees.',
        funding: '453',
        txID: "aa166ab6fcfc5749d...",
      },
      {
        name: 'Clean 4 Acres Of Sydney',
        description: "Let's clean the streets. Upload pictures, before and after.",
        funding: '47',
        txID: "aa166ab6fcfc5749d...",
      }
    ];

    const projects = projectInfo.map( project => {
      return(
        <div className='infoContainer'>
          <div className='infoHeader'>
            <div style={{color:'#C6F1A9',fontWeight: 'bolder'}}>{project.name}</div>
            <div>
              <div> <span style={{color:'#70BE3C'}}>Earned:</span> <span style={{ color: '#92D169' }}>$</span> {project.funding}</div>
              <div style={{color:'grey'}}>tx id: <a style={{textDecoration:'underline', color:'grey'}} href="">{project.txID}</a></div>
            </div>
          </div>
          {project.description}
        </div>
      )
    })

    const projectInfoSponsor = [
      {
         timestamp: 1532704418,
         name : "Clean up the Great Pacific Garbage Patch",
         description : "The Great Pacific Garbage Patch stretches across 617,000 square miles of the northern Pacific Ocean, based on their survey, and plastics make up 99.9 percent of the trash in the patch. The international team took the extra step of conducting aircraft surveys — covering 120 square miles and snapping 7,300 photographs — so they could better calculate the amount of large pieces of plastic. Then, like prior studies, the team used math models and ocean current projections to estimate the scale of the Great Pacific Garbage Patch. What they found: The Great Pacific Garbage Patch stretches across 617,000 square miles of the northern Pacific Ocean, based on their survey, and plastics make up 99.9 percent of the trash in the patch. ",
         img1 : "https://s3.ca-central-1.amazonaws.com/oceaneos/turtle.png",
         img2 : "https://s3.ca-central-1.amazonaws.com/oceaneos/plasticocean.png",
         img3 : "https://s3.ca-central-1.amazonaws.com/oceaneos/deadturtle.png",
         startDatetime : "June 1st 2019 10 AM",
         endDatetime : "July 31st 2019 5 PM",
         location : "Pasific Ocean",
         address : "Lat: 33.507049, Long: -136.046652",
         locationimg : "https://s3.ca-central-1.amazonaws.com/oceaneos/ocean.png",
         owner : "Conservation Council for Hawai'i",
         funded: 350,
         txID: "aa166ab6fcfc5749d...",
      }
    ];

    const projectsSponsored = projectInfoSponsor.map( project => {
      return(
        <div className='infoContainer'>
          <div className='infoHeader'>
            <div style={{color:'#C6F1A9',fontWeight: 'bolder'}}>{project.name}</div>
            <div>
              <div> <span style={{color:'#70BE3C'}}>Funded:</span> <span style={{ color: '#92D169' }}>$</span> {project.funded}</div>
              <div style={{color:'grey'}}>tx id: <a style={{textDecoration:'underline', color:'grey'}} href="">{project.txID}</a></div>
            </div>
          </div>
          {project.description}
        </div>
      )
    })

    return (
      <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
        <div className='logo' style={{display: 'flex', flexDirection:'row'}}><img src={RealLogo} width="28px" height="28px" style={{marginRight:8}}/>
        <Link style={{color:'white',textDecoration:'none'}}to="/">ECOES</Link></div>
        <div className='main'>
          <div className='userContainer'>
            <div className='userHeader'>
              <div className="userHeaderRow1">
                <h2>{user.name}</h2>
                <span style={{fontWeight:'bold',marginTop:'20px'}}>Ranking: {user.ranking}</span>
              </div>
              <div className="userHeaderRow2">
                <div className='badgeGreen'> Sponsor </div>
                <div className='badgeBlue'> Contributor </div>
              </div>
            </div>

            <div className="userSponsorships">
              <h3>{user.name} is a Sponsor of</h3>
              <div className='userHeader'>
                {projectsSponsored}
              </div>
            </div>

            <div className='userContributions'>
              <h3>{user.name} is a Contributor of</h3>
              <div className='userHeader'>
                {projects}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Project extends Component {
  state = {

  }

  // Instantiate shared eosjs helper and socket io helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
  }



  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }))
  }

  render () {
    const user = {
      name: 'Bob Walters',
      ranking: 27,
      badges: {
        sponsor: true,
        contributor: true,
      }
    };


    const projectInfo = [
      {
         timestamp: 1532704418,
         title : "Clean up the Great Pacific Garbage Patch",
         description : "The Great Pacific Garbage Patch stretches across 617,000 square miles of the northern Pacific Ocean, based on their survey, and plastics make up 99.9 percent of the trash in the patch. The international team took the extra step of conducting aircraft surveys — covering 120 square miles and snapping 7,300 photographs — so they could better calculate the amount of large pieces of plastic. Then, like prior studies, the team used math models and ocean current projections to estimate the scale of the Great Pacific Garbage Patch. What they found: The Great Pacific Garbage Patch stretches across 617,000 square miles of the northern Pacific Ocean, based on their survey, and plastics make up 99.9 percent of the trash in the patch. ",
         img1 : "https://s3.ca-central-1.amazonaws.com/oceaneos/turtle.png",
         img2 : "https://s3.ca-central-1.amazonaws.com/oceaneos/plasticocean.png",
         img3 : "https://s3.ca-central-1.amazonaws.com/oceaneos/deadturtle.png",
         startDatetime : "June 1st 2019 10 AM",
         endDatetime : "July 31st 2019 5 PM",
         location : "Pasific Ocean",
         address : "Lat: 33.507049, Long: -136.046652",
         locationimg : "https://s3.ca-central-1.amazonaws.com/oceaneos/ocean.png",
         owner : "Conservation Council for Hawai'i",
         funding: 15000,
         route: "/user",
         creator: "Bob Walters"
      }
    ];

    const projects = projectInfo.map( project => {
      return(
        <div>
          <div className='userHeader'>
              <h2>{project.title}</h2>
          </div>
          <div className='buttonHolder'>
            <div style={{backgroundColor: '#92D169'}}><a href="">Fund</a></div>
            <div style={{backgroundColor: '#3C9BB4'}}><a href="">Participate</a></div>
          </div>
          <div style={{marginTop:"16px", marginBottom: '14px'}}><Link to={project.route} style={{textDecoration:'none',color:'gray'}}>Initiator: {project.creator}</Link></div>
          <div>
            <img src={project.img1} width="100%"/>
          </div>
          <div className='userHeader'>
            <div className='infoContainer'>
              <div className='infoHeader'>
                <div style={{color:'#C6F1A9',fontWeight: 'bolder'}}>Challenge Description</div>
                <div> <span style={{color:'#70BE3C'}}>Funding:</span> <span style={{ color: '#92D169' }}>$</span> {project.funding}</div>
              </div>
              {project.description}
            </div>
          </div>
        </div>
      )
    })

    const projectInfoSponsor = [
      {
        name: 'Ocean Samples Needed',
        description: 'Creating a database of the Ocean in Australia for management of potential hazards.',
        funding: '453',
      }
    ];

    const projectsSponsored = projectInfoSponsor.map( project => {
      return(
        <div className='infoContainer'>
          <div className='infoHeader'>
            <div style={{color:'#C6F1A9',fontWeight: 'bolder'}}>{project.name}</div>
            <div> <span style={{color:'#70BE3C'}}>Earned:</span> <span style={{ color: '#92D169' }}>$</span> {project.funding}</div>
          </div>
          {project.description}
        </div>
      )
    })

    return (
      <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
        <div className='logo' style={{display: 'flex', flexDirection:'row'}}><img src={RealLogo} width="28px" height="28px" style={{marginRight:8}}/>
        <Link style={{color:'white',textDecoration:'none'}}to="/">ECOES</Link></div>
        <div className='main'>
          <div className='userContainer'>
            <div>
                {projects}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Home extends Component {
  state = {
    createOpen: false,
    posts: []
  }

  // Instantiate shared eosjs helper and socket io helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
    this.loadPosts()
    this.io.onMessage('createpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    })
    this.io.onMessage('editpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    })
    this.io.onMessage('deletepost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }))
    })
  }

  // Load posts
  loadPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    this.setState({ posts: response.data.reverse() })
  }

  // Create a post
  createPost = async (post) => {
    try {
      const newPost = {
        ...post,
        _id: {
          timestamp: Math.floor(Date.now() / 1000),
          author: process.env.REACT_APP_EOSIO_ACCOUNT
        },
        author: process.env.REACT_APP_EOSIO_ACCOUNT
      }

      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'createpost', {
          timestamp: newPost._id.timestamp,
          author: newPost._id.author,
          ...post
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, newPost) }))
      this.toggleCreate()
    } catch (err) {
      console.error(err)
    }
  }

  // Edit a post
  editPost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'editpost',
        {
          timestamp: post._id.timestamp,
          author: post._id.author,
          ...post
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    } catch (err) {
      console.error(err)
    }
  }

  // Delete a post
  deletePost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'deletepost',
        {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }))
    } catch (err) {
      console.error(err)
    }
  }

  // Like a post
  likePost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'likepost', {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForLike(prevState, post) }))
    } catch (err) {
      console.error(err)
    }
  }

  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }))
  }

  render () {

    return (
      <div class="app">
        <div fixed>
          <PrimarySearchAppBar />
          <ECOESList />
          <JJ />
        </div>
        <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
          <div className='toggleCreate' onClick={this.toggleCreate} />
          <CreatePost createPost={this.createPost} />
          <div className='cards'>
            <Posts
              posts={this.state.posts}
              handleOnChange={this.handleOnChange}
              deletePost={this.deletePost}
              editPost={this.editPost}
              likePost={this.likePost}
            />
          </div>
        </div>
      </div>
    )
  }
}




App.displayName = 'App' // Tell React Dev Tools the component name

export default App

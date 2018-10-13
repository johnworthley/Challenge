import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import * as contentful from 'contentful'
import ECOES from './course'

const SPACE_ID = '5qkj239fkpnr'
const ACCESS_TOKEN = 'e7e6b7407abbc70352b8ba95e9ebc75afbf27fe09b315ac64e98ad6364c3f08b'

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class ECOESList extends Component {
    state = {
        Events: [],
        searchString: ''
    }

    constructor() {
        super()
        this.getECOES()
    }

    getECOES = () => {
        client.getEntries({
            content_type: 'ecoes',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({Events: response.items})
        })
        .catch((error) => {
            console.log("Error occured while fetching data")
            console.log(error)
        })
    }

    onSearchInputChange = (event) => {
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getECOES()
    }
  
    render() {
        return (
            <div>
                {this.state.Events ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for ECOES"
                            margin="normal"
                            onChange={this.onSearchInputChange} />
                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.Events.map(currentECOES => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <ECOES ecoes={currentECOES} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No ECOES found" }
            </div>
        )
    }
}
export default ECOESList;
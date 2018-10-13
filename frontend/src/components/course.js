import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const ECOES = (props) => {
    return(
        <div>
          { props.ecoes ? (
                <Card>
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                        image={props.ecoes.fields.image.fields.file.url}
                        title={props.ecoes.fields.eventName}
                        />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.ecoes.fields.eventName}
                        </Typography>
                        <Typography component="p">
                            {props.ecoes.fields.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" href={props.ecoes.fields.url} target="_blank">
                            Go To ECOES
                        </Button> 
                    </CardActions>
                </Card>
          ): null }  
        </div>
    )
}
export default ECOES
import {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import {signIn} from '../../utils/auth'
import redirect from '../../utils/redirect'
import {setAuthentication} from '../main/actions'

const styles = {
  card: {
    maxWidth: 400,
    minWidth: 400,
    margin: 50,
    padding: 5,
    flexGrow: 1
  },
  media: {
    height: 150,
    padding: 10
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMsg: null
    }
  }

  async handleLogin (event) {
    const res = await signIn(this.state.username, this.state.password)

    if (res.message) {
      this.setState({
        ...this.state,
        error: true,
        errorMsg: res.message
      })
    } else {
      const authInfo = { authenticated: res.auth, authData: res }

      this.props.setAuthentication(authInfo)

      const {query} = this.props.router
      const redirectUrl = query.url ? query.url : '/'

      redirect(redirectUrl)
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image='/static/Avinty.svg'
          title='Avinty'
        />
        <CardContent>
          <TextField
            placeholder='Enter your Username'
            label={this.state.error ? this.state.errorMsg : 'Username'}
            error={this.state.error}
            onChange={(event) => this.setState({username: event.target.value, error: false, errorMsg: null})}
          />
          <br />
          <TextField
            id='password-input'
            label='Password'
            error={this.state.error}
            type='password'
            autoComplete='current-password'
            margin='normal'
            onChange={(event) => this.setState({password: event.target.value, error: false, errorMsg: null})}
          />
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            onClick={(event) => this.handleLogin(event)}
          >login</Button>
        </CardActions>
      </Card>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    jwt: state.main.authData.jwt
  }
}

const mapDispatchToProps = {
  setAuthentication: (authInfo) => {
    return setAuthentication(authInfo)
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)))
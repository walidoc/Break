import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'

const BREAK_FREQUENCY_LENGTH = 30 * 1000
const BREAK_DURATION_LENGTH = 1 * 60 * 1000
const BREAK_POSTPONE_LENGTH = 3 * 60 * 1000

const Timer = ({ interval }) => {
  const duration = moment.duration(interval)
  const pad = n => (n >= 10 ? n : '0' + n)

  return (
    <Text style={styles.timer}>
      {pad(duration.hours())}:{pad(duration.minutes())}:
      {pad(duration.seconds())}
    </Text>
  )
}

const Message = ({ text }) => (
  <Text style={styles.text}>
    {text === 'breakFrequency' ? 'Next break in:' : 'Time for a break'}
  </Text>
)

export default class App extends Component {
  state = {
    breakFrequency: BREAK_FREQUENCY_LENGTH,
    breakDuration: BREAK_DURATION_LENGTH,
    breakPostpone: BREAK_POSTPONE_LENGTH,
    mode: 'breakFrequency'
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
    this.timer = setInterval(() => {
      const { breakFrequency, breakDuration } = this.state
      if (breakFrequency === 0) {
        this.setState({
          mode: 'breakDuration',
          breakFrequency: BREAK_FREQUENCY_LENGTH
        })
      }
      if (breakDuration === 0) {
        this.setState({
          mode: 'breakFrequency',
          breakDuration: BREAK_DURATION_LENGTH
        })
      }
      this.setState(prevState => ({
        [prevState.mode]: prevState[prevState.mode] - 1000
      }))
    }, 1000)
  }

  render() {
    const { mode } = this.state

    return (
      <View style={styles.container}>
        <Message text={mode} />
        <Timer interval={this.state[mode]} />
        <FontAwesome5 name="cog" size={24} color="#fff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingTop: 130
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 70,
    fontWeight: '200'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30
    // fontWeight: '200'
  }
})

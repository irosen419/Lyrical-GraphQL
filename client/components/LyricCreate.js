import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {

    constructor(props) {
        super(props)
        this.state = { content: "" }
    }

    submitLyric(e) {
        e.preventDefault()

        this.props.mutate({
            variables: { content: this.state.content, songId: this.props.songId },
        }).then(() => this.setState({ content: "" }))
    }

    render() {
        return (
            <form onSubmit={this.submitLyric.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    type="text"
                    value={this.state.content}
                    onChange={({ target: { value } }) => this.setState({ content: value })}
                />
                <input type="submit" value="Add Lyric" />
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyric($content: String, $songId: ID){
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export default graphql(mutation)(LyricCreate)
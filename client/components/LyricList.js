import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends Component {

    likeLyric(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    like: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        {likes}
                        <i
                            className="material-icons"
                            onClick={() => this.likeLyric(id, likes)}
                        >
                            thumb_up
                        </i>
                    </div>
                </li >
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
    mutation likeLyric($id: ID){
        likeLyric(id: $id) {
            id,
            content,
            likes
        }
    }
`

export default graphql(mutation)(LyricList)
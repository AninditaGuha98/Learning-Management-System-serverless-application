import React, { Component } from 'react'
import LexChat from "react-lex";

class LexBot extends Component {
    render() {
        return (
            <div>
                <LexChat botName="MyBot"
                    IdentityPoolId="us-east-1:ff90a4b3-ecab-4fb5-8fe1-4389235c8452"
                    placeholder="Placeholder text"
                    style={{ position: 'absolute' }}
                    backgroundColor="#FFFFFF"
                    height="500px"
                    headerText="Ask Me Anything" />
            </div>
        )
    }
}

export default LexBot

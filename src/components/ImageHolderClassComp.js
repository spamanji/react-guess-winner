import React from 'react';

export default class ImageHolderClassComp extends React.Component {
    constructor() {
        super();
        this.state = { loaded: false };
        console.log('class image holder');
    }

    render() {
        return (
            <div>
                {this.state.loaded ? null :
                    <img className={this.props.className} src={process.env.PUBLIC_URL + '/loading.png'} alt='loading' />
                }
                <img
                    className={this.props.className}
                    style={this.state.loaded ? {} : { display: 'none' }}
                    src={this.props.src}
                    onLoad={() => this.setState({ loaded: true })}
                    alt={this.props.full_name}
                    onClick={() => this.props.handleClick(this.state.loaded)}
                />
            </div>
        );
    }
}
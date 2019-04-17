import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class Release extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Release;
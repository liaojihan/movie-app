import React, {Component} from 'react'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class Film extends Component{
    render() {
        return (
            <h1>film</h1>
        );
    }
}

export default Film
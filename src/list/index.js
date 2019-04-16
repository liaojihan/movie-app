import React, {Component} from 'react'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class List extends Component{
    render() {
        return (
            <h1>list</h1>
        );
    }
}

export default List
import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import loadingImg from '../../images/Ripple-1s-99px.gif'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class Top10 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            success: false
        }
    }

    componentWillMount() {
        fetchJsonp(
            this.props.url,
            {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({
                    list: result['subjects'],
                    success: true
                })
            });
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId(3, id);
    };

    render() {
        const { list, success } = this.state;
        const rank = 'rank-index';
        const rank_top = 'rank-index-top';
        let li_list;
        if (success) {
            li_list = list.map( (value, index) => {
                return (
                    <li key={index}>
                        <a href="javascript:void(0);" onClick={(e) => this.movieItem(value.id, e)}
                           title={value.title}>
                            <span className="normal-span">
                                <i className={index < 3 ? rank + ' ' +rank_top : rank}>
                                    { index + 1 }
                                </i>
                                <span className="movie-name">
                                    {value.title}
                                </span>
                                <span className="movie-box">
                                    {value.rating.average}
                                </span>
                            </span>
                        </a>
                    </li>
                );
            });
        }else {
            li_list = <img src={loadingImg} alt="" className="loadingImg"/>
        }

        return (
            <div className="movie-top">
                <div className="head">
                    <span className="top-today">{this.props.title}</span>
                </div>
                <div className="movie-list">
                    <ul className="movie-ul">
                        {li_list}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Top10
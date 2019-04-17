import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import loadingImg from '../../images/Ripple-1s-99px.gif'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class TodayBox extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            success: false
        }
    }

    componentDidMount() {
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    static handlerBoxValue(number) {
        let box = '';
        if (number > Math.pow(10, 8)) {
            let box_count = (number / Math.pow(10, 8)).toFixed(2);
            box += box_count + '亿';
        }else if (Math.pow(10, 4) < number < Math.pow(10, 8)) {
            let box_count = (number / Math.pow(10, 4)).toFixed(2);
            box += box_count + '万';
        }else {
            box += number;
        }
        return box;
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId('today', id);
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
                        <a href="javascript:void(0);" onClick={(e) => this.movieItem(value.subject.id, e)}
                           title={value.subject.title}>
                            <span className="normal-span">
                                <i className={index < 3 ? rank + ' ' +rank_top : rank}>
                                    { index + 1 }
                                </i>
                                <span className="movie-name">
                                    {value.subject.title}
                                </span>
                                <span className="movie-box">
                                    {
                                        TodayBox.handlerBoxValue(value.box)
                                    }
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

export default TodayBox
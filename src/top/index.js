import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import staticImg from '../images/static-picture.png'
import { inject, observer } from 'mobx-react'
import loadingImg from '../images/Ripple-1s-200px.gif'
import './index.css'

@inject('appStore') 
@observer
class Top extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            success: false,
            pageCurrent: 1, //当前页码
            pageSize: 12, //本页size
            // pageTotal: 0 //总页数
            pageStart: 0
        }
    }

    laodList = () => {
        fetchJsonp(
            this.props.url + '&start=' + this.state.pageStart + '&count=' + this.state.pageSize,
            {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(result => {
                this.setState({
                    list: result,
                    success: true
                });
            });
    }

    componentDidMount() {
        this.laodList();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    componentWillUpdate(){
        this.laodList();
    }

    pageHandler = value => {
        if (this.state.pageCurrent === value){
            return;
        }
        this.setState({
            pageCurrent: value,
            pageStart: value * this.state.pageSize - this.state.pageSize
        });
    }

    render() {
        const {list, success} = this.state;
        let movie_list;
        let page_list;
        if (success){
            movie_list = list.subjects.map( (value, index) => {
                return (
                    <li key={index}>
                        <div className="li-img">
                            <img src={value.images.medium === null ?  staticImg : value.images.medium}/>
                        </div>
                        <div className="li-name">
                            <span>
                                {value.title}
                            </span>
                        </div>
                        <div className="li-score">
                            <span>
                                {value.rating.average}
                            </span>
                        </div>
                    </li>
                );
            });
        }else {
            movie_list = (
                loadingImg
            );
        }
        return (
           <div className="all-movie">
                <div className="all-content">
                    <div className="movie-title">
                        <h1>{success ? list.title : ''}</h1>
                    </div>
                    <div className="movie-container">
                        <div className="movie-list">
                            <ul>
                                {movie_list}
                                <div className="clear"></div>
                            </ul>
                        </div>
                        <div className="page-ul">
                            <ul className={this.state.pageTotal >= 1 ? 'active' : 'hide'}>
                                <li className={ this.state.pageCurrent === 1 ? 'active' : 'ban'}>
                                    <a href="javascript:void(0);" onClick={ (e) => this.pageHandler(1, e)}>
                                        1
                                    </a> 
                                </li>
                                <li className={ this.state.pageCurrent === 2 ? 'active' : 'ban'}>
                                    <a href="javascript:void(0);" onClick={ (e) => this.pageHandler(2, e)}>
                                        2
                                    </a>
                                </li>
                                <li className={ this.state.pageCurrent === 3 ? 'active' : 'ban'}>
                                    <a href="javascript:void(0);" onClick={ (e) => this.pageHandler(3, e)}>
                                        3
                                    </a>
                                </li>
                                <li className={ this.state.pageCurrent === 3 ? 'active' : 'ban'}>
                                    <a href="javascript:void(0);" onClick={ (e) => this.pageHandler(4, e)}>
                                        4
                                    </a>
                                </li>
                                <div className="clear"></div>
                            </ul>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default Top
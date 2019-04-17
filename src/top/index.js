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
            pageTotal: 0 //总页数
        }
    }

    componentDidMount() {
        fetchJsonp(
            this.props.url + '&start=' + 
            (this.state.pageCurrent * this.state.pageSize - this.state.pageSize) + 
            '&count=' + this.state.pageSize, 
            {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({
                    list: result,
                    success: true,
                    pageTotal: Math.floor( (result.count + this.state.pageSize - 1) / this.state.pageSize )
                });
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    pageCurrentHandler = value => {
        if (this.state.pageCurrent === value){
            return;
        }
        this.setState({
            pageCurrent: value
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

            var items = [];
            for (let i = 1; i <= this.state.pageTotal; i++){
                items.push(i);
            }

            page_list = items.map( (value, index) => {
                return (
                    <li key={index}>
                        <a href="javascript:void(0);" onClick={ (e) => this.pageCurrentHandler(value, e)} 
                        className={ this.state.pageCurrent === value ? 'active' : 'ban'}>
                            {value}
                        </a>
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
                                {page_list}
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
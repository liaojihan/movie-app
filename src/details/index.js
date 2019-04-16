import React, {Component} from 'react'
import { inject, observer } from 'mobx-react/index'
import './index.css'
import fetchJsonp from 'fetch-jsonp'
import staticImg from '../images/static-picture.png'

@inject('appStore') 
@observer 
class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: null,
            success: false,
            isClick: 0 // 是否被点击， 0:被点击, 1:没点击
        }
    }

    componentDidMount() {
        console.log(this.props.movie_id);
        fetchJsonp( this.props.url + this.props.movie_id,
            {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.setState({
                        message: result,
                        success: true
                    });
                });
    }

    tabClickHandler = index => {
        this.setState({
            isClick: parseInt(index)
        });
    }

    render() {
        const { message, success } = this.state;
        let div_list;
        let actor_list;
        const items = ['介绍', '演职人员', '奖项', '图集'];
        const tab = 'tab-title';
        if (success){
            div_list = items.map( (value, index) => {
                return (
                    <div key={index} className={this.state.isClick === index ? tab + ' active' : tab} 
                        onClick={ (e) => this.tabClickHandler(index, e)}>
                        {value}
                    </div>
                );
            });
            actor_list = message.casts.map( (value, index) => {
                return (
                    <li key={index}>
                        <img src={value.avatars.medium} alt=""/>
                        <p>{value.name}</p>
                        <div></div>
                    </li>
                );
            });
        }else {

        }
        return (
            <div className="movie-details">
                <div className="title">
                    <div className="area">
                        <div className="movie-img">
                            <img src={ success ? message.images.medium :staticImg } alt=""/>
                        </div>
                        <div className="movie-list">
                            <h3 className="movie-item">{ success ? message.title : ''}</h3>
                            <p className="movie-item">{ success ? message.aka[message.aka.length - 1] : ''}</p>
                            <div className="movie-item">{ success ? message.genres.join(', ') : ''}</div>
                            <div className="movie-item">{ success ? message.countries : ''}</div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="area">
                        <div className="item-list">
                            {div_list}
                        </div>
                        <div className="plot"></div>
                        <div className="office-list">
                            <div className="director"></div>
                            <div className="actor"></div>
                            <ul className="actor-ul">
                                {actor_list}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details
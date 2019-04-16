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
            success: false
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

    render() {
        const { message, success } = this.state;
        let div_list;
        let actor_list;
        const items = ['介绍', '演职人员', '奖项', '图集']
        if (success){
            div_list = items.map( (value, index) => {
                return (
                    <div key={index} className={index < 2 ? '' : ''}>
                        {value}
                    </div>
                );
            });
            actor_list = message.casts.map( (value, index) => {
                return (
                    <li key={index}>
                        <img src={value.avatars.medium} alt=""/>
                        <p>{value.name}</p>
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
                            <h3>{ success ? message.title : ''}</h3>
                            <p>{ success ? message.aka[message.aka.length - 1] : ''}</p>
                            <div>{ success ? message.countries : ''}</div>
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
import React, {Component} from 'react'
import all from '../../images/arrow_right.png'
import loadingImg from '../../images/Ripple-1s-200px.gif'
import fetchJsonp from 'fetch-jsonp'
import staticImg from '../../images/static-picture.png'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer 
class Soon extends Component{

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
                    list: result['entries'],
                    success: true
                })
            });
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId(3, id);
    };

    render() {
        const { list, success } = this.state;
        let dd_list;
        if (success){
            dd_list = list.map( (value, index) => {
                return (
                    <dd key={index}>
                        <div className="movie-item">
                            <a href="javascript:void(0);"
                               onClick={(e) => this.movieItem(value.id, e)} title={value.title}>
                                <img src={success ? value.images.small : staticImg}/>
                                <div className="position active">
                                    <span>
                                        {
                                            value.title.length > 6
                                                ?
                                                value.title.substring(0, 5) + '...'
                                                :
                                                value.title
                                        }
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className='run-date'>
                            {
                                value.pubdate ? value.pubdate.substring(5).replace('-', '月') + '日上映' : ''
                            }
                        </div>
                    </dd>
                );
            });
        }else {
            dd_list = <img src={loadingImg} alt="" className="loadingImg"/>
        }

        return (
            <div className="movie-grid">
                <div className="head">
                    <img src={all} alt=""/>
                    <span className="all"><a href="#">全部</a></span>
                    <span className="hot">{this.props.title}</span>
                </div>
                <div className="movie-list">
                    <dl className="movie_dl">
                        {dd_list}
                    </dl>
                </div>
            </div>
        );
    }
}

export default Soon
import React, { Component } from 'react';
// import './App.css';
import Header from './header'
import Container from "./container";
import Film from "./film"
import Top from "./top"
import Details from "./details"
import Release from "./release"
import Footer from "./footer";
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            detail_url: 'https://api.douban.com/v2/movie/subject/',
            film_url: 'https://api.douban.com/v2/movie/in_theaters',
            release_url: 'http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a',
            top_url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
        }
    }


    render() {
        return (
            <div className="App">
                <Header code={this.props.appStore.refreshCode}/>
                {
                    (
                        () => {

                            switch (this.props.appStore.refreshCode){

                                case 0:
                                    return <Container/>;

                                case 1:
                                    return <Film/>;

                                case 2:
                                    return <Release/>;

                                case 3:
                                    return <Top url={this.state.top_url}/>;

                                default:
                                    return <Details movie_id={this.props.appStore.id} url={this.state.detail_url}/>;

                            }
                        }
                    )()
                }
                <Footer/>
            </div>
        );
    }
}

export default App;

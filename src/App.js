import React, { Component } from 'react';
// import './App.css';
import Header from './header'
import Container from "./container";
import Film from "./film"
import List from "./list"
import Details from "./details"
import Footer from "./footer";
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            detail_url: 'https://api.douban.com/v2/movie/subject/'
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
                                    return <List/>;

                                case 3:
                                    return <Details movie_id={this.props.appStore.id} url={this.state.detail_url}/>;

                                default:
                                    return <Container/>

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

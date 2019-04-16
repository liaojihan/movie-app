import React from 'react'
import './index.css'
import topImage from '../images/film.jpg'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class Header extends React.Component{

    constructor(props){
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
        this.state = {
            isClick: this.props.code //a标签状态，是否被点击，0:未点击 1:被点击
        }
    }

    componentDidMount(){

    }

    handleStatus = index => {
        this.setState({
            isClick: parseInt(index)
        });
        this.props.appStore.refresh(parseInt(index));
    };

    render (){
        const nav_ul = ['首页', '电影', '榜单'];
        const nav_list = nav_ul.map( (value, index) => {
             return (
                 <li key={index}>
                    <a href="javascript:void(0);" onClick={(e) => this.handleStatus(index, e)}
                        className={this.props.appStore.refreshCode === index ? 'active' : ''}>
                        {value}
                    </a>
                 </li>
             );
        });
        return (
            // 导航栏内容
            <div className="top">
                <div className="content">
                    <div className="left">
                        <img src={topImage} alt=""/>
                    </div>
                    <div className="nav">
                        <ul>
                            {nav_list}
                        </ul>
                    </div>
                    <form>
                        <input type="search" placeholder="找影片、找影人" className="search"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Header

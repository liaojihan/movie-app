import { observable, action } from 'mobx'

class AppStore {

    @observable refreshCode = 0; // 0:首页，1:电影，2: 榜单， 3: 详情
    @observable id = 0;

    @action
    refresh (code) {
        this.refreshCode = code;
    }

    @action
    refreshCodeAndId(code, id){
        this.refreshCode = code;
        this.id = id;
    }

}

export default new AppStore()
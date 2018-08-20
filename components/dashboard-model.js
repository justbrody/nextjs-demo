import {computed, action, observable} from 'mobx'

export class DashboardModel {
    @observable id = ''
    @observable title = 'Dashboard'
    @observable module = ''
    @observable moduleType = ''
    @observable parameters = {}
    @observable.shallow navData = []
    // navData = []

    constructor (data) {
      this.setState(data)
    }

    @action setState ({id, title, module, parameters, navData, type}) {
      this.id = id
      this.title = title
      this.navData = navData
      this.module = module
      this.parameters = parameters
      this.type = type
      console.log(this.type)
    }

    @computed get info () {
      return `Dashboard; ${this.title} (${this.id}) ${this.module ? `[${this.module}]` : ''}`
    }

    @action currentModule (module) {
      this.module = module
    }
}

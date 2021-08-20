import { Component } from 'react'
import Header from './components/header'
import CreateForm from './components/create-form'
import ReportTable from './components/report-table'
import Footer from './components/footer'
import { hours } from './data'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      standReports: []
    }
  }

  handleCreate = (standData) => {
    const standReports = [...this.state.standReports, standData];
    this.setState({ standReports });
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <CreateForm onCreate={this.handleCreate} />
          <ReportTable hours={hours} reports={this.state.standReports} />
        </main>
        <Footer reports={this.state.standReports} />
      </div >
    );
  }
}

export default App;

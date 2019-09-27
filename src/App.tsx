import React from 'react';
import { Provider } from 'mobx-react';
import { seupRootStore } from './mst/setup';
import { VideoComponent } from './components/VideoComponent';
import { PicturesComponent } from './components/PicturesComponent';
import './App.css';

interface Props {}

interface State {
  rootTree: any;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootTree: null
    };
  }

  componentDidMount = () => {
    const { rootTree } = seupRootStore();
    this.setState({ rootTree });
  };

  render() {
    const { rootTree } = this.state;

    if (!rootTree) return null;
    return (
      <Provider rootTree={rootTree}>
        <div className='contentarea'>
          <VideoComponent />
          <PicturesComponent />
        </div>
      </Provider>
    );
  }
}

export default App;

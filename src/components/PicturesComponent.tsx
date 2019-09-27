import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Root } from '../mst';

interface PicturesComponentProps {
  rootTree?: Root;
}

@inject('rootTree')
@observer
class PicturesComponent extends React.Component<PicturesComponentProps> {
  render() {
    const { rootTree } = this.props;
    if (!rootTree) return null;
    const takenPicturesElem = rootTree.pictures.map((picture, idx) => {
      if (picture) {
        return (
          <img
            key={idx}
            //@ts-ignore
            src={picture.picture}
            className='photo'
            alt='The screen capture will appear in this box.'
          />
        );
      } else {
        return <p>No picture avalable</p>;
      }
    });
    return <div className='output'>{takenPicturesElem}</div>;
  }
}

export { PicturesComponent };

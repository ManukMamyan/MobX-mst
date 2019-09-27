import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Root } from '../mst';

interface VideoComponentProps {
  rootTree?: Root;
}

@inject('rootTree')
@observer
class VideoComponent extends React.Component<
  VideoComponentProps
> {
  private videoRef: any;
  private canvasRef: any;

  constructor(props: VideoComponentProps) {
    super(props);

    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const video = this.videoRef.current;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.log('An error occurred: ' + err);
      });
  }

  setVideoParams = () => {
    const { rootTree } = this.props;
    if (!rootTree) return null;
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    const {
      height,
      width,
      streaming,
      setHeight,
      setStreaming
    } = rootTree.videoInitialSetupParams;

    if (!streaming) {
      setHeight(video.videoHeight / (video.videoWidth / width));

      if(Number.isNaN(height)) {
          setHeight(width / (4 / 3))
      }

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      setStreaming();
    }
  };

  takePicture = () => {
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    const { rootTree } = this.props;
    if (!rootTree) return null;
    const { height, width } = rootTree.videoInitialSetupParams;
    const { onTakePicture } = rootTree

    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const picture = canvas.toDataURL('image/png');

    onTakePicture(picture);
  };
  render() {
    const { rootTree } = this.props;
    if (!rootTree) return null;
    return (
      <div>
        <h1>Demo проект - фото с камеры</h1>
        <p>Нажмите take photo, чтобы сфотографироваться.</p>
        <div className='camera'>
          <video
            ref={this.videoRef}
            id='video' onCanPlay={this.setVideoParams} 
          >
            Video stream not available.
          </video>
          <button id='startbutton' onClick={this.takePicture}>
            Take photo
          </button>
        </div>
        <canvas id='canvas' ref={this.canvasRef}></canvas>
      </div>
    );
  }
}

export { VideoComponent };

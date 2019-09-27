import { types, Instance, applySnapshot } from 'mobx-state-tree';

const Picture = types.model('Picture', {
  picture: types.string
});

const VideoInitialSetup = types.model('Video', {
  width: types.number,
  height: types.number,
  streaming: types.boolean
}).actions(self => {
  function setWidth(width: number) {
    applySnapshot(self, {
      ...self,
      width
    })
  }
  return { setWidth }
}).actions(self => {
  function setHeight(height: number) {
    applySnapshot(self, {
      ...self,
      height
    })
  }
  return { setHeight }
}).actions(self => {
  function setStreaming() {
    applySnapshot(self, {
      ...self,
      streaming: true
    })
  }
  return { setStreaming }
});

const RootModel = types.model('Root', {
  videoInitialSetupParams: VideoInitialSetup,
  pictures: types.array(Picture)
}).actions(self => {
  function onTakePicture(picture: string) {
    applySnapshot(self, {
      ...self,
      pictures: [...self.pictures, {picture}]
    })
  }
  return { onTakePicture }
});;

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type Video = Instance<typeof VideoInitialSetup>;
export type Picture = Instance<typeof Picture>;

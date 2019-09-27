import { RootModel } from '.';
import { onSnapshot } from 'mobx-state-tree';

export const seupRootStore = () => {
  const rootTree = RootModel.create({
    videoInitialSetupParams: {
      width: 320,
      height: 0,
      streaming: false
    },
    pictures: []
  });
  onSnapshot(rootTree, snapshot => console.log('snapshot: ', snapshot));
  return { rootTree };
};

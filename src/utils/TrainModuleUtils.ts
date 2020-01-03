import { TrainModule } from '../typings/TrainModule';
import { TrainLevel } from '../typings/TrainLevel';

export function getModules() {
  const moduleLevels: TrainLevel[] = [
    {
      index: 1,
      title: 'level 1',
      content: 'level 1 Content ....',
    },
    {
      index: 2,
      title: 'level 2',
      content: 'level 2 Content ....',
    },
  ];

  const modules: TrainModule[] = [
    {
      title: 'module 1',
      levels: moduleLevels,
    },
    {
      title: 'module 2',
      levels: moduleLevels,
    },
    {
      title: 'module 3',
      levels: moduleLevels,
    },
  ];

  return modules;
}

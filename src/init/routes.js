import machines from '../routes/machines.router';
import pods from '../routes/pods.router';
import index from '../routes';

export default app => {
  // Machines Router
  app.use('/api/machines', machines);

  // Pods Router
  app.use('/api/pods', pods);

  // Home Router
  app.use('/', index);
};

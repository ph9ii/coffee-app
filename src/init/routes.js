import machines from '../routes/machines.router';
import index from '../routes';

export default app => {
  // Machines Router
  app.use('/api/machines', machines);

  // Home Router
  app.use('/', index);
};

import { routerTransition } from './router.animations';

describe('routerTransition', () => {
  it('should get object', () => {
    expect(routerTransition).toBeTruthy();
    expect(typeof routerTransition).toEqual('object');
  });
});

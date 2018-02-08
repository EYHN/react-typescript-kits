import hitokotoData, {getHitokoto, fetchHitokoto} from 'containers/HomePage/saga';
import {put, takeLatest, call} from 'redux-saga/effects';
import {hitokotoLoaded, hitokotoLoadingError, loadHitokoto} from 'containers/HomePage/actions';
import {LOAD_HITOKOTO} from 'containers/HomePage/constants';

describe('getHitokoto Saga', () => {
  let getHitokotoGenerator: IterableIterator<any>;

  it('should call the fetchHitokoto function', () => {
    getHitokotoGenerator = getHitokoto();

    const callfetchDescriptor = getHitokotoGenerator.next().value;
    expect(callfetchDescriptor).toEqual(call(fetchHitokoto));
  });

  describe('after requests', () => {
    beforeEach(() => {
      getHitokotoGenerator = getHitokoto();

      const callfetchDescriptor = getHitokotoGenerator.next().value;
      expect(callfetchDescriptor).toMatchSnapshot();
    });

    it('should dispatch the hitokotoLoaded action if it requests the data successfully', () => {
      const hitokoto = '123';
      const putDescriptor = getHitokotoGenerator.next({hitokoto}).value;
      expect(putDescriptor).toEqual(put(hitokotoLoaded(hitokoto)));
    });

    it('should call the hitokotoLoadingError action if the response errors', () => {
      const response = new Error('Some error');
      const putDescriptor = getHitokotoGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(hitokotoLoadingError(response)));
    });
  });
});

describe('hitokotoData Saga', () => {
  let hitokotoDataSaga: IterableIterator<any>;

  beforeEach(() => {
    hitokotoDataSaga = hitokotoData();
  });

  it('should start task to watch for LOAD_HITOKOTO action', () => {
    const takeLatestDescriptor = hitokotoDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_HITOKOTO, getHitokoto));
  });

  it('should put LOAD_HITOKOTO action', () => {
    hitokotoDataSaga.next();
    const putDescriptor = hitokotoDataSaga.next().value;
    expect(putDescriptor).toEqual(put(loadHitokoto()));
  });
});

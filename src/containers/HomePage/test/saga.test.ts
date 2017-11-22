import hitokotoData, {getHitokoto} from 'containers/HomePage/saga';
import {put, takeLatest} from 'redux-saga/effects';
import {hitokotoLoaded, hitokotoLoadingError, loadHitokoto} from 'containers/HomePage/actions';
import {LOAD_HITOKOTO} from 'containers/HomePage/constants';

describe('getHitokoto Saga', () => {
  let getHitokotoGenerator: IterableIterator<any>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getHitokotoGenerator = getHitokoto();

    const callfetchDescriptor = getHitokotoGenerator.next().value;
    expect(callfetchDescriptor).toMatchSnapshot();

    const calljsonDescriptor = getHitokotoGenerator.next({json: () => ({})});
    expect(calljsonDescriptor).toMatchSnapshot();

    const getHitokotoDescriptor = getHitokotoGenerator.next({hitokoto: '123'});
    expect(getHitokotoDescriptor).toMatchSnapshot();
  });

  it('should dispatch the hitokotoLoaded action if it requests the data successfully', () => {
    const hitokoto = '123';
    const putDescriptor = getHitokotoGenerator.next(hitokoto).value;
    expect(putDescriptor).toEqual(put(hitokotoLoaded(hitokoto)));
  });

  it('should call the hitokotoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getHitokotoGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(hitokotoLoadingError(response)));
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

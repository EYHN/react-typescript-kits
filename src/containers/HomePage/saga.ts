import { hitokotoLoaded, hitokotoLoadingError, loadHitokoto } from 'containers/HomePage/actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_HITOKOTO } from 'containers/HomePage/constants';

export function* getHitokoto() {
  try {
    const res = yield call(fetch, 'https://sslapi.hitokoto.cn/');
    const data = yield call(res.json);
    const hitokoto = yield data.hitokoto;
    yield put(hitokotoLoaded(hitokoto));
  } catch (err) {
    yield put(hitokotoLoadingError(err));
  }
}

export default function* hitokotoData() {
  yield takeLatest(LOAD_HITOKOTO, getHitokoto);
  yield put(loadHitokoto());
}

import { hitokotoLoaded, hitokotoLoadingError, loadHitokoto } from 'containers/HomePage/actions';
import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_HITOKOTO } from 'containers/HomePage/constants';

export function* getHitokoto() {
  try {
    const res = yield fetch('https://sslapi.hitokoto.cn/');
    const data = yield res.json();
    const hitokoto = data.hitokoto;
    yield put(hitokotoLoaded(hitokoto));
  } catch (err) {
    yield put(hitokotoLoadingError(err));
  }
}

export default function* hitokotoData() {
  yield takeLatest(LOAD_HITOKOTO, getHitokoto);
  yield put(loadHitokoto());
}

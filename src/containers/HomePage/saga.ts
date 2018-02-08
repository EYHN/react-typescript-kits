import { hitokotoLoaded, hitokotoLoadingError, loadHitokoto } from 'containers/HomePage/actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_HITOKOTO } from 'containers/HomePage/constants';

export async function fetchHitokoto() {
  return fetch('https://sslapi.hitokoto.cn/').then(res => res.json());
}

export function* getHitokoto() {
  try {
    const data = yield call(fetchHitokoto);
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

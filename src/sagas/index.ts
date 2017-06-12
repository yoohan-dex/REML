import auth from './auth';
import resume from './resume';


export default function* rootSaga() {
  yield [
    auth(),
    resume(),
  ];
}
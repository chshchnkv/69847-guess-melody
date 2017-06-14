/**
 * Created by stanislavchashchnikov on 24.05.17.
 */
import showScreen from './show-screen';
import {getInitialState} from './state';

document.addEventListener(`DOMContentLoaded`, () => {
  showScreen(getInitialState());
});

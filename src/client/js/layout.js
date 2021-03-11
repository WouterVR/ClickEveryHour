import {MDCDialog} from "@material/dialog";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCTooltip} from '@material/tooltip';

const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
//@use "@material/dialog";

//@include dialog.core-styles;
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setAttribute("color","#FFFF");
//mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));


const tooltip = new MDCTooltip(document.querySelector('.mdc-tooltip'));

function showToolTip(){
    tooltip.isShown();
    console.log('onhoverring babayyyy');
}
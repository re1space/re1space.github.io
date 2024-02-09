var appES6;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/application.js":
/*!*******************************!*\
  !*** ./src/js/application.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/js/core/index.js");
/* harmony import */ var _components_Pages_MainPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Pages/MainPage */ "./src/js/components/Pages/MainPage.js");




// import LoginPage from './pages/LoginPage';
// import ObjectsPage from './pages/ObjectsPage';
// import TablesPage from './pages/TablesPage';

class Application extends _core__WEBPACK_IMPORTED_MODULE_0__["default"]
{
	constructor()
	{
		super();

		this.toast = document.querySelector('#main-page__toast-messages');

		// this.token = '12345654321';

		// this._modals = document.querySelector('#app-modals');
		// this._mainNode = document.querySelector('#app');

		// this._initRouter();


	}

	showMainPage()
	{
		// this.changePage(new MainPage(this).element);

		// !!! shitcode !! //
		this._mainPage = new _components_Pages_MainPage__WEBPACK_IMPORTED_MODULE_1__["default"](this);
	}

	// !!! shitcode !! //  
	addHistory(object)
	{
		this._mainPage.addHistoryElem(object);
	}

	// showLoginPage()
	// {
		// this.changePage(new LoginPage(this).element);
	// }

	// showLoginPage() {
	// 	this.changePage(new LoginPage(this).element);
	// }

	// showObjectsPage() {
	// 	if (!this.token) this.navigate('');
	// 	else this.changePage(new ObjectsPage(this).element);
	// }

	// showTablesPage(id) {
	// 	if (!this.token) this.navigate('');
	// 	else this.changePage(new TablesPage(this, id).element);
	// }

	// showStartPage() {
	// 	if (this.token) this.navigate('/objects/');
	// 	else this.showLoginPage();
	// }

	// _initRouter() {
	// 	this._router
	// 		.add(/objects\/(.*)/, this.showTablesPage.bind(this))
	// 		.add(/objects/, this.showObjectsPage.bind(this))
	// 		.add('', this.showStartPage.bind(this));
	// }

	// logout() {
	// 	this.token = false;
	// 	this.navigate('');
	// }

	start()
	{
		// this._router.start();
		this.showMainPage();
	}
}

const application = new Application();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (application);

/***/ }),

/***/ "./src/js/components/Core/Page.js":
/*!****************************************!*\
  !*** ./src/js/components/Core/Page.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/js/components/Core/View.js");


class Page
{
	constructor(app, templ)
	{
		this._app = app;
		this._view = new _View__WEBPACK_IMPORTED_MODULE_0__["default"](templ);
	}

	get element()
	{
		return this._view.element;
	}
}

/***/ }),

/***/ "./src/js/components/Core/View.js":
/*!****************************************!*\
  !*** ./src/js/components/Core/View.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });

class View
{
	constructor(templ, tag = false)
	{
		const element = document.createElement('template');
		element.innerHTML = templ;
		
		this._element = tag ? element.content.querySelector(tag) : element.content;
	}

	get element() { return this._element; }
}

/***/ }),

/***/ "./src/js/components/Dialog/Element.js":
/*!*********************************************!*\
  !*** ./src/js/components/Dialog/Element.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Element),
/* harmony export */   getElem: () => (/* binding */ getElem)
/* harmony export */ });
/* harmony import */ var _Core_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/View */ "./src/js/components/Core/View.js");


class Element extends _Core_View__WEBPACK_IMPORTED_MODULE_0__["default"]
{
	constructor(dialog, object)
	{
		super(template(object), 'div');

		this._dialog = dialog;
		this._object = object;


		this._btnPlay = this.element.querySelector('.dialog-card__btn-play');
		this._btnDel = this.element.querySelector('.dialog-card__btn-del');

		this._initHandlers();
	}

	_initHandlers()
	{
		this._btnPlay.addEventListener('click', this._onPlayBtnClick.bind(this));
		this._btnDel.addEventListener('click', this._onDeleteBtnClick.bind(this));

		this.element.addEventListener('dragstart', this._dragStartHandler.bind(this));
		this.element.addEventListener('dragover', this._dragMoveHandler.bind(this));
		this.element.addEventListener('dragend', this._dragEndHandler.bind(this));

		this.element.addEventListener('touchstart', this._dragStartTouchHandler.bind(this));
		this.element.addEventListener('touchmove', this._dragMoveHandler.bind(this));
		this.element.addEventListener('touchend', this._dragEndHandler.bind(this));
	}

	_onPlayBtnClick(e)
	{
		if (this._btnPlay.classList.contains('play'))
		{
			this.play();
		}
		else this.pause();
	}

	async play(dialog)
	{
		this._btnPlay.classList.remove('play');
		this._btnPlay.classList.add('pause');

		if (!this._audio) this._audio = new Audio(this._object.file);

		this._audio.play();

		await new Promise((res, rej) =>
		{
			this._audio.addEventListener('ended', () => res());
			this._audio.addEventListener('error', () => rej());
		});

		this._btnPlay.classList.remove('pause');
		this._btnPlay.classList.add('play');
	}

	async pause()
	{
		this._btnPlay.classList.remove('pause');
		this._btnPlay.classList.add('play');

		if (!this._audio) return;
		this._audio.pause();
	}

	_onDeleteBtnClick(e)
	{
		if (confirm('del?')) this._dialog.removeElem(this);
	}

	_dragStartTouchHandler(evt)
	{
		this._dragTouchHandler = setTimeout(() => this._dragStartHandler(evt), 1000);
	}

	_dragStartHandler(evt)
	{
		if (evt.type === 'touchstart')
		{
			document.getSelection().empty();
			evt.preventDefault();
		}
		getElem(evt.target).classList.add('drag');
	}

	_dragEndHandler(evt)
	{
		getElem(evt.target).classList.remove('drag');
		if (this._dragTouchHandler) clearTimeout(this._dragTouchHandler);
	}

	_dragMoveHandler(evt)
	{
		evt.preventDefault();

		let touchPos = evt.type === 'touchmove' ? evt.targetTouches[0].pageY - this.element.parentNode.offsetTop / 2 : 0;

		let activeElement;
		for (const elem of this._dialog.list)
		{
			if (elem.element.classList.contains('drag')) { activeElement = elem; break; }
		}

		if (!activeElement) return;

		let activeElementNode = activeElement.element;

		const currentElement = (evt.type === 'dragover') ? getElem(evt.target) : 
				(activeElementNode.previousElementSibling != null && touchPos < activeElementNode.previousElementSibling.getBoundingClientRect().bottom)
						? activeElementNode.previousElementSibling
						: (activeElementNode.nextElementSibling != null && touchPos > activeElementNode.nextElementSibling.getBoundingClientRect().top)
								? activeElementNode.nextElementSibling
								: activeElementNode;

		if (!currentElement.draggable) return;

		const isMove = (activeElementNode !== currentElement);

		if (!isMove) return;

		// const nextElement = (currentElement === activeElementNode.nextElementSibling)
		// 						? currentElement.nextElementSibling
		// 						: currentElement;
		// this.element.parentNode.insertBefore(activeElementNode, nextElement);


		const point = (currentElement === activeElementNode.nextElementSibling) ? 1 : -1;

		this._dialog.move(activeElement, point);
	}

	get id()
	{
		return this._object.id;
	}
}

const getElem = (node) => 
{
	while (node !== null && !node.classList.contains('dialog-list__card')) node = node.parentNode;
	return node;
}

const template = (elem) => `
	<div class="dialog-list__card" data-id="${elem.id}" draggable="true">
		<div class="dialog-card__btn-play play"></div>
		<div class="dialog-card__icon-type icon ${elem.type}${elem.sex}" alt="${elem.sex}"></div>
		<div class="dialog-card__label-name">${elem.name}:</div>
		<div class="dialog-card__label-text">${elem.text}</div>
		<div class="dialog-card__btn-del"></div>
	</div>`;


/***/ }),

/***/ "./src/js/components/Dialog/index.js":
/*!*******************************************!*\
  !*** ./src/js/components/Dialog/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dialog)
/* harmony export */ });
/* harmony import */ var _Core_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/View */ "./src/js/components/Core/View.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./src/js/components/Dialog/Element.js");




class Dialog extends _Core_View__WEBPACK_IMPORTED_MODULE_0__["default"]
{
	constructor(app)
	{
		super(template());

		this._app = app;
		// this._object = object;
		// this._cb = cb;

		this._list = [];
		this._listNode = this.element.querySelector('.dialog-list');
		this._btnPlay = this.element.querySelector('.dialog__btn-play');
		this._btnDownload = this.element.querySelector('.dialog__btn-download');

		this._initHandlers();

		// for (let counter = 5; counter--; ) this.addElemList({ id:counter, name:"Дмитрий#" + counter, type:"free", sex:"male", text:"Привет мир!" });
	}

	_initHandlers()
	{
		this._btnPlay.addEventListener('click', this._onPlayBtnClick.bind(this));
		this._btnDownload.addEventListener('click', this._onDownloadBtnClick.bind(this));
	}

	async _onPlayBtnClick()
	{
		if (this._btnPlay.classList.contains('play'))
		{
			this._play();
		}
		else this._pause();
	}

	async _play()
	{
		if (!this._list.length) return;

		this._btnPlay.classList.remove('play');
		this._btnPlay.classList.add('pause');

		if (this._currentPlay) this._currentPlay.play();
		else
		{
			for (const elem of this._list)
			{
				this._currentPlay = elem;
				await elem.play(this);
			}

			this._btnPlay.classList.remove('pause');
			this._btnPlay.classList.add('play');

			this._currentPlay = null;
		}
	}

	async _pause()
	{
		this._btnPlay.classList.remove('pause');
		this._btnPlay.classList.add('play');

		this._currentPlay.pause();
	}

	async _onDownloadBtnClick()
	{

		if (this._btnDownload.classList.contains('progress')) return;

		this._btnDownload.classList.add('progress');

		let audioIDs = [];
		for (let i = 0; i < this._list.length; ++i)
		{
			const elem = this._list[i];
			audioIDs.push(this._list[i].id);
		}

		const resp = await this._app.api.concatDialog(audioIDs);

		if (resp.data && resp.data.url)
		{
			const downloadNode = document.createElement('a');
			downloadNode.href = resp.data.url;
			downloadNode.download = resp.data.url;
			downloadNode.dispatchEvent(new MouseEvent('click'));
		}

		this._btnDownload.classList.remove('progress');
	}

	addElemList(object)
	{
		const elem = new _Element__WEBPACK_IMPORTED_MODULE_1__["default"](this, object);
		this._list.push(elem);
		this._listNode.appendChild(elem.element);
	}

	removeElem(elem)
	{
		this._list.splice(this._list.indexOf(elem), 1);
		this._listNode.removeChild(elem.element);
	}

	positionElement(elem)
	{
		return this._list.indexOf(elem);
	}

	move(elem, point)
	{
		const i = this._list.indexOf(elem);

		this._list[i] = this._list[i + point];
		this._list[i + point] = elem;

		this._listNode.insertBefore(elem.element, point == 1 && i == this._list.length - 2 ? null : this._list[point == 1 ? i + 2 : i].element);
	}

	get list()
	{
		return this._list;
	}
}

const template = () => `
	<div class="dialog-header"><h2>Создание диалога</h2></div>
	<div class="dialog-list"></div>
	<div class="dialog-footer">
		<div class="dialog__btn-play play">прослушать всe</div>
		<div class="dialog__btn-download">объединить и скачать</div>
	</div>`;

/***/ }),

/***/ "./src/js/components/History/Element.js":
/*!**********************************************!*\
  !*** ./src/js/components/History/Element.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Element)
/* harmony export */ });
/* harmony import */ var _Core_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/View */ "./src/js/components/Core/View.js");
/* harmony import */ var _libs_wavesurfer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/wavesurfer */ "./src/js/libs/wavesurfer.js");
/* harmony import */ var _libs_wavesurfer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_wavesurfer__WEBPACK_IMPORTED_MODULE_1__);



class Element extends _Core_View__WEBPACK_IMPORTED_MODULE_0__["default"]
{
	constructor(list, object, addElemToDialog)
	{
		super(template(object), 'div');

		this._list = list;
		this._object = object;
		this._addElemToDialog = addElemToDialog;

		this._spectogram = this.element.querySelector('.history-card__spectrogram');

		this._btnAdd = this.element.querySelector('.history-card__btn-add');
		this._btnPlay = this.element.querySelector('.history-card__btn-play');
		this._btnDownload = this.element.querySelector('.history-card__btn-download');
		this._btnDel = this.element.querySelector('.history-card__btn-del');

		// WaveSurfer.create({
		// 	container: this._spectogram,
		// 	waveColor: '#fff',
		// 	progressColor: '#F1EAF5',
		// 	url: `https://texttospeech.ru/${object.file}`,
		// });

		this._initHandlers();
	}

	_initHandlers()
	{
		this._btnAdd.addEventListener('click', this._onAddBtnClick.bind(this));
		this._btnPlay.addEventListener('click', this._onPlayBtnClick.bind(this));
		this._btnDownload.addEventListener('click', this._onDownloadBtnClick.bind(this));
		this._btnDel.addEventListener('click', this._onDeleteBtnClick.bind(this));
	}

	_onAddBtnClick(e)
	{
		this._addElemToDialog(this._object);
		
		this._btnAdd.classList.add('add');
		this._btnAdd.innerHTML = 'Добавлено';
		setTimeout(() => {
			this._btnAdd.classList.remove('add');
			this._btnAdd.innerHTML = 'Добавить в диалог';
		}, 1500);
	}

	_onPlayBtnClick(e)
	{
		if (this._btnPlay.classList.contains('play'))
		{
			this._btnPlay.classList.remove('play');
			this._btnPlay.classList.add('pause');
		}
		else
		{
			this._btnPlay.classList.remove('pause');
			this._btnPlay.classList.add('play');
		}
	}

	_onDownloadBtnClick(e)
	{

	}

	_onDeleteBtnClick(e)
	{
		if (confirm('del?')) this._list.removeChild(this.element);
	}
}

const template = (elem) => `
	<div class="history-list__card" data-id="${elem.id}">
		<div>
			<div class="history-card__label-id">${elem.id}</div>
			<div>
				<div class="history-card__btn-add">Добавить в диалог</div>
				<div class="history-card__btn-del"></div>
			</div>
		</div>
		<div>
			<div class="history-card__btn-play play"></div>
			<div class="history-card__btn-download"></div>
			<div class="history-card__spectrogram"></div>
		</div>
		<div>
			<div>
				<div class="history-card__icon-type icon ${elem.type}${elem.sex}" alt="${elem.sex}"></div>
				<div class="history-card__label-name">${elem.name}:</div>
				<div class="history-card__label-text">${elem.text}</div>
			</div>
			<div class="history-card__btn-more">больше информации</div>
		</div>
	</div>`;


// const template_new = (elem) => `
// 	<div class="history-list__card" data-id="${elem.id}">
// 		<div>
// 			<div class="history-card__label-id">${elem.id}</div>
// 			<div class="history-card__btn-del btn-icon del"></div>
// 		</div>
// 		<div>
// 			<div>
// 				<div class="history-card__btn-play btn-icon play"></div>
// 				<div class="history-card__btn-download btn-icon download"></div>
// 			</div>
// 			<div>
// 				<div class="history-card__spectrogram"></div>
// 				<div>
// 					<div>
// 						<div class="history-card__icon-type icon ${elem.type}${elem.sex}" alt="${elem.sex}"></div>
// 						<div class="history-card__label-name">${elem.name}:</div>
// 						<div class="history-card__label-text">${elem.text}</div>
// 					</div>
// 					<div class="history-card__btn-more">больше информации</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>`;

/***/ }),

/***/ "./src/js/components/History/index.js":
/*!********************************************!*\
  !*** ./src/js/components/History/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var _Core_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/View */ "./src/js/components/Core/View.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./src/js/components/History/Element.js");




class History extends _Core_View__WEBPACK_IMPORTED_MODULE_0__["default"]
{
	constructor(app, addElemToDialog)
	{
		super(template());

		this._app = app;
		// this._object = object;
		this._addElemToDialog = addElemToDialog;

		this._list = this.element.querySelector('.history-list');

		this._initHandlers();

		// // !!! DOMO !! //
		// var counter = 0;
		// while (++counter < 10)
		// 	this._list.appendChild(new Element(this._list, { id:counter, name:"Дмитрий#" + counter, type:"free", sex:"male", text:"Привет мир!" }, addElemToDialog).element);
	}

	_initHandlers() { }

	// !!! shitcode !!! //
	_addHistoryElement(object)
	{
		this._list.insertBefore(new _Element__WEBPACK_IMPORTED_MODULE_1__["default"](this._list, object, this._addElemToDialog).element, this._list.innerHTML == '' ? null : [...this._list.children][0])
	}
}

const template = () => `
	<div class="history-header">
		<h2>История преобразований:</h2>
	</div>
	<div class="history-list"></div>`;


/***/ }),

/***/ "./src/js/components/Pages/MainPage.js":
/*!*********************************************!*\
  !*** ./src/js/components/Pages/MainPage.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainPage)
/* harmony export */ });
/* harmony import */ var _History__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../History */ "./src/js/components/History/index.js");
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dialog */ "./src/js/components/Dialog/index.js");
/* harmony import */ var _Core_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Page */ "./src/js/components/Core/Page.js");





class MainPage extends _Core_Page__WEBPACK_IMPORTED_MODULE_2__["default"]
{
	constructor(app)
	{
		super(app, template);

		/// !!!! shitcode !!! ////
		this._view = document.body;
		/// !!!! shitcode !!! ////

		this._dialog = new _Dialog__WEBPACK_IMPORTED_MODULE_1__["default"](this._app);
		this._history = new _History__WEBPACK_IMPORTED_MODULE_0__["default"](this._app, this._dialog.addElemList.bind(this._dialog));

		this._initHandlers();
		this._drawHistory();
		this._drawDialog();
	}

	_initHandlers() { }

	// !! shitcode !! //
	addHistoryElem(object)
	{
		this._history._addHistoryElement(object);
	}

	_drawHistory()
	{
		const history_node = this._view.querySelector('#page-main__history');
		history_node.innerHTML = '';
		history_node.appendChild(this._history.element);
	}

	_drawDialog()
	{
		const dialog_node = this._view.querySelector('#page-main__dialog');
		dialog_node.innerHTML = '';
		dialog_node.appendChild(this._dialog.element);
	}
}

const template = ``;


/***/ }),

/***/ "./src/js/core/api.js":
/*!****************************!*\
  !*** ./src/js/core/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ API)
/* harmony export */ });

const HTTP_URL = 'https://texttospeech.ru/test_dialog/api/v1';

const HttpMethods = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
const { GET, POST, PUT, DELETE } = HttpMethods;

const ERROR = '{"status":500, "message":"Проверьте соединение с интернетом"}';

class API
{
	// async getRigStatus()

	async getAudios(object) { return await this._network(`/audios/`, GET, object); }
	async concatDialog(object) { return await this._network(`/dialog/`, POST, object); }

	async _network (api, method = GET, data = {})
	{
		const resp = await new Promise((load) =>
		{
			const _xhr = new XMLHttpRequest();

			_xhr.onload = () => load(_xhr.response);
			_xhr.onerror = () => load(ERROR);
			_xhr.ontimeout = () => load(ERROR);

			_xhr.open(method, `${HTTP_URL}${api}`);

			if (this._app.token) _xhr.setRequestHeader('X-Authorization', this._app.token);

			if (Object.keys(data).length) {
				_xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				_xhr.send(JSON.stringify(data));

			} else _xhr.send();
		});

		try
		{
			const json = JSON.parse(resp);
			if (json.status !== 200) throw new Error(`ERROR ${json.status}: ${json.message}`);
			if (json.message) this._app.showToast(json.message);

			return json;
		}
		catch (err)
		{
			this._app.showToast(err.message);
		}

		return false;
	}
}


/***/ }),

/***/ "./src/js/core/index.js":
/*!******************************!*\
  !*** ./src/js/core/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Core)
/* harmony export */ });
/* harmony import */ var _libs_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/toast */ "./src/js/libs/toast.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/js/core/api.js");




class Core
{
	constructor()
	{
		this._network = new _api__WEBPACK_IMPORTED_MODULE_1__["default"](this);
		this._restoreSession();
	}

	showToast(msg)
	{
		this._toast.show(msg, _libs_toast__WEBPACK_IMPORTED_MODULE_0__.ToastType.REGULAR);
	}

	showModal(modal)
	{
		this._modals.appendChild(modal);
	}

	changePage(page)
	{
		this._mainNode.innerHTML = '';
		this._mainNode.appendChild(page);
	}

	navigate(path)
	{
		this._router.navigate(path);
	}

	_restoreSession()
	{
		this.token = Store.get('token');
	}

	get api() { return this._network; }

	set toast(toastNode) { this._toast = new _libs_toast__WEBPACK_IMPORTED_MODULE_0__["default"](toastNode)}

	get token() { return this._token; }
	set token(token)
	{
		this._token = token === 'false' ? false : token;
		Store.set('token', this._token);
	}
}

class Store {
	static get(item) { return localStorage.getItem(item); }
	static set(item, value) { localStorage.setItem(item, value); }
}


/***/ }),

/***/ "./src/js/libs/toast.js":
/*!******************************!*\
  !*** ./src/js/libs/toast.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastType: () => (/* binding */ ToastType),
/* harmony export */   "default": () => (/* binding */ Toast)
/* harmony export */ });

const ToastType = { ERROR: 0, REGULAR: 1 };

const { ERROR, REGULAR } = ToastType;

const MESSAGE_HIDE_INTERVAL = 5000;

class Toast
{
	constructor(msgsNode)
	{
		this._msgsNode = msgsNode;
	}

	show(msg, type = REGULAR)
	{
		const msgNode = document.createElement('div');
		msgNode.classList.add('message');
		msgNode.innerHTML = template('', msg);

		if (type == ERROR) msgNode.classList.add('error');

		const cb = () => msgNode.remove();
		msgNode.querySelector('.message__btn-close').addEventListener('click', cb);

		setTimeout(() => cb(), MESSAGE_HIDE_INTERVAL);

		this._msgsNode.appendChild(msgNode);
	}

	hide()
	{
		this._msgsNode.innerHTML = '';
	}
}

const template = (caption, msg) => `
	<p class="message__message">
		<span class="message__caption">${caption}</span>
		<span class="message__text">${msg}</span>
	</p>
	<button class="message__btn-close">х</button>`;


/***/ }),

/***/ "./src/js/libs/wavesurfer.js":
/*!***********************************!*\
  !*** ./src/js/libs/wavesurfer.js ***!
  \***********************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";function t(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const e={decode:function(e,i){return t(this,void 0,void 0,(function*(){const t=new AudioContext({sampleRate:i});return t.decodeAudioData(e).finally((()=>t.close()))}))},createBuffer:function(t,e){return"number"==typeof t[0]&&(t=[t]),function(t){const e=t[0];if(e.some((t=>t>1||t<-1))){const i=e.length;let s=0;for(let t=0;t<i;t++){const i=Math.abs(e[t]);i>s&&(s=i)}for(const e of t)for(let t=0;t<i;t++)e[t]/=s}}(t),{duration:e,length:t[0].length,sampleRate:t[0].length/e,numberOfChannels:t.length,getChannelData:e=>null==t?void 0:t[e],copyFromChannel:AudioBuffer.prototype.copyFromChannel,copyToChannel:AudioBuffer.prototype.copyToChannel}}};const i={fetchBlob:function(e,i,s){var n,r;return t(this,void 0,void 0,(function*(){const o=yield fetch(e,s);{const e=null===(n=o.clone().body)||void 0===n?void 0:n.getReader(),s=Number(null===(r=o.headers)||void 0===r?void 0:r.get("Content-Length"));let a=0;const h=(n,r)=>t(this,void 0,void 0,(function*(){if(n)return;a+=(null==r?void 0:r.length)||0;const t=Math.round(a/s*100);return i(t),null==e?void 0:e.read().then((({done:t,value:e})=>h(t,e)))}));null==e||e.read().then((({done:t,value:e})=>h(t,e)))}return o.blob()}))}};class s{constructor(){this.listeners={}}on(t,e){return this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),()=>this.un(t,e)}once(t,e){const i=this.on(t,e),s=this.on(t,(()=>{i(),s()}));return i}un(t,e){this.listeners[t]&&(e?this.listeners[t].delete(e):delete this.listeners[t])}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class n extends s{constructor(t){super(),t.media?this.media=t.media:this.media=document.createElement("audio"),t.mediaControls&&(this.media.controls=!0),t.autoplay&&(this.media.autoplay=!0),null!=t.playbackRate&&this.onceMediaEvent("canplay",(()=>{null!=t.playbackRate&&(this.media.playbackRate=t.playbackRate)}))}onMediaEvent(t,e,i){return this.media.addEventListener(t,e,i),()=>this.media.removeEventListener(t,e)}onceMediaEvent(t,e){return this.onMediaEvent(t,e,{once:!0})}getSrc(){return this.media.currentSrc||this.media.src||""}revokeSrc(){const t=this.getSrc();t.startsWith("blob:")&&URL.revokeObjectURL(t)}setSrc(t,e){if(this.getSrc()===t)return;this.revokeSrc();const i=e instanceof Blob?URL.createObjectURL(e):t;this.media.src=i,this.media.load()}destroy(){this.media.pause(),this.revokeSrc(),this.media.src="",this.media.load()}play(){return this.media.play()}pause(){this.media.pause()}isPlaying(){return this.media.currentTime>0&&!this.media.paused&&!this.media.ended}setTime(t){this.media.currentTime=t}getDuration(){return this.media.duration}getCurrentTime(){return this.media.currentTime}getVolume(){return this.media.volume}setVolume(t){this.media.volume=t}getMuted(){return this.media.muted}setMuted(t){this.media.muted=t}getPlaybackRate(){return this.media.playbackRate}setPlaybackRate(t,e){null!=e&&(this.media.preservesPitch=e),this.media.playbackRate=t}getMediaElement(){return this.media}setSinkId(t){return this.media.setSinkId(t)}}class r extends s{constructor(t,e){let i;if(super(),this.timeouts=[],this.isScrolling=!1,this.audioData=null,this.resizeObserver=null,this.isDragging=!1,this.options=t,"string"==typeof t.container?i=document.querySelector(t.container):t.container instanceof HTMLElement&&(i=t.container),!i)throw new Error("Container not found");this.parent=i;const[s,n]=this.initHtml();i.appendChild(s),this.container=s,this.scrollContainer=n.querySelector(".scroll"),this.wrapper=n.querySelector(".wrapper"),this.canvasWrapper=n.querySelector(".canvases"),this.progressWrapper=n.querySelector(".progress"),this.cursor=n.querySelector(".cursor"),e&&n.appendChild(e),this.initEvents()}initEvents(){this.wrapper.addEventListener("click",(t=>{const e=this.wrapper.getBoundingClientRect(),i=(t.clientX-e.left)/e.width;this.emit("click",i)})),this.initDrag(),this.scrollContainer.addEventListener("scroll",(()=>{const{scrollLeft:t,scrollWidth:e,clientWidth:i}=this.scrollContainer,s=t/e,n=(t+i)/e;this.emit("scroll",s,n)}));const t=this.createDelay(100);this.resizeObserver=new ResizeObserver((()=>{t((()=>this.reRender()))})),this.resizeObserver.observe(this.scrollContainer)}initDrag(){!function(t,e,i,s,n=5){let r=()=>{};if(!t)return r;const o=o=>{if(2===o.button)return;o.preventDefault(),o.stopPropagation();let a=o.clientX,h=o.clientY,l=!1;const d=s=>{s.preventDefault(),s.stopPropagation();const r=s.clientX,o=s.clientY;if(l||Math.abs(r-a)>=n||Math.abs(o-h)>=n){const{left:s,top:n}=t.getBoundingClientRect();l||(l=!0,null==i||i(a-s,h-n)),e(r-a,o-h,r-s,o-n),a=r,h=o}},c=t=>{l&&(t.preventDefault(),t.stopPropagation())},u=()=>{l&&(null==s||s()),r()};document.addEventListener("pointermove",d),document.addEventListener("pointerup",u),document.addEventListener("pointerleave",u),document.addEventListener("click",c,!0),r=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",u),document.removeEventListener("pointerleave",u),setTimeout((()=>{document.removeEventListener("click",c,!0)}),10)}};t.addEventListener("pointerdown",o)}(this.wrapper,((t,e,i)=>{this.emit("drag",Math.max(0,Math.min(1,i/this.wrapper.clientWidth)))}),(()=>this.isDragging=!0),(()=>this.isDragging=!1))}getHeight(){return null==this.options.height?128:isNaN(Number(this.options.height))?"auto"===this.options.height&&this.parent.clientHeight||128:Number(this.options.height)}initHtml(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"});return e.innerHTML=`\n      <style>\n        :host {\n          user-select: none;\n        }\n        :host audio {\n          display: block;\n          width: 100%;\n        }\n        :host .scroll {\n          overflow-x: auto;\n          overflow-y: hidden;\n          width: 100%;\n          position: relative;\n          touch-action: none;\n        }\n        :host .noScrollbar {\n          scrollbar-color: transparent;\n          scrollbar-width: none;\n        }\n        :host .noScrollbar::-webkit-scrollbar {\n          display: none;\n          -webkit-appearance: none;\n        }\n        :host .wrapper {\n          position: relative;\n          overflow: visible;\n          z-index: 2;\n        }\n        :host .canvases {\n          min-height: ${this.getHeight()}px;\n        }\n        :host .canvases > div {\n          position: relative;\n        }\n        :host canvas {\n          display: block;\n          position: absolute;\n          top: 0;\n          image-rendering: pixelated;\n        }\n        :host .progress {\n          pointer-events: none;\n          position: absolute;\n          z-index: 2;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          overflow: hidden;\n        }\n        :host .progress > div {\n          position: relative;\n        }\n        :host .cursor {\n          pointer-events: none;\n          position: absolute;\n          z-index: 5;\n          top: 0;\n          left: 0;\n          height: 100%;\n          border-radius: 2px;\n        }\n      </style>\n\n      <div class="scroll" part="scroll">\n        <div class="wrapper">\n          <div class="canvases"></div>\n          <div class="progress" part="progress"></div>\n          <div class="cursor" part="cursor"></div>\n        </div>\n      </div>\n    `,[t,e]}setOptions(t){this.options=t,this.reRender()}getWrapper(){return this.wrapper}getScroll(){return this.scrollContainer.scrollLeft}destroy(){var t;this.container.remove(),null===(t=this.resizeObserver)||void 0===t||t.disconnect()}createDelay(t=10){const e={};return this.timeouts.push(e),i=>{e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout(i,t)}}convertColorValues(t){if(!Array.isArray(t))return t||"";if(t.length<2)return t[0]||"";const e=document.createElement("canvas"),i=e.getContext("2d").createLinearGradient(0,0,0,e.height),s=1/(t.length-1);return t.forEach(((t,e)=>{const n=e*s;i.addColorStop(n,t)})),i}renderBarWaveform(t,e,i,s){const n=t[0],r=t[1]||t[0],o=n.length,{width:a,height:h}=i.canvas,l=h/2,d=window.devicePixelRatio||1,c=e.barWidth?e.barWidth*d:1,u=e.barGap?e.barGap*d:e.barWidth?c/2:0,p=e.barRadius||0,m=a/(c+u)/o,g=p&&"roundRect"in i?"roundRect":"rect";i.beginPath();let v=0,f=0,b=0;for(let t=0;t<=o;t++){const o=Math.round(t*m);if(o>v){const t=Math.round(f*l*s),n=t+Math.round(b*l*s)||1;let r=l-t;"top"===e.barAlign?r=0:"bottom"===e.barAlign&&(r=h-n),i[g](v*(c+u),r,c,n,p),v=o,f=0,b=0}const a=Math.abs(n[t]||0),d=Math.abs(r[t]||0);a>f&&(f=a),d>b&&(b=d)}i.fill(),i.closePath()}renderLineWaveform(t,e,i,s){const n=e=>{const n=t[e]||t[0],r=n.length,{height:o}=i.canvas,a=o/2,h=i.canvas.width/r;i.moveTo(0,a);let l=0,d=0;for(let t=0;t<=r;t++){const r=Math.round(t*h);if(r>l){const t=a+(Math.round(d*a*s)||1)*(0===e?-1:1);i.lineTo(l,t),l=r,d=0}const o=Math.abs(n[t]||0);o>d&&(d=o)}i.lineTo(l,a)};i.beginPath(),n(0),n(1),i.fill(),i.closePath()}renderWaveform(t,e,i){if(i.fillStyle=this.convertColorValues(e.waveColor),e.renderFunction)return void e.renderFunction(t,i);let s=e.barHeight||1;if(e.normalize){const e=Array.from(t[0]).reduce(((t,e)=>Math.max(t,Math.abs(e))),0);s=e?1/e:1}e.barWidth||e.barGap||e.barAlign?this.renderBarWaveform(t,e,i,s):this.renderLineWaveform(t,e,i,s)}renderSingleCanvas(t,e,i,s,n,r,o,a){const h=window.devicePixelRatio||1,l=document.createElement("canvas"),d=t[0].length;l.width=Math.round(i*(r-n)/d),l.height=s*h,l.style.width=`${Math.floor(l.width/h)}px`,l.style.height=`${s}px`,l.style.left=`${Math.floor(n*i/h/d)}px`,o.appendChild(l);const c=l.getContext("2d");this.renderWaveform(t.map((t=>t.slice(n,r))),e,c);const u=l.cloneNode();a.appendChild(u);const p=u.getContext("2d");l.width>0&&l.height>0&&p.drawImage(l,0,0),p.globalCompositeOperation="source-in",p.fillStyle=this.convertColorValues(e.progressColor),p.fillRect(0,0,l.width,l.height)}renderChannel(t,e,i){const s=document.createElement("div"),n=this.getHeight();s.style.height=`${n}px`,this.canvasWrapper.style.minHeight=`${n}px`,this.canvasWrapper.appendChild(s);const o=s.cloneNode();this.progressWrapper.appendChild(o);const{scrollLeft:a,scrollWidth:h,clientWidth:l}=this.scrollContainer,d=t[0].length,c=d/h;let u=Math.min(r.MAX_CANVAS_WIDTH,l);if(e.barWidth||e.barGap){const t=e.barWidth||.5,i=t+(e.barGap||t/2);u%i!=0&&(u=Math.floor(u/i)*i)}const p=Math.floor(Math.abs(a)*c),m=Math.floor(p+u*c),g=m-p,v=(r,a)=>{this.renderSingleCanvas(t,e,i,n,Math.max(0,r),Math.min(a,d),s,o)},f=this.createDelay(),b=this.createDelay(),y=(t,e)=>{v(t,e),t>0&&f((()=>{y(t-g,e-g)}))},C=(t,e)=>{v(t,e),e<d&&b((()=>{C(t+g,e+g)}))};y(p,m),m<d&&C(m,m+g)}render(t){this.timeouts.forEach((t=>t.timeout&&clearTimeout(t.timeout))),this.timeouts=[],this.canvasWrapper.innerHTML="",this.progressWrapper.innerHTML="",this.wrapper.style.width="";const e=window.devicePixelRatio||1,i=this.scrollContainer.clientWidth,s=Math.ceil(t.duration*(this.options.minPxPerSec||0));this.isScrolling=s>i;const n=this.options.fillParent&&!this.isScrolling,r=(n?i:s)*e;if(this.wrapper.style.width=n?"100%":`${s}px`,this.scrollContainer.style.overflowX=this.isScrolling?"auto":"hidden",this.scrollContainer.classList.toggle("noScrollbar",!!this.options.hideScrollbar),this.cursor.style.backgroundColor=`${this.options.cursorColor||this.options.progressColor}`,this.cursor.style.width=`${this.options.cursorWidth}px`,this.options.splitChannels)for(let e=0;e<t.numberOfChannels;e++){const i=Object.assign(Object.assign({},this.options),this.options.splitChannels[e]);this.renderChannel([t.getChannelData(e)],i,r)}else{const e=[t.getChannelData(0)];t.numberOfChannels>1&&e.push(t.getChannelData(1)),this.renderChannel(e,this.options,r)}this.audioData=t,this.emit("render")}reRender(){if(!this.audioData)return;const t=this.progressWrapper.clientWidth;this.render(this.audioData);const e=this.progressWrapper.clientWidth;this.scrollContainer.scrollLeft+=e-t}zoom(t){this.options.minPxPerSec=t,this.reRender()}scrollIntoView(t,e=!1){const{clientWidth:i,scrollLeft:s,scrollWidth:n}=this.scrollContainer,r=n*t,o=i/2;if(r>s+(e&&this.options.autoCenter&&!this.isDragging?o:i)||r<s)if(this.options.autoCenter&&!this.isDragging){const t=o/20;r-(s+o)>=t&&r<s+i?this.scrollContainer.scrollLeft+=t:this.scrollContainer.scrollLeft=r-o}else if(this.isDragging){const t=10;this.scrollContainer.scrollLeft=r<s?r-t:r-i+t}else this.scrollContainer.scrollLeft=r;{const{scrollLeft:t}=this.scrollContainer,e=t/n,s=(t+i)/n;this.emit("scroll",e,s)}}renderProgress(t,e){isNaN(t)||(this.progressWrapper.style.width=100*t+"%",this.cursor.style.left=100*t+"%",this.cursor.style.marginLeft=100===Math.round(100*t)?`-${this.options.cursorWidth}px`:"",this.isScrolling&&this.options.autoScroll&&this.scrollIntoView(t,e))}}r.MAX_CANVAS_WIDTH=4e3;class o extends s{constructor(){super(...arguments),this.unsubscribe=()=>{}}start(){this.unsubscribe=this.on("tick",(()=>{requestAnimationFrame((()=>{this.emit("tick")}))})),this.emit("tick")}stop(){this.unsubscribe()}destroy(){this.unsubscribe()}}const a={waveColor:"#999",progressColor:"#555",cursorWidth:1,minPxPerSec:0,fillParent:!0,interact:!0,autoScroll:!0,autoCenter:!0,sampleRate:8e3};class h extends n{static create(t){return new h(t)}constructor(t){var e,i;super({media:t.media,mediaControls:t.mediaControls,autoplay:t.autoplay,playbackRate:t.audioRate}),this.plugins=[],this.decodedData=null,this.subscriptions=[],this.options=Object.assign({},a,t),this.timer=new o;const s=t.media?void 0:this.getMediaElement();this.renderer=new r(this.options,s),this.initPlayerEvents(),this.initRendererEvents(),this.initTimerEvents(),this.initPlugins();const n=this.options.url||(null===(e=this.options.media)||void 0===e?void 0:e.currentSrc)||(null===(i=this.options.media)||void 0===i?void 0:i.src);n&&this.load(n,this.options.peaks,this.options.duration)}initTimerEvents(){this.subscriptions.push(this.timer.on("tick",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),!0),this.emit("timeupdate",t),this.emit("audioprocess",t)})))}initPlayerEvents(){this.subscriptions.push(this.onMediaEvent("timeupdate",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),this.isPlaying()),this.emit("timeupdate",t)})),this.onMediaEvent("play",(()=>{this.emit("play"),this.timer.start()})),this.onMediaEvent("pause",(()=>{this.emit("pause"),this.timer.stop()})),this.onMediaEvent("emptied",(()=>{this.timer.stop()})),this.onMediaEvent("ended",(()=>{this.emit("finish")})),this.onMediaEvent("seeking",(()=>{this.emit("seeking",this.getCurrentTime())})))}initRendererEvents(){this.subscriptions.push(this.renderer.on("click",(t=>{this.options.interact&&(this.seekTo(t),this.emit("interaction",t*this.getDuration()),this.emit("click",t))})),this.renderer.on("scroll",((t,e)=>{const i=this.getDuration();this.emit("scroll",t*i,e*i)})),this.renderer.on("render",(()=>{this.emit("redraw")})));{let t;this.subscriptions.push(this.renderer.on("drag",(e=>{this.options.interact&&(this.renderer.renderProgress(e),clearTimeout(t),t=setTimeout((()=>{this.seekTo(e)}),this.isPlaying()?0:200),this.emit("interaction",e*this.getDuration()),this.emit("drag",e))})))}}initPlugins(){var t;(null===(t=this.options.plugins)||void 0===t?void 0:t.length)&&this.options.plugins.forEach((t=>{this.registerPlugin(t)}))}setOptions(t){this.options=Object.assign({},this.options,t),this.renderer.setOptions(this.options),t.audioRate&&this.setPlaybackRate(t.audioRate),null!=t.mediaControls&&(this.getMediaElement().controls=t.mediaControls)}registerPlugin(t){return t.init(this),this.plugins.push(t),this.subscriptions.push(t.once("destroy",(()=>{this.plugins=this.plugins.filter((e=>e!==t))}))),t}getWrapper(){return this.renderer.getWrapper()}getScroll(){return this.renderer.getScroll()}getActivePlugins(){return this.plugins}loadAudio(s,n,r,o){return t(this,void 0,void 0,(function*(){if(this.emit("load",s),this.isPlaying()&&this.pause(),this.decodedData=null,!n&&!r){const t=t=>this.emit("loading",t);n=yield i.fetchBlob(s,t,this.options.fetchParams)}if(this.setSrc(s,n),r)o=(yield Promise.resolve(o||this.getDuration()))||(yield new Promise((t=>{this.onceMediaEvent("loadedmetadata",(()=>t(this.getDuration())))})))||(yield Promise.resolve(0)),this.decodedData=e.createBuffer(r,o);else if(n){const t=yield n.arrayBuffer();this.decodedData=yield e.decode(t,this.options.sampleRate)}this.emit("decode",this.getDuration()),this.decodedData&&this.renderer.render(this.decodedData),this.emit("ready",this.getDuration())}))}load(e,i,s){return t(this,void 0,void 0,(function*(){yield this.loadAudio(e,void 0,i,s)}))}loadBlob(e,i,s){return t(this,void 0,void 0,(function*(){yield this.loadAudio("blob",e,i,s)}))}zoom(t){if(!this.decodedData)throw new Error("No audio loaded");this.renderer.zoom(t),this.emit("zoom",t)}getDecodedData(){return this.decodedData}exportPeaks({channels:t=1,maxLength:e=8e3,precision:i=1e4}={}){if(!this.decodedData)throw new Error("The audio has not been decoded yet");const s=Math.min(t,this.decodedData.numberOfChannels),n=[];for(let t=0;t<s;t++){const s=this.decodedData.getChannelData(t),r=Math.min(s.length,e),o=s.length/r,a=[];for(let t=0;t<r;t++){const e=s[Math.round(t*o)];a.push(Math.round(e*i)/i)}n.push(a)}return n}getDuration(){let t=super.getDuration()||0;return 0!==t&&t!==1/0||!this.decodedData||(t=this.decodedData.duration),t}toggleInteraction(t){this.options.interact=t}seekTo(t){const e=this.getDuration()*t;this.setTime(e)}playPause(){return t(this,void 0,void 0,(function*(){return this.isPlaying()?this.pause():this.play()}))}stop(){this.pause(),this.setTime(0)}skip(t){this.setTime(this.getCurrentTime()+t)}empty(){this.load("",[[0]],.001)}destroy(){this.emit("destroy"),this.plugins.forEach((t=>t.destroy())),this.subscriptions.forEach((t=>t())),this.timer.destroy(),this.renderer.destroy(),super.destroy()}}return h}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ "./src/js/application.js");

// import utils from './utils';

// application.start();

})();

appES6 = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=script.js.map
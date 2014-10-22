import Express = require('express');
import Enumerable = require('linq');
import Core = require('cw-core');
import Class = Core.Class;
import ViewBase = require('./ViewBase');

class View extends ViewBase {
	private _view: string;

	public static forge(app: Express.Application, view: string): View {
		var viewClass = require('views/' + view);
		return new viewClass(app);
	}

	public constructor(app: Express.Application, view: string = null) {
		super(app);
		if(view == null) {
			view = Class.getClassName(this).toLocaleLowerCase();
		}

		this._view = view;
	}

	public response(res: Express.Response): void {
		this.render((error: Error, html: string) => {
			if(error) {
				console.log(error);
			}
			res.send(html);
		});
	}

	renderContent(data: Object, callback: (error: Error, html: string) => void) {
		this.app.render(this._view, data, (err: Error, html: string) => {
			if(err) {
				console.log(err);
			}
			console.log('html:' + html);
			if(callback) {
				callback(err, html);
			}
		});
	}

	public set view(view: string) {
		this._view = view;
	}

	public get view(): string {
		return this.view;
	}
}

export = View;
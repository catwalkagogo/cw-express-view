import Express = require('express');
import Enumerable = require('linq');
import Promise = require('./Promise');
import Q = require('q');
import _ = require('underscore');
import IView = require('./IView');

class ViewBase implements IView {
	private _app: Express.Application;
	private _data: Object;

	public constructor(app: Express.Application, view: string = null) {
	}

	public render(callback: (error: Error, html: string) => void): void {
		var data = this._data;
		var children = Enumerable.from(this._data)
			.where(pair => pair.value.render)
			.toArray();

		var tasks: Q.Promise<{}>[] = [];
		children.forEach(pair => {
			var child = pair.value;
			var key = pair.key;
			tasks.push(Promise.createPromise<{}>(d => {
				this.onRenderChild(child);
				child.render((err: Error, html: string) => {
					if(err) {
						console.log(err);
					}
					d.resolve({
						name: key,
						html: html,
					});
				});
			}));
		});

		Q.all(tasks).then((results) => {
			results.forEach(result => {
				data[result['name']] = result['html'];
			});

			this.renderContent(data, callback);
		});
	}

	renderContent(data: Object, callback: (error: Error, html: string) => void) {
	}

	onRenderChild(view: IView) {
	}

	public get app(): Express.Application {
		return this._app;
	}

	public set(key: any, value: any = null): ViewBase {
		if(_.isString(key) || _.isNumber(key)) {
			console.log('set ' + key);
			this._data[key] = value;
		} else if(key instanceof Object || key instanceof Array) {
			this._data = _.extend(this._data, key);
		}
		return this;
	}

	public get(key: any = null) {
		if(!key) {
			return this._data;
		} else {
			return this._data[key];
		}
	}
}

export = ViewBase;
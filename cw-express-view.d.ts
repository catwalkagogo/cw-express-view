declare module "cw-express-view" {

import Express = require('express');

// ts/lib/IView.d.ts
interface IView {
    render(callback: (error: Error, html: string) => void): void;
}

// ts/lib/Promise.d.ts
class Promise {
    static createPromise<T>(func: (d: Q.Deferred<T>) => void, ...args: any[]): Q.Promise<T>;
}

// ts/lib/View.d.ts
class View extends ViewBase {
    private _view;
    static forge(app: Express.Application, view: string): View;
    constructor(app: Express.Application, view?: string);
    public response(res: Express.Response): void;
    public renderContent(data: Object, callback: (error: Error, html: string) => void): void;
    public view : string;
}

// ts/lib/ViewBase.d.ts
class ViewBase implements IView {
    private _app;
    private _data;
    constructor(app: Express.Application, view?: string);
    public render(callback: (error: Error, html: string) => void): void;
    public renderContent(data: Object, callback: (error: Error, html: string) => void): void;
    public onRenderChild(view: IView): void;
    public app : Express.Application;
    public set(key: any, value?: any): ViewBase;
    public get(key?: any): any;
}

}

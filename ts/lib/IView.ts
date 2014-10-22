interface IView {
	render(callback: (error: Error, html: string) => void): void;
}

export = IView;
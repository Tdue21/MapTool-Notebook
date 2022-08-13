/// <reference path="mvc.ts" />

class LibraryModel extends AbstractModel {

    protected initializeData(d: any): void {
        throw new Error("Method not implemented.");
    }
    protected handleInitializationError(e: Error): void {
        throw new Error("Method not implemented.");
    }
}

class LibraryView extends AbstractView {

    public initializeView() : void {

    }

}

class LibraryController extends AbstractController {

    protected initializeController(model: AbstractModel): void {

        (this.view as LibraryView).initializeView();
    }

    protected handleInitializationError(error: Error): void {
        throw new Error("Method not implemented.");
    }
}
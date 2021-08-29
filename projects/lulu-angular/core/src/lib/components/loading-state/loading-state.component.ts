import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "loading-state",
  templateUrl: "./loading-state.component.html",
  styleUrls: [ "./loading-state.component.scss" ],
})
export class LoadingStateComponent {
  public static nextId = 0;
  public contents: TemplateRef<any>;
  public visible: boolean;

  private _loading: boolean;

  @Input() public withMessage: boolean = false;
  @Input() public color;

  @Input() public id = `s-loading-state-${LoadingStateComponent.nextId++}`;

  @Input()
  public set loading(loading: boolean) {
      this._loading = loading;
      if (!loading)
        setTimeout(() => this.visible = loading, 500);
      else
        this.visible = loading;
  }

  public get loading() {
      return this._loading;
  }
}

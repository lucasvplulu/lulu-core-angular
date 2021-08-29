import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-toast-showcase",
    templateUrl: "./pagination-showcase.component.html",
})
export class PaginationShowcaseComponent implements OnInit {
    public pageOfItems: Array<any>;
    public allItens: any[]

    constructor() {
    }

    public ngOnInit() {
        this.allItens = Array(150).fill(0).map((x, i) => ({id: (i + 1), name: `Item ${ i + 1 }`}));
    }

    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }

}

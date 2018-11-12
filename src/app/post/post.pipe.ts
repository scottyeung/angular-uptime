import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchTextPipe implements PipeTransform {
    transform(logs: any[], searchText: string): any {
        if(!logs) return [];
        if(!searchText) return logs;

        searchText = searchText.toLowerCase();

        return logs.filter( log => {
            return log.reason.detail.toLowerCase().includes(searchText);
        });
    }
}
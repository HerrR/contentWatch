import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter',
  pure: false
})

export class StringFilterPipe implements PipeTransform {

  transform(value: any, args?: any[], unique?: boolean): any {
    if(!value) return;
    let uniqueSolutions: any[] = [];
    let filteredSolutions = value.filter((item) => {
      if(item.contentText == undefined) return true;
      if(unique){
        if(uniqueSolutions.indexOf(item.title) === -1){
          uniqueSolutions.push(item.title)
          return (item.contentText.toLowerCase().indexOf(args[0].toLowerCase()) != -1 || item.title.indexOf(args[0]) != -1);
        }
      }
      else{
        return (item.contentText.toLowerCase().indexOf(args[0].toLowerCase()) != -1 || item.title.indexOf(args[0]) != -1);
      }
    })
    args[1].displayedSolutions = filteredSolutions.length;
    return filteredSolutions;
  }
}
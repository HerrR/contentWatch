import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter'
})

export class StringFilterPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    if(!value) return;

    let filteredSolutions = value.filter((item) => {
      if(item.contentText == undefined) return true;
      return (item.contentText.toLowerCase().indexOf(args[0].toLowerCase()) != -1 || item.title.indexOf(args[0]) != -1);
    });
    args[1].displayedSolutions = filteredSolutions.length;
    return filteredSolutions;
  }
}
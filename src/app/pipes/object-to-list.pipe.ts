import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToList'
})
export class ObjectToListPipe implements PipeTransform {

  transform(value, args:string[]): any {
    let keys = [];
    for (let key in value) {
      if (key.substring(0, 1) != "$") {
        keys.push({key: key, value: value[key]})
      }
    }
    return keys;
  }

}
/*
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
*/
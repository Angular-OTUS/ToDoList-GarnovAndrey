import { Pipe, PipeTransform } from "@angular/core";
import { filterStatusTranslate } from "@app/models/filter.model"

@Pipe({
    name: "translateStatus",
    standalone: true
})
export class TranslateStatusPipe implements PipeTransform {
  transform(status: string): string {
      let translateStatus = filterStatusTranslate[status as keyof typeof filterStatusTranslate]
    return translateStatus;
  }
}

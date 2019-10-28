import {OperatorFunction, pipe} from 'rxjs';
import {MediaChange} from '@angular/flex-layout';
import {map} from 'rxjs/operators';

// HELPERS FOR CREATING RESPONSIVE MAT TABLES

export type DisplayedColumns = string[];

export interface ColumnsConfig {
  [mqAlias: string]: DisplayedColumns;
}

export function getColumnsConfig(defaultColumns: DisplayedColumns,
                                 excludeMd: DisplayedColumns, excludeSm: DisplayedColumns, excludeXs: DisplayedColumns): ColumnsConfig {
  const excludeAll = (columns: DisplayedColumns, excludeColumns: DisplayedColumns): DisplayedColumns => {
    excludeColumns.forEach(exCol => columns = columns.filter(col => col !== exCol));
    return columns;
  };
  const def = defaultColumns.slice();
  const md = excludeAll(def.slice(), excludeMd);
  const sm = excludeAll(md.slice(), excludeSm);
  const xs = excludeAll(sm.slice(), excludeXs);
  return {def, md, sm, xs};
}

export function toDisplayedColumns(columnsConfig: ColumnsConfig): OperatorFunction<MediaChange[], DisplayedColumns> {
  return pipe(
    map((changes: MediaChange[]) => changes[changes.length - 1].mqAlias),
    map(mqAlias => columnsConfig[columnsConfig[mqAlias] ? mqAlias : 'def'])
  );
}

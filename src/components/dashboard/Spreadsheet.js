import React from 'react';
import {
  EditingState,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  FilteringState,
  SearchState,
  IntegratedFiltering,
  SummaryState,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableEditColumn,
  TableFilterRow,
  TableInlineCellEditing,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
  SearchPanel,
  TableBandHeader,
  TableSummaryRow,
  TableFixedColumns,
  ExportPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import saveAs from 'file-saver';

const FocusableCell = ({ onClick, ...restProps }) => (
  <VirtualTable.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const summaryCalculator = (type, rows, getValue) => { //extend calculator sum to exclude NaN
  if (type === 'sum')
    return IntegratedSummary.defaultCalculator(type, rows.filter(row => !isNaN(getValue(row))), getValue)
  return IntegratedSummary.defaultCalculator(type, rows, getValue);
};

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'sbleos-spreadsheet.xlsx');
  });
};


class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.exporterRef = React.createRef();
  }

  startExport = (options) => {
    this.exporterRef.current.exportGrid(options);
  };

  render() {
    const {
      rows,
      headers,
      commitChanges,
      defaultSorting,
      disableSorting,
      disableColumns,
      disableFiltering,
      multilineColumnNames,
      columnBands,
      defaultHiddenColumnNames,
      customProviders,
      plugins,
      canDelete,
      summaryColumnNames,
      leftColumns,
      rightColumns,
      hasAccess
    } = this.props;

    return (
    <div className="card">
      {rows &&
        <React.Fragment>
          <Grid rows={rows} columns={headers} getRowId={row=>row.id}>
            {customProviders && customProviders.map((component, idx) => (
              <DataTypeProvider for={component['for']} formatterComponent={component['formatter']} key={idx}/>
            ))}

            <SortingState defaultSorting={defaultSorting} columnExtensions={disableSorting} />
            <FilteringState columnExtensions={disableFiltering}/>
            <SearchState />
            {hasAccess && <EditingState onCommitChanges={commitChanges} columnExtensions={disableColumns} />}
            {summaryColumnNames && <SummaryState totalItems={summaryColumnNames} />}

            <IntegratedSorting />
            <IntegratedFiltering />
            {summaryColumnNames && <IntegratedSummary calculator={summaryCalculator}/>}

            <VirtualTable
              cellComponent={FocusableCell}
              columnExtensions={multilineColumnNames && multilineColumnNames.map((columnName => (
                { columnName, wordWrapEnabled: true }
              )))}
            />
            <TableHeaderRow
              showSortingControls
              sortLabelComponent={({ onSort, children, direction }) => (
                <button type="button" className="btn btn-light btn-sm" onClick={onSort} >
                  {children}
                  &nbsp;
                  {(direction && <FontAwesomeIcon icon={direction === "asc" ? "arrow-up" : "arrow-down"} /> )}
                </button>
              )}
            />
            <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />
            {canDelete && hasAccess &&
              <TableEditColumn
                showDeleteCommand
                commandComponent={({ onExecute, ...restProps }) => (
                  <TableEditColumn.Command
                    onExecute={() => { if (window.confirm('Are you sure you wish to delete this event?')) onExecute() } }
                    {...restProps}
                  />
                )}
              />
            }
            {columnBands && columnBands.every(band => band.children) &&
              <TableBandHeader columnBands={columnBands} />
            }
            <TableFilterRow />
            {hasAccess && <TableInlineCellEditing startEditAction="doubleClick" />}
            {summaryColumnNames && <TableSummaryRow />}
            { (leftColumns || rightColumns) && <TableFixedColumns leftColumns={leftColumns} rightColumns={rightColumns} /> }


            <Toolbar />
            {plugins && plugins.map((plugin, idx) => (
              <span key={idx}>{plugin}</span>
            ))}
            <SearchPanel />
            <ColumnChooser
              toggleButtonComponent={({ onToggle, buttonRef }) => (
                <button type="button" className="btn btn-light btn-md" onClick={onToggle} ref={buttonRef} aria-label="Choose Visible Columns">
                  <FontAwesomeIcon icon="eye"/>
                </button>
              )}
            />
            <ExportPanel
              startExport={() => this.startExport()}
              toggleButtonComponent={({ buttonRef, onToggle }) => (
                <button type="button" className="btn btn-light btn-md" onClick={onToggle} ref={buttonRef} aria-label="Export as Excel spreadsheet">
                  <FontAwesomeIcon icon="file-export"/>
                </button>
              )}
            />
          </Grid>
          <GridExporter
            ref={this.exporterRef}
            rows={rows}
            columns={headers}
            onSave={onSave}
          />
        </React.Fragment>
      }
    </div>
    )
  }
}

export default Spreadsheet;
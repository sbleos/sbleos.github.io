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
  TableFixedColumns
} from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FocusableCell = ({ onClick, ...restProps }) => (
  <VirtualTable.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const StyleTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={({ value }) => (
      <div style={props.style}>{value}</div>
    )}
    {...props}
  />
)

const summaryCalculator = (type, rows, getValue) => { //extend calculator sum to exclude NaN
  if (type === 'sum')
    return IntegratedSummary.defaultCalculator(type, rows.filter(row => !isNaN(getValue(row))), getValue)
  return IntegratedSummary.defaultCalculator(type, rows, getValue);
};

class Spreadsheet extends React.Component {

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
      styles,
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
        <Grid rows={rows} columns={headers} getRowId={row=>row.id}>
          {styles && styles.map((format, idx) => (
            <StyleTypeProvider for={format['for']} style={format['style']} key={idx}/>
          ))}

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
              <button type="button" className="btn btn-light btn-sm m-3" onClick={onToggle} ref={buttonRef} aria-label="Choose Visible Columns">
                <FontAwesomeIcon icon="eye" onClick={onToggle}/>
              </button>
            )}
          />
        </Grid>
      }
    </div>
    )
  }
}

export default Spreadsheet;
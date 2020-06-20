import React from 'react';
import {
  EditingState,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  FilteringState,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableEditColumn,
  TableFilterRow,
  TableInlineCellEditing,
  TableColumnResizing,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
  SearchPanel,
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

class Spreadsheet extends React.Component {

  render() {
    const {
      rows,
      headers,
      commitChanges,
      defaultSorting,
      disableColumns,
      multilineColumnNames,
      styles,
      defaultHiddenColumnNames,
      customFormats,
      plugins,
      canDelete,
    } = this.props;

    const defaultColumnWidths = headers.map(header => ( {columnName: header['name'], width: 'auto'} ));

    return (
    <div className="card">
      {rows &&
        <Grid rows={rows} columns={headers} getRowId={row=>row.id}>
          {styles && styles.map((format, idx) => (
            <StyleTypeProvider for={format['for']} style={format['style']} key={idx}/>
          ))}

          {customFormats && customFormats.map((format, idx) => (
            <DataTypeProvider for={format['for']} formatterComponent={format['component']} key={idx}/>
          ))}


          <SortingState defaultSorting={defaultSorting} />
          <FilteringState />
          <SearchState />
          <EditingState onCommitChanges={commitChanges} columnExtensions={disableColumns} />

          <IntegratedSorting />
          <IntegratedFiltering />

          <VirtualTable
            cellComponent={FocusableCell}
            columnExtensions={multilineColumnNames && multilineColumnNames.map((columnName => (
              { columnName, wordWrapEnabled: true }
            )))}
          />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} resizingMode="nextColumn"/>
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
          {canDelete &&
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
          <TableFilterRow />
          <TableInlineCellEditing startEditAction="doubleClick" />

          <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />

          <Toolbar />
          {plugins && plugins.map((plugin, idx) => (
            <span key={idx}>{plugin}</span>
          ))}
          <SearchPanel />
          <ColumnChooser
            toggleButtonComponent={({ onToggle, buttonRef }) => (
              <button type="button" className="btn btn-light btn-sm m-3" onClick={onToggle} ref={buttonRef}>
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
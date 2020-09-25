import React from "react";
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export class PreviewTable extends React.Component {


    render() {
        if(this.props.preloadTable.body) {
            return (
                <Styles>
                    <div className="table-responsive relative">
                        <table className="table table-hover rent-table">
                            <thead>
                                <tr>
                                    {this.props.preloadTable.head.map((column, rowIndex) => {
                                        return (
                                            <th key={"header-" + rowIndex}>
                                                {column}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.preloadTable.body.map((row, rowIndex) => {
                                return (<tr key={"row-" + rowIndex}>
                                    {row.map((column, columnIndex) => {
                                        return (
                                            <th key={"row-" + rowIndex + "-column-" + columnIndex}>
                                                {column}
                                            </th>
                                        )
                                    })}
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </Styles>
            );
        }
    }
}

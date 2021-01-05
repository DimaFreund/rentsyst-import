import React from "react";
import {ListItem} from "./ListItem";
import styled from 'styled-components'

const Styles = styled.div`
  ul {
    li {
      margin-bottom: 12px;
      list-style-type: none;
      border: 2px solid;
      border-radius: 5px;
    
      .item-title {
        font-size: 20px;
        font-weight: bold;
        padding: 4px 15px;
    }
  }
  ul.brand-selector {
    padding-left: 22px
  }
`

export class ColumnConnector extends React.Component {

    render() {
        if (this.props.header) {
            let options = this.props.header.map((value,key) => {
                return {value: key, label: value};
            });
            options.unshift({
                value: 'set_static_value',
                label: 'Set custom value',
            });
            return (
                <Styles>
                    <ul className="column-list">
                        {this.props.columnSchema.map((columnOptions) =>
                            <ListItem
                                key={columnOptions.name}
                                options={options}
                                optionsCallback={columnOptions.optionsCallback}
                                handlerCallback={this.props.handlerCallback}
                                name={columnOptions.name}
                                title={columnOptions.title}
                                autoSelectedSave={this.props.autoSelectedSave}
                            />
                        )}
                    </ul>
                </Styles>
            )
        } else {
            return <p>
                First select file
            </p>
        }
    }
}

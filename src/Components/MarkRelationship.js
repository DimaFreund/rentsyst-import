import React from "react";
import {ListItem} from "./ListItem";
import {LiverSearch} from "./LiverSearch";

export class MarkRelationship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {options: {}, brandColumnIndex: null, rows: this.props.rows, fullList: this.loadFullList()};
    }
    loadFullList() {

        var request = new XMLHttpRequest();
        request.open('GET', this.props.optionUrl + "&limit=-1", false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText);
        } else {
            return {};
        }
    }

    handlerCallback = (name, value) => {
        let ruleProperty = {}
        ruleProperty.conformity = {};
        ruleProperty.conformity[name] = value.columnIndex;
        this.props.handlerCallback(this.props.name, ruleProperty);
    }

    autoSelectedSave = (name, value) => {
        let ruleProperty = {}
        ruleProperty.conformity = {};
        ruleProperty.conformity[name] = value.columnIndex;
        this.props.autoSelectedSave(this.props.name, ruleProperty);
    }

    selectBrand = (selectedOption, {columnIndex}) => {
        this.props.handlerCallback(this.props.name, {bonusIndex: columnIndex})
        this.setState({brandColumnIndex: columnIndex});
        this.updateOptions(this.props.markColumnIndex, columnIndex);
    }

    updateOptions = (markColumnId, brandColumnId) => {
        var rows = [];
        for(let i = 0; i < this.props.file.length; i++) {
            let value = this.props.file[i][brandColumnId] + '|' + this.props.file[i][markColumnId];
            // eslint-disable-next-line no-unused-expressions
            if(value && !rows.includes(value)) {
                rows.push(value);
            }
        }
        this.setState({rows: rows});
    }

    render() {
        let headerOptions = this.props.header.map((value,key) => {
            return {value: key, label: value};
        });
        return <div>
            <ul className="brand-selector">
            <ListItem
                key="brand_id"
                name="Select brand, if isset"
                options={headerOptions}
                handlerCallback={this.selectBrand}
            />
            </ul>
            <ul>
                {this.state.rows.map((value) =>
                    <LiverSearch
                        fullList={this.state.fullList}
                        key={value}
                        handlerCallback={this.handlerCallback}
                        name={value}
                        optionUrl={this.props.optionUrl}
                        autoSelectedSave={this.autoSelectedSave}
                    />
                )}
            </ul>
        </div>
    }

}

import React from "react";
import Select from "react-select";
import {selectMoreSimilarOption} from "../helpers/CompareStrings"

export class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            optionsContent: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = selectedOption => {
        this.props.handlerCallback(this.props.name, {columnIndex: selectedOption.value})
        this.setState({
            selectedOption,
            optionsContent:
                this.props.optionsCallback ?
                    this.props.optionsCallback(selectedOption.value) :
                    ''
        });
    };

    handleDefaultValue = event => {
        this.props.handlerCallback(this.props.name, {defaultValue: event.target.value})
    }

    render() {
        let { selectedOption, defaultValue, optionsContent } = this.state;
        if(!selectedOption) {
            selectedOption = selectMoreSimilarOption(this.props.options, this.props.name);
            if(this.props.autoSelectedSave && selectedOption.option) {
                this.props.autoSelectedSave(this.props.name, {columnIndex: selectedOption.option.value});
            }
        }

        return <li style={{background: selectedOption.color}}>
            <div className="item-title">
                {this.props.title ?? this.props.name}
            </div>
            <Select
                value={selectedOption.option}
                defaultValue={defaultValue}
                onChange={this.handleChange}
                options={this.props.options}
            />
            {optionsContent}
        </li>
    }
}

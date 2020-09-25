import React from "react";
import AsyncSelect from "react-select/async";
import {selectMoreSimilarOption} from "../helpers/CompareStrings"

export class LiverSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: null, optionsContent: null}
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

    loadOptions = (inputValue, callback, ) => {
        fetch(this.props.optionUrl + "&search=" + inputValue)
            .then(res => res.json())
            .then(
                (result) => {
                    callback(result);
                },
            )
    }

    searchCompareValue = () => {
        if(this.state.selectedOption) {
            return this.state.selectedOption;
        }
        if(this.props.fullList) {
            let selected = selectMoreSimilarOption(this.props.fullList, this.props.name);
            // this.props.handlerCallback(this.props.name, {columnIndex: selected.value})
            if(this.props.autoSelectedSave && selected.option) {
                this.props.autoSelectedSave(this.props.name, {columnIndex: selected.option.value});
            }
            return selected;
        }
        return {
            option: null,
            similarRate: 0
        }
    }

    render() {
        const selected = this.searchCompareValue();
        return <li style={{background: selected.color}} >{this.props.name}
            <AsyncSelect
                cacheOptions
                value={selected.option}
                loadOptions={this.loadOptions}
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
                onInputChange={this.handleInputChange}
            />
            {this.state.optionsContent}
        </li>
    }
}

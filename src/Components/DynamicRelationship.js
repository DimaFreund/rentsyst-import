import React from "react";
import {ListItem} from "./ListItem";

export class DynamicRelationship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {options: {}};
    }

    handlerCallback = (name, value) => {
        if(name !== 'set_static_value') {
            let ruleProperty = {}
            ruleProperty.conformity = {};
            ruleProperty.conformity[name] = value.columnIndex;
            this.props.handlerCallback(this.props.name, ruleProperty);
        } else {
            this.props.handlerCallback(this.props.name, {defaultValue: value.columnIndex});
        }

    }

    autoSelectedSave = (name, value) => {
        let ruleProperty = {}
        ruleProperty.conformity = {};
        ruleProperty.conformity[name] = value.columnIndex;
        this.props.autoSelectedSave(this.props.name, ruleProperty);
    }

    componentDidMount() {
        fetch(this.props.optionUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        options: result
                    });
                },
            )
    }

    render() {
        const options = this.state.options;
        if(this.props.columnIndex !== 'set_static_value') {
            return (
                <ul>
                    {this.props.rows.map((value) =>
                        <ListItem
                            key={value}
                            options={options}
                            handlerCallback={this.handlerCallback}
                            name={value}
                            autoSelectedSave={this.autoSelectedSave}
                        />
                    )}
                </ul>
            );
        } else {
            return (
                <ul>
                    <ListItem
                        key="set_static_value"
                        options={options}
                        handlerCallback={this.handlerCallback}
                        name="set_static_value"
                        autoSelectedSave={this.autoSelectedSave}
                    />
                </ul>
            )
        }
    }

}

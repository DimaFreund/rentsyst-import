import React from "react";
import {ListItem} from "./ListItem";
import {Input} from "react-select/animated/dist/react-select.esm";

export class TextTemplateRelationship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Address: {{passport_addr}}. Test: {{passport_num}}'};
    }

    handlerCallback = (event) => {
        console.log('text template handler', this.props.name, event.target.value);
        this.setState({
            value: event.target.value
        });
        this.props.handlerCallback(this.props.name, {template: event.target.value});
    }

    render() {
            return (
                    <label>
                        Template:
                        <textarea
                            defaultValue={this.state.value}
                            onChange={this.handlerCallback}
                            rows="8"
                            cols="40"
                        >
                        </textarea>
                    </label>
            )
    }

}

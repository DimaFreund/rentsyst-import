import React from "react";
import Select from "react-select";

export class DateMask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null}

    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
        this.props.handlerCallback(this.props.name, {template: event.target.value});
    }

    render() {
        return (
            <label>
                Mask
                <input
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                />
                <br/>
                Example: 'DD.MM.YYYY hh:mm';
                <br/>
                YYYY - year;
                <br/>
                MM - month;
                <br/>
                DD - day;
                <br/>
                hh - hour;
                <br/>
                mm - minutes;
                <br/>
                <a href="https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/">More</a>
            </label>
        )
    }
}

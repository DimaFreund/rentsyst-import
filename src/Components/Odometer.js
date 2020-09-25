import React from "react";
import Select from "react-select";

export class Odometer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: {
                value: 'km',
                label: 'Km'
            }}

    }

    handleChange = (selected) => {
        this.setState({selected})
        this.props.handlerCallback(this.props.name, {type: selected.value});
    }

    render() {
        let selected = this.state.selected;
        return (
            <Select
                onChange={this.handleChange}
                value={selected}
                options={[
                    {
                        value: 'km',
                        label: 'Km'
                    },
                    {
                        value: 'mile',
                        label: 'Mile',
                    }
                ]}
            />
        )
    }
}

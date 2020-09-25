import React from "react";
import {LiverSearch} from "./LiverSearch";

export class CompanySelect extends React.Component {

    handleChange = (selectedOption, {columnIndex}) => {
        this.props.setCompany(columnIndex);
    }

    render() {
        return  <LiverSearch
            key="company_id"
            handlerCallback={this.handleChange}
            placeholder="Select company"
            name="company_id"
            optionUrl={this.props.optionUrl}
        />
    }
}

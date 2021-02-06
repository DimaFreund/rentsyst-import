import React from "react";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";
import {DateMask} from "../Components/DateMask";

export const DocumentLicenceSchema = (App) => {
    return [
        {
            title: 'Id',
            name: 'id',
        },
        {
            title: 'Contact id',
            name: 'contact_id',
        },
        {
            title: 'Number',
            name: 'number',
        },
        {
            title: 'Date of issue',
            name: 'date_issue',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template, "YYYY-MM-DD");
            },
            optionsCallback: () => {
                return <DateMask
                    name="date_issue"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
        {
            title: 'Date of expiry',
            name: 'date_exp',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template, "YYYY-MM-DD");
            },
            optionsCallback: () => {
                return <DateMask
                    name="date_exp"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
    ];
}

import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {TextTemplateRelationship} from "../Components/TextTemplateRelationship";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";
import {DateMask} from "../Components/DateMask";

export const DocumentPassportSchema = (App) => {
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
        {
            title: 'Notes (comment)',
            name: 'notes',
            optionsCallback: (columnIndex) => {
                if(columnIndex === 'set_static_value')
                {
                    return <TextTemplateRelationship
                        name="notes"
                        handlerCallback={App.saveNewRules}
                    />
                }
            },
            handlerResult: (value, property, rowIndex) => {
                let template = property.template;
                let header = App.state.header;
                let reBrackets = /\{\{(.*?)\}\}/g;
                let found;
                let result = template;
                while(found = reBrackets.exec(template)) {
                    let columnIndex = header.indexOf(found[1])
                    debugger
                    if(columnIndex !== -1) {
                        console.log(found)
                        result = result.replace(found[0], App.state.file[rowIndex][columnIndex])
                    }
                }
                return result;
            }
        }
    ];
}

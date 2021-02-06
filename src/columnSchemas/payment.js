import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {DateMask} from "../Components/DateMask";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";

export const PaymentSchema = (App) => {
    return [
        {
            name: 'id'
        },
        {
            name: 'order_id',
        },
        {
            name: 'type',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/payment-types')}
                    name="type" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'method',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/payment-method')}
                    name="method" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'date',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template);
            },
            optionsCallback: () => {
                return <DateMask
                    name="date"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
        {
            name: 'created_at',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template);
            },
            optionsCallback: () => {
                return <DateMask
                        name="created_at"
                        handlerCallback={App.saveNewRules}
                     />
            },
        },
        {
            name: 'updated_at',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template);
            },
            optionsCallback: () => {
                return <DateMask
                    name="updated_at"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
        {
            name: 'value'
        },
        {
            name: 'type_order',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/payment-types-order')}
                    name="type_order" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'created_by',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-managers')}
                    name="created_by" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'updated_by',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-managers')}
                    name="updated_by" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'comment'
        }
    ];
}

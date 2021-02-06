import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";
import {DateMask} from "../Components/DateMask";

export const MaintenanceSchema = (App) => {
    return [
        {
            title: 'Id',
            name: 'id',
        },
        {
            title: 'Vehicle id',
            name: 'vehicle_id',
        },
        {
            title: 'Contact id',
            name: 'contact_id',
        },
        {
            name: 'date_from',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template);
            },
            optionsCallback: () => {
                return <DateMask
                    name="date_from"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
        {
            name: 'date_to',
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template);
            },
            optionsCallback: () => {
                return <DateMask
                    name="date_to"
                    handlerCallback={App.saveNewRules}
                />
            },
        },
        {
            title: 'Status',
            name: 'status',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/maintenance-statuses')}
                    name="status"
                    handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            title: 'Balance',
            name: 'balance',
        },
        {
            title: 'Notes',
            name: 'notes',
        },
        {
            title: 'Created at',
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
            title: 'Name of custom maintenance',
            name: 'custom_maintenance',
        }
    ];
}

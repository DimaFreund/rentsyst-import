import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";

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
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yymmddhhmmss();
            }
        },
        {
            name: 'date_to',
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yymmddhhmmss();
            }
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
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yymmddhhmmss();
            }
        },
        {
            title: 'Name of custom maintenance',
            name: 'custom_maintenance',
        }
    ];
}

import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";

export const ContactSchema = (App) => {
    return [
        {
            name: 'first_name',
        },
        {
            name: 'last_name',
        },
        {
            name: 'contact_group_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-contact-groups')}
                    name="vehicle_color_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'email',
        },
        {
            name: 'phone',
        },
        {
            name: 'birthday',
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yyyymmdd();
            }
        },
        {
            name: 'country',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/country-list')}
                    name="country" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'region',
        },
        {
            name: 'city',
        },
        {
            name: 'address',
        },
        {
            name: 'building',
        },
        {
            name: 'index',
        },
        {
            name: 'note',
        },
    ];
}

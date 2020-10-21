import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";

export const ContactSchema = (App) => {
    return [
        {
            name: 'id'
        },
        {
            name: 'first_name',
        },
        {
            name: 'last_name',
        },
        {
            name: 'type',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/contact-types')}
                    name="type" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'contact_group_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-contact-groups')}
                    name="contact_group_id" handlerCallback={App.saveNewRules}
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
        {
            name: 'vat_number',
        },
        {
            name: 'registration_number',
        },
        {
            name: 'company_name'
        }
    ];
}

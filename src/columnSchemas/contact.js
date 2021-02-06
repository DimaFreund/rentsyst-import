import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";
import {DateMask} from "../Components/DateMask";

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
            handlerResult: (value, property) => {
                return jsToMysqlDateTime(value, property.template, "YYYY-MM-DD");
            },
            optionsCallback: () => {
                return <DateMask
                    name="birthday"
                    handlerCallback={App.saveNewRules}
                />
            },
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

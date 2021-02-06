import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {jsToMysqlDateTime} from "../helpers/ConvertDateTime";
import {DateMask} from "../Components/DateMask";

export const OrderSchema = (App) => {
    return [
        {
            name: 'id',
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
            name: 'vehicle_id',
        },
        {
            name: 'contact_id',
        },
        {
            name: 'pickup_location',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-locations')}
                    name="pickup_location" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'return_location',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-locations')}
                    name="return_location" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
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
            name: 'status',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/order-statuses')}
                    name="status" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'manager_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-managers')}
                    name="manager_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'sub_company_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-sub-company')}
                    name="sub_company_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'insurance',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-insurances')}
                    name="insurance" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            title: 'Price per day for vehicle',
            name: 'price_per_day',
        },
        {
            title: 'Price only by vehicle',
            name: 'total_price',
        },
        {
            title: 'Total price by vehicle, taxes, penalties, options and other details',
            name: 'total',
        },
        {
            title: 'Insurance price',
            name: 'total_insurance_price',
        },
        {
            title: 'Options (additional) price',
            name: 'price_options',
        },
        {
            title: 'Delivery price',
            name: 'price_delivery',
        },
        {
            title: 'Balance (total - paid)',
            name: 'balance',
        },
        {
            title: 'Paid price',
            name: 'payments_price',
        },
        {
            title: "Deposit price",
            name: 'deposits_price',
        },
        {
            title: 'Custom price',
            name: 'price_company',
        },
        {
            title: 'Comment (Note)',
            name: 'comment'
        }
    ];
}

import React from "react";
import {DynamicRelationship} from "../Components/DynamicRelationship";

export const OrderSchema = (App) => {
    return [
        {
            name: 'id',
        },
        {
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
            name: 'updated_at',
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yymmddhhmmss();
            }
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
            name: 'price_per_day',
        },
        {
            name: 'total_price',
        },
        {
            name: 'total',
        },
        {
            name: 'total_insurance_price',
        },
        {
            name: 'price_options',
        },
        {
            name: 'price_delivery',
        },
        {
            name: 'balance',
        },
        {
            name: 'payments_price',
        },
        {
            name: 'deposits_price',
        },
        {
            name: 'price_company',
        },
        {
            title: 'Comment (Note)',
            name: 'comment'
        }
    ];
}

import React from "react";
import {Odometer} from "../Components/Odometer";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {MarkRelationship} from "../Components/MarkRelationship";

export const VehicleSchema = (App) => {
    return [
        {
            name: 'id'
        },
        {
            name: 'odometer',
            optionsCallback: () => {
                return <Odometer
                    name="odometer"
                    handlerCallback={App.saveNewRules}
                />
            },
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                value = value.replace(',', '.').replace(/[^\d.-]/g, '');
                if(property.type === 'mile') {
                    value = Number.parseInt(value * 1.60934);

                }
                return value;
            }
        },
        {
            name: 'volume_tank',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(',', '.').replace(/[^\d.-]/g, '');
            }
        },
        {
            name: 'vehicle_transmission_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-transmission')}
                    name="vehicle_transmission_id"
                    handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'vehicle_color_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-colors')}
                    name="vehicle_color_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'body_type_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-body-type')}
                    name="body_type_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'vehicle_group_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/company-groups')}
                    name="vehicle_group_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            name: 'status',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/vehicle-statuses')}
                    name="status" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)}
                />
            },
        },
        {
            name: 'type',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/type-list')}
                    name="type" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)}
                />
            },
        },
        {
            name: 'vehicle_mark_id',
            optionsCallback: (columnIndex) => {
                return <MarkRelationship
                    markColumnIndex={columnIndex}
                    file={App.state.file}
                    header={App.state.header}
                    optionUrl={App.buildUrl('/cabinet/import/models-search')}
                    name="vehicle_mark_id" handlerCallback={App.saveNewRules}
                    rows={App.getUniqueRowValue(columnIndex)}
                    autoSelectedSave={App.autoSelectedSave}
                />
            },
        },
        {
            name: 'year',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'fuel_level',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(',', '.').replace(/[^\d.-]/g, '');
            }
        },
        {
            name: 'base_price',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(',', '.').replace(/[^\d.-]/g, '');
            }
        },
        {
            name: 'number_seats',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'number_doors',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'large_bags',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'small_bags',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'type_engine',
            handlerResult: (value, property) => {
                if(!value) {
                    return '';
                }
                return value.replace(/\D/g,'');
            }
        },
        {
            name: 'registration_number',
        },
        {
            name: 'vin_number',
        },
    ];
}

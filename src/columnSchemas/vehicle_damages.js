import React from "react";
import {Odometer} from "../Components/Odometer";
import {DynamicRelationship} from "../Components/DynamicRelationship";
import {TextTemplateRelationship} from "../Components/TextTemplateRelationship";

export const VehicleDamagesSchemas = (App) => {
    return [
        {
            name: 'id'
        },
        {
            title: 'Vehicle id',
            name: 'vehicle_id',
        },
        {
            title: 'Vehicle body part',
            name: 'vehicle_body_part_id',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/vehicle-body-parts')}
                    name="vehicle_body_part_id" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            title: 'Date of created',
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
            title: 'Damage title',
            name: 'damage_title',
        },
        {
            title: 'Damage description',
            name: 'damage_description',
            optionsCallback: (columnIndex) => {
                if(columnIndex === 'set_static_value')
                {
                    return <TextTemplateRelationship
                        name="damage_description"
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
                        result = result.replace(found[0], App.state.file[rowIndex][columnIndex])
                    }
                }
                return result;
            }
        },
        {
            title: 'Level of damages',
            name: 'damage_rate',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/vehicle-damage-rates')}
                    name="damage_rate" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            title: 'Status',
            name: 'status',
            optionsCallback: (columnIndex) => {
                return <DynamicRelationship
                    columnIndex={columnIndex}
                    optionUrl={App.buildUrl('/cabinet/import/vehicle-damage-statuses')}
                    name="status" handlerCallback={App.saveNewRules}
                    autoSelectedSave={App.autoSelectedSave}
                    rows={App.getUniqueRowValue(columnIndex)} />
            },
        },
        {
            title: 'Client id',
            name: 'client_id'
        },
    ]
}

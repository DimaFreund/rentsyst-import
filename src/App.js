import React from "react";
import {FileUploader} from "./Components/FileUploader";
import {ColumnConnector} from "./Components/ColumnConnector";
import {CompanySelect} from "./Components/CompanySelect";
import {PreviewTable} from "./Components/PreviewTable";
import {VehicleSchema} from "./columnSchemas/vehicle";
import {ContactSchema} from "./columnSchemas/contact";
import {OrderSchema} from "./columnSchemas/order";
import {PaymentSchema} from "./columnSchemas/payment";
import Select from "react-select";
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
import {DocumentLicenceSchema} from "./columnSchemas/document_licence";
import {DocumentPassportSchema} from "./columnSchemas/document_passport";
import {VehicleDamagesSchemas} from "./columnSchemas/vehicle_damages";
import {MaintenanceSchema} from "./columnSchemas/maintenance";
import {ContactBonusSchema} from "./columnSchemas/contact_bonus";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.saveFile = this.saveFile.bind(this);
        this.saveNewRules = this.saveNewRules.bind(this);
        this.autoSelectedSave = this.autoSelectedSave.bind(this);
        this.import = this.import.bind(this);
        this.importHandleEvent = this.importHandleEvent.bind(this);

        this.cacheRules = null;

        this.state = {
            file: null,
            currentSchema: null,
            header: null,
            rules: {},
            cacheRules: null,
            fileDelimiter: ',',
            companyId: null,
            isFirstHeader: true,
            preloadTable: {
                body: [],
                head: [],
            }
        };
    }

    saveNewRules(name, ruleProperty) {
        let rules = this.state.rules;
        console.log(name, ruleProperty, rules);
        if(!rules[name]) {
            rules[name] = {};

        }
        this.applyCacheRules();
        this.mergeDeep(rules[name], ruleProperty);
        this.setState({rules});
        this.reloadPreviewTable();
        // store.set('rules', rules);
    }

    applyCacheRules() {
        let rules = this.state.rules;
        if(this.cacheRules) {
            this.mergeDeep(rules, this.cacheRules);
            this.cacheRules = false;
        }
        this.setState({rules});
    }

    autoSelectedSave = (name, ruleProperty) => {
        let cacheRules = this.cacheRules;
        if(!cacheRules) {
            cacheRules = {};
        }
        if(!cacheRules[name]) {
            cacheRules[name] = {};
        }

        this.mergeDeep(cacheRules[name], ruleProperty);
        this.cacheRules = cacheRules;
    }

    mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }

    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    saveFile(file) {
        this.setState({header: file[0]});
        if(this.state.isFirstHeader) {
            file.splice(0,1);
        }
        this.setState({file: file})
        // store.set('file', file);
    }

    importHandleEvent() {
        this.import();
    }

    import(offset = 0) {
        this.applyCacheRules();
        const delimiter = 10000;
        const fileLength = this.state.file.length;

        let result = this.prepareImport(delimiter, offset);

        fetch(this.buildUrl('/cabinet/import/save') + '&table=' + this.state.currentSchema,
            {
                method: 'POST',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(result) // body data type must match "Content-Type" header
            })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.status === 'success') {
                        if(result.message.length < 120) {
                            StatusAlertService.showSuccess(result.message);
                        } else {
                            StatusAlertService.showSuccess(result.message, {autoHide: false});
                        }
                        offset += delimiter;
                        if(fileLength > offset) {
                            this.import(offset);
                        }
                    } else {
                        StatusAlertService.showError(result.message, {autoHide: false});
                    }},
            )
            .catch((reason) => {
                StatusAlertService.showError('Error request');
            })
    }

    reloadPreviewTable() {
        this.setState({
            preloadTable: this.prepareImport(20)
        })
    }

    prepareImport(countRow = 10000, offset = 0) {
        let result = {
                head: [],
                body: [],
            };
        let rules = this.state.rules;
        let file = this.state.file;
        let fileLength = file.length;
        let startPosition = offset;
        let endPosition = countRow + offset;

        if(endPosition > fileLength) {
            endPosition = fileLength - 1;
        }

        this.getCurrentColumnSchema().map((column, newColumnIndex) => {
            let rule = rules[column.name];
            result.head.push(column.name);
            if(rule) {
                for (let i = startPosition; i < endPosition; i++) {
                    if(!result.body[i - offset]) {
                        result.body[i - offset] = [];
                    }
                    let oldValue = '';

                    if(rule.bonusIndex) {
                        oldValue = file[i][rule.bonusIndex] + '|' + file[i][rule.columnIndex]
                    } else {
                        oldValue = file[i][rule.columnIndex];
                    }


                    let newValue = oldValue;

                    if(rule.conformity) {
                        newValue = rule.conformity[oldValue];
                    }
                    if(!newValue && column.defaultValue) {
                        newValue = column.defaultValue;
                    }
                    if(column.handlerResult) {
                        newValue = column.handlerResult(newValue, rule, i);
                    }
                    if(rule.columnIndex && rule.defaultValue) {
                        newValue = rule.defaultValue;
                    }
                    result.body[i - offset][newColumnIndex] = newValue;
                }
            } else {
                for(let i = startPosition; i < endPosition; i++) {
                    if(!result.body[i - offset]) {
                        result.body[i - offset] = [];
                    }
                    result.body[i - offset][newColumnIndex] = '';
                }
            }
        })
       return result;
    }

    getUniqueRowValue(columnIndex) {
        var rows = [];
        for(let i = 0; i < this.state.file.length; i++) {
            let value = this.state.file[i][columnIndex];
            // eslint-disable-next-line no-unused-expressions
            if(value && !rows.includes(value)) {
                rows.push(value);
            }
        }
        return rows
    }

    getColumnSchemas() {
        return {
            vehicle: VehicleSchema,
            contact: ContactSchema,
            document_license: DocumentLicenceSchema,
            document_passport: DocumentPassportSchema,
            order: OrderSchema,
            order_payment: PaymentSchema,
            vehicle_damage: VehicleDamagesSchemas,
            order_maintenance: MaintenanceSchema,
            contact_bonus: ContactBonusSchema,
        }
    }

    getCurrentColumnSchema() {
        return this.getColumnSchemas()[this.state.currentSchema](this);
    }

    buildUrl(url) {
        return url + '/?company_id=' + this.state.companyId
    }

    setCompany = (id) => {
        this.setState({companyId: id});
    }

    handleIsFirstHeader = (event) => {
        this.setState({ isFirstHeader: event.target.checked })
    }

    setColumnSchema = (selected) => {
        this.setState({ currentSchema: selected.value });
    }

    setDelimiter = (selected) => {
        this.setState( { fileDelimiter: selected.value } );
    }

    render() {
        return <div className="app-container">
            <StatusAlert/>
            <div className="import-settings">
                <label htmlFor="first-header">
                    <input checked={this.state.isFirstHeader ? 'checked' : ''} onChange={this.handleIsFirstHeader} id="first-header" type="checkbox" />
                    First row is header?
                </label>
                <CompanySelect optionUrl={this.buildUrl('/cabinet/import/company-search')} setCompany={this.setCompany} />
            </div>
            <Select
                options={Object.keys(this.getColumnSchemas()).map((key) => {
                    return {
                        value: key,
                        label: key,
                    }
                })}
                placeholder="Select table"
                onChange={this.setColumnSchema}
            />
            <Select
                options={[
                    {
                        value: ',',
                        label: 'Coma'
                    },
                    {
                        value: '.',
                        label: 'Dot'
                    },
                    {
                        value: ';',
                        label: 'Dot and coma'
                    },
                    {
                        value: "\t",
                        label: 'Tab'
                    },
                ]}
                placeholder="Select delimiter"
                onChange={this.setDelimiter}
            />
            <FileUploader
                onSaveFile={this.saveFile}
                delimiter={this.state.fileDelimiter}
            />
            {
                this.state.currentSchema && this.state.companyId ?
                    (
                        <div>
                            <ColumnConnector
                                appInstance={this}
                                handlerCallback={this.saveNewRules}
                                columnSchema={this.getCurrentColumnSchema()}
                                header={this.state.header}
                                autoSelectedSave={this.autoSelectedSave}
                            />
                            <button onClick={this.importHandleEvent}>
                                Import
                            </button>
                        </div>
                    )
                :
                    ''
            }
            <PreviewTable preloadTable={this.state.preloadTable} />
        </div>
    }
}

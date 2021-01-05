import React from "react";

export const DocumentLicenceSchema = (App) => {
    return [
        {
            title: 'Id',
            name: 'id',
        },
        {
            title: 'Contact id',
            name: 'contact_id',
        },
        {
            title: 'Number',
            name: 'number',
        },
        {
            title: 'Date of issue',
            name: 'date_issue',
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yyyymmdd();
            }
        },
        {
            title: 'Date of expiry',
            name: 'date_exp',
            handlerResult: (value) => {
                if(!value) {
                    return '';
                }
                let date = new Date(value);
                return date.yyyymmdd();
            }
        },
    ];
}

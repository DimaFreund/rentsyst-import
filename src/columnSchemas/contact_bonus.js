import React from "react";

export const ContactBonusSchema = (App) => {
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
            title: 'Amount',
            name: 'value',
        },
        {
            title: 'Comment (description)',
            name: 'description'
        }
    ];
}

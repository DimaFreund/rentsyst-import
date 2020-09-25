import React from "react";
import styled from 'styled-components'

const Styles = styled.div`
  input {
    background: white;
    padding: 8px 0px;
    margin: 10px 0px;
  }
`

export const FileUploader = (props) => {
    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        props.onSaveFile(CSVtoArray(content));
    }

    const CSVtoArray = (text) => {
        let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
        for (l of text) {
            if ('"' === l) {
                if (s && l === p) row[i] += l;
                s = !s;
            } else if (',' === l && s) l = row[++i] = '';
            else if ('\n' === l && s) {
                if ('\r' === p) row[i] = row[i].slice(0, -1);
                row = ret[++r] = [l = '']; i = 0;
            } else row[i] += l;
            p = l;
        }
        return ret;
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }
    return <div className="upload-expense">
        <Styles>
            <input type='file'
                   id='file'
                   className='file-input'
                   accept='.csv'
                   onChange={e => handleFileChosen(e.target.files[0])}
            />
        </Styles>
    </div>
}

import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel } from '@mui/material';

export default function Fieldbase({fieldName,fieldError,fieldType,fieldValue, fetchAction}) {

const fieldClassName = `${fieldName}-input` 
  
return ( 
    <div className='m-10'>
        <InputLabel htmlFor={`${fieldClassName}`} className='font-bold text-gray-950'>
        <p className='font-bold text-gray-950'>{`${fieldName}`}</p>
        </InputLabel>

        {fieldType == "radio" &&
            <RadioGroup row aria-label="UserIE" name="UserIE"  variant="outlined"
            className={`w-full rounded-[10px] ${fieldError ? 'bg-red-200' : 'bg-white-200'}`} onChange={(e) => {
                fetchAction(e.target.value);
            }}
                value={`${fieldValue}`} >
                <FormControlLabel value="Usuario Interno" control={<Radio />} label="Internal" />
                <FormControlLabel value="Usuario Externo" control={<Radio />} label="External" />
            </RadioGroup>
        }

        {fieldType != "radio" &&
            <TextField
            id={`${fieldClassName}`}
            type={`${fieldType}`}
            placeholder='Digite aqui'
            variant="outlined"
            className={`w-full rounded-[10px] ${fieldError ? 'bg-red-200' : 'bg-gray-200'}`}
            InputProps={{
                style: { borderRadius: '10px' }
            }}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
                fetchAction(e.target.value);
            }}
            value={`${fieldValue}`} />
        }

        {fieldError && <p className="text-red-500">{fieldError}</p>}
    </div>
)
}
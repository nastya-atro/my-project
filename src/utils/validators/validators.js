import React from 'react';

export const validateForm = values => {
    const errors = {};
    if (!values.newMessage) {
      errors.newMessage = 'Required';
    } else if (
        values.newMessage.length>10
    ) {
      errors.newMessage = 'Write more then 10 sumbols';
    }
    return errors;
  }

  export const required =  values=>{
    const errors = {};
    if (!values) {
      errors = 'Required';
    } 
    return errors;
  }

  export const maxLength=(maxLength)=>(values)=>{
    const errors = {};
    if (
        values.length < maxLength
    ) {
      errors = `Write more then ${maxLength} sumbols`;
    }
    return errors;
  }
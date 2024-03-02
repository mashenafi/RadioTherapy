// src/components/Form.tsx
import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPlanPosting, startPlanUpdating } from '../state/DataPostingState';
import { setformData, appStateType, formDataInitial, setPlanId, formDataFrame } from '../state/AppState';



const Form = () => {
  const dispatch = useDispatch();
  const { formData, planId } = useSelector((state: { app: appStateType }) => state.app);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    dispatch(setformData(newFormData));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // add plan to server
    if(planId==="None"){
      dispatch(startPlanPosting(formData));
    }else{
      const formatedPlan = {id: planId, plans:formData};
      dispatch(startPlanUpdating(formatedPlan));
    }
    // clear form
    dispatch(setformData(formDataInitial));
    dispatch(setPlanId("None"));
  };

  interface RenderProps {
    formData: formDataFrame;
    handleChange(event: any): void;
  }
  const RenderInput =({formData, handleChange}:RenderProps) =>{
    const formTagArray: string[] = Object.keys(formData);
    return formTagArray.map((tag) =>{
      return (
          !["ASC", "Technique", "Energy", "TxSite", "QAShot"].includes(tag)
          ?<label className='inputLabel' key={tag}>
            {tag}:
            <input 
              className="inputClass" 
              id={tag} 
              type={typeof(formData[tag])=="string"?"text":"number"} 
              name={tag} 
              value={formData[tag]} 
              onChange={handleChange} 
              />
          </label>
          :<></>
        )
    })
  }

  interface RenderPropsChoice {
    formData: formDataFrame;
    handleChange(event: any): void;
  }
  const RenderChoiceInput =({formData, handleChange}:RenderPropsChoice) =>{
    interface choiceFrame{
      ASC: string[];
      Technique: string[];
      Energy: string[];
      TxSite: string[];
      QAShot: string[];
      [key: string]: string[];
    }
    const choices:choiceFrame = {
      ASC: ["Very Low", "Low", "Moderate", "High"],
      Technique: ["VMAT", "3D", "2D", "electron", "IMRT"],
      Energy: ["6MV", "16MV", "6fff", "10fff", "6MeV", "9MeV", "12MeV", "16MeV", "6/16MV"],
      TxSite: ['HH', 'WB', 'GR', 'SC'],
      QAShot: ['HH', 'WB', 'GR', 'SC']
    }
    const formTagArray: string[] = Object.keys(formData);
    return formTagArray.map((tag) =>{
      return (
          ["ASC", "Technique", "Energy", "TxSite", "QAShot"].includes(tag)
          ?<label className='inputLabel' key={tag}>
            {tag}:
            <select key={Math.random()} value={formData[tag]} name={tag} onChange={handleChange}>
            {choices[tag].map((item, id) => (
              <option key={id} value={item}>{item}</option>
            ))}
            </select>
          </label>
          :<></>
        )
    })
  }
  return (
    <form className="postForm" onSubmit={handleSubmit}>
        <div className='formTitle'>{planId==="None"?"Add a Plan":"Update Plan"}</div>
        <div className='inputContainer'>
          {RenderInput({formData, handleChange})}
          {RenderChoiceInput({formData, handleChange})}
          <button className="addPlanFromButton" type="submit">{planId==="None"?"Add":"Update"}</button>
        </div>
    </form>
  );
};

export default Form;

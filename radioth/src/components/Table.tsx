// src/components/Table.tsx
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import {dataFrame} from '../state/DataLoadingState';
import { startPlanRemoving } from '../state/DataPostingState';
import {setformData, setPlanId, formDataFrame } from '../state/AppState';

interface TableProps {
  data: dataFrame[];
}

const Table: FC<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const editPlan=(plans: dataFrame):void =>{    
    const formatedData:formDataFrame = {...plans};
    dispatch(setformData(formatedData));
    dispatch(setPlanId(plans.id));
  }
  const deletePlan=(id: string):void =>{
    dispatch(startPlanRemoving(id));
  }
  interface RenderProps {
    data: dataFrame[];
  }
  const RenderHeads =({data}: RenderProps) =>{
    const headerArray: string[] = Object.keys(data[0]);
    return headerArray.map((column) =>{
      return (
        column==="id"
        ?<th key={column}></th>
        :<th className='headerColumn' key={column}>{column}</th>
      )
    })
  }

  interface RenderPropsCell {
    item: dataFrame;
    id: number;
  }
  const RenderCells =({item, id}: RenderPropsCell) =>{
    const cellArray: string[] = Object.keys(item);
    return cellArray.map((column) =>{
      return(
        column!=="id"
        ?<td key={Math.random()}>{item[column]}</td>
        :<td key={Math.random()}>{id+1}</td>
      )
      
    })
  }
  return (
    <table>
      <thead>
        <tr className='headerRow'>
          {RenderHeads({data})}
          <th className='tableHeaderButton' key={"table_button1"}></th>
          <th className='tableHeaderButton' key={"table_button2"}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, id) => (
          <tr key={id} id={id.toString()} className={id%2===0?"tableRow normalRow":"tableRow colorfullRow"}>
            {RenderCells({item, id})}
            <td className='buttonCells firstButtonCell'>
              <button className="tableButton" type="submit" onClick={() => editPlan(item)}>
                <i className="fa fa-pencil-square fa-sm" aria-hidden="true"></i>
              </button>
            </td>
            <td className='buttonCells'>
                <button className="tableButton" type="submit" onClick={() =>deletePlan(item.id)}>
                  <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

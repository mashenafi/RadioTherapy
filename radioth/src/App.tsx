import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Form from './components/PlanForm';
import Table from './components/Table';
import Loading from './components/Loading';

// STATE
import { getPlansData, LoadingDataState } from './state/DataLoadingState';
// import { appStateType} from './state/AppState';
import { PostingDataState } from './state/DataPostingState';

function App() {

  // set app state variables
  const dispatch = useDispatch();
  const { planData, isLoading } = useSelector((state: { plans: LoadingDataState }) => state.plans);
  const { isPosting, serverMessage} = useSelector((state: { postPlans: PostingDataState }) => state.postPlans);

  // Dispatch the action to start loading data when the component mounts
  useEffect(() => {
    dispatch(getPlansData());
  }, [dispatch]);

  return (
    <div className="App">
      <div className='mainContainer'>
        <div className="postFormContainer">
          <Form/>
        </div>
        <div className={isPosting?'serverLoading':serverMessage!==""?'serverMessage':"noServerMessage"}>
          {isPosting
            ?<Loading/>
            :<p>{serverMessage}</p>
          } 
        </div>
        <div className='tableContainer'>
          <div className='tableInnerContainer'>
            <div className='tableTitle'>Treatment Plans</div>
            {isLoading
            ?<Loading/>
            :planData && planData.length>0
            ?<Table data={planData}/>
            :<div className='noPlanMessage'>No treatment plan 😞. Add some.</div>
            }
          </div>
        </div>
        <div className='statContainer'></div>
      </div>
    </div>
  );
}

export default App;
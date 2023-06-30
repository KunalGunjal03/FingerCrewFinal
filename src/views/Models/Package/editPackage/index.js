import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setStepStatus, setFormData } from './store/dataSlice';
import { setCurrentStep } from './store/stateSlice';
import reducer from './store';
import { injectReducer } from 'store/index';

injectReducer('accountDetailForm', reducer);

const EditUser = lazy(() => import('./components/editPackage'));

const DetailForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.accountDetailForm.state.currentStep);
  const formData = useSelector((state) => state.accountDetailForm.data.formData.getData);

  useEffect(() => {
    // dispatch(getForm())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextChange = (values, name) => {
    const nextStep = currentStep + 1;
    dispatch(setFormData({ [name]: values }));
    dispatch(
      setStepStatus({
        [currentStep]: { status: 'complete' },
        [nextStep]: { status: 'current' },
      })
    );
    dispatch(setCurrentStep(nextStep));
  };

  const handleBackChange = () => {
    const previousStep = currentStep - 1;
    dispatch(setCurrentStep(previousStep));
  };

  return (
    <div>
      <Suspense fallback={<></>}>
        {currentStep === 0 && (
          <EditUser data={formData} onNextChange={handleNextChange} />
        )}
      </Suspense>
    </div>
  );
};

export default DetailForm;

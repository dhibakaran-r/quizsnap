import React, { Suspense } from 'react'
import { LineWave } from 'react-loader-spinner';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import PrivateRoute from './pages/PrivateRoute';
import AccessDenied from './pages/AccessDenied';


const QuizSnap = React.lazy(() => import('./pages/QuizSnap'));
const Register = React.lazy(() => import('./pages/Register'));
const Login = React.lazy(() => import('./pages/Login'));
const QSAdmin = React.lazy(() => import('./pages/QSAdmin'));
const QSUsers = React.lazy(() => import('./pages/QSUsers'));
const PageNotFound404 = React.lazy(() => import('./pages/PageNotFound404'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className='w-full h-dvh flex justify-center items-center'>
                            {/* <MutatingDots visible={true} height="100" width="100" color="#0144CB" secondaryColor="#3572EF" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/> */}
                            <p className='text-secondary text-3xl flex'>QuizSnap </p><p><LineWave visible={true} height="100" width="100" color="#3572EF" ariaLabel="line-wave-loading" wrapperStyle={{}} wrapperClass="" firstLineColor="" middleLineColor="" lastLineColor=""/></p>
                          </div>}>
        <BrowserRouter basename='/quizsnap'>
          <Routes>
            <Route path='/' element={<QuizSnap />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/qsuser/*' 
              element={
                <PrivateRoute>
                  <QSUsers />
                </PrivateRoute>
              } 
            />
            <Route path='/qsadmin/*' 
              element={
                <PrivateRoute>
                  <QSAdmin />
                </PrivateRoute>
              } 
            />
            <Route path='*' element={<PageNotFound404 />} />
            <Route path='/unauthorized' element={<AccessDenied />} />
          </Routes>
        </BrowserRouter>
        
        
        </Suspense>
    </div>
    
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import BasicHemisphere from './BasicHemisphere';
import Earth from './Earth';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/basic' element={<BasicHemisphere />} />
        <Route path='/earth' element={<Earth />} />
      </Routes>
    </div>
  );
};

export default App;

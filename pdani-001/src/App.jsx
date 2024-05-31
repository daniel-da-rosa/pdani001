import { useState, useEffect } from 'react';
import Header from './Componentes/Header';
import SelectOpcao from './Componentes/SelectOpcao';

function App() {
  const [selecionado, setSelecionado] = useState(Array(6).fill(''));

  useEffect(() => {
   
  }, [selecionado]);

  return (
    <>
      <div>

      <Header />
      <SelectOpcao selecionado={selecionado} setSelecionado={setSelecionado}/>
      </div>
      
    </>
  );
}

export default App;

